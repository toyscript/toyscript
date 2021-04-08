from flask import Flask
from db.init_db import db,migration
from flask_restful import Api
from api import test, query_movie


def create_app():

    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    api = Api(app)
    api.add_resource(test.Test, '/test')
    api.add_resource(query_movie.QueryMovie, '/api')

    db.init_app(app)
    migration.init_app(app, db)

    return app