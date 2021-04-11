from flask_restful import Api
from flask import Blueprint
from resource.place import PlaceFrequency, PlaceScene, PlaceCharacter
from resource.movie import QueryMovie, Summary
from resource.character import CharacterFrequency
from resource.time import TimeScene, TimeCharacter, TimeFrequency

toyScriptApi = Blueprint("api", __name__)
api = Api(toyScriptApi)

api.add_resource(PlaceFrequency, "/<int:movie_id>/places/frequencys")
api.add_resource(PlaceScene, "/<int:movie_id>/places/scenes")
api.add_resource(PlaceCharacter, "/<int:movie_id>/places/characters")

api.add_resource(CharacterFrequency, "/<int:movie_id>/characters/frequencys")

api.add_resource(TimeScene, "/<int:movie_id>/times/scenes")
api.add_resource(TimeCharacter, "/<int:movie_id>/times/characters")
api.add_resource(TimeFrequency, "/<int:movie_id>/times/frequencys")

api.add_resource(Summary, "/movies/<int:movie_id>")
api.add_resource(QueryMovie, "/movies")