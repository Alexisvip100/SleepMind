import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';
import { firebaseAdmin } from './firebase';

// Configuraciones (variables de entorno)
import { EnvType, env, ENV } from './enviroment';

// Dominio
import { ISleepRepository, SleepRepository } from '../../domain/ports/ISleepRepository';

// Infraestructura
import { FirestoreSleepRepository } from '../repository/FirestoreSleepRepository';

// Aplicación
import { RegisterSessionUseCase } from '../../application/usecase/RegisterSessionUseCase';

// Presentación
import { SleepController } from '../../api/controller/SleepController';


/**
 * Configura y registra todas las dependencias
 * @param provider Contenedor DI
 */
export function setupContainer(provider: DependencyContainer = container): void {

  // Registrar configuración
  provider.register<EnvType>(ENV, { useValue: env });

  const adminApp = firebaseAdmin(env);
  const firestoreInstance = adminApp.firestore();

  provider.registerInstance('Firestore', firestoreInstance);

  // Ports
  provider.registerSingleton<ISleepRepository>(SleepRepository, FirestoreSleepRepository);

  // Casos de uso
  provider.registerSingleton(RegisterSessionUseCase);

  // Controladores
  provider.registerSingleton(SleepController);
}

setupContainer();

export { container };

