from firebase_admin import credentials, initialize_app

cred = credentials.Certificate("key.json")
default_app = initialize_app(cred)
