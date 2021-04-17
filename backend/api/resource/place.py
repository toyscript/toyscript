from flask_restful import Resource
from db.models import Place, Scene, PlaceCharacter as PC


class PlaceFrequency(Resource):
    def get(self, movie_id):

        places = (
            Place.query.filter(Place.movie_id == movie_id)
            .order_by(Place.frequency.desc())
            .all()
        )
        placeFrequency = []

        for place in places:
            frequency = {
                'place' : place.name,
                'frequency' : place.frequency
            }
            placeFrequency.append(frequency)

        return placeFrequency


class PlaceScene(Resource):
    def get(self, movie_id):

        places = Place.query.filter(Place.movie_id == movie_id).all()
        place_scenes = []

        for place in places:
            scenes = Scene.query.filter(Scene.place_id == place.id).all()
            scene = {
                'place' : place.name,
                'scenes' : [s.num for s in scenes]
            }
            place_scenes.append(scene)

        return sorted(place_scenes, key=lambda x: len(x["scenes"]), reverse=True)


class PlaceCharacter(Resource):
    def get(self, movie_id):

        place_list = Place.query.filter(Place.movie_id == movie_id).all()
        place_ids = {}

        for place in place_list:
            place_ids[place.id] = place.name

        place_characters = (
            PC.query.filter(PC.place_id.in_(place_ids.keys()))
            .group_by(PC.place_id, PC.character_id)
            .all()
        )
        place_id = -1
        result = []
        place = {}

        for p in place_characters:

            if place_id != p.place_id:
                place_id = p.place_id

                result.append(place)
                place = {}
                place["place"] = place_ids[p.place_id]
                place["characters"] = []

            frequency = {
                'characterName' : p.character.name,
                'characters' : p.frequency
            }

            place["characters"].append(frequency)

        result.append(place)

        return sorted(result[1:], key=lambda x: len(x.get("characters")), reverse=True)
