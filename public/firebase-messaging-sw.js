importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Configuração do Firebase
const firebaseConfig = {
  apiKey: 'self.FIREBASE_CONFIG.apiKey',
  authDomain: 'self.FIREBASE_CONFIG.authDomain',
  projectId: 'self.FIREBASE_CONFIG.projectId',
  storageBucket: 'self.FIREBASE_CONFIG.storageBucket',
  messagingSenderId: 'self.FIREBASE_CONFIG.messagingSenderId',
  appId: 'self.FIREBASE_CONFIG.appId',
};

// Inicializar o Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Lidar com mensagens em background
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification;

  const options = {
    body,
    icon: icon || '/icon.png',
    badge: '/badge.png',
    vibrate: [200, 100, 200],
    tag: payload.data?.tag || 'default',
    data: payload.data,
    actions: [
      {
        action: 'open',
        title: 'Abrir',
      },
      {
        action: 'close',
        title: 'Fechar',
      },
    ],
  };

  self.registration.showNotification(title, options);
});

// Lidar com cliques nas notificações
self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const action = event.action;
  const data = notification.data;

  notification.close();

  if (action === 'close') return;

  // Abrir a página apropriada com base no tipo de notificação
  let url = '/';
  if (data?.chatRoomId) {
    url = `/chat/${data.chatRoomId}`;
  } else if (data?.productId) {
    url = `/produto/${data.productId}`;
  } else if (data?.type === 'new_follower' && data?.senderId) {
    url = `/perfil/${data.senderId}`;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Se já houver uma janela aberta, focar nela e navegar
      for (const client of clientList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // Se não houver janela aberta, abrir uma nova
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
}); 