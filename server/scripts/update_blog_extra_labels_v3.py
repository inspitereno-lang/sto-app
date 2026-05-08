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

def update_blog_extra_labels_v3():
    print("Updating extra Blog labels (v3) for all languages...")
    doc = pages_col.find_one({'page': 'blog_page'})
    if not doc:
        return
        
    translations = doc.get('translations', {})
    new_keys = {
        'loading': 'Loading article...',
        'notFound': 'Article Not Found',
        'notFoundSub': "The article you are looking for doesn't exist or has been moved."
    }
    
    for lang in LANGUAGES:
        print(f"Translating v3 labels for {lang}...")
        lang_trans = translations.get(lang, {})
        for k, v in new_keys.items():
            if k not in lang_trans:
                lang_trans[k] = translate_text(v, lang)
        
        # Specific Finnish overrides
        if lang == 'fi':
            lang_trans['loading'] = 'Ladataan artikkelia...'
            lang_trans['notFound'] = 'Artikkelia ei löytynyt'
            lang_trans['notFoundSub'] = 'Etsimääsi artikkelia ei ole olemassa tai se on siirretty.'
            
        translations[lang] = lang_trans
        time.sleep(0.3)
        
    pages_col.update_one({'_id': doc['_id']}, {'$set': {'translations': translations}})
    print("✅ Extra Blog labels (v3) updated.")

if __name__ == "__main__":
    update_blog_extra_labels_v3()
    client.close()
