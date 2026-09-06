from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas.lifestyle import (
    LifestyleInput,
    LifestyleResponse
)

from app.schemas.clinical import (
    ClinicalInput,
    ClinicalResponse
)

from app.services.lifestyle_service import (
    predict_lifestyle
)

from app.services.clinical_service import (
    predict_clinical
)


app = FastAPI(
    title="HeartWise API",
    description="Two-stage cardiovascular risk screening API",
    version="2.0.0"
)


# --------------------------------------------------
# CORS CONFIGURATION
# --------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://heartwise-frontend.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --------------------------------------------------
# ROOT
# --------------------------------------------------

@app.get("/")
def root():

    return {
        "message": "HeartWise API is running",
        "version": "2.0.0"
    }


# --------------------------------------------------
# HEALTH CHECK
# --------------------------------------------------

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "service": "heartwise-api"
    }


# --------------------------------------------------
# LIFESTYLE PREDICTION
# --------------------------------------------------

@app.post(
    "/predict/lifestyle",
    response_model=LifestyleResponse
)
def lifestyle_prediction(
    data: LifestyleInput
):

    try:

        return predict_lifestyle(
            data.model_dump()
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Lifestyle prediction failed: {str(e)}"
        )


# --------------------------------------------------
# CLINICAL PREDICTION
# --------------------------------------------------

@app.post(
    "/predict/clinical",
    response_model=ClinicalResponse
)
def clinical_prediction(
    data: ClinicalInput
):

    try:

        return predict_clinical(
            data.model_dump()
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Clinical prediction failed: {str(e)}"
        )