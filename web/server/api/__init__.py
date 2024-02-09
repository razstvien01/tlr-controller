from firebase_admin import credentials, initialize_app
import os

key_path = os.environ.get("FIREBASE_KEY_PATH", "key.json")
cred = credentials.Certificate(key_path)
default_app = initialize_app(cred)
