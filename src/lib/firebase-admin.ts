import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

const apps = admin.apps;

if (!apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export const adminAuth = admin.auth();
export const adminDb = getFirestore();
export const adminMessaging = admin.messaging(); 