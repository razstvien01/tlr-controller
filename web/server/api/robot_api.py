from flask import jsonify
from flask_restful import Resource, reqparse
from firebase_admin import firestore

db = firestore.client()
robot_ref = db.collection('robots')
