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

def update_blog_extra_labels():
    print("Updating extra Blog labels for all languages...")
    doc = pages_col.find_one({'page': 'blog_page'})
    if not doc:
        return
        
    translations = doc.get('translations', {})
    new_keys = {
        'experienceFreshness': 'Experience the Freshness',
        'elevateNutrition': 'Explore our full range of organic, sustainably grown microgreens and elevate your daily nutrition.',
        'premiumUrbanAg': 'Premium urban agriculture straight from our Helsinki vertical farm.',
        'shopMicrogreens': 'Shop Microgreens'
    }
    
    for lang in LANGUAGES:
        print(f"Translating new labels for {lang}...")
        lang_trans = translations.get(lang, {})
        for k, v in new_keys.items():
            if k not in lang_trans:
                lang_trans[k] = translate_text(v, lang)
        
        # Specific Finnish overrides for quality
        if lang == 'fi':
            lang_trans['experienceFreshness'] = 'Koe tuoreus'
            lang_trans['elevateNutrition'] = 'Tutustu laajaan luomumikrovihreiden valikoimaamme ja paranna päivittäistä ravitsemustasi.'
            lang_trans['premiumUrbanAg'] = 'Ensiluokkaista kaupunkiviljelyä suoraan Helsingin pystyfarmiltamme.'
            lang_trans['shopMicrogreens'] = 'Osta mikrovihreitä'
            
        translations[lang] = lang_trans
        time.sleep(0.3)
        
    pages_col.update_one({'_id': doc['_id']}, {'$set': {'translations': translations}})
    print("✅ Extra Blog labels updated.")

if __name__ == "__main__":
    update_blog_extra_labels()
    client.close()
