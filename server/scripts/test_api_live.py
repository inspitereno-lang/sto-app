from deep_translator import GoogleTranslator
import re

def translate_text(text, target_lang):
    try:
        translated = GoogleTranslator(source='auto', target=target_lang).translate(text)
        if translated:
            translated = re.sub(r'h2o', 'STO', translated, flags=re.IGNORECASE)
        return translated
    except Exception as e:
        return f"Error: {e}"

test_text = "Welcome to H2O Digital. We provide fresh water and tech."
langs_to_test = ['fi', 'sv', 'es', 'ja']

print(f"Original: {test_text}\n")
for lang in langs_to_test:
    res = translate_text(test_text, lang)
    print(f"[{lang}]: {res}")
