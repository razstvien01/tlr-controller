from flask import jsonify
from flask_restful import Resource, reqparse
from firebase_admin import firestore
import uuid

db = firestore.client()
user_ref = db.collection('users')

class UserResource(Resource):
  def get(self, user_id=None):
    try:
      if user_id:
        #! fetching a single user
        user = user_ref.document(user_id).get()
        if user.exists:
          return { "data": user.to_dict(), "doc_id": user.id }, 200
        else:
          return {"error": "User not found"}, 404
      else:
        all_users = [{"doc_id": doc.id, **doc.to_dict()} for doc in user_ref.stream()]
        return {"data": all_users}, 200
    except Exception as e:
      return f"An Error Occured: {e}"
    
  def post(self):
    try:
      parser = reqparse.RequestParser()
      parser.add_argument('name', type=str, required=True, help='Name cannot be blank')
      parser.add_argument('age', type=int, required=True, help='Age cannot be blank')
      parser.add_argument('address', type=str, required=True, help='Address cannot be blank')
      parser.add_argument('email', type=str, required=True, help='Email cannot be blank')
      
      args = parser.parse_args()
      
      # ! Check if the email already exist
      existing_user = user_ref.where('email', '==', args['email']).stream()
      
      if any(existing_user):
        return jsonify({"error": "User with this email already exists"}).get_json(), 400
      
      new_user_data = {
        'name': args['name'],
        'age': args['age'],
        'address': args['address'],
        'email': args['email']
      }
      
      user_ref.add(new_user_data)
      
      return jsonify(Success=True)
      
    except Exception as e:
      return f"An Error Occured: {e}"