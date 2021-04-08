from collections import Counter, defaultdict
from scriptLinesFromTxt import scriptLines
from placeScenes import placeScenes
from sceneNoContents import sceneNoContents
from characters import charactersSet


# 장소별 캐릭터 등장 빈도
placeCharacters = defaultdict(list)
for place, sceneNumbers in placeScenes.items():
    for num in sceneNumbers: 
        for word in sceneNoContents[num]:
            # 씬별 대본 내용 중 캐릭터 이름이 있으면 해당 장소의 캐릭터 목록에 추가 
            if word in charactersSet:
                placeCharacters[place].append(word)


# 장소별 캐릭터 등장 빈도 수
placeCharactersCount = {}
for place, characters in placeCharacters.items():
    placeCharactersCount[place] = Counter(characters).most_common()


# 장소별 캐릭터 등장 빈도 수 출력
# print(placeCharactersCount)
# for k, v in placeCharactersCount.items():
#     print(k, ":", v)