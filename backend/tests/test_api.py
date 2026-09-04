from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_root():
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["message"] == "HeartWise API is running"


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_lifestyle_prediction():

    payload = {
        "Age": 8,
        "Sex": 0,
        "BMI": 25.5,
        "Smoker": 0,
        "HvyAlcoholConsump": 0,
        "PhysActivity": 1,
        "Fruits": 1,
        "Veggies": 1,
        "Diabetes": 0
    }

    response = client.post(
        "/predict/lifestyle",
        json=payload
    )

    assert response.status_code == 200

    data = response.json()

    assert "risk" in data
    assert "prediction" in data
    assert "score" in data

    assert data["prediction"] in [0, 1]
    assert 0 <= data["score"] <= 1


def test_clinical_prediction():

    payload = {
        "age": 55,
        "sex": 1,
        "cp": 1,
        "trestbps": 130,
        "chol": 240,
        "fbs": 0,
        "restecg": 1,
        "thalach": 150,
        "exang": 0,
        "oldpeak": 1.0,
        "slope": 1,
        "ca": 0,
        "thal": 2
    }

    response = client.post(
        "/predict/clinical",
        json=payload
    )

    assert response.status_code == 200

    data = response.json()

    assert "risk" in data
    assert "prediction" in data
    assert "score" in data

    assert data["prediction"] in [0, 1]
    assert 0 <= data["score"] <= 1