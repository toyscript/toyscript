from init_app.init_app import create_app, db
import sys, os
sys.path.append(os.path.abspath('../da'))
app = create_app()
app.app_context().push()

from db.models import Movie

movie_list = ['Great Gatsby, The',
    'Inception',
    'Avatar',
    'Big Sick, The',
    '2012',
    '30 Minutes or Less',
    'Zootopia',
    'CAST AWAY',
    'FANTASTIC FOUR',
    'Hostage',
    'Mission Impossible',
    'Pirates of the Caribbean',
    'Kung Fu Panda',
    'Terminator Salvation',
    'Cars 2',
    'Up',
    'Shrek the Third']

for movie in movie_list:
    m = Movie.query.filter(Movie.title == movie).first()
    print(m.title, m.id)