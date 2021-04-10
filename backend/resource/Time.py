from flask_restful import Resource
from model.models import Time, TimeCharacter, Scene

class TimeScene(Resource):
# 시간대별 장면들

    def get(self, movieid):

        timeScenes = []
        times = {}
        scenes = Scene.query.filter(Scene.movieid == movieid).all()

        return None

