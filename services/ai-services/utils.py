


# utils_time.py (o en el mismo main.py)
from datetime import datetime
import re


AMPM_RE = re.compile(r"^\s*(1[0-2]|0?[1-9]):([0-5][0-9])\s*([ap]m|[AP]M)\s*$")

def parse_hhmm_ampm(hhmm_ampm: str) -> str:
    """
    'hh:mm am/pm' (case-insensitive) -> 'HH:MM' 24h
    """
    m = AMPM_RE.match(hhmm_ampm or "")
    if not m:
        raise ValueError("Formato inválido. Usa 'hh:mm am/pm'. Ej: '11:30 pm', '07:05 AM'")
    h12 = int(m.group(1))
    mm = int(m.group(2))
    ampm = m.group(3).lower()
    if ampm == "am":
        h24 = 0 if h12 == 12 else h12
    else:
        h24 = 12 if h12 == 12 else h12 + 12
    return f"{h24:02d}:{mm:02d}"

def hours_between(start_ampm: str, end_ampm: str) -> float:
    start_24 = parse_hhmm_ampm(start_ampm)
    end_24   = parse_hhmm_ampm(end_ampm)
    s = datetime.strptime(start_24, "%H:%M")
    e = datetime.strptime(end_24, "%H:%M")
    delta = (e - s).total_seconds() / 3600
    if delta < 0:
        delta += 24
    return round(delta, 2)