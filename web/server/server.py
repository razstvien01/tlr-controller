# from flask import Flask, jsonify
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes

# @app.route("/api/home", methods=['GET'])
# def return_home():
#      return jsonify({
#     'message': 'Hello World',
#     'animal': ['goat', 'lion', 'chicken']
#   })

# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, jsonify
from api import create_app
from flask_cors import CORS

# app = create_app()
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])


@app.route("/api/home", methods=['GET'])
def return_home():
     return jsonify({
    'message': 'Hello World',
    'animal': ['goat', 'lion', 'chicken']
  })

if __name__ == '__main__':
  app.run(debug = True)