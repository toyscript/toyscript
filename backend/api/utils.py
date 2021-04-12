from flask_restful import wraps
from model.models import Movie

class UrlParamterValidationError(Exception):

    def __init__(self, message, status=400):
        self.message = message
        self.status = status


class MovieDoesNotExist(Exception):
    def __init__(self, message="그런 영화 없으셈", status=404):
        self.message = message
        self.status = status

def movie_exist(func):

    @wraps(func)
    def wrapper(movie_id):

        movie = Movie.query.get(movie_id)

        if movie is None:
            raise MovieDoesNotExist(message="그런 영화 없으셈")

        return func(movie_id)

    return wrapper

