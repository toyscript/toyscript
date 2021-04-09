from db.init_db import db


class Place(db.Model):

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    movieid = db.Column(db.Integer, db.ForeignKey("movie.id"))
    name = db.Column(db.String(50))
    frequency = db.Column(db.Integer)
    scene = db.Column(db.PickleType)
    array = db.Column(db.JSON)


class Summary(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))


class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
    lines = db.Column(db.Integer)


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(200))

class Scene(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    num = db.Column(db.Integer, unique=True)
    movieid = db.Column(db.Integer, db.ForeignKey("movie.id"))

class Line(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    scenenum = db.Column(db.Integer, db.ForeignKey("scene.num"))
    content = db.Column(db.Text)
    order = db.Column(db.SMALLINT)
