from init_app.init_app import db

class Test(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(20))
    email = db.Column(db.String(20))
