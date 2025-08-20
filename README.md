# 💤 SleepMindNode

Proyecto que combina un servidor **Node.js (Express)** y un microservicio de **IA con FastAPI + Gemini** para evaluar la calidad del sueño.

---

## 📂 Estructura del Proyecto

```
SleepMindNode/
│── index.js                  # Servidor principal Node.js
│── package.json              # Configuración npm
│── services/
│    └── ai-services/
│         ├── main.py         # Servicio FastAPI (IA con Gemini)
│         ├── models.py       # Modelos Pydantic
│         ├── utils.py        # Funciones auxiliares (validación AM/PM, horas, fallback)
│         ├── venv/           # Entorno virtual Python
│         └── requirements.txt
```

---

## ⚙️ Requisitos

- **Node.js** ≥ 18  
- **npm** ≥ 9  
- **Python** ≥ 3.12  
- **Entorno virtual (venv)** para aislar dependencias  

---

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/Alexisvip100/sleepmindnode.git
   cd sleepmindnode
   ```

2. Instala dependencias de Node.js:
   ```bash
   npm install
   ```

3. Prepara el servicio de IA:
   ```bash
   cd services/ai-services
   python3 -m venv venv
   source venv/bin/activate   # En Mac/Linux
   venv\\Scripts\\activate      # En Windows PowerShell
   pip install -r requirements.txt
   ```

4. Configura tu **API Key de Gemini** en variables de entorno:
   ```bash
   export GEMINI_API_KEY="tu_api_key_aqui"
   ```
   En Windows PowerShell:
   ```powershell
   $env:GEMINI_API_KEY="tu_api_key_aqui"
   ```

---

## 🚀 Ejecución

1. Levantar solo el servidor Node.js
   ```bash
   npm run server
   ```

2. Levantar solo el servicio de IA (FastAPI + Gemini)
   ```bash
   npm run ai
   ```
   Se ejecuta en: [http://127.0.0.1:8000](http://127.0.0.1:8000)

3. Levantar ambos en modo desarrollo (paralelo)
   ```bash
   npm run dev
   ```

---

## 📡 Endpoint disponible

### POST `/sleep-quality`

Evalúa la calidad del sueño a partir de los datos enviados.

#### Ejemplo con `curl`

```bash
curl -X POST http://127.0.0.1:8000/sleep-quality \
  -H "Content-Type: application/json" \
  -d '{
    "hora_inicio": "11:30 PM",
    "hora_final": "7:00 AM",
    "fecha_actual": "2025-08-19",
    "interrupcion": { "ronquidos": 3, "pedos": 1 }
  }'
```