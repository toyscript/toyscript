from utils import locations
from collections import Counter
from scriptLinesFromTxt import scriptLines


# 장소 목록 추출
places = []
for i in range(len(scriptLines)):
    # 'EXT.' 또는 'INT.' 로 시작하는 라인일 때
    if scriptLines[i].startswith(locations[0]) or scriptLines[i].startswith(
        locations[1]
    ):
        place = ""
        splitted = scriptLines[i].split()
        for j in range(1, len(splitted)):
            word = splitted[j]

            # 'EXT.' 또는 'INT.'인 경우 장소 이름이 아니므로 continue
            if word in locations:
                continue

            # '/ EXT.' 또는 '/ INT.'인 경우 장소 이름이 아니므로 continue
            if word == "/" and splitted[j + 1] in locations:
                continue

            # '-' 또는 'A'인 경우 장소 이름이 끝나므로 break
            if word in ["-", "A"]:
                break

            place += word + " "
        place = (
            place.rstrip().replace("S ’ ", "S’ ").replace(" ’ ", "’").replace(" '", "’")
        )
        places.append(place)


# 장소 목록 출력
# print('\n'.join(places))


# 장소별 빈도 수
placesCount = Counter(places).most_common()


# 장소별 빈도 수 출력
# print(placesCount)
