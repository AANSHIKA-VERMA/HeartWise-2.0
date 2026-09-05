from typing import List

from pydantic import BaseModel, Field


class LifestyleInput(BaseModel):
    Age: float = Field(..., ge=1, le=13)
    Sex: float = Field(..., ge=0, le=1)
    BMI: float = Field(..., gt=0, le=100)
    Smoker: float = Field(..., ge=0, le=1)
    HvyAlcoholConsump: float = Field(..., ge=0, le=1)
    PhysActivity: float = Field(..., ge=0, le=1)
    Fruits: float = Field(..., ge=0, le=1)
    Veggies: float = Field(..., ge=0, le=1)
    Diabetes: float = Field(..., ge=0, le=2)


class LifestyleFactor(BaseModel):
    factor: str
    impact: str
    detail: str


class LifestyleResponse(BaseModel):
    risk: str
    prediction: int
    score: float
    factors: List[LifestyleFactor]
    recommendations: List[str]
    proceed_to_clinical: bool