from typing import Tuple
from collections import defaultdict
from script_sections import get_lines_with_only_capital, scene_contents, script_lines
from constants import (
    PLACE_INDICATORS,
    SCRIPT_TERMS,
    CHARACTER_CUE_TERMS,
    MAX_BLANK_LINES_BETWEEN_CHARACTER_AND_DIALOGUE,
    MAX_SPLIT_LENGTH_OF_CHARACTER_NAME,
)


def remove_terms_on_name(name: str) -> str:
    """
    이름에서 캐릭터 큐 용어를 제외합니다.
    :params name:
    :return name:
    """
    for cue_term in CHARACTER_CUE_TERMS:
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
    for line in all_capital_lines:
        if len(line.split()) >= MAX_SPLIT_LENGTH_OF_CHARACTER_NAME:
            continue

        if line[:4] in PLACE_INDICATORS:
            continue

        if line.find("!") != -1 or line.find('"') != -1:
            continue

        for script_term in SCRIPT_TERMS:
            if line.startswith(script_term):
                break
        else:
            line = remove_terms_on_name(line)

            if line[0] == "(" or line[-1] in "):-.;":
                continue

            character_slug_counts_dict[line] = (
                character_slug_counts_dict.get(line, 0) + 1
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
                for j in range(
                    i + 1, i + MAX_BLANK_LINES_BETWEEN_CHARACTER_AND_DIALOGUE
                ):
                    is_character_found = True
                    if script_lines[j]:
                        break
                    num_of_blank_lines += 1
        else:
            break
    return num_of_blank_lines


def get_dialogues_by_characters(
    script_lines: Tuple[str],
    character_slug_keys: Tuple[str],
    num_of_blank_lines: int,
) -> Tuple[Tuple[str, Tuple[str]]]:
    """
    캐릭터별 대사 목록을 구합니다.
    :params
        script_lines,
        character_slug_keys,
        num_of_blank_lines:
    :return character_dialogues:
    """
    chunks = defaultdict(list)
    for i in range(len(script_lines)):
        line = script_lines[i]

        if not line.startswith(" "):
            continue

        if line.strip() == "OR":
            continue

        for word in line.split():
            if word.islower():
                break
        else:
            for character in character_slug_keys:
                tokens = line.strip().split()
                character_names = character.split()
                len_of_tokens = len(tokens)
                len_of_character_names = len(character_names)

                if (
                    len_of_tokens > 1
                    and len_of_character_names == 1
                    and len(tokens[0]) == 1
                    and len(character_names[0]) == 1
                    and tokens[0] == character_names[0]
                ):
                    # 'A U'와 'A'를 구분하기 위함
                    continue

                elif (
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
                        token = script_lines[j]

                        if token.startswith("  ") and token.strip()[:-1].isdigit():
                            break

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


def get_character_list(character_dialogues: Tuple[str, Tuple[str]]) -> Tuple[str]:
    """
    대사가 있는 캐릭터 이름 목록을 구합니다.
    :params character_dialogues:
    :return characters:
    """
    characters = [character_dialogue[0] for character_dialogue in character_dialogues]
    return tuple(characters)


def get_character_frequencies(
    character_slug_frequencies: Tuple[str, int], characters: Tuple[str]
) -> Tuple[Tuple[str, int]]:
    """
    캐릭터 또는 슬러그 라인별 빈도 데이터에서 캐릭터별로 등장 빈도 수를 계산합니다.
    :params character_slug_frequencies
    :return character_frequencies:
    """
    character_frequencies = []
    for character, frequency in character_slug_frequencies:
        if character in characters:
            character_frequencies.append((character, frequency))
    return tuple(character_frequencies)


def get_frequent_characters_up_to_num(
    number: int, character_frequencies: Tuple[str, int]
) -> Tuple[Tuple[str, int]]:
    """
    캐릭터 중 대사 개수가 가장 많은 캐릭터를 number만큼 구합니다.
    :params character_frequencies:
    :return most_frequent_characters:
    """
    sorted_character_frequencies = sorted(
        character_frequencies, key=lambda x: x[1], reverse=True
    )[:number]

    most_frequent_characters = [
        character_freq[0] for character_freq in sorted_character_frequencies
    ]
    return tuple(most_frequent_characters)


def get_most_frequent_character_dialogues(
    most_frequent_characters: Tuple[str], character_dialogues: Tuple[str, int]
) -> Tuple[str]:
    """
    대사 개수가 가장 많은 캐릭터별 대사 목록을 구합니다.
    :params most_frequent_characters, character_dialogues:
    :return most_frequent_character_dialogues:
    """
    most_frequent_character_dialogues = []
    for top_character in most_frequent_characters:
        for character, dialogues in character_dialogues:
            if character == top_character:
                most_frequent_character_dialogues.append((top_character, dialogues))
                break
    return tuple(most_frequent_character_dialogues)


def get_interaction_characters(
    scene_contents: Tuple[Tuple[int, Tuple[str]]],
    most_frequent_characters: Tuple[str],
    characters: Tuple[str],
) -> Tuple[Tuple[str, Tuple[Tuple[str, int]]]]:
    """
    :params scene_contents, most_frequent_characters
    :return Tuple[Tuple[str], Tuple[Tuple[str], Tuple[int]]]
    """
    characters_relation = defaultdict(dict)
    for scene in scene_contents : 
        for sentence_num in range(len(scene[1])) : 
            for char1 in range(len(most_frequent_characters)) :
                if most_frequent_characters[char1] in scene[1][sentence_num] :
                    for char2 in range(char1, len(characters)) :
                        if characters[char2] in scene[1][sentence_num:-1] :
                            if most_frequent_characters[char1] == characters[char2] :
                                continue
                            characters_relation[most_frequent_characters[char1]][characters[char2]] = (
                                characters_relation[most_frequent_characters[char1]].get(characters[char2], 0) + 1
                            )

    character_relations = []
    for character, relations_dict in characters_relation.items():
        relations = []
        for character_name, count in relations_dict.items():
            relations.append((character_name, count))

        character_relations.append((character, tuple(relations)))
    return tuple(character_relations)


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

most_frequent_characters = get_frequent_characters_up_to_num(10, character_frequencies)

most_frequent_character_dialogues = get_most_frequent_character_dialogues(
    most_frequent_characters, character_dialogues
)

characters_relation = get_interaction_characters(scene_contents, most_frequent_characters, characters)

# print(characters_relation)