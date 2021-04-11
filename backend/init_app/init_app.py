from flask import Flask
from db.init_db import db, migration
from api.api import toyScriptApi


def create_app():

    app = Flask(__name__)
    app.config.from_pyfile("config.py")

    db.init_app(app)
    migration.init_app(app, db)

    app.register_blueprint(toyScriptApi, url_prefix="/api")

    return app
