from utils import place_indicators
from collections import Counter
from script_lines_from_txt import get_lines_of_script

script_lines = get_lines_of_script()

# 장소 목록 추출
places = []
for i in range(len(script_lines)):
    # 'EXT.' 또는 'INT.' 로 시작하는 라인일 때
    if script_lines[i].startswith(place_indicators[0]) or script_lines[i].startswith(
        place_indicators[1]
    ):
        place = ""
        splitted = script_lines[i].split()
        for j in range(1, len(splitted)):
            word = splitted[j]

            # 'EXT.' 또는 'INT.'인 경우 장소 이름이 아니므로 continue
            if word in place_indicators:
                continue

            # '/ EXT.' 또는 '/ INT.'인 경우 장소 이름이 아니므로 continue
            if word == "/" and splitted[j + 1] in place_indicators:
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
