from flask_restful import Resource
import json

class Test(Resource):

    def get(self):

        message = {}
        message['title'] = "여러분 안녕하세요"
        message['message'] = "모두 화요일에 봅시다"
        message['from'] = "수람"


        return message
