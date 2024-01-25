from flask_cors import CORS
from api import create_app
from flask_socketio import SocketIO
from sockets.socket_functions import setup_socket_io

app = create_app()
socketio = SocketIO(app)
CORS(app, origins=["http://localhost:5173"])

if __name__ == '__main__':
  # app.run(debug = True)
  setup_socket_io(socketio)
  socketio.run(app, debug=True)