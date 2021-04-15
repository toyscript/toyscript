from script_lines_from_txt import get_lines_of_script
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
    get_most_frequent_character_dialogues
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
    get_time_list
)



movie_paths = [
    "Great Gatsby, The.txt",
    "Big Sick, The.txt",
    "Inception.txt",
    "Avatar.txt",
    "30 Minutes or Less.txt",
    "CAST AWAY.txt",
    "Mission Impossible.txt",
    "Hostage.txt",
    "UP.txt",
    "Shrek the Third.txt",
    "FANTASTIC FOUR.txt",
    "Zootopia.txt",
    "Pirates of the Caribbean.txt",
    "toystory3.txt",
    "2012.txt",
]


for movie_path in movie_paths:


    """ 
        Script Sectons
        대본 영역을 나눈다 생각하면 됨 
    """

    # 대본 전체 줄 목록
    all_lines = get_lines_of_script(movie_path)


    # 대문자로만 이루어진 문장
    # 1. 장면 제목(헤딩), 2. 캐릭터 이름, 3. 슬러그 라인이 대문자로만 구성됨
    # (슬러그 라인 -> 강조하고픈 캐릭터의 이름이나 장소 이름 등)
    all_capital_lines = get_lines_with_only_capital(all_lines)


    # 장면 제목(헤딩)
    # 장면 제목은 EXT. 또는 INT., EXT/ 또는 INT/ 로 시작함
    # 장면 제목에서 추후 장소 및 시간대 정보 추출
    headings = get_all_headings(all_lines)


    # 장면 번호별 장면 내용
    scene_contents = group_contents_by_scene_number(all_lines)
    """ 출력 """
    # for scene_num, contents in scene_contents:
    #     print(scene_num, ":" , contents)
    # print()
    # continue




    """ 
        Characters 
    """

    # 캐릭터 이름 및 슬러그 라인별로 빈도 수 추출 
    # 위의 두 가지는 대문자로만 작성되기 때문에,
    # get_lines_with_only_capital 메소드 사용
    character_slug_frequencies = count_frequency_of_characters_and_slugs(
        all_capital_lines
    )


    # 캐릭터 이름 및 슬러그 라인 목록
    character_slug_keys = get_character_slug_keys(character_slug_frequencies)


    # 캐릭터 이름과 대사 사이의 공백 줄 개수 세기
    num_of_blank_lines = count_number_of_blank_lines(all_lines, character_slug_frequencies)


    # 캐릭터별 대사 목록
    # 이를 위해 전체 대본 줄, 캐릭터 이름 및 슬러그 라인 목록, 
    # 바로 위의 공백 줄 개수를 매개변수로 함  
    character_dialogues = get_dialogues_by_characters(
        all_lines, character_slug_keys, num_of_blank_lines
    )
    """ 출력 """
    # for character, dialogues in character_dialogues:
    #     print(character, ":" , dialogues)
    # print()
    # continue


    # 캐릭터별 대사 목록 데이터에서 대사가 있는 캐릭터를 뽑아냄
    # 대사가 없는 슬러그 라인은 캐릭터 이름 목록에 포함시키지 않음
    characters = get_character_list(character_dialogues)
    """ 출력 """
    # print('\n'.join(sorted(characters)), '\n')
    # print(len(characters))
    # continue



    # 캐릭터별 빈도 수
    character_frequencies = get_character_frequencies(
        character_slug_frequencies, characters
    )
    """ 출력 """
    # for character, frequency in character_frequencies:
    #     print(character, ":" , frequency)
    # print()
    # continue


    # 빈출 캐릭터 목록 (n개 까지)
    most_frequent_characters = get_frequent_characters_up_to_num(10, character_frequencies)
    """ 출력 """
    # print('\n'.join(sorted(most_frequent_characters)), '\n')
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

    """ 
        캐릭터 파일 안에 characters_relation 관련한 데이터도 있는데,
        이건 제가 한 게 아니라, 하람님께 설명 부탁드립니다
    """


    """
        Places
    """
    # 장소별 장면 번호 목록
    place_scenes = group_scene_numbers_by_place(scene_contents, headings)
    """ 출력 """
    # for place, scenes in place_scenes:
    #     print(place, ":", scenes)
    # print()
    # continue


    # 장소별 빈도 수
    place_frequencies = count_frequency_of_places(headings)
    """ 출력 """
    # for place, frequencies in place_frequencies:
    #     print(place, ":", frequencies)
    # print()
    # continue


    # 장소별 등장 캐릭터 및 빈도 수
    place_characters = count_frequency_of_characters_by_place(
        place_scenes, scene_contents, characters
    )
    """ 출력 """
    # for place, characters in place_characters:
    #     print(place, ":", characters)
    # print()
    # continue


    # 장소 목록
    places = get_place_list(place_frequencies)
    """ 출력 """
    # print('\n'.join(places), '\n')
    # continue




    """ 
        Times 
    """
    # 시간대별 장면 번호 목록
    time_scenes = group_scene_numbers_by_time(scene_contents, headings)
    """ 출력 """
    # for time, scenes in time_scenes:
    #     print(time, ":", scenes)
    # print()
    # continue


    # 시간대별 빈도 수
    time_frequencies = count_frequency_of_times(headings)
    """ 출력 """
    # for time, frequencies in time_frequencies:
    #     print(time, ":", frequencies)
    # print()
    # continue


    # 시간대별 등장 캐릭터 및 빈도 수
    time_characters = count_frequency_of_characters_by_time(
        time_scenes, scene_contents, characters
    )
    """ 출력 """
    # for time, characters in time_characters:
    #     print(time, ":", characters)
    # print()
    # continue


    # 시간대 목록
    times = get_time_list(time_frequencies)
    """ 출력 """
    # print('\n'.join(times), '\n')
    # continue