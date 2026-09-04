import json
import joblib
import pandas as pd

from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
MODEL_DIR = BASE_DIR / "models"

model = joblib.load(MODEL_DIR / "lifestyle_model.pkl")

with open(MODEL_DIR / "lifestyle_metadata.json") as f:
    metadata = json.load(f)

THRESHOLD = metadata["threshold"]


def predict_lifestyle(data: dict):

    # Raw user input
    df = pd.DataFrame([data])

    # Model already contains preprocessing
    score = float(model.predict_proba(df)[0][1])

    prediction = int(score >= THRESHOLD)

    risk = "Higher Concern" if prediction == 1 else "Lower Concern"

    return {
        "risk": risk,
        "prediction": prediction,
        "score": round(score, 4)
    }