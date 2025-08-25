import express from 'express';
import { env } from './infrastructure/config/enviroment';

const startServer = async (): Promise<void> => {
  try {
    const app = express();
    app.use(express.json());

    const port = env.port || 3000;

    app.get('/', (_req, res) => {
      res.send('Sleep Service funcionando 🚀');
    });

    app.listen(port, () => {
      console.log(`Servicio Routine escuchando en el puerto ${port}`);
    });
  } catch (error) {
    console.error('❌ Ocurrió un error al ejecutar el microservicio:', error);
    process.exit(1);
  }
};

startServer();