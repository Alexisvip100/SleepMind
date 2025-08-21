# models.py
from pydantic import BaseModel, Field
from typing import Optional

class Interrupcion(BaseModel):
    ronquidos: int = Field(0, ge=0)
    pedos: int = Field(0, ge=0)

class SleepInput(BaseModel):
    hora_inicio: str                  # "hh:mm AM/PM" (solo informativo)
    hora_final: str                   # "hh:mm AM/PM" (solo informativo)
    fecha_actual: str                 # "YYYY-MM-DD"
    total_hours: float = Field(..., ge=0, le=24)  # ya calculado en Node
    interrupcion: Interrupcion

class SleepQuality(BaseModel):
    quality_score: int
    label: str
    total_hours: float
    reasoning: str
    model: str = "gemini-1.5-flash"