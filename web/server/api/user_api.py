from flask import Blueprint, request,  jsonify
from firebase_admin import firestore
import uuid

db = firestore.client()
user_ref = db.collection('user')

user_api = Blueprint('user_api', __name__)

@user_api.route('/add', methods=['POST'])
def create():
  try:
    id = uuid.uuid4()
    
    user_ref.document(id.hex).set(request.json)
    
    return jsonify({"success" : True}), 200
  except Exception as e:
    return f"An error Occured: {e}"