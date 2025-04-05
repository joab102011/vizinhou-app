import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminMessaging } from '../../../lib/firebase-admin';
import { NotificationType } from '../../../types/notification';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(request: NextRequest) {
  try {
    const { userId, type, title, message, data } = await request.json();

    // Validar os dados
    if (!userId || !type || !title || !message) {
      return NextResponse.json(
        { error: 'Dados incompletos' },
        { status: 400 }
      );
    }

    // Buscar o token FCM do usuário
    const userDoc = await adminDb.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (!userData || !userData.fcmToken) {
      return NextResponse.json(
        { error: 'Usuário não encontrado ou sem token FCM' },
        { status: 404 }
      );
    }

    // Criar a notificação no Firestore
    const notificationRef = await adminDb.collection('notifications').add({
      userId,
      type,
      title,
      message,
      data,
      read: false,
      createdAt: FieldValue.serverTimestamp(),
    });

    // Preparar o payload da notificação
    const notificationPayload = {
      notification: {
        title,
        body: message,
        icon: '/icon.png',
        badge: '/badge.png',
      },
      data: {
        type,
        notificationId: notificationRef.id,
        ...data,
      },
      token: userData.fcmToken,
    };

    // Enviar a notificação
    await adminMessaging.send(notificationPayload);

    return NextResponse.json({
      success: true,
      notificationId: notificationRef.id,
    });
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
    return NextResponse.json(
      { error: 'Erro ao enviar notificação' },
      { status: 500 }
    );
  }
} 