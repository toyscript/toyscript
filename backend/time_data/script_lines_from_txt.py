from typing import Tuple

# file_path = "Dark Knight Rises, The.txt"

# 되는 대본
file_path = "Big Sick, The.txt"
file_path = "Inception.txt"
file_path = "Avatar.txt"
file_path = "30 Minutes or Less.txt"
file_path = "CAST AWAY.txt"
file_path = "Mission Impossible.txt"
file_path = "Hostage.txt"
file_path = "UP.txt"
file_path = "Shrek the Third.txt"
file_path = "FANTASTIC FOUR.txt"
file_path = "Zootopia.txt"
file_path = "Pirates of the Caribbean.txt"
file_path = "toystory3.txt"
file_path = "2012.txt"
file_path = "Great Gatsby, The.txt"


def get_lines_of_script(file_path: str) -> Tuple[str]:
    with open(file_path, "r", -1, "utf-8") as f:
        return tuple([line.replace("\n", "") for line in f.readlines()])


script_lines = get_lines_of_script(file_path)

# 스크립트 한 줄씩 출력
# print(get_lines_of_script(file_path))
# print(len(get_lines_of_script(file_path))) # 총 라인 수 출력
