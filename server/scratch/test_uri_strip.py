import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Use absolute path to server/.env
current_dir = os.path.dirname(os.path.abspath(__file__))
env_path = os.path.join(current_dir, '../.env')
load_dotenv(dotenv_path=env_path)

# Simulate a URI with trailing spaces and newlines
RAW_URI = os.getenv("MONGO_URI")
if not RAW_URI:
    print("❌ Error: MONGO_URI not found in server/.env")
    exit(1)

DIRTY_URI = RAW_URI + "    \n   "
print(f"Testing with dirty URI (length {len(DIRTY_URI)})...")

# Apply the fix logic
CLEAN_URI = DIRTY_URI.strip()
print(f"Cleaned URI (length {len(CLEAN_URI)})...")

try:
    # Use a short timeout to fail fast if DNS is wrong
    client = MongoClient(CLEAN_URI, serverSelectionTimeoutMS=5000)
    db = client.get_database()
    # Ping the database
    db.command('ping')
    print("✅ Success! Connection established with cleaned URI.")
except Exception as e:
    print(f"❌ Failure: {e}")
finally:
    if 'client' in locals():
        client.close()
