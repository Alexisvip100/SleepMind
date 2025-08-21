# main.py
from http.client import HTTPException
import os
from fastapi import FastAPI
from models import SleepInput, SleepQuality
import google.generativeai as genai
import json
from dotenv import load_dotenv

app = FastAPI(
    title="Elbi Sleep Quality API (Gemini)",
    description="Calcula calidad de sueño con IA (Gemini) a partir de horarios e interrupciones.",
    version="1.0.0",
)

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

def get_gemini_model():
    if not GOOGLE_API_KEY:
        raise HTTPException(status_code=500, detail="GOOGLE_API_KEY no configurada.")
    genai.configure(api_key=GOOGLE_API_KEY)
    return genai.GenerativeModel("gemini-1.5-flash")

@app.post("/sleep-quality", response_model=SleepQuality)
def compute_sleep_quality(payload: SleepInput):
    ronq = payload.interrupcion.ronquidos
    pedos = payload.interrupcion.pedos
    total = payload.total_hours  # confiamos en Node

    prompt = f"""
Eres un experto en higiene del sueño.
Evalúa la calidad de sueño (0–100) usando horas totales e interrupciones (ronquidos, pedos).
Devuelve SOLO un JSON con la forma exacta:
{{"quality_score": int, "label": string, "total_hours": number, "reasoning": string}}

Datos:
- hora_inicio: {payload.hora_inicio}
- hora_final: {payload.hora_final}
- fecha_actual: {payload.fecha_actual}
- interrupciones: {{ "ronquidos": {ronq}, "pedos": {pedos} }}
- total_hours: {total}
""".strip()

    try:
        model = get_gemini_model()
        resp = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.2,
                "max_output_tokens": 256,
                "response_mime_type": "application/json",
            },
        )

        content = (resp.text or "").strip()
        data = json.loads(content)

        return SleepQuality(
            quality_score=int(max(0, min(100, data.get("quality_score", 0)))),
            label=str(data.get("label", "Unknown")),
            total_hours=float(data.get("total_hours", total)),
            reasoning=str(data.get("reasoning", "No reasoning provided")),
            model="gemini-1.5-flash",
        )
    except Exception:
        # (Opcional) log de error
        # Retorna algo mínimo para no romper el contrato
        return SleepQuality(
            quality_score=78,
            label="Good",
            total_hours=total,
            reasoning="Fallback: respuesta generada por defecto al manejar un error interno.",
            model="gemini-1.5-flash",
        )