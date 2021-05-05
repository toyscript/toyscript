import pandas as pd
import numpy as np
from script_crawling import get_script_url, convert_script_to_lines
from script_sections import (
    group_contents_by_scene_number,
    get_lines_with_only_capital,
    get_all_headings,
)

from characters import (
    count_frequency_of_characters_and_slugs,
    get_character_slug_keys,
    get_dialogues_by_characters,
    count_number_of_blank_lines,
    get_character_list,
    get_character_frequencies,
    get_frequent_characters_up_to_num,
    get_most_frequent_character_dialogues,
    get_interaction_characters,
)

from characterAnalysis import (
    get_emotion_frequencies_by_character,
    get_word_frequencies_by_character,
)

from places import (
    group_scene_numbers_by_place,
    get_place_list,
    count_frequency_of_characters_by_place,
    count_frequency_of_places,
)

from times import (
    group_scene_numbers_by_time,
    count_frequency_of_characters_by_time,
    count_frequency_of_times,
    get_time_list,
)

if __name__ == "__main__":

    __movie_titles = [
        "Avatar",
        # "30 Minutes or Less",
        # "UP",
        # "Terminator Salvation",
        # "2012",
        # "Big Sick, The",
        # "Cars 2",
        # "CAST AWAY",
        # "FANTASTIC FOUR",
        # "Great Gatsby, The",
        # "Hostage",
        # "Inception",
        # "Kung Fu Panda",
        # "Mission Impossible",
        # "Pirates of the Caribbean",
        # "Shrek the Third",
        # "Zootopia",
    ]

    for title in __movie_titles:

        """
        Script Sections
        """
        script_url = get_script_url(title)

        # 대본 전체 줄 목록
        all_lines = convert_script_to_lines(script_url)

        # 대문자로만 이루어진 문장
        # 1) 장면 제목(헤딩)
        # 2) 캐릭터 이름
        # 3) 슬러그 라인 이 대문자로만 구성됨
        # (슬러그 라인 -> 캐릭터의 이름이나 장소 이름을 강조하고 싶을 때 사용)
        all_capital_lines = get_lines_with_only_capital(all_lines)

        # 장면 제목(헤딩)
        # 장면 제목은 'EXT.' 또는 'INT.' , 'EXT/' 또는 'INT/' 로 시작함
        # 장면 제목에서 추후 장소 및 시간대 정보 추출
        headings = get_all_headings(all_lines)

        # 장면 번호별 장면 내용
        scene_contents = group_contents_by_scene_number(all_lines)
        """ 출력 """
        # for scene_num, contents in scene_contents:
        #     print(scene_num, ":", contents)
        # print()
        # continue

        # 총 장면 번호 수
        num_of_scenes = len(scene_contents)
        """ 출력 """
        # print(num_of_scenes, '\n')
        # continue

        """ 
            Characters 
        """

        # 캐릭터 이름 및 슬러그 라인별로 빈도 수 추출
        # 위의 두 가지는 대문자로만 작성되기 때문에,
        # all_capital_lines 데이터 사용
        character_slug_frequencies = count_frequency_of_characters_and_slugs(
            all_capital_lines
        )

        # 캐릭터 이름 및 슬러그 라인 목록
        character_slug_keys = get_character_slug_keys(character_slug_frequencies)

        # 캐릭터 이름과 대사 사이의 공백 줄 개수 세기
        num_of_blank_lines = count_number_of_blank_lines(
            all_lines, character_slug_frequencies
        )

        # 캐릭터별 대사 목록
        # 이를 위해 전체 대본 줄, 캐릭터 이름 및 슬러그 라인 목록,
        # 바로 위의 공백 줄 개수를 매개변수로 함
        character_dialogues = get_dialogues_by_characters(
            all_lines, character_slug_keys, num_of_blank_lines
        )
        character_dialogues_df = pd.DataFrame(character_dialogues, columns=['character', 'character_dialogues'])
        """ 출력 """
        # for character, dialogues in character_dialogues:
        #     print(character, ":" , dialogues)
        # print()
        # continue

        # 캐릭터별 대사 목록 데이터에서 대사가 있는 캐릭터를 뽑아냄
        # 대사가 없는 슬러그 라인은 캐릭터 이름 목록에 포함시키지 않음
        characters = get_character_list(character_dialogues)
        """ 출력 """
        # print(len(characters))
        # print('\n'.join(sorted(characters)), '\n')
        # continue

        # 캐릭터별 빈도 수
        character_frequencies = get_character_frequencies(
            character_slug_frequencies, characters
        )
        character_frequencies_df = pd.DataFrame(character_frequencies, columns=['character', 'character_frequencies'])

        """ 출력 """
        # for character, frequency in character_frequencies:
        #     print(character, ":" , frequency)
        # print()
        # continue

        # 빈출 캐릭터 목록 (n개 까지)
        most_frequent_characters = get_frequent_characters_up_to_num(
            5, character_frequencies
        )
        """ 출력 """
        # print("\n".join(sorted(most_frequent_characters)), "\n")
        # continue

        # 빈출 캐릭터별 대사 목록
        most_frequent_character_dialogues = get_most_frequent_character_dialogues(
            most_frequent_characters, character_dialogues
        )
        """ 출력 """
        # for character, dialogues in most_frequent_character_dialogues:
        #     print(character, ":" , dialogues)
        # print()
        # continue

        # 빈출 캐릭터별 감정 빈도 수
        character_emotion_frequencies = get_emotion_frequencies_by_character(
            most_frequent_character_dialogues
        )
        character_emotion_frequencies_df = pd.DataFrame(character_emotion_frequencies[1:], columns=['character', 'character_emotion_frequencies'])
        """ 출력 """
        # for character, emotion_frequencies in character_emotion_frequencies[1:]:
        #     print(character, ":" , emotion_frequencies)
        # print()
        # continue

        # 빈출 캐릭터별 사용단어 빈도 수
        character_word_frequencies = get_word_frequencies_by_character(
            most_frequent_character_dialogues, 0
        )
        character_word_frequencies_df = pd.DataFrame(character_word_frequencies, columns=['character', 'character_word_frequencies'])
        """ 출력 """
        # for character, word_frequencies in character_word_frequencies:
        #     print(character, ":", word_frequencies)
        # print()
        # continue

        # 캐릭터별 주변 인물 관계도
        character_relations = get_interaction_characters(scene_contents, characters)
        character_relations_df = pd.DataFrame(character_relations, columns=['character', 'character_relations'])
        """ 출력 """
        # for character, relations in character_relations:
        #     print(character, ":", relations)
        # print()
        # continue

        """
            Places
        """

        # 장소별 장면 번호 목록
        place_scenes = group_scene_numbers_by_place(scene_contents, headings)
        place_scenes_df = pd.DataFrame(place_scenes, columns=['place', 'place_scenes'])
        """ 출력 """
        # for place, scenes in place_scenes:
        #     print(place, ":", scenes)
        # print()
        # continue

        # 장소별 빈도 수
        place_frequencies = count_frequency_of_places(headings)
        place_frequencies_df = pd.DataFrame(place_frequencies, columns=['place', 'place_frequencies'])
        """ 출력 """
        # for place, frequencies in place_frequencies:
        #     print(place, ":", frequencies)
        # print()
        # continue

        # 장소별 등장 캐릭터 및 빈도 수
        place_characters = count_frequency_of_characters_by_place(
            place_scenes, scene_contents, characters
        )
        place_characters_df = pd.DataFrame(place_characters, columns=['place', 'place_characters'])
        """ 출력 """
        # for place, characters in place_characters:
        #     print(place, ":", characters)
        # print()
        # continue

        # 장소 목록
        places = get_place_list(place_frequencies)
        places_df = pd.DataFrame(places, columns=['place'])
        """ 출력 """
        # print('\n'.join(places), '\n')
        # continue

        # 총 장소 개수
        num_of_places = len(places)
        """ 출력 """
        # print(num_of_places, '\n')
        # continue

        """ 
            Times 
        """
        # 시간대별 장면 번호 목록
        time_scenes = group_scene_numbers_by_time(scene_contents, headings)
        time_scenes_df = pd.DataFrame(time_scenes, columns=['time', 'time_scenes'])
        """ 출력 """
        # for time, scenes in time_scenes:
        #     print(time, ":", scenes)
        # print()
        # continue

        # 시간대별 빈도 수
        time_frequencies = count_frequency_of_times(headings)
        time_frequencies_df = pd.DataFrame(time_frequencies, columns=['time', 'time_frequencies'])
        """ 출력 """
        # for time, frequencies in time_frequencies:
        #     print(time, ":", frequencies)
        # print()
        # continue

        # 시간대별 등장 캐릭터 및 빈도 수
        time_characters = count_frequency_of_characters_by_time(
            time_scenes, scene_contents, characters
        )
        time_characters_df = pd.DataFrame(time_characters, columns=['time', 'time_characters'])
        # """ 출력 """
        # for time, characters in time_characters:
        #     print(time, ":", characters)
        # print()
        # continue

        # 시간대 목록
        times = get_time_list(time_frequencies)
        times_df = pd.DataFrame(times, columns=['time'])
        # print(times_df)
        """ 출력 """
        # print('\n'.join(times), '\n')
        # continue
        
        '''
        장소 관련 DataFrame
        '''
        # num of place df는 병합하지 못했음(Key가 없음)
        place_with_frequencies_df = pd.merge(places_df, place_frequencies_df)
        place_with_frequencies_and_characters_df = pd.merge(place_with_frequencies_df, place_characters_df)
        all_places_df = pd.merge(place_with_frequencies_and_characters_df, place_scenes_df)
        print(all_places_df)
        
        '''
        시간 관련 DataFrame
        '''
        time_with_frequencies_df = pd.merge(times_df, time_frequencies_df)
        time_with_frequencies_and_characters_df = pd.merge(time_with_frequencies_df, time_characters_df)
        all_times_df = pd.merge(time_with_frequencies_and_characters_df, time_scenes_df)
        print(all_times_df)
        
        '''
        캐릭터 관련 DataFrame
        '''
        sorted_character_frequencies_df = character_frequencies_df.sort_values('character_frequencies', ascending=False)
        sorted_character_frequencies_with_dialogues_df = pd.merge(sorted_character_frequencies_df, character_dialogues_df)
        sorted_character_frequencies_with_dialogues_and_emotions_df = pd.merge(sorted_character_frequencies_with_dialogues_df, character_emotion_frequencies_df, how='outer')
        sorted_character_frequencies_with_dialogues_and_emotions_and_word_frequencies_df = pd.merge(sorted_character_frequencies_with_dialogues_and_emotions_df, character_word_frequencies_df, how='outer')
        all_character_df = pd.merge(sorted_character_frequencies_with_dialogues_and_emotions_and_word_frequencies_df, character_relations_df)
        print(all_character_df)
    