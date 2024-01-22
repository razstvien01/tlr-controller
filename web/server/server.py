
from flask import jsonify
from flask_cors import CORS
from flask_restful import Api, Resource
from api import create_app

app = create_app()
# app = Flask(__name__)
api = Api(app)
CORS(app, origins=["http://localhost:5173"])


@app.route("/api/home", methods=['GET'])
def return_home():
     return jsonify({
    'message': 'Hello World',
    'animal': ['goat', 'lion', 'chicken']
  })

class HelloWorld(Resource):
    def get(self):
        return { "message": "Hello world" }


api.add_resource(HelloWorld, "/")

if __name__ == '__main__':
  app.run(debug = True)