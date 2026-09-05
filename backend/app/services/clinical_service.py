import json
from pathlib import Path

import joblib
import pandas as pd
import shap


BASE_DIR = Path(__file__).resolve().parents[2]
MODEL_DIR = BASE_DIR / "models"

model = joblib.load(
    MODEL_DIR / "clinical_model.pkl"
)

with open(MODEL_DIR / "clinical_metadata.json") as f:
    metadata = json.load(f)

THRESHOLD = metadata["threshold"]


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


FEATURE_LABELS = {
    "Age": "Age",
    "MaxHR": "Maximum heart rate",
    "Oldpeak": "ST depression",
    "FastingBS": "Fasting blood sugar",
    "Sex_M": "Sex",
    "ChestPainType_ATA": "Chest pain type",
    "ChestPainType_NAP": "Chest pain type",
    "RestingECG_Normal": "Resting ECG",
    "RestingECG_ST": "Resting ECG",
    "ExerciseAngina_Y": "Exercise-induced angina",
    "ST_Slope_Flat": "ST slope",
    "ST_Slope_Up": "ST slope",
}


def _encode_input(data: dict):

    df = pd.DataFrame([data])

    df = pd.get_dummies(
        df,
        drop_first=True
    )

    df = df.reindex(
        columns=FEATURE_COLS,
        fill_value=0
    )

    return df


def _get_shap_factors(df: pd.DataFrame):

    try:

        pipeline = model.estimator

        preprocessor = pipeline.named_steps["prep"]
        classifier = pipeline.named_steps["clf"]

        transformed = preprocessor.transform(df)

        explainer = shap.TreeExplainer(classifier)

        shap_values = explainer.shap_values(
            transformed
        )

        if hasattr(shap_values, "ndim") and shap_values.ndim == 3:
            shap_values = shap_values[0, :, 1]

        shap_values = shap_values[0]

        feature_names = preprocessor.get_feature_names_out()

        ranked = sorted(
            zip(feature_names, shap_values),
            key=lambda x: abs(float(x[1])),
            reverse=True
        )

        factors = []

        for feature_name, value in ranked[:5]:

            clean = feature_name.split("__", 1)[-1]

            label = FEATURE_LABELS.get(
                clean,
                clean
            )

            factors.append({
                "factor": label,
                "impact": (
                    "Higher model influence"
                    if float(value) > 0
                    else "Lower model influence"
                ),
                "detail": f"{label} influenced the model's assessment."
            })

        return factors

    except Exception:
        return []


def _get_recommendations(data: dict):

    recommendations = []

    if data["ExerciseAngina"].upper() == "Y":
        recommendations.append(
            "Discuss exercise-related symptoms with a qualified healthcare professional."
        )

    if data["RestingBP"] >= 140:
        recommendations.append(
            "Consider having your blood pressure checked regularly by a healthcare professional."
        )

    if data["Cholesterol"] >= 200:
        recommendations.append(
            "Consider discussing cholesterol levels and heart-health habits with a healthcare professional."
        )

    if data["FastingBS"] == 1:
        recommendations.append(
            "Consider monitoring blood glucose and discussing elevated readings with a healthcare professional."
        )

    if data["Oldpeak"] > 1:
        recommendations.append(
            "Because this is a clinical measurement, discuss the result with a healthcare professional rather than interpreting it alone."
        )

    if not recommendations:
        recommendations.append(
            "Continue maintaining healthy activity, nutrition and regular health check-ups."
        )

    return recommendations[:5]


def predict_clinical(data: dict):

    df = _encode_input(data)

    score = float(
        model.predict_proba(df)[0][1]
    )

    prediction = int(
        score >= THRESHOLD
    )

    risk = (
        "Higher Risk"
        if prediction == 1
        else "Lower Risk"
    )

    factors = _get_shap_factors(df)

    recommendations = _get_recommendations(
        data
    )

    return {
        "risk": risk,
        "prediction": prediction,
        "score": round(score, 4),
        "factors": factors,
        "recommendations": recommendations,
    }