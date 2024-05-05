from flask_socketio import SocketIO, emit
from flask import request
from data.controller_input import ControllerInput
from firebase_admin import firestore
from constants import constants

control_sessions = {}
power = ''

def configure_controller_sockets(socketIO: SocketIO):
	@socketIO.on('connect')
	def handle_connect():
		emit('connected', {'message': 'Welcome to the server!'})
	
	turnOnRequest = 'controller/TurnOnRobot/request'
	turnOnResponse = 'controller/TurnOnRobot/response'

	@socketIO.on(turnOnRequest)
	def turnOnRobot(data):
		id = data.get('id', '')
		power = data.get('power', 0)
		print("Received data: ", data)
		if id == '':
			emit(turnOnResponse, response404())
			return
				
		print("id: " + id)
		
		print("power: " + str(power))
		print(turnOnResponse)
  
		control_sessions[id] = ControllerInput(None)
  
		#Set to Active in firebase
		db = firestore.client()
		doc_ref = db.collection(constants.FirebaseTables.ROBOTS).document(id)
		doc_ref.set({constants.RobotTableKeys.STATUS: constants.RobotStatus.ACTIVE})

		emit(turnOnResponse, responseSuccess())
		

	turnOffRequest = 'controller/TurnOffRobot/request'
	turnOffResponse = 'controller/TurnOffRobot/response'

	@socketIO.on(turnOffRequest)
	def turnOffRobot(data):
		id = data['id']
		
		if(id not in control_sessions):
			emit(turnOffResponse, response404())
			return
		
		del control_sessions[id]

		db = firestore.client()
		doc_ref = db.collection(constants.FirebaseTables.ROBOTS).document(id)
		doc_ref.set({constants.RobotTableKeys.STATUS: constants.RobotStatus.INACTIVE})

		emit(turnOffResponse, responseSuccess())


	useRobotRequest = 'controller/UseRobot/request'
	useRobotResponse = 'controller/UseRobot/response'

	@socketIO.on(useRobotRequest)
	def useRobot(data):
		id = data['id']
		userId = data['userId']
		toUse = data['toUse']
		
		if(userId == ''):
			emit(useRobotResponse, response404())
			return

		if(id not in control_sessions):
			emit(useRobotResponse, response404())
			return

		if(control_sessions[id].AssignedUser != None and toUse):
			emit(useRobotResponse, response404())
			return

		if(toUse):
			control_sessions[id].AssignedUser = userId
		else:
			control_sessions[id].AssignedUser = None

		emit(useRobotResponse, responseSuccess())

	controlRobotRequest = 'controller/ControlRobot/request'
	controlRobotResponse = 'controller/ControlRobot/response'

	@socketIO.on(controlRobotRequest)
	def controlRobot(data):
		userId = data['userId']
		robotId = data['robotId']
		drive = data['drive']
		steer = data['steer']

		if(userId == ''):
			emit(controlRobotResponse, response404())
			return

		if(robotId not in control_sessions):
			emit(controlRobotResponse, response404())
			return

		session = control_sessions[robotId]

		if(session.AssignedUser != userId):
			emit(controlRobotResponse, response404())
			return

		if(drive != None):
			session.Drive = drive

		if(steer != None):
			session.Steer = steer

		emit(controlRobotResponse, {'success': True, 'drive': drive, 'steer': steer})

	getControlRequest = 'controller/GetControl/request'
	getControlResponse = 'controller/GetControl/response'

	@socketIO.on(getControlRequest)
	def getControl(data):
		robotId = data['robotId']

		if(robotId == ''):
			emit(getControlResponse, response404())
			return

		if(robotId not in control_sessions):
			emit(getControlResponse, response404())
			return

		control_session = control_sessions[robotId]

		if(control_session.AssignedUser == None):
			emit(getControlResponse, response404())
			return

		emit(getControlResponse, control_session.serializable())

	
def response404():
	return {'statusCode': 404 }

def responseSuccess():
	return {'success': True}
