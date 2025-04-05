'use client';

import React, { useEffect, useState, useRef } from 'react';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp, QuerySnapshot, DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Message, ChatRoom, ChatUser } from '@/types/chat';
import { auth } from '@/lib/firebase';

interface ChatWindowProps {
  productId?: string;
  receiverId: string;
  receiverName: string;
  receiverPhotoURL: string;
}

export default function ChatWindow({
  productId,
  receiverId,
  receiverName,
  receiverPhotoURL,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatRoom, setChatRoom] = useState<ChatRoom | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const participants = [currentUser.uid, receiverId].sort();
    const chatRoomId = participants.join('_');

    // Buscar ou criar sala de chat
    const chatRoomRef = collection(db, 'chatRooms');
    const q = query(
      chatRoomRef,
      where('participants', '==', participants)
    );

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      if (snapshot.empty) {
        // Criar nova sala de chat
        addDoc(chatRoomRef, {
          participants,
          productId,
          updatedAt: serverTimestamp(),
        });
      } else {
        setChatRoom({
          id: snapshot.docs[0].id,
          ...snapshot.docs[0].data(),
        } as ChatRoom);
      }
    });

    return () => unsubscribe();
  }, [currentUser, receiverId, productId]);

  useEffect(() => {
    if (!chatRoom?.id) return;

    const messagesRef = collection(db, 'chatRooms', chatRoom.id, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const newMessages = snapshot.docs.map((doc: DocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data()?.createdAt?.toDate(),
      })) as Message[];
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, [chatRoom?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser || !chatRoom) return;

    try {
      const messagesRef = collection(db, 'chatRooms', chatRoom.id, 'messages');
      await addDoc(messagesRef, {
        content: newMessage.trim(),
        senderId: currentUser.uid,
        receiverId,
        productId,
        createdAt: serverTimestamp(),
        read: false,
      });

      setNewMessage('');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  if (!currentUser) return null;

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="flex items-center p-4 border-b">
        <img
          src={receiverPhotoURL || '/avatar-placeholder.png'}
          alt={receiverName}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h3 className="font-semibold">{receiverName}</h3>
          {productId && (
            <p className="text-sm text-gray-500">Chat sobre produto</p>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message: Message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === currentUser.uid ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.senderId === currentUser.uid
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs opacity-75">
                {message.createdAt?.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <button
            type="submit"
            className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
} 