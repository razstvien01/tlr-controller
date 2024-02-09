from flask import Flask
from flask_restful import Api
from firebase_admin import credentials, initialize_app
from flask_socketio import SocketIO
from flask_cors import CORS  # Import CORS

cred = credentials.Certificate("key.json")
default_app = initialize_app(cred)

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'qwerty12345'
    api = Api(app)

    # Use CORS middleware
    CORS(app)
    socketio = SocketIO(app, cors_allowed_origins="*")
    socketio.init_app(app)  # Initialize SocketIO

    from .control_session import control_api, configure_controller_sockets
    from .user_api import UserResource
    from .robot_api import RobotResource

    # ! CONTROLLER API
    app.register_blueprint(control_api, url_prefix='/controller')
    configure_controller_sockets(socketio)

    # ! REST APIs
    api.add_resource(UserResource, "/users", "/users/<string:user_id>")
    api.add_resource(RobotResource, "/robots", "/robots/<string:robot_id>")

    return app, socketio  # Return both app and socketio instances
