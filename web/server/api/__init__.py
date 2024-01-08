from flask import Flask
from firebase_admin import credentials, initialize_app

cred = credentials.Certificate("key.json")
default_app = initialize_app(cred)

def create_app():
  app = Flask(__name__)
  
  app.config['SECRET_KEY'] = 'qwerty12345'
  
  from .user import user
  
  app.register_blueprint(user, url_prefix='/user')