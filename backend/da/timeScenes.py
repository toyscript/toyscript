from collections import Counter, defaultdict
from scriptLinesFromTxt import scriptLines
from sceneNoContents import sceneNoContents


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


# 시간대별 씬 번호 목록 출력
# print(timeScenes)
# for time, scenes in timeScenes.items():
#     print(f'{time}, {scenes}')


# 시간대 목록 출력
# print(timeScenes.keys())


# 시간대별 빈도 수 출력
# timeCount = {}
# for time, scenes in timeScenes.items():
#     timeCount[time] = len(scenes)

# print(timeCount)
