from flask_restful import Resource
from firebase_admin import firestore
import uuid

db = firestore.client()
user_ref = db.collection('user')

class UserResource(Resource):
  def get(self, user_id=None):
    try:
      if user_id:
        #! fetching a single user
        user = user_ref.document(user_id).get()
        if user.exists:
          return { "data": user.to_dict() }, 200
        else:
          return {"error": "User not found"}, 404
      else:
        all_users = [doc.to_dict() for doc in user_ref.stream()]
      
        return { "data": all_users }, 200
    except Exception as e:
      return f"An Error Occured: {e}"