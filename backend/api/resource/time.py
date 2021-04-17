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
        time_id = -1
        time = {}
        for scene in scenes:

            if scene.time is None:
                continue

            if time_id != scene.time_id:
                result.append(time)
                time_id = scene.time_id
                time = {}
                time["time"] = scene.time.name
                time["scenes"] = []

            time["scenes"].append(scene.num)

        result.append(time)

        return sorted(result[1:], key=lambda x: len(x.get("scenes")), reverse=True)


class TimeCharacter(Resource):
    def get(self, movie_id):

        time_characters = (
            TimeCharacterM.query.filter(TimeCharacterM.movie_id == movie_id)
            .group_by(TimeCharacterM.time_id, TimeCharacterM.character_id)
            .all()
        )
        result = []
        time_id = -1
        time = {}

        for character in time_characters:

            if time_id != character.time_id:
                result.append(time)
                time_id = character.time_id
                time = {}
                time["time"] = character.time.name
                time["characters"] = []

            frequency = {
                "characterName" : character.character.name,
                "frequency" : character.frequency
            }
            time["characters"].append(frequency)

        result.append(time)

        return result[1:]


class TimeFrequency(Resource):
    def get(self, movie_id):

        times = Time.query.filter(Time.movie_id == movie_id).all()
        result = []

        for time in times:

            tmp = {
                'time' : time.name,
                'frequency' : time.frequency
            }
            result.append(tmp)

        return sorted(result, key=lambda x: x.get("frequency"), reverse=True)
