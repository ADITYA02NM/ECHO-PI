# ECHO-Pi: Offline Emergency & Education Assistant

ECHO-Pi is a comprehensive offline assistant designed for emergency situations and educational support in connectivity-deprived areas. It features an offline English-to-Kannada translator, an AI chat assistant with educational presets, SOS emergency alerts, and access to offline resources like Wikipedia and Maps.

## 🚀 Features

-   **Offline Translator**: Translates English text to Kannada using a local AI model (`Helsinki-NLP/opus-mt-en-dra`), functioning completely without internet.
-   **Offline AI Assistant**: A chat interface with preset educational questions (e.g., "What is photosynthesis?") that provides instant answers.
-   **SOS Emergency Alert**: A dedicated SOS button that triggers an alert counter on the Admin Dashboard.
-   **Admin Dashboard**: A secure area to view system stats, including the total number of SOS alerts triggered.
-   **Offline Resources**: Integration with offline Wikipedia and Maps (via external links/services).
-   **Responsive Design**: Built with React and Tailwind CSS for a seamless experience on various devices.

## 🎥 Demo

![Project Demo](ScreenRecording.mp4)

## 🛠️ Tech Stack

-   **Frontend**: React, Vite, TypeScript, Tailwind CSS, Shadcn UI.
-   **Backend**: Python, Flask.
-   **AI Model**: Hugging Face Transformers (`Helsinki-NLP/opus-mt-en-dra`).
-   **Database**: In-memory storage for demo purposes (SOS counters).

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js** (v18 or higher)
-   **Python** (v3.8 or higher)
-   **Git**

## ⚙️ Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ADITYA02NM/ECHO-PI.git
    cd ECHO-PI
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Backend & Offline Translator:**
    *   Create a virtual environment:
        ```bash
        python3 -m venv offline_translator/venv
        ```
    *   Activate the virtual environment:
        *   **Mac/Linux:** `source offline_translator/venv/bin/activate`
        *   **Windows:** `offline_translator\venv\Scripts\activate`
    *   Install Python dependencies:
        ```bash
        pip install -r offline_translator/requirements.txt
        pip install flask flask-cors
        ```
    *   **Download the Translation Model:**
        (This requires internet access for the initial setup only)
        ```bash
        python offline_translator/setup_model.py
        ```

## 🏃‍♂️ Running the Application

You need to run the backend and frontend in **two separate terminal windows**.

### Terminal 1: Backend Server
Starts the Flask server for the translator and SOS API on port `5001`.

```bash
# Make sure your virtual environment is activated
# source offline_translator/venv/bin/activate

./offline_translator/venv/bin/python server.py
```

### Terminal 2: Frontend Application
Starts the React application on port `8080` (or similar).

```bash
npm run dev
```

Open your browser and navigate to the URL shown in the terminal (usually `http://localhost:8080`).

## 📖 Usage Guide

### 1. Translator
-   Navigate to the **Translator** page.
-   Type English text into the input box.
-   Click **Translate** to see the Kannada translation.
-   *Note: The backend server must be running for this to work.*

### 2. AI Assistant (Chat)
-   Navigate to the **AI Assistant** page.
-   Click on any of the **preset questions** (e.g., "Define gravity") to get an instant answer.
-   *Note: Custom queries will attempt to hit the backend but currently only presets are fully supported for the demo.*

### 3. SOS Alert
-   On the **Home** page, click the red **SOS Button** at the bottom.
-   This sends an alert to the backend.
-   To verify, go to **Settings > Switch to Admin Mode** (Login required).
-   The **Admin Dashboard** will show the updated "Total SOS Alerts" count.

## 📂 Project Structure

```
ECHO-PI/
├── offline_translator/     # Python backend & translator logic
│   ├── venv/               # Virtual environment (not in git)
│   ├── model/              # Downloaded AI model (not in git)
│   ├── translator.py       # Translator class
│   └── setup_model.py      # Script to download model
├── src/                    # React Frontend source code
│   ├── components/         # Reusable UI components
│   ├── pages/              # App pages (Home, Chat, Translator, Admin)
│   └── ...
├── server.py               # Flask API server (entry point for backend)
├── package.json            # Frontend dependencies
└── README.md               # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

