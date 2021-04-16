from typing import Tuple


def get_lines_of_script(file_path: str) -> Tuple[str]:
    with open(file_path, "r", -1, "utf-8") as f:
        return tuple([line.replace("\n", "") for line in f.readlines()])
