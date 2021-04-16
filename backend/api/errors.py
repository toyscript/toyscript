class MovieDoesNotExist(Exception):
    def __init__(self, message="그런 영화 없으셈", status=404):
        self.message = message
        self.status = status
