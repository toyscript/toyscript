from typing import Tuple
from utils import place_indicators
from collections import defaultdict


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


def group_contents_by_scene_number(script_lines: Tuple[str]) -> Tuple[int, str]:
    """
    장면 번호별 대본 내용을 그룹화합니다.
    :params script_lines:
    :return scene_groups:
    """

    num_of_all_lines = len(script_lines)
    scene_num_contents = defaultdict(list)

    line_num = 0
    scene_num = 0
    while line_num < num_of_all_lines:
        line = script_lines[line_num].lstrip()

        if line[:4] in place_indicators:
            scene_num += 1

            continued_num = 0
            scene_num_contents[scene_num].append(line)

            for j in range(line_num + 1, num_of_all_lines):
                next_line = script_lines[j].lstrip()

                if not next_line:
                    continue

                if next_line[:4] in place_indicators:
                    break

                scene_num_contents[scene_num].append(next_line)
                continued_num += 1

            line_num += continued_num

        else:
            line_num += 1

    scene_groups = []
    for scene_num, contents in scene_num_contents.items():
        scene_groups.append((scene_num, contents))
    return tuple(scene_groups)
