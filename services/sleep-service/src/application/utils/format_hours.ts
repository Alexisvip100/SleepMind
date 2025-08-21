// src/application/utils/format_hours.ts
export function toHHMMA(date: Date): string {
  const d = new Date(date);
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h.toString().padStart(2, "0")}:${m} ${ampm}`;
}

export function toYYYYMMDD(date: Date): string {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// redondeo a 2 decimales; si pasa medianoche, suma 24
export function hoursBetween(start: Date, end: Date): number {
  const s = new Date(start);
  const e = new Date(end);
  let delta = (e.getTime() - s.getTime()) / 3600000;
  if (delta < 0) delta += 24;
  return Math.round(delta * 100) / 100;
}