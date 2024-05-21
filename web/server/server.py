import logging
from flask_socketio import SocketIO, emit
from flask import request
from data.robot_data import RobotData

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

control_sessions = {}
sessions = {}

def delete_session_by_id(id, message):
    for sid, session_data in sessions.items():
        if id in session_data:
            logger.info(f"{message}, Session: {sid} with Key: {id}")
            del session_data[id]
            if not session_data:
                del sessions[sid]
            return

def configure_controller_sockets(socketIO: SocketIO):
    @socketIO.on('controller/OnOffInfo/request')
    def robotOnOffInfo(data):
        robot_id = data.get('robot_id', '')
        logger.debug(f'Received OnOffInfo request for robot_id: {robot_id}')

        if robot_id == '' or robot_id not in control_sessions:
            logger.warning(f'OnOffInfo request failed: robot_id {robot_id} not found')
            emit('controller/OnOffInfo/response', response404())
            return

        logger.info(f'Sending OnOffInfo response for robot_id: {robot_id}')
        emit('controller/OnOffInfo/response', {"Power": control_sessions[robot_id].Power})

    @socketIO.on('sensor/SensorInfo/request')
    def handle_feedback(data):
        robot_id = data.get('robot_id', '')
        logger.debug(f'Received SensorInfo request for robot_id: {robot_id}')

        if robot_id == '' or robot_id not in control_sessions:
            logger.warning(f'SensorInfo request failed: robot_id {robot_id} not found')
            emit('sensor/SensorInfo/response', response404())
            return

        logger.info(f'Sending SensorInfo response for robot_id: {robot_id}')
        emit('sensor/SensorInfo/response', control_sessions[robot_id].Sensor.serializable())

    @socketIO.on('sensor/SensorUpdate/request')
    def sensorUpdate(data):
        robot_id = data.get('robot_id', '')
        message = data.get('message', '')
        logger.debug(f'Received SensorUpdate request for robot_id: {robot_id} with message: {message}')

        if robot_id == '' or robot_id not in control_sessions:
            logger.warning(f'SensorUpdate request failed: robot_id {robot_id} not found')
            emit('sensor/SensorUpdate/response', response404())
            return

        control_sessions[robot_id].Sensor.Message = message
        logger.info(f'Sensor message updated for robot_id: {robot_id}')
        emit('sensor/SensorUpdate/response', responseSuccess())

    @socketIO.on('disconnect')
    def handle_disconnect():
        disconnected_sid = request.sid
        logger.info(f'Disconnect event received for session: {disconnected_sid}')

        if disconnected_sid in sessions:
            disconnected_id = next(iter(sessions[disconnected_sid]), None)
            if disconnected_id:
                delete_session_by_id(disconnected_id, "DISCONNECTED")
                control_sessions.pop(disconnected_id, None)
                logger.info(f'Session {disconnected_sid} with robot_id {disconnected_id} has been disconnected and cleaned up')
        else:
            logger.warning(f'Session {disconnected_sid} not found in sessions')

    @socketIO.on('connect')
    def handle_connect():
        logger.info('New connection established')
        emit('connected', {'message': 'Welcome to the server!'})

    @socketIO.on('controller/TurnOnRobot/request')
    def turnOnRobot(data):
        session_key = request.sid
        id = data.get('id', '')
        logger.debug(f'Received TurnOnRobot request for id: {id}')

        if id == '':
            logger.warning('TurnOnRobot request failed: id is empty')
            emit('controller/TurnOnRobot/response', response404())
            return

        sessions[session_key] = {id: {}}
        control_sessions[id] = RobotData()
        logger.info(f'Turned on robot with id: {id} in session: {session_key}')
        emit('controller/TurnOnRobot/response', responseSuccess())

    @socketIO.on('controller/TurnOffRobot/request')
    def turnOffRobot(data):
        id = data.get('id', '')
        logger.debug(f'Received TurnOffRobot request for id: {id}')

        if id == '':
            logger.warning('TurnOffRobot request failed: id is empty')
            emit('controller/TurnOffRobot/response', response404())
            return

        delete_session_by_id(id, "Turning Off Robot")
        control_sessions.pop(id, None)
        logger.info(f'Turned off robot with id: {id}')
        emit('controller/TurnOffRobot/response', responseSuccess())

    @socketIO.on('controller/UseRobot/request')
    def useRobot(data):
        id = data['id']
        userId = data['userId']
        toUse = data['toUse']
        logger.debug(f'Received UseRobot request for id: {id}, userId: {userId}, toUse: {toUse}')

        if userId == '' or id not in control_sessions:
            logger.warning(f'UseRobot request failed: invalid userId or robot_id {id} not found')
            emit('controller/UseRobot/response', response404())
            return

        control_sessions[id].AssignedUser = userId if toUse else None
        logger.info(f'Robot with id: {id} assigned to userId: {userId}' if toUse else f'Robot with id: {id} unassigned from userId: {userId}')
        emit('controller/UseRobot/response', responseSuccess())

    @socketIO.on('controller/ControlRobot/request')
    def controlRobot(data):
        userId = data['userId']
        robotId = data['robotId']
        drive = data['drive']
        steer = data['steer']
        logger.debug(f'Received ControlRobot request for userId: {userId}, robotId: {robotId}, drive: {drive}, steer: {steer}')

        if userId == '' or robotId not in control_sessions:
            logger.warning(f'ControlRobot request failed: invalid userId or robot_id {robotId} not found')
            emit('controller/ControlRobot/response', response404())
            return

        session = control_sessions[robotId]
        if session.AssignedUser != userId:
            logger.warning(f'ControlRobot request failed: userId {userId} is not assigned to robot_id {robotId}')
            emit('controller/ControlRobot/response', response404())
            return

        if drive is not None:
            session.Control.Drive = drive
        if steer is not None:
            session.Control.Steer = steer

        logger.info(f'Robot control updated for robot_id: {robotId}, drive: {drive}, steer: {steer}')
        emit('controller/ControlRobot/response', {'success': True, 'drive': drive, 'steer': steer})

    @socketIO.on('controller/GetControl/request')
    def getControl(data):
        robotId = data['robotId']
        logger.debug(f'Received GetControl request for robotId: {robotId}')

        if robotId == '' or robotId not in control_sessions or control_sessions[robotId].AssignedUser is None:
            logger.warning(f'GetControl request failed: invalid robot_id {robotId} or no assigned user')
            emit('controller/GetControl/response', response404())
            return

        logger.info(f'Sending control data {control_sessions[robotId].Control.Drive}, {control_sessions[robotId].Control.Steer} for robot_id: {robotId}')
        emit('controller/GetControl/response', control_sessions[robotId].Control.serializable())

def response404():
    logger.debug('Responding with 404')
    return {'statusCode': 404}

def responseSuccess():
    logger.debug('Responding with success')
    return {'success': True}
