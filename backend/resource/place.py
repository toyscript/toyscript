from flask_restful import Resource
from model.models import Place

class PlaceFrequency(Resource):

    def get(self):

        places = Place.query.order_by(Place.frequency.desc()).all()
        placeFrequency = []

        for place in places:
            frequency = {}
            frequency['placeName'] = place.name
            frequency['frequency'] = place.frequency
            placeFrequency.append(frequency)

        return placeFrequency


class PlaceScene(Resource):

    def get(self):

        places = Place.query.all()
        placeScene = []

        for place in places:

            scene = {}
            scene['placeName'] = place.name
            scene['scenes'] = place.scene
            placeScene.append(scene)

        return sorted(placeScene, key=lambda x : len(x['scenes']), reverse=True)