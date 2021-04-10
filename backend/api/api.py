from flask_restful import Api
from flask import Blueprint
from resource.place import PlaceFrequency, PlaceScene, PlaceCharacter
from resource.movie import QueryMovie, Summary
from resource.character import CharacterFrequency
from resource.time import TimeScene, TimeCharacter, TimeFrequency

toyScriptApi = Blueprint("api", __name__)
api = Api(toyScriptApi)

api.add_resource(PlaceFrequency, "/<int:movieid>/place/frequency")
api.add_resource(PlaceScene, "/<int:movieid>/place/scene")
api.add_resource(PlaceCharacter, "/<int:movieid>/place/character")
api.add_resource(QueryMovie, "/movie")
api.add_resource(CharacterFrequency, "/<int:movieid>/character/frequency")
api.add_resource(TimeScene, "/<int:movieid>/time/scene")
api.add_resource(TimeCharacter, "/<int:movieid>/time/character")
api.add_resource(TimeFrequency, "/<int:movieid>/time/frequency")
api.add_resource(Summary, "/movie/<int:movieid>")
