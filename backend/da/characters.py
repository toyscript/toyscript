from utils import locations, scriptTerms
from collections import Counter
from scriptLinesFromTxt import scriptLines


characters = []
for word in scriptLines:
    if word[:4] in locations:
        continue  # 'EXT.' 또는 'INT.'로 시작하면 continue
    for term in scriptTerms:
        if word.find(term) != -1:
            break  # 장면 전환 등의 시나리오 용어라면 break
    else:
        if word.isupper():  # 시나리오 용어가 아니면서 대문자이면

            # continued를 의미하는 (CONT’D) 또는 (CONT'D) 제거
            word = word.replace(" (CONT'D)", "")
            word = word.replace(" (CONT’D)", "")

            # (V.O.) 또는 (V.O)제거
            # Voice Over: 인물이 출연은 하지만 말은 안하고, 속마음을 얘기하는 경우
            word = word.replace(" (V.O.)", "")
            word = word.replace(" (V.O)", "")

            # (O.C.) 제거 (Off Camera)
            word = word.replace(" (O.C.)", "")

            # (O.S.) 제거 (Off Screen, 인물은 안 보이고 그 인물의 소리만 들리는 경우, 환청 등)
            word = word.replace(" (O.S.)", "")

            word = word.replace(" (ON PHONE)", "")

            # TODO 지엽적인 것 -> 일반화 어떻게 할지 논의 필요
            word = word.replace(" (AS WOODY)", "")
            word = word.replace(" (AS BUZZ)", "")

            characters.append(word.strip())


# 캐릭터 목록 출력
charactersSet = set(characters)
# print(charactersSet)


# 총 캐릭터 수 출력
numOfCharacters = len(charactersSet)
# print(numOfCharacters)


# 캐릭도별 대사 개수 출력
charactersCount = Counter(characters)
# for name, count in charactersCount.most_common():
#     print(f'{name}, {count}')
