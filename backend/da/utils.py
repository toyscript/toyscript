MAX_BLANK_LINES_BETWEEN_CHARACTER_AND_SPEECH = 20
MAX_SPLIT_LENGTH_IN_CHARACTER_NAME = 5

punctuations = """!"$%&'()*+,-/:;<=>?@[\]^_`{|}~"""

place_indicators = ["EXT.", "INT."]

scriptTerms = [
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
]
