import os
import time
from pymongo import MongoClient
from deep_translator import GoogleTranslator
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))

MONGO_URI = os.getenv("MONGO_URI")
if MONGO_URI: MONGO_URI = MONGO_URI.strip()
client = MongoClient(MONGO_URI)
db = client.get_database()

LANGUAGES = ['fi', 'sv', 'no', 'da', 'et', 'de', 'nl', 'fr', 'pl', 'es', 'it', 'pt', 'el', 'tr', 'jp', 'ar']
LANG_MAP = {'jp': 'ja'}

def translate_text(text, target_lang):
    api_lang = LANG_MAP.get(target_lang, target_lang)
    try:
        translated = GoogleTranslator(source='auto', target=api_lang).translate(text)
        return translated
    except:
        return text

def fix_missing_left():
    print("Updating 'left' label for all languages...")
    doc = db.pagecontents.find_one({'page': 'products'})
    if not doc:
        return
    translations = doc.get('translations', {})
    for lang in LANGUAGES:
        lang_trans = translations.get(lang, {})
        if 'left' not in lang_trans or lang_trans['left'] == 'left':
            print(f"Translating 'left' for {lang}...")
            lang_trans['left'] = translate_text('left', lang)
            if lang == 'fi': lang_trans['left'] = 'jäljellä'
            translations[lang] = lang_trans
            time.sleep(0.3)
    db.pagecontents.update_one({'_id': doc['_id']}, {'$set': {'translations': translations}})
    print("✅ 'left' label updated.")

if __name__ == "__main__":
    fix_missing_left()
    client.close()
