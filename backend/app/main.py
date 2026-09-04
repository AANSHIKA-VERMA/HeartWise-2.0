from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas.lifestyle import LifestyleInput, LifestyleResponse
from app.schemas.clinical import ClinicalInput, ClinicalResponse

from app.services.lifestyle_service import predict_lifestyle
from app.services.clinical_service import predict_clinical


app = FastAPI(
    title="HeartWise API",
    description="Two-stage cardiovascular risk screening API",
    version="2.0.0"
)

# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Restrict this later in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "HeartWise API is running",
        "version": "2.0.0"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "heartwise-api"
    }


@app.post("/predict/lifestyle", response_model=LifestyleResponse)
def lifestyle_prediction(data: LifestyleInput):

    try:
        result = predict_lifestyle(data.model_dump())
        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Lifestyle prediction failed: {str(e)}"
        )


@app.post("/predict/clinical", response_model=ClinicalResponse)
def clinical_prediction(data: ClinicalInput):

    try:
        result = predict_clinical(data.model_dump())
        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Clinical prediction failed: {str(e)}"
        )