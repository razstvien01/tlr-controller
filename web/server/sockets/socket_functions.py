from flask_socketio import SocketIO, emit

def setup_socket_io(socketio: SocketIO):
  @socketio.on('connect')
  def handle_connect():
      print('Client connected')

  @socketio.on('disconnect')
  def handle_disconnect():
    print('Client disconnected')

  @socketio.on('message_from_client')
  def handle_message(message):
    print('Received message:', message)
    emit('response_to_client', {'data': 'Message received successfully!'})

  @socketio.on('another_message')
  def handle_another_message(data):
        print('Received another message:', data)
        emit('response_to_another_message', {'data': 'Another message received successfully!'})
