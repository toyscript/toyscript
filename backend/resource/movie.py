from flask_restful import Resource, reqparse
from model.models import Movie

parser = reqparse.RequestParser()
parser.add_argument("query", type=str)


class QueryMovie(Resource):
    def get(self):

        args = parser.parse_args()
        title = args["query"]
        search = "%{}%".format(title)
        movies = Movie.query.filter(Movie.title.like(search)).all()

        movie_list = []

        for m in movies:
            movie_list.append(m.title)

        return movie_list

class Summary(Resource):

    def get(self, movieid):

        movie = Movie.query.get(movieid)
        result = {}
        result['title'] = movie.title
        result['author'] = movie.author
        result['totalCharacters'] = movie.totalCharacters
        result['totalPages'] = movie.totalPages
        result['totalScenes'] = movie.totalScenes
        result['totalPlaces'] = movie.totalPlaces

        return result