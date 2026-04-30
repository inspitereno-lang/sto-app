import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '../server/.env'))

MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    print("MONGO_URI not found.")
    exit(1)

client = MongoClient(MONGO_URI)
db = client.get_database()

collections = ['blogs', 'products', 'categories', 'pagecontents']
for coll_name in collections:
    count = db[coll_name].count_documents({})
    print(f"{coll_name}: {count}")

client.close()
