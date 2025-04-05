import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Chave pública do vapid para notificações push
const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;

// Função para solicitar permissão e registrar o token FCM
export const requestNotificationPermission = async (userId: string): Promise<void> => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const messaging = getMessaging();
      const token = await getToken(messaging, { vapidKey: VAPID_KEY });
      
      // Salvar o token no Firestore
      await setDoc(doc(db, 'userTokens', userId), {
        fcmToken: token,
        updatedAt: new Date(),
      });
    }
  } catch (error) {
    console.error('Erro ao solicitar permissão para notificações:', error);
  }
};

// Função para atualizar o token FCM
export const updateFcmToken = async (userId: string): Promise<void> => {
  try {
    const messaging = getMessaging();
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    
    await setDoc(doc(db, 'userTokens', userId), {
      fcmToken: token,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Erro ao atualizar token FCM:', error);
  }
};

// Função para verificar se o usuário já tem permissão
export const checkNotificationPermission = async (userId: string): Promise<boolean> => {
  try {
    const tokenDoc = await getDoc(doc(db, 'userTokens', userId));
    return tokenDoc.exists();
  } catch (error) {
    console.error('Erro ao verificar permissão de notificações:', error);
    return false;
  }
};

// Função para lidar com notificações em primeiro plano
export const handleForegroundMessages = (callback: (payload: any) => void): void => {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    callback(payload);
  });
}; 