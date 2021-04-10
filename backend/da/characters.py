from utils import (
    locations,
    scriptTerms,
    punctuations,
    MAX_SPLIT_LENGTH_IN_CHARACTER_NAME,
)
from collections import Counter
from scriptLinesFromTxt import scriptLines


def getAllCharacters():
    characters = []
    for token in scriptLines:
        if token[:4] in locations:
            continue  # 'EXT.' 또는 'INT.'로 시작하면 continue
        for term in scriptTerms:
            if token.find(term) != -1:
                break  # 장면 전환 등의 시나리오 용어라면 break
        else:
            if token.isupper() and token.startswith(" "):  # 모든 문자가 대문자이고, 공백으로 시작하면

                # TODO 함수로 구현하기
                # continued를 의미하는 (CONT’D) 또는 (CONT'D) 제거
                token = token.replace(" (CONT'D)", "")
                token = token.replace(" (CONT’D)", "")

                # (V.O.) 또는 (V.O)제거
                # Voice Over: 인물이 출연은 하지만 말은 안하고, 속마음을 얘기하는 경우
                token = token.replace(" (V.O.)", "")
                token = token.replace(" (V.O)", "")

                # (O.C.) 제거 (Off Camera)
                token = token.replace(" (O.C.)", "")

                # (O.S.) 제거 (Off Screen, 인물은 안 보이고 그 인물의 소리만 들리는 경우, 환청 등)
                token = token.replace(" (O.S.)", "")

                token = token.replace(" (VOICE BOX)", "")

                token = token.replace(" (ON PHONE)", "")

                splitted = token.split()
                wordWithAs = ""
                for i in range(len(splitted)):
                    word = splitted[i]
                    if word.startswith("(AS"):
                        wordWithAs = " ".join(splitted[i:])

                # TODO 지엽적인 것 -> 일반화 어떻게 할지 논의 필요
                if wordWithAs:
                    token = token.replace(f" {wordWithAs}", "")

                if (
                    len(token.split()) > MAX_SPLIT_LENGTH_IN_CHARACTER_NAME
                ):  # split 이후 길이가 MAX 길이보다 크면 break
                    continue

                for char in token:
                    if char in punctuations + '.':  # 특수 문자가 포함되면 break
                        break
                else:
                    characters.append(token.strip())
    return characters


# 캐릭터 목록 출력
charactersSet = set(getAllCharacters())
# print(sorted(list(charactersSet)))

# 총 캐릭터 수 출력
numOfCharacters = len(charactersSet)
# print(numOfCharacters)


# 캐릭터별 대사 개수 출력
charactersCount = Counter(getAllCharacters()).most_common()
# print(charactersCount)
# for name, count in charactersCount:
#     print(f'{name}, {count}')
