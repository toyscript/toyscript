from typing import Tuple
from utils import place_indicators


def get_lines_with_only_capital(script_lines: Tuple[str]) -> Tuple[str]:
    """
    대문자로만 이루어진 대본 내용을 구합니다.
    장면 제목, 캐릭터 이름, 슬러그 라인이 이에 해당합니다.
    :params script_lines
    :return all_capital_lines:
    """
    all_capital_lines = [line.strip() for line in script_lines if line.isupper()]
    return tuple(all_capital_lines)


def get_scene_headings(all_capital_lines: Tuple[str]) -> Tuple[str]:
    """
    EXT. 또는 INT.로 시작하는 각 장면의 제목 목록을 구합니다.
    :params all_capital_lines:
    :return headings:
    """
    headings = []
    for line in all_capital_lines:
        if line[:4] in place_indicators:
            headings.append(line)
    return tuple(headings)
