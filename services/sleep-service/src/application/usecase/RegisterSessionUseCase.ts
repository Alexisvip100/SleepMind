import { inject, injectable } from "tsyringe";
import { ISleepRepository, SleepRepository } from "../../domain/ports/ISleepRepository";
import {toHHMMA, toYYYYMMDD, hoursBetween} from "../utils/format_hours";
@injectable()
export class RegisterSessionUseCase {
  constructor(
    @inject(SleepRepository)
    private readonly repository: ISleepRepository
  ) {}
  async execute(
    uid: string,
    startSleep: Date,
    endSleep: Date,
    sessionDate: Date,
    interruptions: Record<string, any>
  ) {
    // Normaliza interrupciones a enteros >= 0
    const ronquidos = Math.max(0, Number(interruptions?.ronquidos ?? interruptions?.snoring ?? 0) || 0);
    const pedos     = Math.max(0, Number(interruptions?.pedos     ?? interruptions?.flatulence ?? 0) || 0);

    const payload = {
      hora_inicio: toHHMMA(startSleep),          // ej. "10:30 PM"
      hora_final:  toHHMMA(endSleep),            // ej. "06:25 AM"
      fecha_actual: toYYYYMMDD(sessionDate),     // ej. "2025-08-20"
      total_hours: hoursBetween(startSleep, endSleep), // calculado en Node
      interrupcion: { ronquidos, pedos },
    };

    // Fallback si falla la IA
    let sleepQuality = {
      quality_score: 78,
      label: "Good",
      total_hours: payload.total_hours,
      reasoning:
        "The sleep duration is within a healthy range. Some interruptions were present, but not enough to severely impact quality.",
      model: "gemini-1.5-flash",
    };

    const baseUrl = process.env.SLEEP_AI_API_URL ?? "http://localhost:8000";
    const url = `${baseUrl.replace(/\/+$/, "")}/sleep-quality`;

    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 8000);

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(t);

      if (res.ok) {
        const data = await res.json();
        sleepQuality = {
          quality_score: Number.isFinite(data?.quality_score) ? Number(data.quality_score) : sleepQuality.quality_score,
          label: typeof data?.label === "string" ? data.label : sleepQuality.label,
          total_hours: Number.isFinite(data?.total_hours) ? Number(data.total_hours) : payload.total_hours,
          reasoning: typeof data?.reasoning === "string" ? data.reasoning : sleepQuality.reasoning,
          model: "gemini-1.5-flash",
        };
      } else {
        // opcional: log de status/response
      }
    } catch {
      clearTimeout(t);
      // timeout/network → fallback silencioso
    }

    await this.repository.registerSession({
      uid,
      startSleep,
      endSleep,
      sessionDate,
      interruptions,
      sleepQuality,
    });
  }
}