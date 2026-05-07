import os
from pymongo import MongoClient
from deep_translator import GoogleTranslator
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')
client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database()

LANGUAGES = ['fi', 'sv', 'no', 'da'] # Just a few for testing

def test_translate():
    categories = db.categories
    for cat in categories.find({'slug': 'sto-accessories'}):
        print(f"Translating: {cat['name']}")
        translations = {}
        for lang in LANGUAGES:
            print(f"  to {lang}...")
            name = GoogleTranslator(source='en', target=lang).translate(cat['name'])
            desc = GoogleTranslator(source='en', target=lang).translate(cat['description'])
            translations[lang] = {'name': name, 'description': desc}
        
        categories.update_one({'_id': cat['_id']}, {'$set': {'translations': translations}})
        print("Done.")

test_translate()
