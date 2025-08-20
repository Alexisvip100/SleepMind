import { NewSleepSessionProps, SleepSession } from "../entities/SleepSession";

export interface ISleepRepository {

    /**
     * Se encarga de registrar las sesiones de sueño de cada usuario
     * 
     * Requerido para registrar la calidad de sueño realzada del usuario
     */
    registerSession(props: NewSleepSessionProps): Promise<void>;

    /**
     * Se encarga de obtener la lista de sesiones de sueño del usuario
     * 
     * Requerida para realizar un promedio de calidad de sueño semanal, mensual, etc.
     */
    getSessionsById(uid: string): Promise<SleepSession[]>;
}

export const SleepRepository = Symbol('ISleepRepository');