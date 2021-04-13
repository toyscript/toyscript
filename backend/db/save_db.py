from init_app.init_app import create_app

app = create_app()

from da.characterAnalysis import get_emotion_frequencies_by_character

result = get_emotion_frequencies_by_character()
