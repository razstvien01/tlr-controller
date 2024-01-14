from flask import Blueprint, jsonify, request, abort

from data.controller_input import ControllerInput

control_sessions = {}

control_api = Blueprint('control_api', __name__)

@control_api.route('TurnOnRobot', methods=['POST'])
def turnOnRobot():
	id = request.json['id']
	if id == '':
		abort(404)

	control_sessions[id] = ControllerInput()
	return jsonify(success=True)

@control_api.route('TurnOffRobot', methods=['POST'])
def turnOffRobot():
	id = request.json['id']
	if(id not in control_sessions):
		abort(404)
	
	del control_sessions[id]
	return jsonify(success=True)