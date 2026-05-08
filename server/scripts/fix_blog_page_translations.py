import os
import time
import re
from pymongo import MongoClient
from deep_translator import GoogleTranslator
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.get_database()
pages_col = db.pagecontents

LANGUAGES = ['fi', 'sv', 'no', 'da', 'et', 'de', 'nl', 'fr', 'pl', 'es', 'it', 'pt', 'el', 'tr', 'jp', 'ar']
LANG_MAP = {'jp': 'ja'}

def translate_text(text, target_lang):
    if not text or not isinstance(text, str) or not text.strip():
        return text
    api_lang = LANG_MAP.get(target_lang, target_lang)
    try:
        translated = GoogleTranslator(source='auto', target=api_lang).translate(text)
        if translated:
            translated = re.sub(r'\bh2o\b', 'STO', translated, flags=re.IGNORECASE)
            # Special handling for "STO Journal" - keeping branding but translating "Journal"
            if "STO Journal" in text or "The STO Journal" in text:
                # If the translator tried to translate the whole thing, make sure STO is there
                if "STO" not in translated:
                    translated = "STO " + translated
        return translated
    except Exception as e:
        print(f"Error translating to {target_lang}: {e}")
        return text

def translate_recursive(data, lang):
    if isinstance(data, str):
        return translate_text(data, lang)
    elif isinstance(data, list):
        return [translate_recursive(item, lang) for item in data]
    elif isinstance(data, dict):
        return {k: translate_recursive(v, lang) for k, v in data.items()}
    return data

def fix_blog_page():
    print("--- Fixing Blog Page Translations (STO Journal) ---")
    page_name = 'blog_page'
    page_doc = pages_col.find_one({'page': page_name})
    
    if not page_doc:
        print(f"Skipping: {page_name} not found.")
        return
        
    content = page_doc.get('content', {})
    translations = {}
    
    for lang in LANGUAGES:
        print(f"Translating '{page_name}' to {lang}...")
        translations[lang] = translate_recursive(content, lang)
        time.sleep(0.4)
        
    pages_col.update_one(
        {'_id': page_doc['_id']},
        {'$set': {'translations': translations}}
    )
    print(f"✅ Successfully updated '{page_name}' in database.")

if __name__ == "__main__":
    fix_blog_page()
    client.close()
