'use client';

import React from 'react';
import ChatList from '../../components/Chat/ChatList';
import { auth } from '../../lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ChatsPage() {
  const router = useRouter();
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Minhas Conversas</h1>
        <ChatList />
      </div>
    </div>
  );
} 