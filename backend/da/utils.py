MAX_BLANK_LINES_BETWEEN_CHARACTER_AND_DIALOGUE = 20

punctuations = """!"$%&'()*+,-/:;<=>?@[\]^_`{|}~"""

place_indicators = ("EXT.", "INT.")

ambiguous_time_modifiers = ("CONTINUOUS", "MOMENTS", "LATER")

script_terms = (
    "CUT TO",
    "JUMP TO",
    "SMASH TO:",
    "NOISES.",
    "TRANSITION:",
    "TRANSITION TO:",
    "DONATE TO:",
    "MATCH CUT:",
    "TRANSITION BACK:",
    "DISSOLVE TO:",
    "FADE",
    "DISSOLVE",
    "IN ",
    "OUTSIDE ",
    "ON ",
    "CAMCORDER",
    "THE PHOTO",
    "TRACK",
    "...",
    "CLOSE",
    "(GASPS)",
    "VOICE",
    "TIME CUT",
    "THE END",
    "CRANE",
    "TOY STORY 3",  # TODO 제목 -> 제목만 따로 추출해서 나중에 조건문에 추가하기
    "THE STREET",  # TODO 지엽적인 것 -> 일반화 어떻게 할지 논의 필요
    "FINAL DRAFT",  # TODO 지엽적인 것 -> 일반화 어떻게 할지 논의 필요
)

character_cue_terms = (
    "(CONT'D)",
    "(CONT’D)",
    "(V.O.)",
    "(V.O)",
    "(O.C.)",
    "(O.S.)",
    "(VOICE BOX)",
    "(ON PHONE)",
    "*",
)

time_modifiers = (
    "DAWN",
    "SUNRISE",
    "SUNSET",
    "MORNING",
    "FORENOON",
    "MIDNOON",
    "AFTERNOON",
    "NOON",
    "DUSK",
    "EVENING",
    "MIDNIGHT",
    "DAY",
    "NIGHT",
)