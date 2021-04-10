from flask_restful import Resource
from model.models import Time, TimeCharacter as TimeCharacterM, Scene

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

class TimeCharacter(Resource):

    def get(self, movieid):
        #시간대별 등장인물 목록 반환

        time_characters = TimeCharacterM.query.filter(TimeCharacterM.movieid == movieid).group_by(TimeCharacterM.timeid, TimeCharacterM.characterid).all()

        result = []
        timeid = -1
        time = {}

        for character in time_characters:

            if timeid != character.timeid:

                result.append(time)
                timeid = character.timeid
                time = {}
                time['time'] = character.time.name
                time['characters'] = []

            time['characters'].append(character.character.name)

        return result[1:]