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

            movie = {}
            movie['title'] = m.title
            movie['movieId'] = m.id
            movie_list.append(movie)

        return movie_list


class Summary(Resource):
    def get(self, movie_id):

        movie = Movie.query.get(movie_id)
        result = {}
        result["title"] = movie.title
        result["author"] = movie.author
        result["totalCharacters"] = movie.total_characters
        result["totalPages"] = movie.total_pages
        result["totalScenes"] = movie.total_scenes
        result["totalPlaces"] = movie.total_places

        return result
