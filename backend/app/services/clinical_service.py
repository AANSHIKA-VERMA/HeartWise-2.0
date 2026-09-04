import json
import joblib
import pandas as pd

from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[2]
MODEL_DIR = BASE_DIR / "models"

# Load saved clinical pipeline
model = joblib.load(MODEL_DIR / "clinical_model.pkl")

with open(MODEL_DIR / "clinical_metadata.json") as f:
    metadata = json.load(f)

THRESHOLD = metadata["threshold"]

# EXACT features used during training
FEATURE_COLS = [
    "Age",
    "MaxHR",
    "Oldpeak",
    "FastingBS",
    "Sex_M",
    "ChestPainType_ATA",
    "ChestPainType_NAP",
    "RestingECG_Normal",
    "RestingECG_ST",
    "ExerciseAngina_Y",
    "ST_Slope_Flat",
    "ST_Slope_Up"
]


def predict_clinical(data: dict):

    # Convert raw API input to DataFrame
    df = pd.DataFrame([data])

    # Reproduce the exact encoding used during training
    df = pd.get_dummies(
        df,
        drop_first=True
    ).astype(int)

    # Ensure EXACT same columns and order as training
    df = df.reindex(
        columns=FEATURE_COLS,
        fill_value=0
    )

    # Saved model already contains the StandardScaler + classifier
    score = float(model.predict_proba(df)[0][1])

    prediction = int(score >= THRESHOLD)

    risk = (
        "Higher Risk"
        if prediction == 1
        else "Lower Risk"
    )

    return {
        "risk": risk,
        "prediction": prediction,
        "score": round(score, 4)
    }