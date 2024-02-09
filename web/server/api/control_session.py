from flask import Blueprint, jsonify, request, abort, Response
from jsonrpcserver import dispatch, method, Result, Success
from flask_socketio import SocketIO, emit

from data.controller_input import ControllerInput

def configure_controller_sockets(socketIO: SocketIO):
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
		print('accessed useRobot')

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

control_sessions = {}

control_api = Blueprint('control_api', __name__)


@control_api.route('RPC', methods=['POST'])
def rpc():
	return Response(
		dispatch(request.get_data().decode()), content_type="application/json"
	)
		

@method
def control(robotId, userId, drive, steer) -> Result:
	if(userId == ''):
		abort(404)

	if(robotId not in control_sessions):
		abort(404)

	session = control_sessions[robotId]

	if(session.AssignedUser != userId):
		abort(404)

	if(drive != None):
		session.Drive = drive

	if(steer != None):
		session.Steer = steer

	return Success("Success")

@method 
def getControl(robotId) -> Result:

	if(robotId == ''):
		abort(404)

	if(robotId not in control_sessions):
		abort(404)

	return Success(control_sessions[robotId].serializable())
	
def response404():
	return {'statusCode': 404 }

def responseSuccess():
	return {'success': True}

