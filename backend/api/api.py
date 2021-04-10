from flask_restful import Api
from flask import Blueprint
from resource.place import PlaceFrequency, PlaceScene, PlaceCharacter
from resource.query_movie import QueryMovie
from resource.character import CharacterFrequency
from resource.Time import TimeScene

toyScriptApi = Blueprint("api", __name__)
api = Api(toyScriptApi)

api.add_resource(PlaceFrequency, '/place/frequency/<int:movieid>')
api.add_resource(PlaceScene, '/place/scene/<int:movieid>')
api.add_resource(PlaceCharacter, '/place/character/<int:movieid>')
api.add_resource(QueryMovie, '/movie')
api.add_resource(CharacterFrequency, '/character/frequency/<int:movieid>')
api.add_resource(TimeScene, '/time/scene/<int:movieid>')


