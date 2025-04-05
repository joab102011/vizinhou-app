'use client';

import React, { useEffect, useState } from 'react';
import { auth } from '../../lib/firebase';
import { requestNotificationPermission, checkNotificationPermission } from '../../lib/pushNotifications';
import { initFirebaseMessaging } from '../../lib/initFirebaseMessaging';

export default function NotificationPermission() {
  const [showPrompt, setShowPrompt] = useState(false);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const checkPermission = async () => {
      if (!currentUser) return;

      // Inicializar o Firebase Messaging
      await initFirebaseMessaging();

      const hasPermission = await checkNotificationPermission(currentUser.uid);
      setShowPrompt(!hasPermission);
    };

    checkPermission();
  }, [currentUser]);

  const handleEnableNotifications = async () => {
    if (!currentUser) return;

    try {
      await requestNotificationPermission(currentUser.uid);
      setShowPrompt(false);
    } catch (error) {
      console.error('Erro ao habilitar notificações:', error);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-gray-900">
            Ativar notificações
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Receba notificações sobre novas mensagens, ofertas e atualizações importantes.
          </p>
          <div className="mt-4 flex space-x-3">
            <button
              type="button"
              onClick={handleEnableNotifications}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Ativar
            </button>
            <button
              type="button"
              onClick={() => setShowPrompt(false)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Agora não
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 