from flask_cors import CORS
from api import create_app

app = create_app()
CORS(app, origins=["http://localhost:5173"])

if __name__ == '__main__':
  app.run(debug = True)