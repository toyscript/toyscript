from typing import Tuple
from utils import time_modifiers
from collections import Counter, defaultdict
from script_sections import headings, scene_contents
from characters import characters, remove_terms_on_name
from script_lines_from_txt import get_lines_of_script


def get_time_from_heading(heading: str) -> str:
    """
    장면 제목에서 시간대를 구합니다.
    :params heading:
    :return time:
    """
    time = ""
    splitted_heading = heading.split()
    is_time_found = False

    for i in range(len(splitted_heading)):
        word = splitted_heading[i]
        if is_time_found:
            break

        if word == "-":
            is_time_found = True

            for j in range(i + 1, len(splitted_heading)):
                next_word = splitted_heading[j]
                if next_word == "-":
                    break
                time += next_word + " "

    return time


def check_ambiguous_time(time: str) -> bool:
    """
    Time Modifier가 LATER, CONTINUOUS 등의
    모호한 시간 표현인지 확인합니다.
    :params time, time_modifier:
    :return: bool
    """
    if not time:
        return True

    for modifier in time_modifiers:
        if time.startswith(modifier):
            return True
    return False


def count_frequency_of_times(headings: Tuple[str]) -> Tuple[Tuple[str, int]]:
    """
    시간대별 빈도 수를 구합니다.
    :params headings:
    :return time_frequencies:
    """
    time_frequencies_dict = {}
    for i in range(len(headings)):
        heading = headings[i]
        time = get_time_from_heading(heading)

        while check_ambiguous_time(time) and i > 0:
            time = get_time_from_heading(headings[i - 1])
            i -= 1

        if not time:
            time = "NONE"

        time_frequencies_dict[time] = time_frequencies_dict.get(time, 0) + 1

    time_frequencies = []
    for time, count in time_frequencies_dict.items():
        time_frequencies.append((time, count))
    return tuple(time_frequencies)


def group_scene_numbers_by_time(
    scene_contents: Tuple[str],
) -> Tuple[Tuple[str, Tuple[int]]]:
    """
    시간대별 장면 번호 목록을 그룹화합니다.
    :params scene_contents:
    :return time_scenes:
    """
    time_scenes_dict = defaultdict(list)
    for scene_num, contents in scene_contents:
        time = get_time_from_heading(contents[0])

        i = scene_num
        while check_ambiguous_time(time) and i > 0:
            time = get_time_from_heading(headings[i - 1])
            i -= 1

        if not time:
            time = "NONE"

        time_scenes_dict[time].append(scene_num)

    time_scenes = []
    for time, scene_numbers in time_scenes_dict.items():
        time_scenes.append((time, tuple(scene_numbers)))
    return tuple(time_scenes)


def count_frequency_of_characters_by_time(
    time_scenes: Tuple[str, Tuple[str]],
    scene_contents: Tuple[Tuple[int, Tuple[str]]],
    characters: Tuple[str],
):
    """
    시간대별 캐릭터 등장 빈도 수를 구합니다.
    :params time_scenes:
    :return time_characters:
    """
    time_characters_dict = defaultdict(dict)
    for time, scene_numbers in time_scenes:
        for num in scene_numbers:
            for word in scene_contents[num - 1][1]:
                word = remove_terms_on_name(word)
                if word in characters:
                    time_characters_dict[time][word] = (
                        time_characters_dict[time].get(word, 0) + 1
                    )

    time_characters = []
    for time, character_freq in time_characters_dict.items():
        character_frequencies = []
        for character, freq in character_freq.items():
            character_frequencies.append((character, freq))

        time_characters.append((time, tuple(character_frequencies)))
    return time_characters


script_lines = get_lines_of_script()

time_frequencies = count_frequency_of_times(headings)

time_scenes = group_scene_numbers_by_time(scene_contents)

time_characters = count_frequency_of_characters_by_time(
    time_scenes, scene_contents, characters
)