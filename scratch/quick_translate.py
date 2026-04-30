import os
from pymongo import MongoClient
from deep_translator import GoogleTranslator
from dotenv import load_dotenv
import time

load_dotenv(dotenv_path='./server/.env')
client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database()
pages = db.pagecontents

LANGUAGES = ['fi', 'sv', 'ar', 'de'] # Key languages for quick demo

def quick_translate(page_name):
    page = pages.find_one({'page': page_name})
    if not page: return
    content = page.get('content', {})
    translations = page.get('translations', {})
    
    for lang in LANGUAGES:
        print(f"Quick translating {page_name} to {lang}...")
        lang_trans = {}
        for k, v in content.items():
            if isinstance(v, str):
                lang_trans[k] = GoogleTranslator(source='auto', target=lang).translate(v)
                time.sleep(0.3)
            else:
                lang_trans[k] = v
        translations[lang] = lang_trans
    
    pages.update_one({'_id': page['_id']}, {'$set': {'translations': translations}})

# Prioritize Home sections
quick_translate('home_hero')
quick_translate('home_microgreens')
quick_translate('home_benefits')
quick_translate('home_cta')
print("Priority Home sections translated.")
client.close()
