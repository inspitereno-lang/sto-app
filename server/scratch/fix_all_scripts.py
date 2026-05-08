import os

scripts_dir = '/Users/renoroy/Desktop/H2O 2/server/scripts'
files = [f for f in os.listdir(scripts_dir) if f.endswith('.py')]

for filename in files:
    filepath = os.path.join(scripts_dir, filename)
    with open(filepath, 'r') as f:
        content = f.read()
    
    if 'os.getenv("MONGO_URI")' in content:
        # Replace os.getenv("MONGO_URI") with os.getenv("MONGO_URI").strip() if exists
        # Or better, add a check if it's not None
        if 'MONGO_URI = os.getenv("MONGO_URI")' in content:
            new_content = content.replace(
                'MONGO_URI = os.getenv("MONGO_URI")',
                'MONGO_URI = os.getenv("MONGO_URI")\nif MONGO_URI: MONGO_URI = MONGO_URI.strip()'
            )
            # Prevent double addition
            if 'if MONGO_URI: MONGO_URI = MONGO_URI.strip()\nif MONGO_URI: MONGO_URI = MONGO_URI.strip()' not in new_content:
                with open(filepath, 'w') as f:
                    f.write(new_content)
                print(f"Fixed {filename}")

print("Done fixing scripts.")
