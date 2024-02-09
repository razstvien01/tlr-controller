from api import create_app
from dotenv import load_dotenv
import os

load_dotenv()

app, socketio = create_app()

debug_mode = os.getenv('FLASK_DEBUG', False)

@app.route('/')
def index():
    return "WELCOME TO THE SERVER"

@socketio.on('message_from_client')
def handle_message(message):
    print('Received message:', message)
    socketio.emit('response_to_client', {'data': 'Message received successfully from the server!'})
    
if __name__ == '__main__':
    print('running server at 5000')
    socketio.run(app, debug=debug_mode)  #! Use socketio.run to run the server