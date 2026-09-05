from typing import List

from pydantic import BaseModel, Field


class ClinicalInput(BaseModel):
    Age: float = Field(..., ge=1)
    Sex: str
    ChestPainType: str
    RestingBP: float = Field(..., ge=0)
    Cholesterol: float = Field(..., ge=0)
    FastingBS: int = Field(..., ge=0, le=1)
    RestingECG: str
    MaxHR: float = Field(..., ge=0)
    ExerciseAngina: str
    Oldpeak: float
    ST_Slope: str


class ClinicalFactor(BaseModel):
    factor: str
    impact: str
    detail: str


class ClinicalResponse(BaseModel):
    risk: str
    prediction: int
    score: float
    factors: List[ClinicalFactor]
    recommendations: List[str]