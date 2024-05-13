from flask_socketio import SocketIO, emit
from flask import request
from data.controller_input import ControllerInput
from data.robot_data import RobotData
from data.sensor_input import SensorInput
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

def delete_session_by_id(id, message):
	sessions_deleted = False
	sessions_copy = sessions.copy()
	
	for sid, session_data in sessions_copy.items():
		if sessions_deleted:
			break
		for key, data in session_data.items():
			if key == id:
				print(f"{message}, Session: {sid} with Key: {key}")
				del sessions[sid][key]
				if not sessions[sid]:
					del sessions[sid]
					sessions_deleted = True
				break

def configure_controller_sockets(socketIO: SocketIO):
	sensorInfoRequest = 'sensor/SensorInfo/request'
	sensorInfoResponse = 'sensor/SensorInfo/response'

	@socketIO.on(sensorInfoRequest)
	def handle_feedback(data):
		robot_id = data.get('robot_id', '')
		
		if robot_id == '':
			emit(sensorInfoResponse, response404())
			return
		
		if(robot_id not in control_sessions):
			emit(sensorInfoResponse, response404())
			return

		if(control_sessions[robot_id].AssignedUser == None):
			emit(sensorInfoResponse, response404())
			return
		
		emit(sensorInfoResponse, control_sessions[robot_id].Sensor.serializable())
	
	sensorUpdateRequest = 'sensor/SensorUpdate/request'
	sensorUpdateResponse = 'sensor/SensorUpdate/response'

	@socketIO.on(sensorUpdateRequest)
	def sensorUpdate(data):
		robot_id = data.get('robot_id', '')
		message = data.get('message', '')
		
		if robot_id == '':
			emit(sensorUpdateResponse, response404())
			return
		
		if(robot_id not in control_sessions):
			emit(sensorUpdateResponse, response404())
			return

		if(control_sessions[robot_id].AssignedUser == None):
			emit(sensorUpdateResponse, response404())
			return

		control_sessions[robot_id].Sensor.Message = message
		
		emit(sensorUpdateResponse, responseSuccess())

	@socketIO.on('disconnect')
	def handle_disconnect():
		pass
		# disconnected_sid = request.sid 
		
		# try:
		# 	disconnected_id = sessions[disconnected_sid]
		# 	if isinstance(disconnected_id, dict):
		# 		disconnected_id_key = next(iter(disconnected_id))
				
		# 		if disconnected_id_key in sessions[disconnected_sid]:
		# 			# update_robot_status(disconnected_id_key, constants.RobotStatus.INACTIVE)
		# 			delete_session_by_id(disconnected_id_key, "DISCONNECTED")
		# 			# del control_sessions[disconnected_id_key]
		# except KeyError:
		# 	pass
  
	@socketIO.on('connect')
	def handle_connect():
		emit('connected', {'message': 'Welcome to the server!'})
	
	turnOnRequest = 'controller/TurnOnRobot/request'
	turnOnResponse = 'controller/TurnOnRobot/response'

	@socketIO.on(turnOnRequest)
	def turnOnRobot(data):
		session_key = request.sid
		# sessions[session_key] = {}
		
		id = data.get('id', '')
		
		if id == '':
			emit(turnOnResponse, response404())
			return
		
		print(f"Turning On Robot, Session: {session_key} with Key: {id}")\
    
		# sessions[session_key][id] = {}
		control_sessions[id] = RobotData()
  
		# update_robot_status(id, constants.RobotStatus.ACTIVE)
		
		emit(turnOnResponse, responseSuccess())
		

	turnOffRequest = 'controller/TurnOffRobot/request'
	turnOffResponse = 'controller/TurnOffRobot/response'

	@socketIO.on(turnOffRequest)
	def turnOffRobot(data):
		id = data.get('id', '')
		
		if id == '':
			emit(turnOffResponse, response404())
			return
		
		delete_session_by_id(id, "Turning Off Robot")
		
		if id in control_sessions:
			del control_sessions[id]
		
		# update_robot_status(id, constants.RobotStatus.INACTIVE)
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
			session.Control.Drive = drive

		if(steer != None):
			session.Control.Steer = steer

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

		emit(getControlResponse, control_session.Control.serializable())

	
def response404():
	return {'statusCode': 404 }

def responseSuccess():
	return {'success': True}
