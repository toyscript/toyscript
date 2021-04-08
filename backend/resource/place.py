from flask_restful import Resource
from model.models import Place

class PlaceFrequency(Resource):

    def get(self):

        places = Place.query.order_by(Place.frequency.desc()).all()
        placeFrequency = []

        for place in places:
            frequency = {}
            frequency[place.name] = place.frequency
            placeFrequency.append(frequency)

        return placeFrequency