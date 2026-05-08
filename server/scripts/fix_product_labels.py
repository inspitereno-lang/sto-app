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

def fix_product_labels():
    print("Updating missing Product UI labels...")
    doc = db.pagecontents.find_one({'page': 'products'})
    if not doc:
        return
        
    translations = doc.get('translations', {})
    new_keys = {
        'newBadge': 'New',
        'featuredBadge': 'Featured',
        'viewDetails': 'View Details',
        'premiumWater': 'Premium Water',
        'luxuryCandles': 'Luxury Candles',
        'added': 'Added!'
    }
    
    for lang in LANGUAGES:
        print(f"Translating new labels for {lang}...")
        lang_trans = translations.get(lang, {})
        for k, v in new_keys.items():
            if k not in lang_trans or lang_trans[k] == v: # Only translate if missing or still in English
                lang_trans[k] = translate_text(v, lang)
        
        # Specific Finnish overrides
        if lang == 'fi':
            lang_trans['newBadge'] = 'Uusi'
            lang_trans['featuredBadge'] = 'Suositeltu'
            lang_trans['viewDetails'] = 'Katso tiedot'
            lang_trans['luxuryCandles'] = 'Ylelliset kynttilät'
            lang_trans['added'] = 'Lisätty!'
            
        translations[lang] = lang_trans
        time.sleep(0.3)
        
    db.pagecontents.update_one({'_id': doc['_id']}, {'$set': {'translations': translations}})
    print("✅ Product UI labels updated.")

    # Fix Artisan Microgreens Kit name in Finnish
    print("Fixing Artisan Microgreens Kit name...")
    db.products.update_one(
        {'name': 'Artisan Microgreens Kit'},
        {'$set': {'translations.fi.name': 'Artisan Mikrovihreät -pakkaus'}}
    )
    print("✅ Product name updated.")

if __name__ == "__main__":
    fix_product_labels()
    client.close()
