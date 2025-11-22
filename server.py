from flask import Flask, request, jsonify
from flask_cors import CORS
from offline_translator.translator import OfflineTranslator
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize translator
# Ensure we are in the correct directory to find the model
# The model path in translator.py is relative ("./model"), so we need to be careful where we run this from.
# Best to run from project root.
try:
    translator = OfflineTranslator(model_path="./model")
except Exception as e:
    print(f"Error loading model: {e}")
    translator = None

# Global stats
sos_counter = 0

@app.route('/translate', methods=['POST'])
def translate_text():
    if not translator:
        return jsonify({"error": "Translator model not loaded"}), 500

    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "No text provided"}), 400

    text = data['text']
    # Default to Kannada (>>kan<<) as per our translator implementation
    # We can ignore source/target from request for now as this is a specific En->Kn translator
    
    try:
        translated_text = translator.translate(text)
        return jsonify({"translated_text": translated_text})
    except Exception as e:
        print(f"Translation error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/sos/alert', methods=['POST'])
def trigger_sos():
    global sos_counter
    sos_counter += 1
    return jsonify({"status": "alert_received", "total_alerts": sos_counter})

@app.route('/admin/stats', methods=['GET'])
def get_stats():
    return jsonify({
        "totalSOS": sos_counter,
        "lastSOS": "Just now" if sos_counter > 0 else "N/A",
        "nodeStatus": "Active"
    })

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "ok", "model_loaded": translator is not None})

if __name__ == '__main__':
    print("Starting Flask server on port 5001...")
    app.run(host='0.0.0.0', port=5001, debug=True)
