# 토이스토리 3 대본 분석

## 대본 데이터 크롤링

- imsdb 사이트의 영화명을 기준으로 크롤링합니다.

### imsdb 사이트의 movie list 읽어오기

###### toyscript/backend/da/script_text.py

```python
import requests
from bs4 import BeautifulSoup

from db.models import Movie
from init_app.init_app import db, create_app

app = create_app()
app.app_context().push()

url = 'https://imsdb.com/all-scripts.html'

response = requests.get(url)

if response.status_code == 200:
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    movie_list = soup.select('#mainbody > table:nth-child(3) > tr > td:nth-child(1) > td > p > a')

    for movie in movie_list:
        new_movie = Movie(title=movie.get_text())
        db.session.add(new_movie)

    db.session.commit()
```

### 대본 링크를 크롤링해서 txt파일로 정하기

###### toyscript/backend/da/script_text.py


```python
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

title = 'dark knight'
script_url = get_script_url(title)
get_script_txt(script_url, title)

```

## 텍스트 파일을 읽어 대본 한 줄씩 리스트에 저장하기

앞서 사용자의 입력을 받아 대본 데이터를 가져오기 위해서는 Beatufulsoup4를 이용해 ismdb 사이트에서 대본을 크롤링해서 처리하는 과정이 
있다. (추후 추가 예정)

각 줄을 읽으면서
1. 장소 추출
2. 등장인물 추출
```(변경예정)
1. 화자 / 대사
2. 실내 / 실외
3. 장소 별 대사 개수
4. 장소 별 등장인물의 종류
4. 씬 별 장소의 개수
```
등으로 데이터를 뽑아보고자 한다.

###### toyscript/backend/da/scriptLinesFromTxt.py


```python
filename = 'toystory3.txt' 


# 스크립트 한 줄씩 scriptLines에 담기
scriptLines = []
with open(filename, 'r', -1, 'utf-8') as f:
    scriptLines = [line.strip() for line in f.readlines()]
```


```python
# 스크립트 한 줄씩 출력
# print(scriptLines)
print(scriptLines[:10])
```

    ['TOY STORY 3', 'Story by', 'John Lasseter', 'Andrew Stanton', 'Lee Unkrich', 'Screenplay by', 'Michael Arndt', 'Blue sky, fluffy clouds.', 'The TOY STORY logo. A branding iron sears a “3” into it.', 'IMAGE bursts into FLAMES...']
    


```python
# 총 라인 수 출력
print(len(scriptLines))
```

    4785
    

## 대본 분석 (1) : 장소(Places)를 활용한 분석


```python
from collections import Counter
# 로컬 개발환경에서 사용
# from scriptLinesFromTxt import scriptLines 


locations = ['EXT.', 'INT.']

# 장소 목록 추출
places = []
for i in range(len(scriptLines)):
    # 'EXT.' 또는 'INT.' 로 시작하는 라인일 때
    if scriptLines[i].startswith(locations[0]) or scriptLines[i].startswith(locations[1]):
        place = ''
        splitted = scriptLines[i].split()
        for j in range(1, len(splitted)):
            word = splitted[j]

            # 'EXT.' 또는 'INT.'인 경우 장소 이름이 아니므로 continue
            if word in locations:
                continue

            # '/ EXT.' 또는 '/ INT.'인 경우 장소 이름이 아니므로 continue
            if word == '/' and splitted[j+1] in locations:
                continue

            # '-' 또는 'A'인 경우 장소 이름이 끝나므로 break
            if word in ['-', 'A']:
                break

            place += word + ' '
        place = place.rstrip().replace('S ’ ', 'S’ ').replace(' ’ ', '’').replace(" '", "’")
        places.append(place)
```

### 대본 내 장소 목록


```python
print('\n'.join(places))
```

    OLD WEST
    TRAIN
    DESERT PLAINS
    SPACESHIP
    ANDY’S ROOM
    ANDY’S KITCHEN
    ANDY’S ROOM
    ANDY’S ROOM
    FRONT YARD
    ANDY’S ROOM
    ANDY’S ROOM
    ANDY’S FRONT YARD
    ANDY’S ROOM
    TOY CHEST, ANDY’S ROOM
    ANDY’S ROOM
    ANDY’S HOUSE
    GARAGE
    ANDY’S YARD
    CAR / GARAGE
    DONATION BOX / CAR
    DAY CARE, PARKING LOT
    DONATION BOX / PARKING LOT
    LOBBY
    DONATION BOX / HALLWAY
    DONATION BOX / BUTTERFLY CLASSROOM
    BATHROOM
    CATERPILLAR ROOM
    HALLWAY
    BATHROOM
    PLAYGROUND
    CATERPILLAR ROOM
    BONNIE'S BEDROOM
    BONNIE’S BEDROOM
    TOY BOX
    BONNIE’S BEDROOM
    CATERPILLAR CLASSROOM
    CATERPILLAR CLASSROOM
    HALLWAY
    TEACHERS’ LOUNGE
    VENDING MACHINE
    BONNIE’S BEDROOM
    STORAGE CLOSET
    CATERPILLAR ROOM
    HALLWAY
    CATERPILLAR ROOM
    ANDY’S ROOM
    CATERPILLAR ROOM
    PLAYGROUND
    CATERPILLAR ROOM
    KITCHEN
    DAISY’S LIVING ROOM
    DAISY’S HOUSE
    STATION WAGON
    REST STOP
    DAISY’S HOUSE
    TRUCK BUMPER
    SUNNYSIDE DAY CARE, FRONT ENTRANCE
    KITCHEN
    CATERPILLAR ROOM
    BUTTERFLY ROOM
    CEILING CRAWL SPACE, BUTTERFLY ROOM
    CEILING CRAWL SPACE, CATERPILLAR ROOM
    CATERPILLAR ROOM
    OFFICE
    CATERPILLAR ROOM
    OFFICE
    CATERPILLAR ROOM
    HALLWAY
    OFFICE
    HALLWAY
    PLAYGROUND
    OFFICE
    PLAYGROUND
    CATERPILLAR ROOM
    CATERPILLAR ROOM
    CATERPILLAR ROOM
    CEILING CRAWL SPACE, CATERPILLAR ROOM
    CATERPILLAR ROOM
    FRONT OFFICE
    CATERPILLAR CLASSROOM
    CEILING CRAWL SPACE
    CATERPILLAR CLASSROOM
    SANDBOX
    PLAYGROUND
    FRONT OFFICE
    KEN’S DREAM HOUSE, BUTTERFLY ROOM
    OFFICE
    CATERPILLAR ROOM
    PLAYGROUND
    KEN’S DREAM HOUSE, BUTTERFLY ROOM
    HALLWAY
    OFFICE
    CATERPILLAR ROOM
    PLAYGROUND
    CATERPILLAR ROOM
    PLAYGROUND
    KEN’S DREAM HOUSE, BUTTERFLY ROOM
    UTILITY CLOSET
    CLASSROOM CEILING CRAWL SPACE
    PLAYGROUND
    CLASSROOM CEILING CRAWL SPACE
    PLAYGROUND
    CATERPILLAR ROOM
    PLAYGROUND
    TRASH CHUTE
    GARBAGE CHUTE
    GARBAGE TRUCK
    STREETS
    GARBAGE TRUCK
    TRI-COUNTY DUMP
    GARBAGE TRUCK
    DUMP
    GARBAGE TRUCK
    DUMP
    GARBAGE TRUCK
    GARBAGE PIT
    CONVEYER BELT
    CONVEYER BELT
    DUMP / STAIRWAY TO HEAVEN
    INCINERATOR HOPPER
    CRANE OPERATOR’S BOOTH
    DUMP
    GARBAGE DUMP, ELSEWHERE
    GARBAGE DUMP
    DRIVEWAY
    BACK YARD
    GARAGE ROOF
    ANDY’S ROOM
    CAR
    HOUSE
    BONNIE’S HOUSE
    BONNIE’S HOUSE
    

### 장소 별 빈도수 출력(placesToCount)


```python
# 장소별 빈도 수
placesToCount = Counter(places).most_common()

# 장소별 빈도 수 출력
print(placesToCount)
```

    [('CATERPILLAR ROOM', 18), ('PLAYGROUND', 11), ('ANDY’S ROOM', 9), ('HALLWAY', 6), ('OFFICE', 6), ('GARBAGE TRUCK', 5), ('CATERPILLAR CLASSROOM', 4), ('BONNIE’S BEDROOM', 3), ('KEN’S DREAM HOUSE, BUTTERFLY ROOM', 3), ('DUMP', 3), ('BATHROOM', 2), ('KITCHEN', 2), ('DAISY’S HOUSE', 2), ('CEILING CRAWL SPACE, CATERPILLAR ROOM', 2), ('FRONT OFFICE', 2), ('CLASSROOM CEILING CRAWL SPACE', 2), ('CONVEYER BELT', 2), ('BONNIE’S HOUSE', 2), ('OLD WEST', 1), ('TRAIN', 1), ('DESERT PLAINS', 1), ('SPACESHIP', 1), ('ANDY’S KITCHEN', 1), ('FRONT YARD', 1), ('ANDY’S FRONT YARD', 1), ('TOY CHEST, ANDY’S ROOM', 1), ('ANDY’S HOUSE', 1), ('GARAGE', 1), ('ANDY’S YARD', 1), ('CAR / GARAGE', 1), ('DONATION BOX / CAR', 1), ('DAY CARE, PARKING LOT', 1), ('DONATION BOX / PARKING LOT', 1), ('LOBBY', 1), ('DONATION BOX / HALLWAY', 1), ('DONATION BOX / BUTTERFLY CLASSROOM', 1), ("BONNIE'S BEDROOM", 1), ('TOY BOX', 1), ('TEACHERS’ LOUNGE', 1), ('VENDING MACHINE', 1), ('STORAGE CLOSET', 1), ('DAISY’S LIVING ROOM', 1), ('STATION WAGON', 1), ('REST STOP', 1), ('TRUCK BUMPER', 1), ('SUNNYSIDE DAY CARE, FRONT ENTRANCE', 1), ('BUTTERFLY ROOM', 1), ('CEILING CRAWL SPACE, BUTTERFLY ROOM', 1), ('CEILING CRAWL SPACE', 1), ('SANDBOX', 1), ('UTILITY CLOSET', 1), ('TRASH CHUTE', 1), ('GARBAGE CHUTE', 1), ('STREETS', 1), ('TRI-COUNTY DUMP', 1), ('GARBAGE PIT', 1), ('DUMP / STAIRWAY TO HEAVEN', 1), ('INCINERATOR HOPPER', 1), ('CRANE OPERATOR’S BOOTH', 1), ('GARBAGE DUMP, ELSEWHERE', 1), ('GARBAGE DUMP', 1), ('DRIVEWAY', 1), ('BACK YARD', 1), ('GARAGE ROOF', 1), ('CAR', 1), ('HOUSE', 1)]
    

### 장소 별 촬영빈도 시각화

1. Counter 객체로 구한 장소 별 빈도를 DataFrame으로 변환(그래프 그릴 때 정렬하기 위해서입니다.)
2. DataFrame의 Column을 이용하여 x와 y축을 설정하고 seaborn barplot으로 표현


```python
import pandas as pd

place_df = pd.DataFrame(list(placesToCount), columns=["places", "freq"])
print(place_df)
```

                  places  freq
    0   CATERPILLAR ROOM    18
    1         PLAYGROUND    11
    2        ANDY’S ROOM     9
    3            HALLWAY     6
    4             OFFICE     6
    ..               ...   ...
    61          DRIVEWAY     1
    62         BACK YARD     1
    63       GARAGE ROOF     1
    64               CAR     1
    65             HOUSE     1
    
    [66 rows x 2 columns]
    


```python
#### 장소 빈도 상위 5개
place_df[:5]
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>places</th>
      <th>freq</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>CATERPILLAR ROOM</td>
      <td>18</td>
    </tr>
    <tr>
      <th>1</th>
      <td>PLAYGROUND</td>
      <td>11</td>
    </tr>
    <tr>
      <th>2</th>
      <td>ANDY’S ROOM</td>
      <td>9</td>
    </tr>
    <tr>
      <th>3</th>
      <td>HALLWAY</td>
      <td>6</td>
    </tr>
    <tr>
      <th>4</th>
      <td>OFFICE</td>
      <td>6</td>
    </tr>
  </tbody>
</table>
</div>




```python
from matplotlib import pyplot as plt
import seaborn as sns

plt.figure(figsize=(22,15))
keys = place_df["places"] # 데이터 프레임(place_df)의 places column을 x축으로 설정합니다.
values =  place_df["freq"] # 데이터 프레임(place_df)의 freq column을 y축으로 설정합니다.
plt.xticks(rotation = 85 ) 
sns.barplot(x=keys, y=values) 
plt.show()
```


    
![png](output_20_0.png)
    



```python
import numpy as np

# Data to plot
labels = place_df["places"][:5]
frequency = place_df["freq"][:5]
colors = ['#ff6666', '#ffcc99', '#99ff99', '#66b3ff','#663300']
 
# Plot
plt.pie(frequency, labels=labels, colors=colors, startangle=0,frame=False, autopct=lambda p : '{:.1f}%'.format(p))
centre_circle = plt.Circle((0,0),0.5,color='black', fc='white',linewidth=0)
fig = plt.gcf()
fig.gca().add_artist(centre_circle)
    
plt.axis('equal')
plt.tight_layout()
plt.show()
```


    
![png](output_21_0.png)
    


## 대본 분석 (2) : 장면(Scene) 분석

###### toyscript/backend/da/scenesNoContents.py


```python
from collections import Counter, defaultdict
# 로컬에서 사용했을 경우
# from scriptLinesFromTxt import scriptLines
# from places import locations 
locations = ['EXT.', 'INT.']

## 씬 넘버링
sceneNoContents = defaultdict(list)
sceneNo = 0
i = 0
numOfLines = len(scriptLines)

while i < numOfLines:
    if scriptLines[i][:4] in locations:  # 'EXT.' 또는 'INT.'로 시작하는 문장일 경우
        sceneNo += 1
        k = 0
        sceneNoContents[sceneNo].append(scriptLines[i])
        for j in range(i + 1, numOfLines):
            if scriptLines[j][:4] in locations:  # 'EXT.' 또는 'INT.'로 시작하는 다음 문장에서 break
                break
            k += 1
            sceneNoContents[sceneNo].append(scriptLines[j]) 
        i += k
    else:
        i += 1
```

### 씬 개수 출력(번호 목록)


```python
print(sceneNoContents.keys()) 
```

    dict_keys([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132])
    


```python
print(len(sceneNoContents))
```

    132
    

### 씬 번호 별 내용 출력


```python
# print(sceneNoContents)
print(sceneNoContents[1])
```

    ['EXT. OLD WEST - DAY', 'A train races across the desert. MOVE IN on an ARMORED CAR.', 'Suddenly, the roof blows open.']
    

## 대본 분석 (3) : 장소 별 씬 목록

###### toyscript/backend/da/placeScenes.py


```python
from collections import Counter, defaultdict
# 로컬에서 사용할 경우
# from places import locations
# from sceneNoContents import sceneNoContents
# from scriptLinesFromTxt import scriptLines


# 장소별 씬 번호 목록
placeScenes = defaultdict(list)
for num, contents in sceneNoContents.items():
    splitted = contents[0].split()
    place = ''
    for i in range(1, len(splitted)):
        if i < len(splitted)-1 and splitted[i] + splitted[i+1] in ['/EXT.', '/INT.']: continue  # 'EXT.' 또는 'INT.' 앞에 '/' 니올 경우 continue
        if splitted[i] in locations: continue # 'EXT.' 또는 'INT.'일 경우 continue
        if splitted[i] == '-': break
        place += splitted[i] + ' '
    placeScenes[place.strip()].append(num)
```

### 장소 별 씬 번호 목록 출력


```python
# 장소별 씬 번호 목록 출력
print(placeScenes)
# for place, scenes in placeScenes.items():
#     print(f'{place}, {scenes}')
```

    defaultdict(<class 'list'>, {'OLD WEST': [1], 'TRAIN': [2], 'DESERT PLAINS': [3], 'SPACESHIP': [4], 'ANDY’S ROOM': [5, 7, 8, 10, 11, 13, 15, 46, 128], 'ANDY’S KITCHEN': [6], 'FRONT YARD': [9], 'ANDY’S FRONT YARD': [12], 'TOY CHEST, ANDY’S ROOM': [14], 'ANDY’S HOUSE': [16], 'GARAGE': [17], 'ANDY’S YARD': [18], 'CAR / GARAGE': [19], 'DONATION BOX / CAR': [20], 'DAY CARE, PARKING LOT': [21], 'DONATION BOX / PARKING LOT': [22], 'LOBBY': [23], 'DONATION BOX / HALLWAY': [24], 'DONATION BOX / BUTTERFLY CLASSROOM': [25], 'BATHROOM': [26, 29], 'CATERPILLAR ROOM': [27, 31, 43, 45, 47, 49, 59, 63, 65, 67, 74, 75, 76, 78, 88, 93, 95, 103], 'HALLWAY': [28, 38, 44, 68, 70, 91], 'PLAYGROUND': [30, 48, 71, 73, 84, 89, 94, 96, 100, 102, 104], "BONNIE'S BEDROOM": [32], 'BONNIE’S BEDROOM': [33, 35, 41], 'TOY BOX': [34], 'CATERPILLAR CLASSROOM': [36, 37, 80, 82], 'TEACHERS’ LOUNGE': [39], 'VENDING MACHINE': [40], 'STORAGE CLOSET': [42], 'KITCHEN': [50, 58], 'DAISY’S LIVING ROOM': [51], 'DAISY’S HOUSE': [52, 55], 'STATION WAGON': [53], 'REST STOP': [54], 'TRUCK BUMPER': [56], 'SUNNYSIDE DAY CARE, FRONT ENTRANCE': [57], 'BUTTERFLY ROOM': [60], 'CEILING CRAWL SPACE, BUTTERFLY ROOM': [61], 'CEILING CRAWL SPACE, CATERPILLAR ROOM': [62, 77], 'OFFICE': [64, 66, 69, 72, 87, 92], 'FRONT OFFICE': [79, 85], 'CEILING CRAWL SPACE': [81], 'SANDBOX': [83], 'KEN’S DREAM HOUSE, BUTTERFLY ROOM': [86, 90, 97], 'UTILITY CLOSET': [98], 'CLASSROOM CEILING CRAWL SPACE': [99, 101], 'TRASH CHUTE': [105], 'GARBAGE CHUTE': [106], 'GARBAGE TRUCK': [107, 109, 111, 113, 115], 'STREETS': [108], 'TRI-COUNTY DUMP': [110], 'DUMP': [112, 114, 122], 'GARBAGE PIT': [116], 'CONVEYER BELT': [117, 118], 'DUMP / STAIRWAY TO HEAVEN': [119], 'INCINERATOR HOPPER': [120], 'CRANE OPERATOR’S BOOTH': [121], 'GARBAGE DUMP, ELSEWHERE': [123], 'GARBAGE DUMP': [124], 'DRIVEWAY': [125], 'BACK YARD': [126], 'GARAGE ROOF': [127], 'CAR': [129], 'HOUSE': [130], 'BONNIE’S HOUSE': [131, 132]})
    

## 데이터 분석 (4) : 등장인물

###### toyscript/backend/da/characters.py

등장인물의 목록과 대사의 빈도를 기반으로 한 중요도를 분석해보겠습니다.   
scriptTerms은 대본내에 존재하는 명령어들입니다.


```python
scriptTerms = [
        'CUT TO', 'JUMP TO', 'SMASH TO:', 'NOISES.',
        'TRANSITION:', 'TRANSITION TO:', 'DONATE TO:', 'MATCH CUT:', 
        'TRANSITION BACK:', 'DISSOLVE TO:', 'FADE', 'DISSOLVE', 
        'IN ', 'OUTSIDE ', 'ON ', 'CAMCORDER', 'THE PHOTO',
        'TRACK', '...', 'CLOSE', '(GASPS)', 'VOICE', 'TIME CUT', 
        'THE END', 'CRANE',
        'TOY STORY 3', # TODO 제목 -> 제목만 따로 추출해서 나중에 조건문에 추가하기
        'THE STREET'  # TODO 지엽적인 것 -> 일반화 어떻게 할지 논의 필요
    ]
```


```python
from collections import Counter
# 로컬에서 개발할 때 추가
# from utils import locations, scriptTerms
# from scriptLinesFromTxt import scriptLines

characters = []
for word in scriptLines:
    if word[:4] in locations: continue  # 'EXT.' 또는 'INT.'로 시작하면 continue
    for term in scriptTerms:
        if word.find(term) != -1:
            break  # 장면 전환 등의 시나리오 용어라면 break
    else: 
        if word.isupper(): # 시나리오 용어가 아니면서 대문자이면

            # continued를 의미하는 (CONT’D) 또는 (CONT'D) 제거
            word = word.replace(" (CONT'D)", '')
            word = word.replace(" (CONT’D)", '')
            
            # (V.O.) 또는 (V.O)제거 
            # Voice Over: 인물이 출연은 하지만 말은 안하고, 속마음을 얘기하는 경우
            word = word.replace(" (V.O.)", '')
            word = word.replace(" (V.O)", '')
            
            # (O.C.) 제거 (Off Camera)
            word = word.replace(" (O.C.)", '')  
            
            # (O.S.) 제거 (Off Screen, 인물은 안 보이고 그 인물의 소리만 들리는 경우, 환청 등)
            word = word.replace(" (O.S.)", '')

            word = word.replace(" (ON PHONE)", '')

            # TODO 지엽적인 것 -> 일반화 어떻게 할지 논의 필요
            word = word.replace(" (AS WOODY)", '')
            word = word.replace(" (AS BUZZ)", '')

            characters.append(word.strip())
```

### 대본 내 등장인물 목록


```python
charactersSet = set(characters)
print(charactersSet)
```

    {'MOM', 'EVIL DR. PORKCHOP', 'MRS. POTATO HEAD', 'SPARKS', 'GANG', 'BUTTERFLY ROOM TEACHER', 'KEN', 'YOUNG CHUCKLES', 'THE TOYS', 'KEN & BARBIE', 'SLINKY', 'SOLDIER TWO', 'TRIXIE', 'LIFER', 'JESSIE', 'CHUCKLES', 'BUZZ', 'HAMM', 'CHUNK', 'FARMER SAYS TOY', 'BUTTERCUP', 'TEACHER', 'RECEPTIONIST', 'BOTH', 'DOLL', 'FROG', 'MR. POTATO HEAD', 'YOUNG ANDY', 'BOOKWORM', 'GARBAGE MAN TWO', 'SOLDIER ONE', 'BONNIE’S MOM', 'LOTSO', 'ONE-EYED BART', 'GARBAGE MAN ONE', 'PEA #3', 'TRICERATOPS', 'UNICORN', 'WOODY', 'BARBIE', 'MOLLY', 'PEA #2', 'STRETCH', 'PEA POD', 'ANDY’S ROOM', 'PEA #1', 'TWITCH', 'TOYS', 'BIG BABY', 'DOLLY', 'REX', 'THE TOY CHEST', 'JANITOR', 'SPANISH BUZZ', 'BONNIE', 'ALIEN', 'ALIENS', 'SARGE', 'ANDY', 'MR. PRICKLEPANTS'}
    

### 총 등장인물의 수 출력


```python
numOfCharacters = len(charactersSet) 
print(numOfCharacters)
```

    60
    

### 등장인물 별 대사 빈도(등장인물의 중요도)


```python
charactersCount = Counter(characters).most_common()
print(charactersCount)
```

    [('WOODY', 194), ('BUZZ', 98), ('JESSIE', 86), ('LOTSO', 83), ('KEN', 70), ('MR. POTATO HEAD', 62), ('REX', 62), ('HAMM', 58), ('MRS. POTATO HEAD', 48), ('ANDY', 45), ('BARBIE', 37), ('MOM', 30), ('BONNIE', 29), ('SLINKY', 28), ('LIFER', 17), ('MOLLY', 16), ('CHUCKLES', 15), ('SPANISH BUZZ', 15), ('MR. PRICKLEPANTS', 12), ('BONNIE’S MOM', 9), ('ONE-EYED BART', 8), ('YOUNG ANDY', 8), ('TRIXIE', 8), ('BUTTERCUP', 7), ('ALIENS', 6), ('DOLLY', 6), ('TWITCH', 5), ('SARGE', 4), ('TOYS', 4), ('RECEPTIONIST', 4), ('STRETCH', 4), ('CHUNK', 3), ('BOOKWORM', 3), ('GARBAGE MAN ONE', 3), ('THE TOY CHEST', 2), ('JANITOR', 2), ('UNICORN', 2), ('PEA #3', 2), ('GANG', 2), ('SPARKS', 2), ('BIG BABY', 2), ('EVIL DR. PORKCHOP', 1), ('SOLDIER ONE', 1), ('SOLDIER TWO', 1), ('THE TOYS', 1), ('ANDY’S ROOM', 1), ('BUTTERFLY ROOM TEACHER', 1), ('KEN & BARBIE', 1), ('TRICERATOPS', 1), ('BOTH', 1), ('DOLL', 1), ('PEA #1', 1), ('PEA #2', 1), ('FARMER SAYS TOY', 1), ('PEA POD', 1), ('YOUNG CHUCKLES', 1), ('TEACHER', 1), ('ALIEN', 1), ('GARBAGE MAN TWO', 1), ('FROG', 1)]
    

### 등장인물의 중요도 시각화


```python
characters_df = pd.DataFrame(list(charactersCount), columns=["characters", "freq"])
print(characters_df[:5])
```

      characters  freq
    0      WOODY   194
    1       BUZZ    98
    2     JESSIE    86
    3      LOTSO    83
    4        KEN    70
    


```python
plt.figure(figsize=(22,15))
keys = characters_df["characters"]
values =  characters_df["freq"]
plt.xticks(rotation = 85 ) 
sns.barplot(x=keys, y=values) 
plt.show()
```


    
![png](output_44_0.png)
    



```python
import numpy as np

# Data to plot
labels = characters_df["characters"][:10]
frequency = characters_df["freq"][:10]
colors = ['#ff6666', '#ffcc99', '#99ff99', '#66b3ff','#663300', '#FAF58C', '#A390EE', '#CBFF75', '#40E0D0', '#FFCAD5']
 
# Plot
plt.pie(frequency, labels=labels, colors=colors, startangle=0,frame=False, autopct=lambda p : '{:.1f}%'.format(p))
centre_circle = plt.Circle((0,0),0.5,color='black', fc='white',linewidth=0)
fig = plt.gcf()
fig.gca().add_artist(centre_circle)
    
plt.axis('equal')
plt.tight_layout()
plt.show()
```


    
![png](output_45_0.png)
    


## 대본 분석 (5) : 시간대 별 장면(Scene) 분석

### 시간대 별 씬 번호 목록

###### toyscript/backend/da/timeScenes.py


```python
from collections import Counter, defaultdict
# 로컬에서 사용
# from scriptLinesFromTxt import scriptLines
# from sceneNoContents import sceneNoContents


## 시간대별 씬 번호 목록
timeScenes = defaultdict(list)
for sceneNo, contents in sceneNoContents.items():
    splitted = contents[0].split()
    time = ''
    for i in range(len(splitted)):
        if splitted[i] == '-': # '-'인 경우, '-' 다음부터 다음 '-' 까지 시간 정보
            for j in range(i+1, len(splitted)):
                if splitted[j] == '-': # 다음 '-'를 만나면 break
                    break
                time += splitted[j] + ' '
                j += 1
            break
    if time:  # time이 빈 문자열이 아닌 경우
        timeScenes[time.strip()].append(sceneNo)
```

### 대본내에 존재하는 시간대의 목록


```python
print(timeScenes.keys())
```

### 시간대별 빈도 수


```python
timeCount = {}
for time, scenes in timeScenes.items():
    timeCount[time] = len(scenes)

print(timeCount)
```

    {'DAY': 47, 'NIGHT': 71, 'CONTINUOUS': 3, 'MOMENTS LATER': 1, 'DUSK': 3, 'LATER': 1, 'DAWN': 3, 'LATE AFTERNOON': 1}
    

#### 시간대별 빈도 비율 시각화


```python
# Data to plot
labels = timeCount.keys()
frequency = timeCount.values()
colors = ['#FFE13C', '#3c3c3c','#663300', '#FAF58C', '#A390EE', '#CBFF75', '#40E0D0', '#FFCAD5']
 
# Plot
plt.pie(frequency, labels=labels, colors=colors, startangle=0,frame=False, autopct=lambda p : '{:.1f}%'.format(p))
centre_circle = plt.Circle((0,0),0.5,color='black', fc='white',linewidth=0)
fig = plt.gcf()
fig.gca().add_artist(centre_circle)
    
plt.axis('equal')
plt.tight_layout()
plt.show()
```


    
![png](output_54_0.png)
    


### 시간대별 씬 번호 목록


```python
for time, scenes in timeScenes.items():
    print(f'{time}, {scenes}')
```

    DAY, [1, 2, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26, 27, 30, 31, 32, 34, 35, 51, 52, 53, 54, 60, 61, 62, 63, 74, 75, 123, 124, 125, 126, 127, 128, 129, 130]
    NIGHT, [11, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 56, 57, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 76, 77, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121]
    CONTINUOUS, [25, 29, 78]
    MOMENTS LATER, [33]
    DUSK, [36, 55, 132]
    LATER, [37]
    DAWN, [58, 59, 122]
    LATE AFTERNOON, [131]
    

## 대본 분석 (6) : 시간대 별 등장인물 분석

### 시간대 별 등장인물의 등장 빈도

###### toyscript/backend/da/timeCharacters.py


```python
from collections import defaultdict, Counter
# 로컬에서 사용
# from timeScenes import timeScenes
# from characters import charactersSet
# from sceneNoContents import sceneNoContents


# 시간대별 캐릭터 등장 빈도
timeCharacters = defaultdict(list)
for time, sceneNumbers in timeScenes.items():
    for num in sceneNumbers:
        for word in sceneNoContents[num]:
            if word in charactersSet:
                timeCharacters[time].append(word)


# 시간대별 캐릭터 등장 빈도 수
timeCharactersCount = {}
for time, characters in timeCharacters.items():
    timeCharactersCount[time] = Counter(characters).most_common()


# 시간대별 캐릭터 등장 빈도 수 출력
for k, v in timeCharactersCount.items():
    print(k, ":", v)
```

    DAY : [('WOODY', 87), ('BUZZ', 42), ('JESSIE', 30), ('REX', 30), ('ANDY', 26), ('HAMM', 25), ('MR. POTATO HEAD', 25), ('MOM', 20), ('MRS. POTATO HEAD', 17), ('SLINKY', 11), ('BONNIE', 11), ('MOLLY', 10), ('ONE-EYED BART', 7), ('LOTSO', 7), ('MR. PRICKLEPANTS', 7), ('BONNIE’S MOM', 6), ('LIFER', 6), ('YOUNG ANDY', 4), ('SARGE', 4), ('RECEPTIONIST', 4), ('KEN', 4), ('BARBIE', 3), ('TRIXIE', 3), ('ALIENS', 2), ('THE TOY CHEST', 2), ('TOYS', 2), ('UNICORN', 2), ('BUTTERCUP', 2), ('PEA #3', 2), ('EVIL DR. PORKCHOP', 1), ('SOLDIER ONE', 1), ('SOLDIER TWO', 1), ('THE TOYS', 1), ('ANDY’S ROOM', 1), ('KEN & BARBIE', 1), ('TRICERATOPS', 1), ('BOTH', 1), ('DOLL', 1), ('DOLLY', 1), ('PEA #1', 1), ('PEA #2', 1), ('TEACHER', 1), ('FROG', 1)]
    NIGHT : [('WOODY', 60), ('KEN', 41), ('LOTSO', 39), ('JESSIE', 36), ('BUZZ', 34), ('BARBIE', 20), ('HAMM', 19), ('MR. POTATO HEAD', 18), ('REX', 17), ('MRS. POTATO HEAD', 15), ('SPANISH BUZZ', 12), ('SLINKY', 10), ('TRIXIE', 4), ('DOLLY', 4), ('STRETCH', 3), ('TWITCH', 3), ('BUTTERCUP', 3), ('MR. PRICKLEPANTS', 3), ('LIFER', 3), ('SPARKS', 2), ('CHUNK', 2), ('BOOKWORM', 2), ('CHUCKLES', 2), ('TOYS', 2), ('BIG BABY', 2), ('GANG', 1), ('FARMER SAYS TOY', 1), ('PEA POD', 1), ('ALIEN', 1), ('ALIENS', 1)]
    CONTINUOUS : [('LOTSO', 12), ('KEN', 8), ('BUZZ', 6), ('JESSIE', 4), ('REX', 4), ('MR. POTATO HEAD', 3), ('HAMM', 3), ('WOODY', 3), ('MRS. POTATO HEAD', 3), ('BARBIE', 3), ('BUTTERFLY ROOM TEACHER', 1), ('SLINKY', 1), ('ALIENS', 1), ('JANITOR', 1)]
    DUSK : [('REX', 4), ('HAMM', 4), ('MR. POTATO HEAD', 4), ('BUZZ', 4), ('MRS. POTATO HEAD', 3), ('SLINKY', 2), ('JESSIE', 2), ('LOTSO', 2), ('YOUNG CHUCKLES', 1), ('ANDY', 1), ('BONNIE', 1), ('WOODY', 1)]
    LATER : [('KEN', 6), ('BARBIE', 6), ('JESSIE', 2), ('TWITCH', 2), ('BUZZ', 1), ('HAMM', 1), ('REX', 1), ('CHUNK', 1)]
    DAWN : [('LOTSO', 4), ('WOODY', 3), ('MRS. POTATO HEAD', 3), ('MR. POTATO HEAD', 3), ('HAMM', 3), ('CHUCKLES', 2), ('BUZZ', 2), ('SLINKY', 2), ('BUTTERCUP', 1), ('MR. PRICKLEPANTS', 1), ('DOLLY', 1), ('TRIXIE', 1), ('JESSIE', 1), ('REX', 1), ('ALIENS', 1)]
    


```python
# 시간대별 캐릭터 등장 빈도 수(시간대별로 상위 5명)
timeList = []
timeCharList = []
for k, v in timeCharactersCount.items():
    print(k, ":", v[:5])
```

    DAY : [('WOODY', 87), ('BUZZ', 42), ('JESSIE', 30), ('REX', 30), ('ANDY', 26)]
    NIGHT : [('WOODY', 60), ('KEN', 41), ('LOTSO', 39), ('JESSIE', 36), ('BUZZ', 34)]
    CONTINUOUS : [('LOTSO', 12), ('KEN', 8), ('BUZZ', 6), ('JESSIE', 4), ('REX', 4)]
    DUSK : [('REX', 4), ('HAMM', 4), ('MR. POTATO HEAD', 4), ('BUZZ', 4), ('MRS. POTATO HEAD', 3)]
    LATER : [('KEN', 6), ('BARBIE', 6), ('JESSIE', 2), ('TWITCH', 2), ('BUZZ', 1)]
    DAWN : [('LOTSO', 4), ('WOODY', 3), ('MRS. POTATO HEAD', 3), ('MR. POTATO HEAD', 3), ('HAMM', 3)]
    

이 부분은 하위 그룹을 포함한 도넛 그래프나, 누적 바 그래프로 표현하면 좋을 것 같습니다.
