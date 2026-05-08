import os
import time
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
    api_lang = LANG_MAP.get(target_lang, target_lang)
    try:
        translated = GoogleTranslator(source='auto', target=api_lang).translate(text)
        return translated
    except:
        return text

def update_nav_logout():
    print("Updating 'logout' label in Nav for all languages...")
    doc = pages_col.find_one({'page': 'nav'})
    if not doc: return
    
    translations = doc.get('translations', {})
    for lang in LANGUAGES:
        lang_trans = translations.get(lang, {})
        if 'logout' not in lang_trans:
            print(f"Translating 'logout' for {lang}...")
            lang_trans['logout'] = translate_text('Logout', lang)
            if lang == 'fi': lang_trans['logout'] = 'Kirjaudu ulos'
            translations[lang] = lang_trans
            time.sleep(0.3)
            
    pages_col.update_one({'_id': doc['_id']}, {'$set': {'translations': translations}})
    print("✅ 'logout' label updated in Nav.")

def update_contact_email():
    print("Updating contact email to admin@saanatuotanto.com...")
    # Update content
    pages_col.update_one({'page': 'contact_page'}, {'$set': {'content.emailVal': 'admin@saanatuotanto.com'}})
    
    # Update all translations
    doc = pages_col.find_one({'page': 'contact_page'})
    translations = doc.get('translations', {})
    for lang in LANGUAGES:
        if lang in translations:
            translations[lang]['emailVal'] = 'admin@saanatuotanto.com'
            
    pages_col.update_one({'page': 'contact_page'}, {'$set': {'translations': translations}})
    print("✅ Contact email updated.")

if __name__ == "__main__":
    update_nav_logout()
    update_contact_email()
    client.close()
