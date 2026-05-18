import os
import re
import time
from pymongo import MongoClient
from deep_translator import GoogleTranslator
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))
client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database()

LANGUAGES = ['fi', 'sv', 'no', 'da', 'et', 'de', 'nl', 'fr', 'pl', 'es', 'it', 'pt', 'el', 'tr', 'ja', 'ar']

def translate_text(text, target_lang):
    if not text: return ""
    try:
        translated = GoogleTranslator(source='auto', target=target_lang).translate(text)
        if translated:
            translated = re.sub(r'h2o', 'STO', translated, flags=re.IGNORECASE)
        return translated
    except Exception as e:
        print(f"Error {target_lang}: {e}")
        return None

def fix_green_apple():
    # Fix Product
    print("Fixing Product: green apple")
    p = db.products.find_one({'name': 'green apple'})
    if p:
        translations = p.get('translations', {})
        for lang in LANGUAGES:
            if lang not in translations:
                print(f"  Translating to {lang}...")
                translations[lang] = {
                    'name': translate_text(p['name'], lang),
                    'description': translate_text(p.get('description', ''), lang),
                    'shortDescription': translate_text(p.get('shortDescription', ''), lang),
                    'flavorNotes': translate_text(p.get('flavorNotes', ''), lang)
                }
                time.sleep(0.5)
        db.products.update_one({'_id': p['_id']}, {'$set': {'translations': translations, 'translationStatus': 'completed'}})
    
    # Fix Category
    print("Fixing Category: green apple")
    c = db.categories.find_one({'name': 'green apple'})
    if c:
        translations = c.get('translations', {})
        for lang in LANGUAGES:
            if lang not in translations:
                print(f"  Translating to {lang}...")
                translations[lang] = {
                    'name': translate_text(c['name'], lang),
                    'description': translate_text(c.get('description', ''), lang)
                }
                time.sleep(0.5)
        db.categories.update_one({'_id': c['_id']}, {'$set': {'translations': translations}})

if __name__ == "__main__":
    fix_green_apple()
    client.close()
