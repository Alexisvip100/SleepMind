import { EnvType } from "./enviroment";
import admin from 'firebase-admin';


export const firebaseAdmin = (env: EnvType) => {
    if(!admin.apps.length){
        admin.initializeApp({
            credential: admin.credential.cert(env.firebase),
        });
    }
    return admin;
}
