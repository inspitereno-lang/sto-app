import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../.env'))

MONGO_URI = os.getenv("MONGO_URI")
if MONGO_URI: MONGO_URI = MONGO_URI.strip()
client = MongoClient(MONGO_URI)
db = client.get_database()
pages_col = db.pagecontents

def fix_footer():
    print("--- Fixing Footer Translations (Finnish) ---")
    doc = pages_col.find_one({'page': 'footer'})
    if not doc: return
    
    translations = doc.get('translations', {})
    
    # Finnish Fixes
    translations['fi'] = {
        "tagline": "Ensiluokkaista kaupunkiviljelyä moderniin elämäntapaan.",
        "address": "Vantaa, Suomi",
        "businessId": "Y-tunnus: 3617994-6",
        "explore": "Tutustu",
        "policies": "Käytännöt",
        "shop": "Kauppa",
        "about": "Meistä",
        "blog": "Blogi",
        "feedback": "Palaute",
        "faq": "UKK",
        "contact": "Ota yhteyttä",
        "terms": "Käyttöehdot",
        "privacy": "Tietosuojaseloste",
        "returns": "Hyvitys- ja palautuskäytäntö",
        "ctaTitle": "Onko kysyttävää?",
        "ctaSub": "Tarvitsetko apua tilauksesi kanssa tai haluatko tietää lisää tuotteistamme?",
        "contactBtn": "Ota yhteyttä",
        "copy": "© 2026 Saana Tuotanto - Kestävä kaupunkiviljely.",
        "admin": "Ylläpito"
    }
    
    pages_col.update_one({'_id': doc['_id']}, {'$set': {'translations': translations}})
    print("✅ Footer Finnish translations fixed.")

if __name__ == "__main__":
    fix_footer()
    client.close()
