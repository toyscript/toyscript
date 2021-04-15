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
)
from times import (
    group_scene_numbers_by_time,
    count_frequency_of_characters_by_time,
    count_frequency_of_times,
)

movies = [
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


for movie in movies:

    lines = get_lines_of_script(movie)

    character_slug_frequencies = count_frequency_of_characters_and_slugs(
        get_lines_with_only_capital(lines)
    )

    headings = get_all_headings(lines)

    character_slug_keys = get_character_slug_keys(character_slug_frequencies)

    num_of_blank_lines = count_number_of_blank_lines(lines, character_slug_frequencies)

    character_dialogues = get_dialogues_by_characters(
        lines, character_slug_keys, num_of_blank_lines
    )

    characters = get_character_list(character_dialogues)

    scene_contents = group_contents_by_scene_number(lines)

    time_scenes = group_scene_numbers_by_time(scene_contents, headings)
    print(time_scenes, "\n")

    time_frequencies = count_frequency_of_times(headings)
    print(time_frequencies, "\n")

    time_characters = count_frequency_of_characters_by_time(
        time_scenes, scene_contents, characters
    )
    print(time_characters, "\n")
