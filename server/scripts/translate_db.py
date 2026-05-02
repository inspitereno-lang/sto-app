import os
import time
from pymongo import MongoClient
from deep_translator import GoogleTranslator
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    print("MONGO_URI not found in environment variables.")
    exit(1)

client = MongoClient(MONGO_URI)
db = client.get_database()

# Target languages (matching frontend keys)
LANGUAGES = ['fi', 'sv', 'no', 'da', 'et', 'de', 'nl', 'fr', 'pl', 'es', 'it', 'pt', 'el', 'tr', 'jp', 'ar']

# Map frontend keys to deep-translator codes if they differ
LANG_MAP = {
    'jp': 'ja',
    # 'zh': 'zh-CN',
}

translator = GoogleTranslator(source='en')

def translate_text(text, target_lang):
    if not text or not text.strip():
        return ""
    
    # Use mapped code if exists
    api_lang = LANG_MAP.get(target_lang, target_lang)
    
    try:
        translated = GoogleTranslator(source='auto', target=api_lang).translate(text)
        if translated:
            # Post-process: Replace H2O with STO (case-insensitive)
            import re
            translated = re.sub(r'h2o', 'STO', translated, flags=re.IGNORECASE)
        return translated
    except Exception as e:
        print(f"Error translating to {target_lang}: {e}")
        return None

def translate_blogs():
    print("Processing Blogs...")
    blogs = db.blogs
    for blog in blogs.find():
        translations = blog.get('translations', {})
        updated = False
        
        for lang in LANGUAGES:
            if lang not in translations or not translations[lang].get('title'):
                print(f"Translating blog '{blog.get('title')}' to {lang}...")
                
                title_trans = translate_text(blog.get('title'), lang)
                content_trans = translate_text(blog.get('content'), lang)
                excerpt_trans = translate_text(blog.get('excerpt'), lang)
                
                # Translate tags if they exist
                tags = blog.get('tags', [])
                tags_trans = [translate_text(tag, lang) for tag in tags]
                
                if title_trans:
                    translations[lang] = {
                        'title': title_trans,
                        'content': content_trans,
                        'excerpt': excerpt_trans,
                        'tags': tags_trans
                    }
                    updated = True
                    # Small delay to prevent rate limiting
                    time.sleep(0.5)
        
        # Always set status to completed after checking all languages
        blogs.update_one({'_id': blog['_id']}, {'$set': {'translations': translations, 'translationStatus': 'completed'}})
        if updated:
            print(f"Updated translations for blog: {blog.get('title')}")

def translate_products():
    print("Processing Products...")
    products = db.products
    for product in products.find():
        translations = product.get('translations', {})
        updated = False
        
        for lang in LANGUAGES:
            if lang not in translations or not translations[lang].get('name'):
                print(f"Translating product '{product.get('name')}' to {lang}...")
                
                name_trans = translate_text(product.get('name'), lang)
                s_desc_trans = translate_text(product.get('shortDescription'), lang)
                desc_trans = translate_text(product.get('description'), lang)
                flavor_trans = translate_text(product.get('flavorNotes'), lang)
                
                if name_trans:
                    translations[lang] = {
                        'name': name_trans,
                        'shortDescription': s_desc_trans,
                        'description': desc_trans,
                        'flavorNotes': flavor_trans
                    }
                    updated = True
                    # Small delay to prevent rate limiting
                    time.sleep(0.5)
        
        # Always set status to completed after checking all languages
        products.update_one({'_id': product['_id']}, {'$set': {'translations': translations, 'translationStatus': 'completed'}})
        if updated:
            print(f"Updated translations for product: {product.get('name')}")

def translate_categories():
    print("Processing Categories...")
    categories = db.categories
    for cat in categories.find():
        translations = cat.get('translations', {})
        updated = False
        
        for lang in LANGUAGES:
            if lang not in translations or not translations[lang].get('name'):
                print(f"Translating category '{cat.get('name')}' to {lang}...")
                
                name_trans = translate_text(cat.get('name'), lang)
                desc_trans = translate_text(cat.get('description'), lang)
                
                if name_trans:
                    translations[lang] = {
                        'name': name_trans,
                        'description': desc_trans
                    }
                    updated = True
                    time.sleep(0.5)
        
        if updated:
            categories.update_one({'_id': cat['_id']}, {'$set': {'translations': translations}})
            print(f"Updated translations for category: {cat.get('name')}")

def translate_any(val, lang):
    if isinstance(val, str):
        trans = translate_text(val, lang)
        time.sleep(0.3) # Faster sleep
        return trans if trans else val
    elif isinstance(val, list):
        return [translate_any(item, lang) for item in val]
    elif isinstance(val, dict):
        new_dict = {}
        for k, v in val.items():
            new_dict[k] = translate_any(v, lang)
        return new_dict
    return val

def translate_pages():
    print("Processing Pages...")
    pages = db.pagecontents
    for page in pages.find():
        translations = page.get('translations', {})
        content = page.get('content', {})
        updated = False
        
        for lang in LANGUAGES:
            if lang not in translations:
                print(f"Translating page '{page.get('page')}' to {lang}...")
                translations[lang] = translate_any(content, lang)
                updated = True
        
        if updated:
            pages.update_one({'_id': page['_id']}, {'$set': {'translations': translations}})
            print(f"Updated translations for page: {page.get('page')}")

if __name__ == "__main__":
    translate_blogs()
    translate_products()
    translate_categories()
    translate_pages()
    print("Translation process completed.")
    client.close()
