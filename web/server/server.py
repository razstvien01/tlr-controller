# from flask import render_template
# from flask_cors import CORS
# from api import create_app
# from flask_socketio import SocketIO
# from sockets.socket_functions import setup_socket_io

# app = create_app()
# CORS(app, origins=["http://localhost:5173"])
# socketio = SocketIO(app, cors_allowed_origins="*")
# # setup_socket_io(socketio)

# @app.route('/')
# def index():
#     return "Hello, this is the backend!"


# # if __name__ == '__main__':
# #   # app.run(debug = True)
  
# #   socketio.run(app, debug=True)
# # @app.route('/')
# # def index():
# #     return render_template('index.html')

# @socketio.on('message_from_client')
# def handle_message(message):
#     print('Received message:', message)
#     socketio.emit('response_to_client', {'data': 'Message received successfully!'})

# if __name__ == '__main__':
#     socketio.run(app, debug=True)

# server.py
from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["*"])
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('message_from_client')
def handle_message(message):
    print('Received message:', message)
    socketio.emit('response_to_client', {'data': 'Message received successfully from the server!'})

if __name__ == '__main__':
    socketio.run(app, debug=True)
