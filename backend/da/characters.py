from typing import Tuple
from collections import defaultdict
from script_lines_from_txt import get_lines_of_script
from script_sections import get_lines_with_only_capital
from utils import (
    place_indicators,
    script_terms,
    character_cue_terms,
    MAX_BLANK_LINES_BETWEEN_CHARACTER_AND_DIALOGUE
)


def remove_terms_on_name(name: str) -> str:
    """
    이름에서 캐릭터 큐 용어를 제외합니다.
    :params name:
    :return name:
    """
    for cue_term in character_cue_terms:
        name = name.replace(f" {cue_term}", "")

        start_of_as = name.find("(AS")
        end_of_as = name.find(")")
        if start_of_as != -1:
            name = name.replace(f" {name[start_of_as:end_of_as+1]}", "")

    return name.strip()


def count_frequency_of_characters_and_slugs(
    all_capital_lines: Tuple[str],
) -> Tuple[Tuple[str, int]]:
    """
    캐릭터 또는 슬러그 라인별 등장 빈도 수를 계산합니다.
    :params all_capital_lines:
    :return character_slugs_frequencies:
    """
    character_slug_counts_dict = {}
    for word in all_capital_lines:
        if word[:4] in place_indicators:
            continue

        if word.find("!") != -1:
            continue

        for script_term in script_terms:
            if word.startswith(script_term):
                break
        else:
            word = remove_terms_on_name(word)

            if word[0] == "(" or word[-1] in "):-":
                continue

            character_slug_counts_dict[word] = (
                character_slug_counts_dict.get(word, 0) + 1
            )

    character_slug_frequencies = []
    for character, count in character_slug_counts_dict.items():
        character_slug_frequencies.append((character, count))
    return tuple(character_slug_frequencies)


def get_character_slug_keys(character_slug_frequencies: Tuple[str, int]) -> Tuple[str]:
    """
    캐릭터 또는 슬러그 라인별 빈도 데이터에서 키 값(0번째 인덱스 값)을 구합니다.
    :params character_slug_frequencies
    :return characters_slug_keys:
    """
    characters_slug_keys = [
        chracter_slug_freq[0] for chracter_slug_freq in character_slug_frequencies
    ]
    return tuple(characters_slug_keys)


def get_character_frequencies(
    character_slug_frequencies: Tuple[str, int], characters: Tuple[str]
) -> Tuple[Tuple[str, int]]:
    """
    캐릭터 또는 슬러그 라인별 빈도 데이터에서 키 값(0번째 인덱스 값)을 구합니다.
    :params character_slug_frequencies
    :return character_frequencies:
    """
    character_frequencies = []
    for character, frequency in character_slug_frequencies:
        if character in characters:
            character_frequencies.append((character, frequency))
    return tuple(character_frequencies)


def get_character_list(character_dialogues: Tuple[str, Tuple[str]]) -> Tuple[str]:
    """
    대사가 있는 캐릭터 이름 목록을 구합니다.
    :params character_dialogues:
    :return characters:
    """
    characters = [character_dialogue[0] for character_dialogue in character_dialogues]
    return tuple(characters)


def count_number_of_blank_lines(
    script_lines: Tuple[str], character_slug_frequencies: Tuple[str]
) -> int:
    """
    10번 이상 등장한 특정 캐릭터와 대사 사이의 공백 줄 개수를 구합니다.
    :params
        script_lines,
        character_slug_frequencies:
    :return number_of_blank_lines:
    """
    character = ""
    for character, frequency in character_slug_frequencies:
        if frequency >= 10:
            character = character
            break

    num_of_blank_lines = 0
    is_character_found = False
    for i in range(len(script_lines)):
        if not is_character_found:
            line = script_lines[i]
            if line.startswith(" ") and character in line:
                for j in range(i + 1, i + MAX_BLANK_LINES_BETWEEN_CHARACTER_AND_DIALOGUE):
                    is_character_found = True
                    if script_lines[j]:
                        break
                    num_of_blank_lines += 1
        else:
            break
    return num_of_blank_lines


def get_dialogues_by_characters(
    script_lines: Tuple[str],
    characters: Tuple[str],
    num_of_blank_lines: int,
) -> Tuple[Tuple[str, Tuple[str]]]:
    """
    캐릭터별 대사 목록을 구합니다.
    :params
        script_lines,
        characters,
        num_of_blank_lines:
    :return character_dialogues:
    """
    chunks = defaultdict(list)
    for i in range(len(script_lines)):
        line = script_lines[i]
        if line.startswith(" "):
            for character in characters:
                tokens = line.strip().split()
                character_names = character.split()
                len_of_tokens = len(tokens)
                len_of_character_names = len(character_names)

                if (
                    (
                        len_of_tokens == 1
                        and len_of_character_names == 1
                        and tokens[0] == character_names[0]
                    )
                    # tokens, character_names 길이가 모두 1보다 클 때 둘의 각 0번째 이름, 각 1번째 이름, 각 마지막 이름이 일치하거나
                    # (예_ 'DR. STONER'와 'DR. SALLY FRIEDMAN'를 다른 인물로 구분하기 위함)
                    or (
                        len_of_tokens > 1
                        and len_of_character_names > 1
                        and tokens[0] == character_names[0]
                        and tokens[1] == character_names[1]
                        and tokens[-1] == character_names[-1]
                    )
                    # tokens 길이가 1보다 크고 character_names 길이가 1일 때,
                    # 둘의 0번째 이름이 일치하나 tokens의 마지막 요소가 '#'로 시작하지 않을 때
                    # (예_ tokens가 'ALIEN #1' 이고 character_names가 'ALIEN'인 경우, 둘을 다르게 구분하기 위함)
                    or (
                        len_of_tokens > 1
                        and len_of_character_names == 1
                        and tokens[0] == character_names[0]
                        and not tokens[-1].startswith("#")
                    )
                ):
                    blank_count = 0
                    for j in range(i + 1, len(script_lines)):
                        token = script_lines[j].strip()
                        if blank_count > num_of_blank_lines:
                            break

                        if token:
                            blank_count = 0
                            chunks[character].append(token)
                        else:
                            blank_count += 1

    character_dialogues = []
    for character, dialogues in chunks.items():
        character_dialogues.append((character, tuple(dialogues)))
    return tuple(character_dialogues)


script_lines = get_lines_of_script()

character_slug_frequencies = count_frequency_of_characters_and_slugs(
    get_lines_with_only_capital(script_lines)
)

character_slug_keys = get_character_slug_keys(character_slug_frequencies)

num_of_blank_lines = count_number_of_blank_lines(
    script_lines, character_slug_frequencies
)

character_dialogues = get_dialogues_by_characters(
    script_lines, character_slug_keys, num_of_blank_lines
)

characters = get_character_list(character_dialogues)

character_frequencies = get_character_frequencies(
    character_slug_frequencies, characters
)
