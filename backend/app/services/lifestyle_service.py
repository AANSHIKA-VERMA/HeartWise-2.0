import json
from pathlib import Path

import joblib
import pandas as pd
import shap


BASE_DIR = Path(__file__).resolve().parents[2]
MODEL_DIR = BASE_DIR / "models"

model = joblib.load(MODEL_DIR / "lifestyle_model.pkl")

with open(MODEL_DIR / "lifestyle_metadata.json") as f:
    metadata = json.load(f)

THRESHOLD = metadata["threshold"]


FEATURE_LABELS = {
    "BMI": "BMI",
    "Age": "Age",
    "Sex": "Sex",
    "Smoker": "Smoking",
    "HvyAlcoholConsump": "Alcohol consumption",
    "PhysActivity": "Physical activity",
    "Fruits": "Fruit intake",
    "Veggies": "Vegetable intake",
    "Diabetes": "Diabetes status",
}


def _get_shap_factors(df: pd.DataFrame):
    try:
        pipeline = model.estimator

        preprocessor = pipeline.named_steps["prep"]
        classifier = pipeline.named_steps["clf"]

        transformed = preprocessor.transform(df)

        explainer = shap.TreeExplainer(classifier)
        shap_values = explainer.shap_values(transformed)

        if hasattr(shap_values, "ndim") and shap_values.ndim == 3:
            shap_values = shap_values[0, :, 1]

        shap_values = shap_values[0]

        feature_names = preprocessor.get_feature_names_out()

        aggregated = {}

        for feature_name, value in zip(feature_names, shap_values):

            clean_name = feature_name.split("__", 1)[-1]

            base_name = clean_name.split("_", 1)[0]

            if base_name not in FEATURE_LABELS:
                for key in FEATURE_LABELS:
                    if clean_name.startswith(key + "_"):
                        base_name = key
                        break

            label = FEATURE_LABELS.get(base_name, base_name)

            aggregated[label] = aggregated.get(label, 0) + abs(float(value))

        sorted_features = sorted(
            aggregated.items(),
            key=lambda x: x[1],
            reverse=True
        )

        factors = []

        for label, _ in sorted_features[:4]:

            value = df.iloc[0]

            if label == "BMI":
                bmi = value["BMI"]

                if bmi >= 30:
                    detail = "Your BMI is in a higher range."
                elif bmi >= 25:
                    detail = "Your BMI is above the healthy range."
                else:
                    detail = "BMI contributed to the model's assessment."

            elif label == "Smoking":
                detail = (
                    "Smoking status influenced the model's assessment."
                    if value["Smoker"] == 1
                    else "Non-smoking status influenced the model's assessment."
                )

            elif label == "Physical activity":
                detail = (
                    "Low physical activity influenced the model's assessment."
                    if value["PhysActivity"] == 0
                    else "Regular physical activity contributed positively."
                )

            elif label == "Fruit intake":
                detail = (
                    "Lower fruit intake influenced the model's assessment."
                    if value["Fruits"] == 0
                    else "Fruit intake contributed positively."
                )

            elif label == "Vegetable intake":
                detail = (
                    "Lower vegetable intake influenced the model's assessment."
                    if value["Veggies"] == 0
                    else "Vegetable intake contributed positively."
                )

            elif label == "Alcohol consumption":
                detail = (
                    "Heavy alcohol consumption influenced the model's assessment."
                    if value["HvyAlcoholConsump"] == 1
                    else "Alcohol-consumption status influenced the model's assessment."
                )

            elif label == "Diabetes status":
                detail = (
                    "Diabetes status influenced the model's assessment."
                )

            elif label == "Age":
                detail = "Age contributed to the model's assessment."

            else:
                detail = f"{label} contributed to the model's assessment."

            factors.append({
                "factor": label,
                "impact": "Model influence",
                "detail": detail
            })

        return factors

    except Exception:
        return []


def _get_recommendations(data: dict):

    recommendations = []

    if data["PhysActivity"] == 0:
        recommendations.append(
            "Aim for regular physical activity appropriate for your fitness level."
        )

    if data["Smoker"] == 1:
        recommendations.append(
            "Consider reducing or quitting smoking and seek professional support if needed."
        )

    if data["Fruits"] == 0:
        recommendations.append(
            "Consider adding more whole fruits to your regular meals."
        )

    if data["Veggies"] == 0:
        recommendations.append(
            "Include a wider variety of vegetables in your meals."
        )

    if data["HvyAlcoholConsump"] == 1:
        recommendations.append(
            "Consider reducing alcohol consumption."
        )

    if data["BMI"] >= 25:
        recommendations.append(
            "Focus on sustainable nutrition, activity and healthy weight-management habits."
        )

    if data["Diabetes"] > 0:
        recommendations.append(
            "Keep blood glucose management and regular health check-ups in mind."
        )

    if not recommendations:
        recommendations.append(
            "Continue maintaining regular physical activity and balanced eating habits."
        )

    return recommendations[:5]


def predict_lifestyle(data: dict):

    df = pd.DataFrame([data])

    score = float(
        model.predict_proba(df)[0][1]
    )

    prediction = int(score >= THRESHOLD)

    risk = (
        "Higher Concern"
        if prediction == 1
        else "Lower Concern"
    )

    factors = _get_shap_factors(df)

    recommendations = _get_recommendations(data)

    return {
        "risk": risk,
        "prediction": prediction,
        "score": round(score, 4),
        "factors": factors,
        "recommendations": recommendations,
        "proceed_to_clinical": bool(prediction == 1),
    }