from flask_restful import Resource
from model.models import Character


class CharacterFrequency(Resource):
    def get(self, movieid):

        characterFrequency = []
        characters = Character.query.all()

        for character in characters:
            object = {}
            object["characterName"] = character.name
            object["frequency"] = character.lines
            characterFrequency.append(object)

        return sorted(characterFrequency, key=lambda x: x["frequency"], reverse=True)
