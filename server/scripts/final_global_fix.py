import os
import time
import re
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
    if not text or not isinstance(text, str) or not text.strip():
        return text
    api_lang = LANG_MAP.get(target_lang, target_lang)
    try:
        translated = GoogleTranslator(source='auto', target=api_lang).translate(text)
        if translated:
            translated = re.sub(r'\bh2o\b', 'STO', translated, flags=re.IGNORECASE)
            if target_lang == 'fi':
                # Force specific Finnish terms
                translated = re.sub(r'Microgreens', 'Mikrovihreät', translated, flags=re.IGNORECASE)
                translated = re.sub(r'Accessories', 'Lisävarusteet', translated, flags=re.IGNORECASE)
                translated = re.sub(r'World', 'Maailma', translated, flags=re.IGNORECASE)
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

def final_global_fix():
    print("--- Starting Final Global Fix ---")
    
    # 1. Fix Categories (ensure Finnish translations for Accessories/World and fix Microgreens)
    print("\nFixing Categories...")
    for cat in db.categories.find():
        translations = cat.get('translations', {})
        # We re-translate Finnish specifically to ensure terms are correct
        print(f"Updating Finnish for category: {cat.get('name')}")
        translations['fi'] = {
            'name': translate_text(cat.get('name'), 'fi'),
            'description': translate_text(cat.get('description'), 'fi')
        }
        db.categories.update_one({'_id': cat['_id']}, {'$set': {'translations': translations}})

    # 2. Fix Products (ensure Microgreens -> Mikrovihreät in Finnish)
    print("\nFixing Products (Finnish)...")
    for prod in db.products.find():
        translations = prod.get('translations', {})
        print(f"Updating Finnish for product: {prod.get('name')}")
        translations['fi'] = {
            'name': translate_text(prod.get('name'), 'fi'),
            'shortDescription': translate_text(prod.get('shortDescription'), 'fi'),
            'description': translate_text(prod.get('description'), 'fi'),
            'flavorNotes': translate_text(prod.get('flavorNotes'), 'fi')
        }
        db.products.update_one({'_id': prod['_id']}, {'$set': {'translations': translations}})

    # 3. Ensure Home Microgreens is correctly translated (already being handled by current script, but we'll double check)
    print("\nDouble-checking Home Microgreens...")
    # (The background script is already doing this, so we'll just wait for it or this script will override it with correct terms)
    doc = db.pagecontents.find_one({'page': 'home_microgreens'})
    if doc:
        translations = doc.get('translations', {})
        translations['fi'] = translate_recursive(doc.get('content', {}), 'fi')
        db.pagecontents.update_one({'_id': doc['_id']}, {'$set': {'translations': translations}})

    print("\n✅ Final Global Fix Completed.")

if __name__ == "__main__":
    final_global_fix()
    client.close()
