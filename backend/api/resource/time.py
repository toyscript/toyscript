from flask_restful import Resource
from db.models import Time, TimeCharacter as TimeCharacterM, Scene


class TimeScene(Resource):
    def get(self, movie_id):

        scenes = (
            Scene.query.filter(Scene.movie_id == movie_id)
            .group_by(Scene.time_id, Scene.num)
            .all()
        )
        result = []
        timeid = -1
        time = {}
        for scene in scenes:

            if scene.time is None:
                continue

            if timeid != scene.time_id:
                result.append(time)
                timeid = scene.time_id
                time = {}
                time["time"] = scene.time.name
                time["scenes"] = []

            time["scenes"].append(scene.num)

        return sorted(result[1:], key=lambda x: len(x.get("scenes")), reverse=True)


class TimeCharacter(Resource):
    def get(self, movie_id):
        # 시간대별 등장인물 목록 반환

        time_characters = (
            TimeCharacterM.query.filter(TimeCharacterM.movie_id == movie_id)
            .group_by(TimeCharacterM.time_id, TimeCharacterM.character_id)
            .all()
        )

        result = []
        timeid = -1
        time = {}

        for character in time_characters:

            if timeid != character.time_id:

                result.append(time)
                timeid = character.time_id
                time = {}
                time["time"] = character.time.name
                time["characters"] = []

            frequency = {}
            frequency["characterName"] = character.character.name
            frequency["frequency"] = character.frequency
            time["characters"].append(frequency)

        return result[1:]


class TimeFrequency(Resource):
    def get(self, movie_id):

        times = Time.query.filter(Time.movie_id == movie_id).all()
        result = []

        for time in times:

            time_frequency = {}
            time_frequency["time"] = time.name
            time_frequency["frequency"] = time.frequency
            result.append(time_frequency)

        return sorted(result, key=lambda x: x.get("frequency"), reverse=True)
