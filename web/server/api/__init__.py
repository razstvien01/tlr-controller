
from flask import Flask
from flask_restful import Api
from firebase_admin import credentials, initialize_app

cred = credentials.Certificate("key.json")
default_app = initialize_app(cred)

def create_app():
  app = Flask(__name__)
  api = Api(app)
  app.config['SECRET_KEY'] = 'qwerty12345'
  
  from .control_session import control_api
  from .user_api import UserResource
  from .robot_api import RobotResource
  
  # ! CONTROLLER API
  app.register_blueprint(control_api, url_prefix='/controller')
  
  # ! REST APIs
  api.add_resource(UserResource, "/users", "/users/<string:user_id>")
  api.add_resource(RobotResource, "/robots", "/robots/<string:robot_id>")

  return app