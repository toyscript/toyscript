class MovieDoesNotExist(Exception):
    def __init__(self, message="해당 영화를 찾을 수 없습니다.", status=404):
        self.message = message
        self.status = status

