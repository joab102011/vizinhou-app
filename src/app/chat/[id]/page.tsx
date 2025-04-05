'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { ChatRoom, ChatUser } from '../../../types/chat';
import ChatWindow from '../../../components/Chat/ChatWindow';
import { auth } from '../../../lib/firebase';

export default function ChatPage() {
  const { id } = useParams();
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const [otherUser, setOtherUser] = useState<ChatUser | null>(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser || !id) return;

    const fetchChatRoom = async () => {
      try {
        const chatRoomDoc = await getDoc(doc(db, 'chatRooms', id as string));
        if (chatRoomDoc.exists()) {
          const room = { id: chatRoomDoc.id, ...chatRoomDoc.data() } as ChatRoom;
          setChatRoom(room);

          // Buscar informações do outro usuário
          const otherUserId = room.participants.find(id => id !== currentUser.uid);
          if (otherUserId) {
            const userDoc = await getDoc(doc(db, 'users', otherUserId));
            if (userDoc.exists()) {
              setOtherUser({ id: userDoc.id, ...userDoc.data() } as ChatUser);
            }
          }
        }
      } catch (error) {
        console.error('Erro ao carregar chat:', error);
      }
    };

    fetchChatRoom();
  }, [currentUser, id]);

  if (!currentUser || !chatRoom || !otherUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <ChatWindow
          productId={chatRoom.productId}
          receiverId={otherUser.id}
          receiverName={otherUser.name}
          receiverPhotoURL={otherUser.photoURL}
        />
      </div>
    </div>
  );
} 