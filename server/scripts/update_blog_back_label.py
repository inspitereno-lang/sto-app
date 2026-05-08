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
pages_col = db.pagecontents

LANGUAGES = ['fi', 'sv', 'no', 'da', 'et', 'de', 'nl', 'fr', 'pl', 'es', 'it', 'pt', 'el', 'tr', 'jp', 'ar']
LANG_MAP = {'jp': 'ja'}

def translate_text(text, target_lang):
    api_lang = LANG_MAP.get(target_lang, target_lang)
    try:
        translated = GoogleTranslator(source='auto', target=api_lang).translate(text)
        return translated
    except:
        return text

def update_back_to_journal():
    print("Updating 'backToJournal' label for all languages...")
    doc = pages_col.find_one({'page': 'blog_page'})
    if not doc: return
    
    translations = doc.get('translations', {})
    for lang in LANGUAGES:
        lang_trans = translations.get(lang, {})
        if 'backToJournal' not in lang_trans or lang_trans['backToJournal'] == 'Back to Journal':
            print(f"Translating 'backToJournal' for {lang}...")
            lang_trans['backToJournal'] = translate_text('Back to Journal', lang)
            if lang == 'fi': lang_trans['backToJournal'] = 'Takaisin Journaliin'
            translations[lang] = lang_trans
            time.sleep(0.3)
            
    pages_col.update_one({'_id': doc['_id']}, {'$set': {'translations': translations}})
    print("✅ 'backToJournal' label updated.")

if __name__ == "__main__":
    update_back_to_journal()
    client.close()
