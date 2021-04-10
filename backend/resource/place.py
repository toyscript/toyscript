from flask_restful import Resource
from model.models import Place, Scene, PlaceCharacter as PC

class PlaceFrequency(Resource):

    def get(self, movieid):

        places = Place.query.filter(Place.movieid == movieid).order_by(Place.frequency.desc()).all()
        placeFrequency = []

        for place in places:
            frequency = {}
            frequency['placeName'] = place.name
            frequency['frequency'] = place.frequency
            placeFrequency.append(frequency)

        return placeFrequency


class PlaceScene(Resource):

    def get(self, movieid):

        places = Place.query.filter(Place.movieid == movieid).all()
        placeScene = []

        for place in places:

            scene = {}
            scene['placeName'] = place.name
            scenes = Scene.query.filter(Scene.placeid == place.id).all()
            scene['scenes'] = [ s.num for s in scenes]

            placeScene.append(scene)

        return sorted(placeScene, key=lambda x : len(x['scenes']), reverse=True)


class PlaceCharacter(Resource):

    def get(self, movieid):

        place_list = Place.query.filter(Place.movieid == movieid).all()
        place_ids = {}

        for place in place_list:
            place_ids[place.id] = place.name

        place_characters = PC.query.filter(PC.placeid.in_(place_ids.keys())).group_by(PC.placeid, PC.characterid).all()
        place_id = -1
        result = []
        place = {}
        for p in place_characters:

            if place_id != p.placeid:
                place_id = p.placeid
                result.append(place)
                place = {}
                place['placeName'] = place_ids[p.placeid]
                place['characters'] = []

            place['characters'].append(p.character.name)

        return sorted(result[1:], key=lambda x : len(x.get('characters')), reverse=True)
