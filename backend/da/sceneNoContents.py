from utils import locations
from collections import Counter, defaultdict
from scriptLinesFromTxt import scriptLines

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


# 씬 번호 목록 출력
# print(sceneNoContents.keys()) 

# 씬 번호별 내용 출력
print(sceneNoContents)