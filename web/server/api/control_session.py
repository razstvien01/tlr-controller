from flask_socketio import SocketIO, emit
from flask import request
from data.controller_input import ControllerInput
from firebase_admin import firestore
from google.cloud.firestore_v1.base_query import FieldFilter, BaseCompositeFilter
from constants import constants

control_sessions = {}
sessions = {}

def update_robot_status(robot_id, status):
		db = firestore.client()
		collection_ref = db.collection(constants.FirebaseTables.ROBOTS)
		field_filter = FieldFilter('robot_id', '==', robot_id)
		query_on_single_field = collection_ref.where(filter=field_filter)
		docs = query_on_single_field.stream()
    
		for doc in docs:
			doc.reference.update({constants.RobotTableKeys.STATUS: status})
    

def configure_controller_sockets(socketIO: SocketIO):
	@socketIO.on('disconnect')
	def handle_disconnect():
		disconnected_sid = request.sid 
		
		try:
			disconnected_id = sessions[disconnected_sid]
			if isinstance(disconnected_id, dict):
				disconnected_id_key = next(iter(disconnected_id))
				
				if disconnected_id_key in sessions[disconnected_sid]:
					update_robot_status(disconnected_id_key, constants.RobotStatus.INACTIVE)
					del sessions[disconnected_sid][disconnected_id_key]
					del control_sessions[disconnected_id_key]
					print(f"DISCONNECTED Session ID: {disconnected_sid}, Key: {disconnected_id_key}")
		except KeyError:
			pass
	
  
	@socketIO.on('connect')
	def handle_connect():
		emit('connected', {'message': 'Welcome to the server!'})
	
	turnOnRequest = 'controller/TurnOnRobot/request'
	turnOnResponse = 'controller/TurnOnRobot/response'

	@socketIO.on(turnOnRequest)
	def turnOnRobot(data):
		session_key = request.sid
		sessions[session_key] = {}
		
		print(f"Turning On Robot, Session: {session_key}")
		id = data.get('id', '')
		
		if id == '':
			emit(turnOnResponse, response404())
			return
		sessions[request.sid][id] = {}
		control_sessions[id] = ControllerInput(None)
		
		update_robot_status(id, constants.RobotStatus.ACTIVE)
		
		emit(turnOnResponse, responseSuccess())
		

	turnOffRequest = 'controller/TurnOffRobot/request'
	turnOffResponse = 'controller/TurnOffRobot/response'

	@socketIO.on(turnOffRequest)
	def turnOffRobot(data):
		id = data.get('id', '')
		
		if id == '':
			emit(turnOffResponse, response404())
			return
		
		# ! must loop the seesion, if it has that id then delete that session
		del sessions[request.sid][id]
		del control_sessions[id]
		update_robot_status(id, constants.RobotStatus.INACTIVE)
		emit(turnOffResponse, responseSuccess())


	useRobotRequest = 'controller/UseRobot/request'
	useRobotResponse = 'controller/UseRobot/response'

	@socketIO.on(useRobotRequest)
	def useRobot(data):
		id = data['id']
		userId = data['userId']
		toUse = data['toUse']
		
		if(userId == ''):
			print('A')
			emit(useRobotResponse, response404())
			return
 
		print(id)
		print('Control Sessions: ' + str(control_sessions))

		if(id not in control_sessions):
			print('B')
			emit(useRobotResponse, response404())
			return

		if(control_sessions[id].AssignedUser != None and toUse):
			print('C')
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
