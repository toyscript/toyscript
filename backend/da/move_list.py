import requests
from bs4 import BeautifulSoup

from db.models import Movie
from init_app.init_app import db, create_app

app = create_app()
app.app_context().push()

url = "https://imsdb.com/all-scripts.html"

response = requests.get(url)

if response.status_code == 200:
    html = response.text
    soup = BeautifulSoup(html, "html.parser")
    movie_list = soup.select(
        "#mainbody > table:nth-child(3) > tr > td:nth-child(1) > td > p > a"
    )

    for movie in movie_list:
        new_movie = Movie(title=movie.get_text())
        db.session.add(new_movie)

    db.session.commit()
