from flask_restful import Resource
from db.init_db import db


class Summary(Resource):
    def get(self):

        return {"hello": "world"}
