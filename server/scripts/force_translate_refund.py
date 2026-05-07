import os
import time
from pymongo import MongoClient
from deep_translator import GoogleTranslator
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')
client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database()

LANGUAGES = ['fi', 'sv', 'no', 'da', 'et', 'de', 'nl', 'fr', 'pl', 'es', 'it', 'pt', 'el', 'tr', 'jp', 'ar']

def translate_any(val, lang):
    if isinstance(val, str):
        try:
            return GoogleTranslator(source='en', target=lang).translate(val)
        except:
            return val
    elif isinstance(val, list):
        return [translate_any(item, lang) for item in val]
    elif isinstance(val, dict):
        new_dict = {}
        for k, v in val.items():
            new_dict[k] = translate_any(v, lang)
        return new_dict
    return val

def force_translate_refund():
    print("Force translating Refund & Return Policy...")
    pages = db.pagecontents
    page = pages.find_one({'page': 'returns_page'})
    if not page:
        print("Page 'returns_page' not found.")
        return

    content = page.get('content', {})
    # Update title to what user requested
    content['title'] = "Refund & Return Policy"
    
    translations = {}
    for lang in LANGUAGES:
        print(f"  to {lang}...")
        translations[lang] = translate_any(content, lang)
        time.sleep(0.5)
    
    pages.update_one({'_id': page['_id']}, {'$set': {'content': content, 'translations': translations}})
    print("Refund & Return Policy updated and translated in all languages.")

if __name__ == "__main__":
    force_translate_refund()
