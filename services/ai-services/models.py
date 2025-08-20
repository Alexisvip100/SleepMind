from pydantic import BaseModel, Field
from datetime import datetime
from pydantic import field_validator
from utils import AMPM_RE
class Interruptions(BaseModel):
    ronquidos: int = Field(ge=0, description="Cantidad de veces que se roncó")
    pedos: int = Field(ge=0, description="Cantidad de veces que se escucharon pedos")

class SleepInput(BaseModel):
    hora_inicio: str = Field(..., description="Formato 12h 'hh:mm am/pm' (ej. '11:30 pm')")
    hora_final:  str = Field(..., description="Formato 12h 'hh:mm am/pm' (ej. '07:05 am')")
    fecha_actual: str
    interrupcion: Interruptions


    @field_validator("hora_inicio", "hora_final")
    @classmethod
    def validate_time(cls, v: str) -> str:
        if not AMPM_RE.match(v or ""):
            raise ValueError("Formato inválido. Usa 'hh:mm am/pm'. Ej: '11:30 pm', '07:05 AM'")
        return v

    @field_validator("fecha_actual")
    @classmethod
    def validate_date(cls, v: str) -> str:
        datetime.strptime(v, "%Y-%m-%d")
        return v

class SleepQuality(BaseModel):
    quality_score: int = Field(ge=0, le=100, description="Calidad (0–100)")
    label: str = Field(description="Poor | Fair | Good | Excellent")
    total_hours: float = Field(ge=0, description="Horas totales dormidas")
    reasoning: str = Field(description="Explicación breve")
    model: str = Field(description="Modelo de IA utilizado")