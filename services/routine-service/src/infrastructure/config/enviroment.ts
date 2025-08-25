import "dotenv/config";

export const env = {
    port: process.env.PORT || 3000,
    firebase: {
        projectId: process.env.FIREBASE_PROJECT_ID as string,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
        privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(/\\n/g, '\n')
    }
};

export type EnvType = typeof env;

export const ENV = Symbol('EnvType');