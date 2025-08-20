import { inject, injectable } from "tsyringe";
import { NewSleepSessionProps, SleepSession } from "../../domain/entities/SleepSession";
import { ISleepRepository } from "../../domain/ports/ISleepRepository";

@injectable()
export class FirestoreSleepRepository implements ISleepRepository {
    constructor(
        @inject('Firestore') 
        private readonly db: FirebaseFirestore.Firestore
    ){}

    async registerSession(props: NewSleepSessionProps): Promise<void> {
        try{
            await this.db.collection('SleepSession').add({ 
                ...props, 
                createdAt: new Date(), 
            });
        }catch(error: any){
            throw new Error(`Error al registrar sesión: ${error.message}`);
        }
    }

    async getSessionsById(uid: string): Promise<SleepSession[]> {
        throw new Error("Method not implemented.");
    }
}