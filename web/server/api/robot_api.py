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
