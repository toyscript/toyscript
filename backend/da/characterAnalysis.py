import numpy as np
import pandas as pd
from typing import Tuple
from utils import punctuations
from collections import Counter
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk.tokenize import word_tokenize, WordPunctTokenizer
from characters import character_dialogues, most_frequent_character_dialogues


def preprocess_data(data: str, tokenizer) -> Tuple[str]:
    """
    데이터를 토큰화하고, 토큰화한 데이터에서 불용어와 특수 문자를 제거합니다.
    :params data, tokenizer:
    :return processed_data:
    """
    tokens = tokenizer.tokenize(data)
    processed_data = [
        token for token in tokens if len(token) > 2 and token.lower() not in stop_words
    ]
    processed_data = [token for token in processed_data if token not in punctuations]
    return processed_data


def extract_stemmed_words(data: Tuple[str], stemmer) -> Tuple[str]:
    """
    NLTK의 PorterStemmer를 이용해 데이터에서 어간 목록을 추출합니다.
    :params data:
    :return stemmed_words:
    """
    return [stemmer.stem(token.lower()) for token in data]


def lemmatize_words(data: Tuple[str], lemmatizer) -> Tuple[str]:
    """
    NLTK의 WordNetLemmatizer를 이용해 데이터에서 어간 목록을 추출합니다.
    :params data:
    :return lemmatized_words:
    """
    return [lemmatizer.lemmatize(token) for token in data]


def analyze_data_with_lexicons(file_path: str):
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


def get_match_words(stemmed_words: Tuple[str], lexicons: Tuple[str]) -> Tuple[str]:
    """
    감정 어휘 목록에 있는 단어와 일치하는 단어들의 목록을 구합니다.
    :params stemmed_words, lexicons:
    :return match_words
    """
    return [token for token in stemmed_words if token in lexicons]


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


def count_frequency_of_emotions(all_emotions: Tuple[str]) -> Tuple[Tuple[str, int]]:
    """
    주어진 감정을 분석하여 감정별 빈도 수를 목록으로 반환합니다.
    :params all_emotions:
    :return emotion_frequencies:
    """
    emotion_frequencies_dict = pd.Series(all_emotions).value_counts().to_dict()
    emotion_frequencies = []
    for emotion, count in emotion_frequencies_dict.items():
        if emotion not in ["negative", "positive"]:
            emotion_frequencies.append((emotion, count))
    return emotion_frequencies


def get_emotion_frequencies_by_character(
    most_frequent_character_dialogues: Tuple[Tuple[str, int]],
    tokenizer,
    stemmer,
    file_path: str,
) -> Tuple[Tuple[str, Tuple[Tuple[str, int]]]]:
    """
    캐릭터별로 감정 빈도 수를 구하고, 이를 목록으로 반환합니다.
    :params most_frequent_character_dialogues:
    :return character_emotion_frequencies:
    """
    character_emotion_frequencies = []
    for character, dialogues in most_frequent_character_dialogues:
        joined_dialogues = " ".join(dialogues)

        processed_data = preprocess_data(joined_dialogues, tokenizer)
        stemmed_words = extract_stemmed_words(processed_data, p_stemmer)

        emotion_lexicons = analyze_data_with_lexicons(file_path)
        match_words = get_match_words(stemmed_words, tuple(emotion_lexicons[0]))
        all_emotions = get_all_emotions(match_words, emotion_lexicons)
        emotion_frequencies = count_frequency_of_emotions(all_emotions)

        character_emotion_frequencies.append((character, tuple(emotion_frequencies)))
    return tuple(character_emotion_frequencies)


file_path = "NRC-Emotion-Lexicon-Wordlevel-v0.92.txt"

stop_words = set(stopwords.words("english"))

tokenizer = WordPunctTokenizer()

p_stemmer = PorterStemmer()

character_emotion_frequencies = get_emotion_frequencies_by_character(
    most_frequent_character_dialogues, tokenizer, p_stemmer, file_path
)

lemmatizer = WordNetLemmatizer()


processed_data = preprocess_data(
    " ".join(most_frequent_character_dialogues[0][1]), tokenizer
)
