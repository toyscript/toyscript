from flask_restful import Api
from flask import Blueprint
from resource.place import PlaceFrequency, PlaceScene
from resource.query_movie import QueryMovie
from resource.character import CharacterFrequency

toyScriptApi = Blueprint("api", __name__)
api = Api(toyScriptApi)

api.add_resource(PlaceFrequency, '/place/frequency')
api.add_resource(PlaceScene, '/place/scene')
api.add_resource(QueryMovie, '/movie')
api.add_resource(CharacterFrequency, '/character/frequency')




