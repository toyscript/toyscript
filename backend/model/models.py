from db.init_db import db


class Place(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    movieid = db.Column(db.Integer, db.ForeignKey("movie.id"))
    name = db.Column(db.String(50))
    frequency = db.Column(db.Integer)
    __table_args__ = {'extend_existing': True}


class Character(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    movieid = db.Column(db.Integer, db.ForeignKey("movie.id"))
    name = db.Column(db.String(50))
    lines = db.Column(db.Integer)
    __table_args__ = {'extend_existing': True}


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(200))
    author = db.Column(db.String(100))
    totalCharacters = db.Column(db.Integer)
    totalPages = db.Column(db.Integer)
    totalPlaces = db.Column(db.Integer)
    totalScenes = db.Column(db.Integer)
    __table_args__ = {'extend_existing': True}


class Scene(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    num = db.Column(db.Integer, unique=True)
    movieid = db.Column(db.Integer, db.ForeignKey("movie.id"))
    placeid = db.Column(db.Integer, db.ForeignKey("place.id"))
    place = db.relationship('Place')
    timeid = db.Column(db.Integer, db.ForeignKey("time.id"))
    time = db.relationship('Time')
    __table_args__ = {'extend_existing': True}


class Time(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
    movieid = db.Column(db.Integer, db.ForeignKey("movie.id"))
    frequency = db.Column(db.Integer)
    __table_args__ = {'extend_existing': True}


class TimeCharacter(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    movieid = db.Column(db.Integer, db.ForeignKey("movie.id"))
    timeid = db.Column(db.Integer, db.ForeignKey("time.id"))
    time = db.relationship('Time')
    characterid = db.Column(db.Integer, db.ForeignKey("character.id"))
    character = db.relationship('Character')
    frequency = db.Column(db.Integer)
    __table_args__ = {'extend_existing': True}


class PlaceCharacter(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    placeid = db.Column(db.Integer, db.ForeignKey("place.id"))
    characterid = db.Column(db.Integer, db.ForeignKey("character.id"))
    character = db.relationship('Character')
    frequency = db.Column(db.Integer)
    __table_args__ = {'extend_existing': True}
