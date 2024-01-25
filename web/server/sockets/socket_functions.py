from flask_socketio import SocketIO, emit

def setup_socket_io(socketio):
  @socketio.on('message_from_client')
  def handle_message(message):
    print("Receive message:", message)
    emit("response_to_client", {"data": "Message received successfully!"})