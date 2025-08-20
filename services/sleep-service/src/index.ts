import express from 'express';
import { container, setupContainer } from './infrastructure/config/container';

import { ENV, EnvType } from './infrastructure/config/enviroment';

import { SleepController } from './api/controller/SleepController';
import { createSleepRoutes } from './api/routes/SleepRoutes';

const startServer = async (): Promise<void> => {
    try{
        setupContainer();
        const env = container.resolve<EnvType>(ENV);
        const sleepController = container.resolve(SleepController);

        const app = express();
        app.use(express.json());
        app.use('/sleep', createSleepRoutes(sleepController));

        const port = env.port;
        app.listen(port, () => console.log(`Servicio Sleep escuchando en el puerto ${port}`));
    }catch(error){
        console.error(`Ocurrió un error al ejecutar el microservicio: ${error}`);
        process.exit(1);
    }
};

startServer();