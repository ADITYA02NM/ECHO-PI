from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import os

# Define model name and local path
MODEL_NAME = "Helsinki-NLP/opus-mt-en-dra"
LOCAL_MODEL_PATH = "./model"

def download_and_save_model():
    print(f"Downloading model: {MODEL_NAME}...")
    
    # Load tokenizer and model
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
    
    # Save to local directory
    print(f"Saving model to {LOCAL_MODEL_PATH}...")
    if not os.path.exists(LOCAL_MODEL_PATH):
        os.makedirs(LOCAL_MODEL_PATH)
        
    tokenizer.save_pretrained(LOCAL_MODEL_PATH)
    model.save_pretrained(LOCAL_MODEL_PATH)
    
    print("Model saved successfully!")

if __name__ == "__main__":
    download_and_save_model()
