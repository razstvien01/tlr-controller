from flask import Blueprint, jsonify, request, abort, Response
from jsonrpcserver import dispatch, method, Result, Success

from data.controller_input import ControllerInput

control_sessions = {}

control_api = Blueprint('control_api', __name__)

@control_api.route('TurnOnRobot', methods=['POST'])
def turnOnRobot():
	id = request.json['id']
	if id == '':
		abort(404)

	control_sessions[id] = ControllerInput(None)
	return jsonify(success=True)

@control_api.route('TurnOffRobot', methods=['POST'])
def turnOffRobot():
	id = request.json['id']
	
	if(id not in control_sessions):
		abort(404)
	
	del control_sessions[id]
	return jsonify(success=True)

@control_api.route('UseRobot', methods=['POST'])
def useRobot():
	id = request.json['id']
	userId = request.json['userId']
	toUse = request.json['toUse']

	if(userId == ''):
		abort(404)

	if(id not in control_sessions):
		abort(404)

	if(control_sessions[id].AssignedUser != None and toUse):
		abort(404)

	if(toUse):
		control_sessions[id].AssignedUser = userId
	else:
		control_sessions[id].AssignedUser = None
	
	return jsonify(success=True)

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
	

