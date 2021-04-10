from utils import place_indicators
from sceneNoContents import sceneNoContents
from collections import Counter, defaultdict
from script_lines_from_txt import get_lines_of_script

script_lines = get_lines_of_script()

# 장소별 씬 번호 목록
placeScenes = defaultdict(list)
for num, contents in sceneNoContents.items():
    splitted = contents[0].split()
    place = ""
    for i in range(1, len(splitted)):
        if i < len(splitted) - 1 and splitted[i] + splitted[i + 1] in [
            "/EXT.",
            "/INT.",
        ]:
            continue  # 'EXT.' 또는 'INT.' 앞에 '/' 니올 경우 continue
        if splitted[i] in place_indicators:
            continue  # 'EXT.' 또는 'INT.'일 경우 continue
        if splitted[i] == "-":
            break
        place += splitted[i] + " "
    placeScenes[place.strip()].append(num)


# 장소별 씬 번호 목록 출력
# print(placeScenes)

# for place, scenes in placeScenes.items():
#     print(f'{place}, {scenes}')
