import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))

MONGO_URI = os.getenv("MONGO_URI")
if MONGO_URI: MONGO_URI = MONGO_URI.strip()

client = MongoClient(MONGO_URI)
db = client.get_database()

LANGUAGES = ['fi', 'sv', 'no', 'da', 'et', 'de', 'nl', 'fr', 'pl', 'es', 'it', 'pt', 'el', 'tr', 'jp', 'ar']

def audit_translations(collection_name):
    print(f"\nAuditing {collection_name}...")
    collection = db[collection_name]
    total = collection.count_documents({})
    translated = 0
    missing_langs = {}

    for doc in collection.find():
        translations = doc.get('translations', {})
        if not translations:
            missing_langs[doc.get('name', doc.get('title', doc.get('page', 'Unknown')))] = "All"
            continue
        
        doc_missing = []
        for lang in LANGUAGES:
            if lang not in translations:
                doc_missing.append(lang)
        
        if not doc_missing:
            translated += 1
        else:
            missing_langs[doc.get('name', doc.get('title', doc.get('page', 'Unknown')))] = doc_missing

    print(f"Total documents: {total}")
    print(f"Fully translated: {translated}")
    if missing_langs:
        print("Missing translations for:")
        for name, langs in list(missing_langs.items())[:5]: # Show first 5
            print(f"  - {name}: {langs}")
        if len(missing_langs) > 5:
            print(f"  ... and {len(missing_langs) - 5} more.")

if __name__ == "__main__":
    audit_translations('blogs')
    audit_translations('products')
    audit_translations('categories')
    audit_translations('pagecontents')
    client.close()
