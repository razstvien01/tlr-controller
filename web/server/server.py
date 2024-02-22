from flask import Flask, render_template
from flask_restful import Api, Resource
from flask_socketio import SocketIO
from flask_cors import CORS
from api.user_api import UserResource
from api.robot_api import RobotResource
from api.control_session import configure_controller_sockets
from dotenv import load_dotenv
import os
import signal

load_dotenv()

debug_mode = os.getenv('FLASK_DEBUG', False)
secret_key = os.getenv('SECRET_KEY', '')

app = Flask(__name__)
app.config['SECRET_KEY'] = secret_key
api = Api(app)
CORS(app)

socketio = SocketIO(app, async_mode='gevent', cors_allowed_origins="*")

configure_controller_sockets(socketio)

@app.route('/')
def index():
    return render_template("index.html")

def stop_server(signal, frame):
    socketio.stop()

if __name__ == '__main__':
    print('running server at 5000')
    signal.signal(signal.SIGINT, stop_server)
    socketio.run(app, debug=debug_mode)  #! Use socketio.run to run the server
