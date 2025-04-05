import { messaging, getToken, db, auth } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';

// Função para inicializar o Firebase Cloud Messaging
export async function initFirebaseMessaging() {
  if (typeof window === 'undefined' || !messaging) {
    return;
  }

  try {
    // Registrar o service worker
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      await navigator.serviceWorker.ready;
    }

    // Configurar o Firebase Messaging
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error('Permissão para notificações negada');
    }

    // Obter o token FCM
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error('Usuário não autenticado');
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    // Salvar o token no Firestore
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, {
      fcmToken: token,
    });

    return token;
  } catch (error) {
    console.error('Erro ao inicializar Firebase Messaging:', error);
    throw error;
  }
} 