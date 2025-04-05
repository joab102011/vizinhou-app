import { collection, addDoc, query, where, orderBy, onSnapshot, updateDoc, doc, serverTimestamp, getDocs, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { Notification, NotificationType } from '../types/notification';

// Função para criar uma nova notificação
export const createNotification = async (
  userId: string,
  type: NotificationType,
  title: string,
  message: string,
  data?: Notification['data']
): Promise<string> => {
  try {
    const notificationRef = await addDoc(collection(db, 'notifications'), {
      userId,
      type,
      title,
      message,
      data,
      read: false,
      createdAt: serverTimestamp(),
    });
    
    return notificationRef.id;
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    throw error;
  }
};

// Função para marcar uma notificação como lida
export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'notifications', notificationId), {
      read: true,
    });
  } catch (error) {
    console.error('Erro ao marcar notificação como lida:', error);
    throw error;
  }
};

// Função para marcar todas as notificações como lidas
export const markAllNotificationsAsRead = async (userId: string): Promise<void> => {
  try {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );
    
    const snapshot = await getDocs(q);
    
    const batch = writeBatch(db);
    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, { read: true });
    });
    
    await batch.commit();
  } catch (error) {
    console.error('Erro ao marcar todas as notificações como lidas:', error);
    throw error;
  }
};

// Função para obter as notificações de um usuário
export const getUserNotifications = (
  userId: string,
  callback: (notifications: Notification[]) => void
): (() => void) => {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    })) as Notification[];
    
    callback(notifications);
  });
};

// Função para obter o número de notificações não lidas
export const getUnreadNotificationsCount = (
  userId: string,
  callback: (count: number) => void
): (() => void) => {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    where('read', '==', false)
  );
  
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.size);
  });
}; 