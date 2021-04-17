from flask_restful import Resource, reqparse, wraps
from werkzeug.exceptions import BadRequest
from db.models import Movie
from api.errors import MovieDoesNotExist

parser = reqparse.RequestParser()
parser.add_argument("query", type=str)

def validation(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        args = parser.parse_args()
        title = args["query"]
        if title is None:
            raise BadRequest("파라미터를 다시 확인해주세요")
        args[title]=args.pop('query')
        return func(*args, **kwargs)

    return wrapper


class QueryMovie(Resource):
    method_decorators = [validation]
    def get(self, title):

        search = "%{}%".format(title)
        movies = Movie.query.filter(Movie.title.like(search)).all()

        if len(movies) == 0:
            raise MovieDoesNotExist

        movie_list = []

        for m in movies:
            movie = {
                'title' : m.title,
                'movieId' : m.id
            }
            movie_list.append(movie)

        return movie_list


class Summary(Resource):
    def get(self, movie_id):

        movie = Movie.query.get(movie_id)
        summary = {
            'title' : movie.title,
            'author' : movie.author,
            'totalCharacters' : movie.total_characters,
            'totalPlaces' : movie.total_places,
            'totalScenes' : movie.total_scenes
        }
        return summary
