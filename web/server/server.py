from flask import Flask, render_template
from flask_restful import Api
from flask_socketio import SocketIO
from flask_cors import CORS
from api.user_api import UserResource
from api.robot_api import RobotResource
from sockets.socket_functions import setup_socket_io
from dotenv import load_dotenv
import os

load_dotenv()

debug_mode = os.getenv('FLASK_DEBUG', False)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'qwerty12345'
api = Api(app)
CORS(app)

api.add_resource(UserResource, "/users", "/users/<string:user_id>")
api.add_resource(RobotResource, "/robots", "/robots/<string:robot_id>")

socketio = SocketIO(app, cors_allowed_origins="*")

# Register socket events
setup_socket_io(socketio)

@app.route('/')
def index():
    return render_template("index.html")

if __name__ == '__main__':
    socketio.run(app, debug=debug_mode)
