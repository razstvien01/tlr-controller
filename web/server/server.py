from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
from api.control_session import configure_controller_sockets
from dotenv import load_dotenv
import os
import signal
import firebase_admin

load_dotenv()

debug_mode = os.getenv('FLASK_DEBUG', False)
secret_key = os.getenv('SECRET_KEY', '')

app = Flask(__name__)
app.config['SECRET_KEY'] = secret_key

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

socketio = SocketIO(app, async_mode='gevent', cors_allowed_origins="*")

configure_controller_sockets(socketio)

@app.route('/')
def index():
    return render_template("index.html")

def stop_server(signal, frame):
    socketio.stop()

cred_obj = firebase_admin.credentials.Certificate('key.json')
default_app = firebase_admin.initialize_app(cred_obj)

if __name__ == '__main__':
    print('running server at 5000')
    signal.signal(signal.SIGINT, stop_server)
    socketio.run(app, port=5000, host="0.0.0.0", debug=debug_mode)
    
