from typing import Tuple
import os

file_name = "toystory3.txt"
# dir_path = os.path.join(os.path.dirname(os.getcwd()), 'da')
# file_path = os.path.join(dir_path, file_name)

def get_lines_of_script(file_path: str = file_name) -> Tuple[str]:
    with open(file_path, "r", -1, "utf-8") as f:
        return tuple([line.replace("\n", "") for line in f.readlines()])

# 스크립트 한 줄씩 출력
# print(get_lines_of_script(file_path))
# print(len(get_lines_of_script(file_path))) # 총 라인 수 출력
