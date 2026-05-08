import os
import time
import re
from pymongo import MongoClient
from deep_translator import GoogleTranslator
from dotenv import load_dotenv

# Load environment variables from the server directory
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))

MONGO_URI = os.getenv("MONGO_URI")
if MONGO_URI: MONGO_URI = MONGO_URI.strip()
if not MONGO_URI:
    print("MONGO_URI not found in environment variables.")
    exit(1)

client = MongoClient(MONGO_URI)
db = client.get_database()
pages_col = db.pagecontents

# Target languages (matching frontend keys)
LANGUAGES = ['fi', 'sv', 'no', 'da', 'et', 'de', 'nl', 'fr', 'pl', 'es', 'it', 'pt', 'el', 'tr', 'jp', 'ar']

# Map frontend keys to deep-translator codes if they differ
LANG_MAP = {
    'jp': 'ja',
}

# Priority Home Page sections to translate
HOME_SECTIONS = [
    'home_hero',
    'home_microgreens',
    'home_benefits',
    'home_sustainability',
    'home_process',
    'home_testimonials',
    'home_cta'
]

def translate_text(text, target_lang):
    if not text or not isinstance(text, str) or not text.strip():
        return text
    
    # Use mapped code if exists
    api_lang = LANG_MAP.get(target_lang, target_lang)
    
    try:
        translated = GoogleTranslator(source='auto', target=api_lang).translate(text)
        if translated:
            # Post-process: Ensure H2O is replaced with STO for branding consistency
            translated = re.sub(r'\bh2o\b', 'STO', translated, flags=re.IGNORECASE)
        return translated
    except Exception as e:
        print(f"Error translating to {target_lang}: {e}")
        return None

def translate_recursive(data, lang):
    """Recursively translate strings in dictionaries or lists."""
    if isinstance(data, str):
        return translate_text(data, lang)
    elif isinstance(data, list):
        return [translate_recursive(item, lang) for item in data]
    elif isinstance(data, dict):
        return {k: translate_recursive(v, lang) for k, v in data.items()}
    return data

def process_priority_translations():
    print(f"Starting priority translations for {len(HOME_SECTIONS)} home sections...")
    
    for page_name in HOME_SECTIONS:
        page_doc = pages_col.find_one({'page': page_name})
        
        if not page_doc:
            print(f"Skipping: Page '{page_name}' not found in database.")
            continue
            
        print(f"\n--- Processing '{page_name}' ---")
        content = page_doc.get('content', {})
        translations = page_doc.get('translations', {})
        
        updated = False
        for lang in LANGUAGES:
            # Check if translation for this language is missing or incomplete
            # (We check for existence of the lang key)
            if lang not in translations:
                print(f"Translating '{page_name}' to {lang}...")
                translated_content = translate_recursive(content, lang)
                
                if translated_content:
                    translations[lang] = translated_content
                    updated = True
                    # Small delay to prevent hitting rate limits
                    time.sleep(0.4)
            else:
                print(f"Skipping {lang} for '{page_name}' (already exists).")
        
        if updated:
            pages_col.update_one(
                {'_id': page_doc['_id']},
                {'$set': {'translations': translations}}
            )
            print(f"✅ Successfully updated '{page_name}' in database.")
        else:
            print(f"ℹ️ No updates needed for '{page_name}'.")

if __name__ == "__main__":
    start_time = time.time()
    try:
        process_priority_translations()
        print(f"\nAll priority translations completed in {round(time.time() - start_time, 2)} seconds.")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        client.close()
