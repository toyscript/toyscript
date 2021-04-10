from typing import List
from collections import defaultdict
from scriptLinesFromTxt import scriptLines
from characters import charactersCount, charactersSet
from utils import MAX_BLANK_LINES_BETWEEN_CHARACTER_AND_SPEECH


# 등장인물 이름과 대사 사이의 공백 줄 개수 구하기
def countNumberOfBlankLines(scriptLines: List[str], character) -> int:
    """ 
        함수 간단 설명
        매개변수 설명
        리턴 값 설명
        (예제) 
    """ 
    numOfBlankLines = 0
    # character = character  # 두 번째로 많이 나오는 캐릭터 (제목 간격이 구해지지 않도록, 예) Joker)
    isFound = False
    for i in range(len(scriptLines)):
        if not isFound:
            line = scriptLines[i]
            
            # 공백으로 시작하고 line 안에 캐릭터 이름이 있으면
            # 캐릭터 이름과 대사 사이의 공백 줄 개수를 확인할 수 있다
            if line.startswith(" ") and character in line.split():
                for j in range(i + 1, i + MAX_BLANK_LINES_BETWEEN_CHARACTER_AND_SPEECH):
                    isFound = True
                    if scriptLines[j]:
                        break
                    numOfBlankLines += 1
        else:
            break
    return numOfBlankLines


# 캐릭터별 대사 목록 추출
def getCharacterDialogues(scriptLines: List[str]) -> dict:
    characterSpeech = defaultdict(list)
    validNumOfBlank = countNumberOfBlankLines(scriptLines, charactersCount[1][0])
    for i in range(len(scriptLines)):
        line = scriptLines[i]
        if line.startswith(" "):
            for character in charactersSet:
                tokens = line.strip().split()  # tokens : 대본 한 줄을 split한 결과
                characterNames = character.split()  # characterNames : 캐릭터 이름을 split한 결과
                lengthOfTokens = len(tokens)
                lengthOfcharacterNames = len(characterNames)

                if (
                    # tokens, characterNames 길이가 각각 1일 때 두 개가 일치하거나
                    (
                        lengthOfTokens == 1
                        and lengthOfcharacterNames == 1
                        and tokens[0] == characterNames[0]
                    )
                    # tokens, characterNames 길이가 모두 1보다 클 때 둘의 각 0번째 이름과 각 1번째 이름이 일치하거나
                    # (예_ 'DR. STONER'와 'DR. SALLY FRIEDMAN'를 다른 인물로 구분하기 위함)
                    or (
                        lengthOfTokens > 1
                        and lengthOfcharacterNames > 1
                        and tokens[0] == characterNames[0]
                        and tokens[1] == characterNames[1]
                    )
                    # tokens 길이가 1보다 크고 characterNames 길이가 1일 때,
                    # 둘의 0번째 이름이 일치하나 tokens의 마지막 요소가 '#'로 시작하지 않을 때
                    # (예_ tokens가 'ALIEN #1' 이고 characterNames가 'ALIEN'인 경우, 둘을 다르게 구분하기 위함)
                    or (
                        lengthOfTokens > 1
                        and lengthOfcharacterNames == 1
                        and tokens[0] == characterNames[0]
                        and not tokens[-1].startswith("#")
                    )
                ):
                    numOfBlank = 0
                    for j in range(i + 1, len(scriptLines)):
                        token = scriptLines[j].strip()
                        if numOfBlank > validNumOfBlank:
                            break

                        if token:
                            numOfBlank = 0
                            characterSpeech[character].append(token)
                        else:
                            numOfBlank += 1
    return characterSpeech


# (대사 있는) 캐릭터 목록
def getAllCharactersHavingDialogue(characterDialogues: dict) -> List[str]:
    return sorted(list(characterDialogues.keys()))


# (대사 있는) 캐릭터 총 개수
def getNumOfCharasters(characterDialogues: dict) -> int:
    return len(characterDialogues.keys())


# (대사 있는) 캐릭터별 대사 개수
def getCharacterDialogueNum(characterDialogues: dict) -> dict:
    characterDialogueNum = {}
    for character, dialogues in sorted(list(characterDialogues.items())):
        characterDialogueNum[character] = len(dialogues)
    return characterDialogueNum


characterDialogues = getCharacterDialogues(scriptLines)
# print(characterDialogues, "\n")
# print(getAllCharactersHavingDialogue(characterDialogues), "\n")
# print(getNumOfCharasters(characterDialogues), "\n")
# print(getCharacterDialogueNum(characterDialogues), "\n")
