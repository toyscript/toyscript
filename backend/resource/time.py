from flask_restful import Resource
from model.models import Time, TimeCharacter, Scene

class TimeScene(Resource):

    def get(self, movieid):

        scenes = Scene.query.filter(Scene.movieid == movieid).group_by(Scene.timeid, Scene.num).all()
        result = []
        timeid = -1
        time = {}
        for scene in scenes:

            if scene.time is None:
                continue

            if timeid != scene.timeid:
                result.append(time)
                timeid = scene.timeid
                time = {}
                time['time'] = scene.time.name
                time['scenes'] = []

            time['scenes'].append(scene.num)


        return sorted(result[1:], key = lambda x : len(x.get('scenes')), reverse=True)

