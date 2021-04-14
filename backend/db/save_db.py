from init_app.init_app import create_app
import sys, os
sys.path.append(os.path.abspath('../da'))

from da.characters import character_dialogues
result = character_dialogues
