from flask_socketio import SocketIO, emit
from flask import request
from data.robot_data import RobotData

control_sessions = {}
sessions = {}

def delete_session_by_id(id, message):
    for sid, session_data in sessions.items():
        if id in session_data:
            print(f"{message}, Session: {sid} with Key: {id}")
            del session_data[id]
            if not session_data:
                del sessions[sid]
            return

def configure_controller_sockets(socketIO: SocketIO):
    @socketIO.on('controller/OnOffInfo/request')
    def robotOnOffInfo(data):
        robot_id = data.get('robot_id', '')
        if robot_id == '' or robot_id not in control_sessions:
            emit('controller/OnOffInfo/response', response404())
            return

        emit('controller/OnOffInfo/response', {"Power": control_sessions[robot_id].Power})

    @socketIO.on('sensor/SensorInfo/request')
    def handle_feedback(data):
        robot_id = data.get('robot_id', '')
        if robot_id == '' or robot_id not in control_sessions:
            emit('sensor/SensorInfo/response', response404())
            return

        emit('sensor/SensorInfo/response', control_sessions[robot_id].Sensor.serializable())

    @socketIO.on('sensor/SensorUpdate/request')
    def sensorUpdate(data):
        robot_id = data.get('robot_id', '')
        message = data.get('message', '')
        if robot_id == '' or robot_id not in control_sessions:
            emit('sensor/SensorUpdate/response', response404())
            return

        control_sessions[robot_id].Sensor.Message = message
        emit('sensor/SensorUpdate/response', responseSuccess())

    @socketIO.on('disconnect')
    def handle_disconnect():
        disconnected_sid = request.sid
        if disconnected_sid in sessions:
            disconnected_id = next(iter(sessions[disconnected_sid]), None)
            if disconnected_id:
                delete_session_by_id(disconnected_id, "DISCONNECTED")
                control_sessions.pop(disconnected_id, None)

    @socketIO.on('connect')
    def handle_connect():
        emit('connected', {'message': 'Welcome to the server!'})

    @socketIO.on('controller/TurnOnRobot/request')
    def turnOnRobot(data):
        session_key = request.sid
        id = data.get('id', '')
        if id == '':
            emit('controller/TurnOnRobot/response', response404())
            return

        sessions[session_key] = {id: {}}
        control_sessions[id] = RobotData()
        emit('controller/TurnOnRobot/response', responseSuccess())

    @socketIO.on('controller/TurnOffRobot/request')
    def turnOffRobot(data):
        id = data.get('id', '')
        if id == '':
            emit('controller/TurnOffRobot/response', response404())
            return

        delete_session_by_id(id, "Turning Off Robot")
        control_sessions.pop(id, None)
        emit('controller/TurnOffRobot/response', responseSuccess())

    @socketIO.on('controller/UseRobot/request')
    def useRobot(data):
        id = data['id']
        userId = data['userId']
        toUse = data['toUse']
        if userId == '' or id not in control_sessions:
            emit('controller/UseRobot/response', response404())
            return

        control_sessions[id].AssignedUser = userId if toUse else None
        emit('controller/UseRobot/response', responseSuccess())

    @socketIO.on('controller/ControlRobot/request')
    def controlRobot(data):
        userId = data['userId']
        robotId = data['robotId']
        drive = data['drive']
        steer = data['steer']

        if userId == '' or robotId not in control_sessions:
            emit('controller/ControlRobot/response', response404())
            return

        session = control_sessions[robotId]
        if session.AssignedUser != userId:
            emit('controller/ControlRobot/response', response404())
            return

        if drive is not None:
            session.Control.Drive = drive
        if steer is not None:
            session.Control.Steer = steer

        emit('controller/ControlRobot/response', {'success': True, 'drive': drive, 'steer': steer})

    @socketIO.on('controller/GetControl/request')
    def getControl(data):
        robotId = data['robotId']
        if robotId == '' or robotId not in control_sessions or control_sessions[robotId].AssignedUser is None:
            emit('controller/GetControl/response', response404())
            return

        emit('controller/GetControl/response', control_sessions[robotId].Control.serializable())

def response404():
    return {'statusCode': 404}

def responseSuccess():
    return {'success': True}
