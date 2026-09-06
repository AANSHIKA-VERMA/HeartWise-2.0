# ❤️ HeartWise — Cardiovascular Risk Screening

**Live Demo:** https://heartwise-frontend.onrender.com/

HeartWise is a two-stage cardiovascular risk screening platform that
uses machine learning and explainable AI to help users understand their
heart-health risk factors and receive practical lifestyle guidance.

> **Disclaimer:** HeartWise is an educational and screening tool, not a
> medical diagnostic system. Its predictions should not replace
> professional medical advice.

## 🎯 About the Problem

Cardiovascular diseases are a major health concern worldwide. Many risk
factors are related to lifestyle and clinical indicators, but people may
not know which factors are contributing to their overall risk.

Traditional health assessment can also feel complicated because clinical
information can be difficult to interpret without medical expertise.

HeartWise addresses this gap with a simple, user-friendly screening flow
that starts with lifestyle-related factors and can progress to a more
detailed clinical assessment.

## 💡 Solution

HeartWise follows a **two-stage risk screening approach**.

### Stage 1 — Lifestyle Assessment

Users provide lifestyle and demographic information such as:

- Age group
- Sex
- BMI
- Smoking
- Physical activity
- Fruit and vegetable consumption
- Heavy alcohol consumption
- Diabetes

The machine learning model generates a lifestyle risk result.

The application also explains **which factors influenced the model’s
prediction** and provides practical recommendations for improving or
maintaining healthy habits.

### Stage 2 — Clinical Assessment

Users who proceed to the second stage are evaluated using clinical
indicators such as:

- Age
- Chest pain type
- Resting blood pressure
- Cholesterol
- Maximum heart rate
- Exercise-induced angina
- ST depression
- Other clinical indicators

The clinical model produces a cardiovascular risk screening result along
with contributing factors and guidance.

### Explainable AI

HeartWise uses **SHAP-based explanations** to make model predictions
easier to understand.

Instead of presenting users with raw machine learning outputs, the
system translates influential model features into human-readable
factors.

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- CSS
- Vite
- Lucide React

### Backend

- Python
- FastAPI
- Pydantic
- REST APIs

### Machine Learning

- Scikit-learn
- XGBoost
- Pandas
- NumPy
- SHAP
- Joblib

### Authentication & Infrastructure

- Supabase Authentication
- Docker
- Docker Compose
- Git & GitHub
- Render

## 🧠 Machine Learning Architecture

``` text
                    User
                      │
                      ▼
             Lifestyle Assessment
                      │
                      ▼
             Lifestyle ML Model
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
    Risk Screening         SHAP Explanation
          │                       │
          └───────────┬───────────┘
                      ▼
             Lifestyle Guidance
                      │
                      ▼
             Clinical Assessment
                      │
                      ▼
              Clinical ML Model
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
    Clinical Screening      Model Factors
```

The lifestyle model uses a lower decision threshold to prioritize
**recall**, making the first stage suitable for screening rather than
definitive diagnosis.

## 🚀 Getting Started

### 1. Clone the Repository

``` bash
git clone https://github.com/AANSHIKA-VERMA/HeartWise-2.0.git
cd HeartWise
```

### 2. Backend Setup

``` bash
cd backend
python -m venv venv
```

Activate the virtual environment.

**macOS / Linux**

``` bash
source venv/bin/activate
```

**Windows**

``` bash
venv\Scripts\activate
```

Install dependencies:

``` bash
pip install -r requirements.txt
```

Start the FastAPI server:

``` bash
uvicorn app.main:app --reload
```

Backend:

``` text
http://127.0.0.1:8000
```

API documentation:

``` text
http://127.0.0.1:8000/docs
```

### 3. Frontend Setup

Open another terminal:

``` bash
cd frontend
npm install
npm run dev
```

The frontend will normally run at:

``` text
http://localhost:5173
```

### 4. Environment Variables

Frontend variables:

``` env
VITE_API_URL=http://127.0.0.1:8000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Do not commit secret keys or `.env` files containing private credentials
to GitHub.

## 🐳 Run with Docker

Build and run the backend:

``` bash
cd backend
docker build -t heartwise-backend .
docker run -p 8000:8000 heartwise-backend
```

If your repository contains a Docker Compose configuration:

``` bash
docker compose up --build
```

## 🌐 Deployment

HeartWise is deployed using **Render**.

The production architecture separates the frontend and backend:

``` text
React + Vite
     │
     ▼
Render Static Site
     │
     │ REST API
     ▼
Render Web Service
     │
     ▼
FastAPI + ML Models
```

The frontend communicates with the deployed FastAPI backend through the
`VITE_API_URL` environment variable.

## 🔮 Future Upgrades

Planned improvements include:

- Personalized user health dashboards
- Historical assessment tracking
- Improved model calibration and validation
- More detailed explainable-AI visualizations
- Additional cardiovascular risk factors
- Model monitoring and performance tracking
- Automated CI/CD pipelines
- More comprehensive automated testing
- Improved accessibility and mobile experience
- Secure database-backed assessment history
- Integration with wearable health data
- Multi-language support

## 🤝 Collaboration

Contributions and suggestions are welcome.

1.  Fork the repository.
2.  Create a feature branch:

``` bash
git checkout -b feature/your-feature
```

3.  Make your changes.
4.  Test the application locally.
5.  Commit your changes:

``` bash
git commit -m "Add your feature"
```

6.  Push the branch:

``` bash
git push origin feature/your-feature
```

7.  Open a Pull Request.

Please keep contributions focused, documented, and consistent with the
existing project structure.

## 👩‍💻 Author

**Aanshika Verma**

Built as a project combining **machine learning, explainable AI,
full-stack development, and deployment** to make cardiovascular risk
screening easier to understand.

## ❤️ Thank You

Thank you for checking out **HeartWise**!

If you find the project useful, consider giving the repository a ⭐ and
sharing your feedback.

**Stay informed. Stay healthy. Stay HeartWise. ❤️**
