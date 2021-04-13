from db.init_db import db


class Place(db.Model):
    __table_args__ = {"extend_existing": True}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    movie_id = db.Column(db.Integer, db.ForeignKey("movie.id"))
    name = db.Column(db.String(50))
    frequency = db.Column(db.Integer)


class Character(db.Model):
    __table_args__ = {"extend_existing": True}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    movie_id = db.Column(db.Integer, db.ForeignKey("movie.id"))
    name = db.Column(db.String(50))
    lines = db.Column(db.Integer)


class Movie(db.Model):
    __table_args__ = {"extend_existing": True}

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(200))
    author = db.Column(db.String(100))
    total_characters = db.Column(db.Integer)
    total_pages = db.Column(db.Integer)
    total_places = db.Column(db.Integer)
    total_scenes = db.Column(db.Integer)


class Scene(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    num = db.Column(db.Integer, unique=True)
    movie_id = db.Column(db.Integer, db.ForeignKey("movie.id"))
    place_id = db.Column(db.Integer, db.ForeignKey("place.id"))
    place = db.relationship("Place")
    time_id = db.Column(db.Integer, db.ForeignKey("time.id"))
    time = db.relationship("Time")
    __table_args__ = {"extend_existing": True}


class Time(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
    movie_id = db.Column(db.Integer, db.ForeignKey("movie.id"))
    frequency = db.Column(db.Integer)
    __table_args__ = {"extend_existing": True}


class TimeCharacter(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    movie_id = db.Column(db.Integer, db.ForeignKey("movie.id"))
    time_id = db.Column(db.Integer, db.ForeignKey("time.id"))
    time = db.relationship("Time")
    character_id = db.Column(db.Integer, db.ForeignKey("character.id"))
    character = db.relationship("Character")
    frequency = db.Column(db.Integer)
    __table_args__ = {"extend_existing": True}


class PlaceCharacter(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    place_id = db.Column(db.Integer, db.ForeignKey("place.id"))
    character_id = db.Column(db.Integer, db.ForeignKey("character.id"))
    character = db.relationship("Character")
    frequency = db.Column(db.Integer)
    __table_args__ = {"extend_existing": True}
