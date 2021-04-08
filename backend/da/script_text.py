import requests
from bs4 import BeautifulSoup

def get_script_url(title):

    url = 'https://imsdb.com/Movie Scripts/'
    url += title +' Script.html'
    url = url.replace(' ', '%20')
    response = requests.get(url)

    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        movie_list = soup.select('#mainbody > table:nth-child(3) > tr > td > td >table > tr > td > a[href]')

        for m in movie_list:

            if m.get_text().startswith('Read'):
                script_url = 'https://imsdb.com/'+m['href']
                return script_url

    return None


def get_script_txt(script_url, title):

    url = script_url
    response = requests.get(url)

    if response.status_code == 200:
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        text = soup.find('pre')
        text = text.get_text()

        with open('script.txt', 'w', -1, 'utf-8') as f:
            f.write(text)
        with open('script.txt', 'r', -1, 'utf-8') as f:
            scriptLines = [line for line in f.readlines()]

        script_text = ''

        for line in scriptLines:
            stripped_line = line
            if stripped_line != '':
                script_text += stripped_line+'\n'

        with open(title + '.txt', 'w', -1, 'utf-8') as file:
            file.write(script_text)

title = '2012'
script_url = get_script_url(title)
get_script_txt(script_url, title)
