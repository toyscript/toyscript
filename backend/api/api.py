from flask_restful import Api
from flask import Blueprint
from resource.place import PlaceFrequency

toyScriptApi = Blueprint("api", __name__)
api = Api(toyScriptApi)

api.add_resource(PlaceFrequency, '/place/frequency')




