import { inject, injectable } from "tsyringe";
import { Request, Response } from "express";
import uuid from "uuid";
import { RegisterSessionUseCase } from "../../application/usecase/RegisterSessionUseCase";

@injectable()
export class SleepController {
    constructor(
        @inject(RegisterSessionUseCase)
        private readonly registerSessionUseCase: RegisterSessionUseCase
    ){}

    public registerSession = async(req: Request, res: Response) => {
        try{
            const uid = uuid.v4();
            const {startSleep, endSleep, sessionDate, interruptions} = req.body;
            await this.registerSessionUseCase.execute(uid, startSleep, endSleep, sessionDate, interruptions);
            res.sendStatus(201);
        }catch(error){
            console.error(error);
            res.sendStatus(500);
        }
    }
}