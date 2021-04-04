from flask import Flask
from db.init_db import db,migration
from flask_restful import Api
from api.summary import Summary


def create_app():

    app = Flask(__name__)
    app.config.from_pyfile('config.py')

    api = Api(app)
    api.add_resource(Summary, '/test')
    db.init_app(app)
    migration.init_app(app, db)

    return app