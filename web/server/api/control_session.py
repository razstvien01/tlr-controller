from flask_socketio import SocketIO, emit
from flask import request
from data.controller_input import ControllerInput

control_sessions = {}

def configure_controller_sockets(socketIO: SocketIO):
	@socketIO.on('connect')
	def handle_connect():
		client_sid = request.sid
		print(f"Client connected with session ID: {request.sid}")
		# socketIO.emit('broadcast_message', {'message': 'A new client has connected'}, room='*')
		emit('message', {'message': 'Welcome to the server!'})
		emit('flask_to_client_message', {'message': 'Use Robot response received'}, room=request.sid)
	
	turnOnRequest = 'controller/TurnOnRobot/request'
	turnOnResponse = 'controller/TurnOnRobot/response'

	@socketIO.on(turnOnRequest)
	def turnOnRobot(data):
		id = data['id']
		if id == '':
			emit(turnOnResponse, response404())
			return

		control_sessions[id] = ControllerInput(None)
		emit(turnOnResponse, responseSuccess())
		
		print("Will message to the other client")
		
		# emit('flask_to_client_message', {'message': 'Use Robot response received'}, room=request.sid)

	# @socketIO.on(turnOnRequest)
	# def turnOnRobot(data):
	# 	id = data['id']
	# 	if id == '':
	# 		emit(turnOnResponse, response404())
	# 		return
		
	# 	control_sessions[id] = ControllerInput(None)

  #   # Get the other client's session ID
	# 	other_client_sid = None
	# 	for sid in control_sessions:
	# 		if sid != id:
	# 			other_client_sid = sid
	# 			break
	# 	if other_client_sid is not None:
  #     # Send a message to the other client
	# 		socket = socketIO.server.get_recent_socket(other_client_sid, room='*')
	# 		if socket is not None:
	# 			socket.emit(turnOnResponse, responseSuccess())
	# 	emit(turnOnResponse, responseSuccess(), room=id)


	turnOffRequest = 'controller/TurnOffRobot/request'
	turnOffResponse = 'controller/TurnOffRobot/response'

	@socketIO.on(turnOffRequest)
	def turnOffRobot(data):
		id = data['id']
		
		if(id not in control_sessions):
			emit(turnOffResponse, response404())
			return
		
		del control_sessions[id]
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
