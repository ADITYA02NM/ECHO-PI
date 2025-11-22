from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import sys
import os

# Path to the locally saved model
LOCAL_MODEL_PATH = "./model"

class OfflineTranslator:
    def __init__(self, model_path=LOCAL_MODEL_PATH):
        print("Loading model from local storage...")
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model not found at {model_path}. Please run setup_model.py first.")
            
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = AutoModelForSeq2SeqLM.from_pretrained(model_path)
        print("Model loaded successfully.")

    def translate(self, text, tgt_lang="kan"):
        """
        Translates text from English to target language (default Kannada 'kan').
        For Helsinki-NLP/opus-mt-en-dra, we need to prepend the target language token.
        """
        # Prepend the target language token. 
        # The model expects something like ">>kan<< Hello world"
        formatted_text = f">>{tgt_lang}<< {text}"
        
        inputs = self.tokenizer(formatted_text, return_tensors="pt", padding=True)
        
        translated_tokens = self.model.generate(
            **inputs, 
            max_length=128
        )
        
        result = self.tokenizer.batch_decode(translated_tokens, skip_special_tokens=True)[0]
        return result

if __name__ == "__main__":
    translator = OfflineTranslator()
    
    if len(sys.argv) > 1:
        text_to_translate = " ".join(sys.argv[1:])
        print(f"Input: {text_to_translate}")
        translation = translator.translate(text_to_translate)
        print(f"Translation: {translation}")
    else:
        print("Enter text to translate (type 'quit' to exit):")
        while True:
            text = input("> ")
            if text.lower() == 'quit':
                break
            translation = translator.translate(text)
            print(f"Translation: {translation}")
