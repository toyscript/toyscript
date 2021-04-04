from flask_restful import Resource
from model.models import Test
from db.init_db import db

class Summary(Resource):

    def get(self):

        test = Test(name = "suram", email="swamys@naver.com")
        db.session.add(test)
        db.session.commit()

        return {'hello': 'world'}
