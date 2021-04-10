from typing import List

file_path = 'toystory3.txt'


def get_lines_of_script(file_path: List[str] = file_path) -> List[str]:
    with open(file_path, "r", -1, "utf-8") as f:
        return [line.replace("\n", "") for line in f.readlines()]


# 스크립트 한 줄씩 출력
# print(len(get_lines_of_script(file_path))) # 총 라인 수 출력
# print(get_lines_of_script(file_path))
