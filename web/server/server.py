# server.py

from flask import render_template
from api import create_app
from flask_socketio import SocketIO

app, socketio = create_app()  # Use the create_app function

@app.route('/')
def index():
    return "WELCOME TO THE SERVER"

@socketio.on('message_from_client')
def handle_message(message):
    print('Received message:', message)
    socketio.emit('response_to_client', {'data': 'Message received successfully from the server!'})
    
if __name__ == '__main__':
    socketio.run(app, debug=True)  # Use socketio.run to run the server
