import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  // Substitua com suas configurações do Firebase
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// Inicializa o Firebase Messaging apenas no navegador
export let messaging: ReturnType<typeof getMessaging> | null = null;

if (typeof window !== 'undefined') {
  // Verifica o suporte a mensagens e inicializa se suportado
  isSupported().then((isSupported) => {
    if (isSupported) {
      messaging = getMessaging(app);
    }
  }).catch((err) => {
    console.error('Erro ao verificar suporte a mensagens:', err);
  });
} 