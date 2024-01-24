from flask import jsonify
from flask_restful import Resource, reqparse
from firebase_admin import firestore

db = firestore.client()
user_ref = db.collection('users')

def parse_user_args():
  parser = reqparse.RequestParser()
  
  parser.add_argument('name', type=str, required=True, help='Name cannot be blank')
  parser.add_argument('age', type=int, required=True, help='Age cannot be blank')
  parser.add_argument('address', type=str, required=True, help='Address cannot be blank')
  parser.add_argument('email', type=str, required=True, help='Email cannot be blank')
  
  return parser.parse_args()

def user_update_args():
    parser = reqparse.RequestParser()
    
    parser.add_argument('name', type=str)
    parser.add_argument('age', type=int)
    parser.add_argument('address', type=str)
    parser.add_argument('email', type=str)
    
    return parser.parse_args()

class UserResource(Resource):
  def get(self, user_id=None):
    try:
      if user_id:
        #! fetching a single user
        user = user_ref.document(user_id).get()
        if user.exists:
          return jsonify({ "data": user.to_dict(), "doc_id": user.id })
        else:
          return {"error": "User not found"}, 404
      else:
        all_users = [{"doc_id": doc.id, **doc.to_dict()} for doc in user_ref.stream()]
        return jsonify(all_users)
    except Exception as e:
      return f"An Error Occured: {e}"
    
  def post(self):
    try:
      args = parse_user_args()
      
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
      
      return jsonify(Success=True).get_json(), 200
      
    except Exception as e:
      return f"An Error Occured: {e}"
    
  def put(self, user_id):
    try:
      args = parse_user_args()
      
      user = user_ref.document(user_id).get()
      
      if not user.exists:
        return jsonify({"error", "User not found"}).get_json(), 404
      
      #* Updare all the data of the existing user
      user_ref.document(user_id).update({
        'name': args['name'],
        'age': args['age'],
        'address': args['address'],
        'email': args['email'],
      })
      
      return jsonify(Success=True).get_json(), 200
      
    except Exception as e:
      return f"An Error Occured: {e}"
    
  def patch(self, user_id):
    try:
      args = user_update_args()
      
      # * CHeck if the user exist
      user = user_ref.document(user_id).get()
      
      if not user.exists:
        return jsonify({"error": "User not found"}), 404
      
      # * Update only the fields provided in the request
      updated_data = {}
      for field, value in args.items():
        if value is not None:
          updated_data[field] = value
      
      # * Update the user data
      user_ref.document(user_id).update(updated_data)
      
      return jsonify(Success=True)
    except Exception as e:
      return f"An Error Occured: {e}"