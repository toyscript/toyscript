from typing import Tuple
from utils import place_indicators, ambiguous_place_indicators
from collections import defaultdict
from characters import characters, remove_terms_on_name
from script_sections import headings, scene_contents
from script_lines_from_txt import get_lines_of_script


def check_ambiguous_place(place: str) -> bool:
    """
    Place Indicator가 SAME 등의
    모호한 장소 표현인지 확인합니다.
    :params place, place_indicator:
    :return: bool
    """
    if not place:
        return True

    place = place.strip()
    for indicator in ambiguous_place_indicators:
        if place == indicator:
            return True
    return False


def count_frequency_of_places(headings: Tuple[str]) -> Tuple[Tuple[str, int]]:
    """
    대본 내 장소별 빈도 수를 구합니다.
    :params headings:
    :return place_frequencies:
    """
    place_counts = {}
    for i in range(len(headings)):
        heading = headings[i]
        place = get_place_from_heading(heading)

        current_num = i
        while check_ambiguous_place(place) and current_num > 0:
            current_num -= 1
            place = get_place_from_heading(headings[current_num])

        if not place:
            place = "NOT INFERRED"

        place_counts[place] = place_counts.get(place, 0) + 1

    place_frequencies = []
    for place, count in place_counts.items():
        place_frequencies.append((place, count))
    return tuple(place_frequencies)


def get_place_list(place_frequencies: Tuple[str]) -> Tuple[str]:
    """
    대본 내 장소 목록을 구합니다.
    :params place_frequencies:
    :return places:
    """
    places = [place_freq[0] for place_freq in place_frequencies]
    return tuple(places)


def get_place_from_heading(heading: str) -> str:
    """
    장면 제목에서 장소 이름을 구합니다.
    :params heading:
    :return place:
    """
    place = ""
    for word in heading.split():
        if word[-1] in "." or word == "/":
            continue

        if word == "-" or word == "--" or word == "-DAY":
            place = place.strip()
            break

        if word[-1] == "-":
            place += word[:-1]
            break

        if word[-4:] == "-DAY":
            place += word[:-4]
            break

        if word[-11:] == "-CONTINUOUS":
            place += word[:-11]
            break

        place += word + " "
    return place.strip()


def group_scene_numbers_by_place(
    scene_contents: Tuple[str],
) -> Tuple[Tuple[str, Tuple[int]]]:
    """
    장소별 장면 번호 목록을 그룹화합니다.
    :params scene_contents:
    :return place_scenes:
    """
    place_scenes_dict = defaultdict(list)
    for scene_num, contents in scene_contents:
        place = get_place_from_heading(contents[0])

        current_num = scene_num
        while check_ambiguous_place(place) and current_num > 0:
            current_num -= 1
            place = get_place_from_heading(headings[current_num])

        if not place:
            place = "NOT INFERRED"

        place_scenes_dict[place].append(scene_num)

    place_scenes = []
    for place, scene_numbers in place_scenes_dict.items():
        place_scenes.append((place, tuple(scene_numbers)))
    return tuple(place_scenes)


def count_frequency_of_characters_by_place(
    place_scenes: Tuple[str, Tuple[str]],
    scene_contents: Tuple[Tuple[int, Tuple[str]]],
    characters: Tuple[str],
):
    """
    장소별 캐릭터 등장 빈도 수를 구합니다.
    :params place_scenes:
    :return place_characters:
    """
    place_characters_dict = defaultdict(dict)
    for place, scene_numbers in place_scenes:
        for num in scene_numbers:
            for word in scene_contents[num - 1][1]:
                word = remove_terms_on_name(word)
                if word in characters:
                    place_characters_dict[place][word] = (
                        place_characters_dict[place].get(word, 0) + 1
                    )

    place_characters = []
    for place, character_freq in place_characters_dict.items():
        character_frequencies = []
        for character, freq in character_freq.items():
            character_frequencies.append((character, freq))

        place_characters.append((place, tuple(character_frequencies)))
    return place_characters


script_lines = get_lines_of_script()

place_frequencies = count_frequency_of_places(headings)

places = get_place_list(place_frequencies)

place_scenes = group_scene_numbers_by_place(scene_contents)

place_characters = count_frequency_of_characters_by_place(
    place_scenes, scene_contents, characters
)