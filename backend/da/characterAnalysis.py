from wordcloud import WordCloud
from collections import Counter
from characterDialogues import characterDialogues
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer, WordNetLemmatizer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import numpy as np
from PIL import Image

stopWords = set(stopwords.words("english"))
pst = PorterStemmer()
wnl = WordNetLemmatizer()


# 캐릭터 대사 추출
dialogues = " ".join(characterDialogues["WOODY"])

# 대사 토큰화
tokens = word_tokenize(dialogues)

# 불용어 제거 및 stemming
# tokensWithoutStopWords = [pst.stem(token) for token in tokens if not token in stopWords]  # Stemming: 어간 추출
tokensWithoutStopWords = [
    wnl.lemmatize(token) for token in tokens if not token in stopWords
]  #  Lemmatization: 표제어 추출

# 특수 문자 제거
keyTokens = [
    token.replace(",", "")
    .replace(".", "")
    .replace("!", "")
    .replace("--", "")
    .replace("(", "")
    .replace(")", "")
    .replace("?", "")
    .replace("’", "")
    .replace("'s", "")
    for token in tokensWithoutStopWords
]

# 빈 문자열 제거
keyTokens = [token for token in keyTokens if token]


# 토큰별 빈도 수 추출
# print(Counter(keyTokens).most_common()[:7])


keyTokens = " ".join(keyTokens)

# 감정 분석
# sia = SentimentIntensityAnalyzer()
# scores = sia.polarity_scores(keyTokens)
# print(scores)


# 워드 클라우드
# word_cloud = WordCloud(mask=np.array(Image.open('woody_black.png')))
# word_cloud.generate(keyTokens)
# word_cloud.to_file('wordcloud_woody.png')
