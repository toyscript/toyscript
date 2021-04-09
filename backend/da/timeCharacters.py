from collections import defaultdict, Counter
from timeScenes import timeScenes
from characters import charactersSet
from sceneNoContents import sceneNoContents


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
# TODO CONTINUOUS 처리
# for k, v in timeCharactersCount.items():
#     print(k, ":", v)
