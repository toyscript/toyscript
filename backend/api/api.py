from flask_restful import Api
from flask import Blueprint, jsonify, request

from api.resource.place import PlaceFrequency, PlaceScene, PlaceCharacter
from api.resource.movie import QueryMovie, Summary
from api.resource.character import CharacterFrequency, CharacterRelaction
from api.resource.time import TimeScene, TimeCharacter, TimeFrequency
from api.errors import *

toyScriptApi = Blueprint("api", __name__)
api = Api(toyScriptApi)

api.add_resource(PlaceFrequency, "/<int:movie_id>/places/frequencys")
api.add_resource(PlaceScene, "/<int:movie_id>/places/scenes")
api.add_resource(PlaceCharacter, "/<int:movie_id>/places/characters")

api.add_resource(CharacterFrequency, "/<int:movie_id>/characters/frequencys")
api.add_resource(CharacterRelaction, "/<int:movie_id>/characters/relations")

api.add_resource(TimeScene, "/<int:movie_id>/times/scenes")
api.add_resource(TimeCharacter, "/<int:movie_id>/times/characters")
api.add_resource(TimeFrequency, "/<int:movie_id>/times/frequencys")

api.add_resource(Summary, "/movies/<int:movie_id>")
api.add_resource(QueryMovie, "/movies")


def not_found_error(error):

    payload = dict()
    payload['message'] = "해당 url은 지원하지 않음."

    return jsonify(payload), 400


@toyScriptApi.errorhandler(MovieDoesNotExist)
def movie_error_handling(error):

    payload = dict()
    body = dict()
    body['status'] = error.status
    body['message'] = error.message
    payload['error'] = body

    return jsonify(payload), 404


@toyScriptApi.before_request
def is_movie_exist():

    movie_id = request.view_args.get('movie_id')

    if movie_id is not None :

        from db.models import Movie
        movie = Movie.query.get(movie_id)

        if movie is None:
            raise MovieDoesNotExist
