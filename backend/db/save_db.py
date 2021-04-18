from init_app.init_app import create_app, db
from db.models import Character, Relation, Sentiment
import sys, os

sys.path.append(os.path.abspath("../da"))

from da.characters import character_dialogues, characters_relation
from da.characterAnalysis import (
    character_emotion_frequencies,
    character_word_frequencies,
)

app = create_app()
app.app_context().push()
# result = character_emotion_frequencies
#
# existing_charaters = Character.query.filter(Character.movie_id==1212).all()
# ids = {}
# for c in existing_charaters:
#     ids[c.name] = c.id
#
# for r in result[1:6]:
#
#     print(r)
#     s = Sentiment(character_id = ids.get(r[0]), sentiments=r[1])
#     db.session.add(s)
#
# db.session.commit()

print(list(Sentiment.__dict__.keys())[4:12])
s = Sentiment()
## 워드 클라우드

# result = character_word_frequencies
#
# for r in result:
#
#     char = ids.get(r[0])
#     print(r[0])
#
#     for word in r[1]:
#         print(word)
