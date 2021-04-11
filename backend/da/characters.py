from typing import Tuple
from collections import defaultdict
from utils import (
    place_indicators,
    script_terms,
    character_cue_terms,
    MAX_BLANK_LINES_BETWEEN_CHARACTER_AND_SPEECH,
)


def count_frequency_of_characters(
    all_capital_lines: Tuple[str],
    place_indicators: Tuple[str],
    script_terms: Tuple[str],
    character_cue_terms: Tuple[str],
) -> Tuple[str, int]:
    """
    캐릭터별 등장 빈도 수를 구합니다.
    :params
        all_capital_lines,
        place_indicators,
        script_terms,
        character_cue_terms:
    :return character_frequencies:
    """
    character_counts = {}
    for word in all_capital_lines:
        if word[:4] in place_indicators:
            continue

        if word.find("!") != -1:
            continue

        for script_term in script_terms:
            if word.find(script_term) != -1:
                break
        else:
            for cue_term in character_cue_terms:
                word = word.replace(f" {cue_term}", "")

            start_of_as = word.find("(AS")
            end_of_as = word.find(")")
            if start_of_as != -1:
                word = word.replace(f" {word[start_of_as:end_of_as+1]}", "")

            word = word.strip()

            if word[0] == "(" or word[-1] in "):-":
                continue

            character_counts[word] = character_counts.get(word, 0) + 1

    character_frequencies = []
    for character, count in character_counts.items():
        character_frequencies.append((character, count))
    return tuple(character_frequencies)


def get_character_list(character_frequencies: Tuple[str, int]) -> Tuple[str]:
    """
    캐릭터 이름 목록을 구합니다.
    :params character_frequencies
    :return characters:
    """
    characters = [chracter_freq[0] for chracter_freq in character_frequencies]
    return tuple(characters)


def count_number_of_blank_lines(
    script_lines: Tuple[str], character_frequencies: Tuple[str]
) -> int:
    """
    10번 이상 등장한 특정 캐릭터와 대사 사이의 공백 줄 개수를 구합니다.
    :params
        script_lines,
        character_frequencies:
    :return number_of_blank_lines:
    """
    character = ""
    for character, frequency in character_frequencies:
        if frequency >= 10:
            character = character
            break

    num_of_blank_lines = 0
    is_character_found = False
    for i in range(len(script_lines)):
        if not is_character_found:
            line = script_lines[i]
            if line.startswith(" ") and character in line:
                for j in range(i + 1, i + MAX_BLANK_LINES_BETWEEN_CHARACTER_AND_SPEECH):
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
) -> Tuple[str, Tuple[str]]:
    """
    캐릭터별 대화 목록을 구합니다.
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
        character_dialogues.append((character, dialogues))
    return tuple(character_dialogues)
