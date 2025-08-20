import { inject, injectable } from "tsyringe";
import { ISleepRepository, SleepRepository } from "../../domain/ports/ISleepRepository";

@injectable()
export class RegisterSessionUseCase {
    constructor(
        @inject(SleepRepository)
        private readonly repository: ISleepRepository
    ){}

    async execute(uid:string, startSleep:Date, endSleep:Date, sessionDate:Date, interruptions:Record<string, any>){
        
        /**
         * Obtiene resultado del servicio IA y registrar la sesión de sueño
        */

        const defaultQuality = {
            "quality_score": 78,
            "label": "Good",
            "total_hours": 7.92,
            "reasoning": "The sleep duration of 7.92 hours is within the healthy range for most adults.  While there were some interruptions from snoring (5 instances) and flatulence (2 instances), the total number is not excessive enough to significantly detract from the overall sleep quality. A score of 78 reflects a good night's sleep, though minimizing snoring could further improve quality.",
            "model": "gemini-1.5-flash"
        };

        await this.repository.registerSession({
            uid,
            startSleep, 
            endSleep, 
            sessionDate, 
            interruptions, 
            sleepQuality: defaultQuality
        });
        
    }
}