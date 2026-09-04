from pydantic import BaseModel, Field


class LifestyleInput(BaseModel):
    Age: float = Field(..., ge=1, le=13)
    Sex: float = Field(..., ge=0, le=1)
    BMI: float = Field(..., gt=0)
    Smoker: float = Field(..., ge=0, le=1)
    HvyAlcoholConsump: float = Field(..., ge=0, le=1)
    PhysActivity: float = Field(..., ge=0, le=1)
    Fruits: float = Field(..., ge=0, le=1)
    Veggies: float = Field(..., ge=0, le=1)
    Diabetes: float = Field(..., ge=0, le=2)


class LifestyleResponse(BaseModel):
    risk: str
    prediction: int
    score: float