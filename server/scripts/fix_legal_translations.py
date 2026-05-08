import os
import time
from pymongo import MongoClient
from deep_translator import GoogleTranslator
from dotenv import load_dotenv

load_dotenv(dotenv_path='../.env')
client = MongoClient(os.getenv("MONGO_URI"))
db = client.get_database()

LANGUAGES = ['fi', 'sv', 'no', 'da', 'et', 'de', 'nl', 'fr', 'pl', 'es', 'it', 'pt', 'el', 'tr', 'jp', 'ar']
TARGET_PAGES = ['footer', 'privacy_page', 'terms_page', 'returns_page']

def translate_any(val, lang):
    if isinstance(val, str):
        try:
            # For Finnish, we want to be extra careful
            return GoogleTranslator(source='en', target=lang).translate(val)
        except Exception as e:
            print(f"Error translating: {e}")
            return val
    elif isinstance(val, list):
        return [translate_any(item, lang) for item in val]
    elif isinstance(val, dict):
        new_dict = {}
        for k, v in val.items():
            new_dict[k] = translate_any(v, lang)
        return new_dict
    return val

def fix_legal_translations():
    print("Fixing legal and footer translations...")
    pages = db.pagecontents
    
    for page_name in TARGET_PAGES:
        page = pages.find_one({'page': page_name})
        if not page:
            print(f"Page '{page_name}' not found.")
            continue

        print(f"Processing page: {page_name}")
        content = page.get('content', {})
        translations = page.get('translations', {})
        
        # We will FORCE update Finnish (fi) and also check others
        for lang in LANGUAGES:
            print(f"  Updating {lang}...")
            translations[lang] = translate_any(content, lang)
            time.sleep(0.4)
        
        pages.update_one({'_id': page['_id']}, {'$set': {'translations': translations}})
        print(f"Finished {page_name}")

if __name__ == "__main__":
    fix_legal_translations()
