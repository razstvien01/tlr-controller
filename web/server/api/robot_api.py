from flask import jsonify
from flask_restful import Resource, reqparse
from firebase_admin import firestore

db = firestore.client()
robot_ref = db.collection('robots')

def robot_post_args():
  parser = reqparse.RequestParser()
  
  parser.add_argument('name', type=str, required=True, help='Name cannot be blank')
  parser.add_argument('robot_id', type=str, required=True, help='Robot id cannot be blank')
  parser.add_argument('location', type=str, required=True, help='Location cannot be blank')
  parser.add_argument('status', type=str, required=True, help='Status cannot be blank')
  
  return parser.parse_args()

def robot_update_args():
  parser = reqparse.RequestParser()
  
  parser.add_argument('name', type=str)
  parser.add_argument('robot_id', type=str)
  parser.add_argument('location', type=str)
  parser.add_argument('status', type=str)
  
  return parser.parse_args()

class RobotResource(Resource):
  def get(self, robot_id=None):
    try:
      if robot_id:
        #* fetching a single by robot_id field
        robot_query = robot_ref.where("robot_id", "==", robot_id).limit(1).get()
        
        if len(robot_query) > 0:
          robot = robot_query[0]
          
          return jsonify({"data": robot.to_dict(), "doc_id": robot.id}).get_json(), 200
        else:
          return {"error", "Robot not found"}, 404
      else:
        all_robots = [{"doc_id": doc.id, **doc.to_dict()} for doc in robot_ref.stream()]
        
        return jsonify(all_robots)
    except Exception as e:
      return f"An Error Occured: {e}"
    
  def post(self):
    try:
      args = robot_post_args()
      
      new_robot_data = {
        'name': args['name'],
        'robot_id': args['robot_id'],
        'location': args['location'],
        'status': args['status']
      }
      
      robot_ref.add(new_robot_data)
      
      return jsonify(Success=True).get_json(), 200
      
    except Exception as e:
      return f"An Error Occured: {e}"
    
  def patch(self, robot_id):
    try:
      args = robot_update_args()
      
      robot_query = robot_ref.where("robot_id", "==", robot_id).limit(1).get()
      
      if not len(robot_query) > 0:
        return jsonify({"error": "Robot not found"}), 404
      
      # # * Update only the fields provided in the request
      updated_data = {}
      for field, value in args.items():
        if value is not None:
          updated_data[field] = value
          
      # # * Update the robot data
      robot_ref.document(robot_query[0].id).update(updated_data)
      
      return jsonify(Success=True)
    except Exception as e:
      return f"An Errror Occured: {e}"
    
  
  def delete(self, robot_id):
    try:
      return jsonify(Success=True)
    except Exception as e:
      return f"An Errror Occured: {e}"