import requests
from bs4 import BeautifulSoup

import json

print(
    json.dumps(
        (
            (
                "WOODY",
                (
                    ("anticipation", 36),
                    ("fear", 26),
                    ("sadness", 22),
                    ("disgust", 16),
                    ("joy", 12),
                    ("trust", 11),
                    ("anger", 11),
                    ("surprise", 9),
                ),
            ),
            (
                "BUZZ",
                (
                    ("anger", 23),
                    ("fear", 21),
                    ("anticipation", 21),
                    ("sadness", 19),
                    ("trust", 15),
                    ("joy", 11),
                    ("surprise", 8),
                    ("disgust", 7),
                ),
            ),
            (
                "JESSIE",
                (
                    ("anticipation", 27),
                    ("fear", 21),
                    ("trust", 7),
                    ("joy", 7),
                    ("sadness", 3),
                    ("disgust", 3),
                    ("surprise", 3),
                    ("anger", 2),
                ),
            ),
            (
                "LOTSO",
                (
                    ("anticipation", 28),
                    ("trust", 25),
                    ("joy", 23),
                    ("fear", 15),
                    ("sadness", 14),
                    ("anger", 9),
                    ("surprise", 7),
                    ("disgust", 4),
                ),
            ),
            (
                "KEN",
                (
                    ("anticipation", 18),
                    ("trust", 11),
                    ("joy", 11),
                    ("surprise", 8),
                    ("fear", 5),
                    ("anger", 4),
                    ("sadness", 1),
                    ("disgust", 1),
                ),
            ),
        )
    )
)


def get_script_url(title):

    url = "https://imsdb.com/Movie Scripts/"
    url += title + " Script.html"
    url = url.replace(" ", "%20")
    response = requests.get(url)

    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, "html.parser")
        a_list = soup.select(
            "#mainbody > table:nth-child(3) > tr > td > td > table > tr > td > a[href]"
        )

        for a in a_list:
            if a.get_text().startswith("Read"):
                script_url = "https://imsdb.com/" + a["href"]
                return script_url

    return None


def get_script_txt(script_url, title):

    url = script_url
    response = requests.get(url)

    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, "html.parser")
        text = soup.find("pre")
        text = text.get_text()

        with open("script.txt", "w", -1, "utf-8") as f:
            f.write(text)
        with open("script.txt", "r", -1, "utf-8") as f:
            scriptLines = [line for line in f.readlines()]

        script_text = ""

        for line in scriptLines:
            stripped_line = line
            if stripped_line != "":
                script_text += stripped_line + "\n"

        with open(title + ".txt", "w", -1, "utf-8") as file:
            file.write(script_text)


def get_authors(title):
    url = "https://imsdb.com/Movie Scripts/"
    url += title + " Script.html"
    url = url.replace(" ", "%20")
    response = requests.get(url)

    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, "html.parser")
        td_elements = soup.select(
            "#mainbody > table:nth-child(3) > tr > td > table"
            # "#mainbody > table:nth-child(2) > tbody > tr > td:nth-child(3) > table.script-details > tbody > tr:nth-child(2) > td:nth-child(2)"
            # "#mainbody > table:nth-child(2) "
        )
        print(td_elements)
        for a in td_elements:
            if a.get_text().startswith("Read"):
                script_url = "https://imsdb.com/" + a["href"]
                return script_url

    return None


# title = "Big Sick, The"
# script_url = get_script_url(title)
# get_script_txt(script_url, title)
# authors = get_authors(title)
# print(authors)
