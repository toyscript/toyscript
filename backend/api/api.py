from flask_restful import Api
from flask import Blueprint
from resource.place import PlaceFrequency, PlaceScene, PlaceCharacter
from resource.movie import QueryMovie, Summary
from resource.character import CharacterFrequency
from resource.time import TimeScene, TimeCharacter, TimeFrequency

toyScriptApi = Blueprint("api", __name__)
api = Api(toyScriptApi)

api.add_resource(PlaceFrequency, '/place/frequency/<int:movieid>')
api.add_resource(PlaceScene, '/place/scene/<int:movieid>')
api.add_resource(PlaceCharacter, '/place/character/<int:movieid>')
api.add_resource(QueryMovie, '/movie')
api.add_resource(CharacterFrequency, '/character/frequency/<int:movieid>')
api.add_resource(TimeScene, '/time/scene/<int:movieid>')
api.add_resource(TimeCharacter, '/time/character/<int:movieid>')
api.add_resource(TimeFrequency, '/time/frequency/<int:movieid>')
api.add_resource(Summary, '/movie/<int:movieid>')

