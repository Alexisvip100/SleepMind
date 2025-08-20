import { EnvType } from "./enviroment";
import * as admin from 'firebase-admin';

export const firebaseAdmin = (env: EnvType) => admin.initializeApp({
        credential: admin.credential.cert(env.firebase),
    });
