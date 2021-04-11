filename = 'toystory3.txt' 


# 스크립트 한 줄씩 scriptLines에 담기
scriptLines = []
with open(filename, 'r', -1, 'utf-8') as f:
    scriptLines = [line.strip() for line in f.readlines()]


# 스크립트 한 줄씩 출력
# print(scriptLines)
# print(len(scriptLines)) # 총 라인 수 출력
