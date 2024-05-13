from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
from api.control_session import configure_controller_sockets
from dotenv import load_dotenv
import os
import signal
import firebase_admin

load_dotenv()

secret_key = os.getenv('SECRET_KEY', '')
key = os.getenv('FIREBASE_KEY_PATH', '')

app = Flask(__name__)
app.config['SECRET_KEY'] = secret_key

cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

socketio = SocketIO(app, async_mode='gevent', cors_allowed_origins="*", timeout=60)

configure_controller_sockets(socketio)

@app.route('/')
def index():
    return render_template("index.html")

def stop_server(signal, frame):
    socketio.stop()

try:
    cred_obj = firebase_admin.credentials.Certificate(key)
    default_app = firebase_admin.initialize_app(cred_obj)
    print("Successfully initializing Firebase")
except Exception as e:
    print("Error initializing Firebase:", e)

if __name__ == '__main__':
    print('running server at 5000')
    signal.signal(signal.SIGINT, stop_server)
    socketio.run(app, port=5000, host="0.0.0.0", debug=False)
    
