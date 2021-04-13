from flask_restful import Resource
from model.models import Character, Relation


class CharacterFrequency(Resource):

    def get(self, movie_id):

        characterFrequency = []
        characters = Character.query.filter(Character.movie_id==movie_id).all()

        for character in characters:
            object = {}
            object["character"] = character.name
            object["frequency"] = character.lines
            characterFrequency.append(object)

        return sorted(characterFrequency, key=lambda x: x["frequency"], reverse=True)

class CharacterRelaction(Resource):

    def get(self, movie_id):

        relations = Relation.query.filter(Relation.movie_id==movie_id).all()
        result = []
        for r in relations:

            tmp = {
                "source" : r.character_one.name,
                "target" : r.character_two.name,
                "value" : r.value
            }

            result.append(tmp)
        return result