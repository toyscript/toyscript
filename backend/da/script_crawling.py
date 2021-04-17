import requests
from typing import Tuple
from bs4 import BeautifulSoup


def get_script_url(title: str) -> str:
    """
    IMSDb 사이트(https://imsdb.com/)에서 원하는 제목의 영화 대본 url을 구합니다.
    :params title:
    :return script_url:
    """

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

    # TODO 에러 핸들링
    return []


def convert_script_to_lines(script_url: str) -> Tuple[str]:
    """
    영화 대본 url에서 대본을 읽고 이를 줄 목록으로 변환합니다.
    :params script_url:
    :return lines:
    """

    url = script_url
    response = requests.get(url)

    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, "html.parser")
        text = soup.find("pre")
        text = text.get_text()

        lines = text.split("\n")
        lines = [line.replace("\r", "") for line in lines]
        return tuple(lines)
