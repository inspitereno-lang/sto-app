import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))

MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.get_database()
pages_col = db.pagecontents

def fix_all_fi():
    print("--- Final Quality Audit Fix (Finnish) ---")
    
    # 1. Cart
    pages_col.update_one({'page': 'cart'}, {'$set': {
        'translations.fi.total': 'Yhteensä',
        'translations.fi.checkout': 'Jatka kassalle',
        'translations.fi.remove': 'Poista',
        'translations.fi.update': 'Päivitä'
    }})
    
    # 2. Checkout
    pages_col.update_one({'page': 'checkout'}, {'$set': {
        'translations.fi.place': 'Vahvista tilaus',
        'translations.fi.shippingFee': 'Toimituskulut (Suomi)'
    }})
    
    # 3. Hero
    pages_col.update_one({'page': 'home_hero'}, {'$set': {
        'translations.fi.cta2': 'Tutustu Saana Tuotantoon',
        'translations.fi.badge3': 'Vantaa, Suomi'
    }})

    # 4. Global H2O to STO fix in translations
    # I'll iterate through all pagecontents and replace h2o with STO in all translations
    print("Purging remaining H2O mentions...")
    all_pages = pages_col.find({})
    for doc in all_pages:
        trans = doc.get('translations', {})
        if not trans: continue
        
        changed = False
        import re
        
        def replace_h2o(obj):
            nonlocal changed
            if isinstance(obj, str):
                new_str = re.sub(r'\bh2o\b', 'STO', obj, flags=re.IGNORECASE)
                if new_str != obj:
                    changed = True
                    return new_str
                return obj
            elif isinstance(obj, dict):
                return {k: replace_h2o(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [replace_h2o(x) for x in obj]
            return obj
            
        new_trans = replace_h2o(trans)
        if changed:
            pages_col.update_one({'_id': doc['_id']}, {'$set': {'translations': new_trans}})
            
    print("✅ Quality Audit Fix Complete.")

if __name__ == "__main__":
    fix_all_fi()
    client.close()
