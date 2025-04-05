import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyCmseOVuyw6cji9Kw27lJBDmdOPgL5wXQs",
  authDomain: "vizinhou-8eeaa.firebaseapp.com",
  projectId: "vizinhou-8eeaa",
  storageBucket: "vizinhou-8eeaa.firebasestorage.app",
  messagingSenderId: "509179466890",
  appId: "1:509179466890:web:8b1156275aa5677a158973",
  measurementId: "G-K5E6KFNS45"
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