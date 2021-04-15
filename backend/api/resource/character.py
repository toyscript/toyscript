from flask_restful import Resource, request
from db.models import Character, Relation, Sentiment, WordCloud


class CharacterFrequency(Resource):

    def get(self, movie_id):

        characterFrequency = []
        characters = Character.query.filter(Character.movie_id==movie_id).all()

        for character in characters:
            object = {}
            object["character"] = character.name
            object["frequency"] = character.lines
            characterFrequency.append(object)

        return sorted(characterFrequency, key=lambda x: x["frequency"], reverse=True)

class CharacterRelation(Resource):

    def get(self, movie_id):

        if 'test' in request.args.keys():
            relations = Relation.query.filter(
                Relation.movie_id==movie_id, Relation.test==True
            ).all()

        relations = Relation.query.filter(Relation.movie_id==movie_id).all()
        result = []
        for r in relations:

            tmp = {
                "source" : r.character_one.name,
                "target" : r.character_two.name,
                "value" : r.value
            }

            result.append(tmp)
        return result

class CharacterSentiment(Resource):

    def get(self, movie_id):

        characters = Character.query.filter(Character.movie_id==movie_id).order_by(Character.lines.desc()).limit(5).all()
        ids = {}
        for c in characters:
            ids[c.id] = c.name
            print(c.name)

        sentiments = Sentiment.query.filter(Sentiment.character_id.in_(ids)).all()

        result = {}
        result['sentimentType'] = Sentiment.get_sentiment_name()

        sentiments = sorted(sentiments, key=lambda x : x.character.lines, reverse=True)

        characters = []
        for s in sentiments:
            tmp = {
                "characterName" : s.character.name,
                "sentiments" : s.get_sentiments()
            }
            characters.append(tmp)

        result['characters'] = characters

        return result


class CharacterWord(Resource):

    def get(self, movie_id):

        wordclouds = WordCloud.query.filter(WordCloud.character.has(movie_id=movie_id)).all()
        wordclouds = sorted(wordclouds, key=lambda x : x.character.lines, reverse=True)
        result = []
        character = wordclouds[0].character
        tmp = {}
        tmp[character.id] = []

        for wc in wordclouds:

            if wc.character.id != character.id:
                tmp['characterName'] = character.name
                tmp['words'] = tmp.pop(character.id)
                character = wc.character
                result.append(tmp)
                tmp = {}
                tmp[wc.character.id] = []

            else:
                tmp.get(wc.character.id).append(
                    {
                        "text" : wc.word,
                      "value" : wc.frequency
                    }
                )

        return result