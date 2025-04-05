'use client';

import React, { useEffect, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot, doc, QuerySnapshot, DocumentData, DocumentSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { ChatRoom, ChatUser } from '../../types/chat';
import { auth } from '../../lib/firebase';
import Link from 'next/link';

export default function ChatList() {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [users, setUsers] = useState<Record<string, ChatUser>>({});
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    // Buscar salas de chat do usuário
    const chatRoomsRef = collection(db, 'chatRooms');
    const q = query(
      chatRoomsRef,
      where('participants', 'array-contains', currentUser.uid),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, async (snapshot: QuerySnapshot<DocumentData>) => {
      const rooms = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ChatRoom[];

      setChatRooms(rooms);

      // Buscar informações dos usuários
      const userIds = new Set<string>();
      rooms.forEach(room => {
        room.participants.forEach(id => {
          if (id !== currentUser.uid) {
            userIds.add(id);
          }
        });
      });

      const usersRef = collection(db, 'users');
      const usersSnapshot = await Promise.all(
        Array.from(userIds).map(id =>
          onSnapshot(doc(usersRef, id), (doc: DocumentSnapshot<DocumentData>) => {
            if (doc.exists()) {
              setUsers((prev: Record<string, ChatUser>) => ({
                ...prev,
                [id]: { id: doc.id, ...doc.data() } as ChatUser,
              }));
            }
          })
        )
      );

      return () => {
        usersSnapshot.forEach((unsubscribe: () => void) => unsubscribe());
      };
    });

    return () => unsubscribe();
  }, [currentUser]);

  if (!currentUser) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Conversas</h2>
      </div>
      <div className="divide-y">
        {chatRooms.map((room: ChatRoom) => {
          const otherUserId = room.participants.find(id => id !== currentUser.uid);
          const otherUser = otherUserId ? users[otherUserId] : null;

          if (!otherUser) return null;

          return (
            <Link
              key={room.id}
              href={`/chat/${room.id}`}
              className="block p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={otherUser.photoURL || '/avatar-placeholder.png'}
                  alt={otherUser.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{otherUser.name}</h3>
                  {room.lastMessage && (
                    <p className="text-sm text-gray-500 truncate">
                      {room.lastMessage.content}
                    </p>
                  )}
                </div>
                {room.lastMessage && (
                  <span className="text-xs text-gray-400">
                    {room.lastMessage.createdAt.toLocaleTimeString()}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 