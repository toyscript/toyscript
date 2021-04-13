import numpy as np
import pandas as pd
from typing import Tuple
from utils import punctuations
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
from characters import character_dialogues, most_frequent_character_dialogues


def get_stemmed_tokens(dialogues: str) -> Tuple[str]:
    """
    대사를 인수로 받아 토큰화를 진행하고 불용어를 제거한 후,
    어간 추출한 결과를 목록으로 반환합니다.
    :params dialogues:
    :return stemmed_tokens:
    """
    tokens = [token.lower() for token in word_tokenize(dialogues)]
    tokens_wo_stop_words = [token for token in tokens if token not in stop_words]
    tokens_wo_punctuations = [
        token for token in tokens_wo_stop_words if token not in punctuations
    ]
    stemmed_tokens = [p_stemmer.stem(token) for token in tokens_wo_punctuations]
    return stemmed_tokens


def get_emotion_lexicons_for_anaylsis(file_path: str):
    """
    감정 분석을 위해 감정 어휘 목록을 구합니다.
    :params file_path:
    :return lexicons:
    """
    lexicons = pd.read_csv(
        file_path,
        engine="python",
        header=None,
        sep="\t",
    )
    lexicons = lexicons[(lexicons != 0).all(1)].reset_index(drop=True)
    return lexicons


def get_match_words(stemmed_tokens: Tuple[str], lexicons: Tuple[str]) -> Tuple[str]:
    """
    감정 어휘 목록에 있는 단어와 일치하는 단어들의 목록을 구합니다.
    :params stemmed_tokens, lexicons:
    :return match_words
    """
    return [token for token in stemmed_tokens if token in lexicons]


def get_all_emotions(match_words: Tuple[str], lexicons) -> Tuple[str]:
    """
    각 어휘가 나타내는 감정들을 구하고 이를 목록으로 만들어 반환합니다.
    :params match_words, lexicons:
    :return all_emotions
    """
    all_emotions = []
    for word in match_words:
        emotions = list(lexicons.iloc[np.where(lexicons[0] == word)[0], 1])
        all_emotions.extend(emotions)
    return all_emotions


def get_sentiment_analysis_result(all_emotions: Tuple[str]) -> Tuple[Tuple[str, int]]:
    """
    주어진 감정을 분석하여 감정별 빈도 수를 목록으로 반환합니다.
    :params all_emotions:
    :return emotion_counts:
    """
    emotion_counts = []
    emotion_counts_dict = pd.Series(all_emotions).value_counts().to_dict()
    for emotion, count in emotion_counts_dict.items():
        if emotion not in ["negative", "positive"]:
            emotion_counts.append((emotion, count))
    return emotion_counts


def get_emotion_frequencies_by_character(
    most_frequent_character_dialogues: Tuple[Tuple[str, int]]
) -> Tuple[Tuple[str, Tuple[Tuple[str, int]]]]:
    """
    캐릭터별로 감정 빈도 수를 구하고, 이를 목록으로 반환합니다.
    :params most_frequent_character_dialogues:
    :return character_emotion_frequencies:
    """
    character_emotion_frequencies = []
    for character, dialogues in most_frequent_character_dialogues:
        joined_dialogues = " ".join(dialogues)
        stemmed_tokens = get_stemmed_tokens(joined_dialogues)

        emotion_lexicons = get_emotion_lexicons_for_anaylsis(file_path)
        match_words = get_match_words(stemmed_tokens, tuple(emotion_lexicons[0]))
        all_emotions = get_all_emotions(match_words, emotion_lexicons)
        emotion_counts = get_sentiment_analysis_result(all_emotions)

        character_emotion_frequencies.append((character, tuple(emotion_counts)))
    return tuple(character_emotion_frequencies)


file_path = "NRC-Emotion-Lexicon-Wordlevel-v0.92.txt"

stop_words = list(stopwords.words("english"))

p_stemmer = PorterStemmer()

character_emotion_frequencies = get_emotion_frequencies_by_character(
    most_frequent_character_dialogues
)
