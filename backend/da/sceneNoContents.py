from utils import place_indicators
from collections import Counter, defaultdict
from script_lines_from_txt import get_lines_of_script

script_lines = get_lines_of_script()

## 씬 넘버링
sceneNoContents = defaultdict(list)
sceneNo = 0
i = 0
numOfLines = len(script_lines)

while i < numOfLines:
    if script_lines[i][:4] in place_indicators:  # 'EXT.' 또는 'INT.'로 시작하는 문장일 경우
        sceneNo += 1
        k = 0
        sceneNoContents[sceneNo].append(script_lines[i])
        for j in range(i + 1, numOfLines):
            if (
                script_lines[j][:4] in place_indicators
            ):  # 'EXT.' 또는 'INT.'로 시작하는 다음 문장에서 break
                break
            k += 1
            sceneNoContents[sceneNo].append(script_lines[j])
        i += k
    else:
        i += 1


# 씬 번호 목록 출력
# print(sceneNoContents.keys())

# 씬 번호별 내용 출력
# print(sceneNoContents)
