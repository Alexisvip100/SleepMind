import { Router } from 'express';
import { SleepController } from '../controller/SleepController';

export function createSleepRoutes(sleepController: SleepController): Router{
    const router = Router();

    router.post('/', sleepController.registerSession);

    return router;
}