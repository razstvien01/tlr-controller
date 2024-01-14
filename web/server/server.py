
from flask_cors import CORS
from api import create_app

app = create_app()

if __name__ == '__main__':
  CORS(app, origins=["http://localhost:5173"])
  app.run(debug = True)