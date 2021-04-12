from flask_restful import Resource
from model.models import Character
from api.utils import movie_exist


class CharacterFrequency(Resource):
    method_decorators = [movie_exist]

    def get(self, movie_id):

        characterFrequency = []
        characters = Character.query.filter(Character.movie_id==movie_id).all()

        for character in characters:
            object = {}
            object["character"] = character.name
            object["frequency"] = character.lines
            characterFrequency.append(object)

        return sorted(characterFrequency, key=lambda x: x["frequency"], reverse=True)
