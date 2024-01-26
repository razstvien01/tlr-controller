from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
from api import create_app

app = create_app()
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
