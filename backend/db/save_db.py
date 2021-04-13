from model.models import Character, Relation
from init_app.init_app import create_app, db

app = create_app()

with app.app_context():

    all_character = Character.query.all()
    character_ids = {}
    for ch in all_character:
        character_ids[ch.name]=ch.id
