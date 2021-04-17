from init_app.env import db_url

SQLALCHEMY_DATABASE_URI = db_url
SQLALCHEMY_TRACK_MODIFICATIONS = False
SECRET_KEY = "ThisisToyScript"
PROPAGATE_EXCEPTIONS = True
