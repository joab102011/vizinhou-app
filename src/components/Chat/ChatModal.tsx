'use client';

import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { FiX } from 'react-icons/fi';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  productTitle: string;
  sellerName: string;
}

export default function ChatModal({ isOpen, onClose, productTitle, sellerName }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Rola para a última mensagem quando novas mensagens são adicionadas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
  };

  // Foca no input quando o modal abre
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden shadow-xl">
        {/* Cabeçalho do Chat */}
        <div className="p-4 border-b flex justify-between items-center bg-red-600 text-white">
          <div>
            <h3 className="text-lg font-semibold">Chat com {sellerName}</h3>
            <p className="text-sm opacity-90">Produto: {productTitle}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 p-2"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Área de Mensagens */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-[60vh] bg-gray-50">
          <div className="flex flex-col space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${
                  message.isUser ? 'self-end' : 'self-start'
                } max-w-[80%] animate-fade-in`}
              >
                <div
                  className={`p-3 rounded-lg shadow-md ${
                    message.isUser
                      ? 'bg-red-600 text-white'
                      : 'bg-white'
                  }`}
                >
                  <p className={`text-sm ${message.isUser ? 'text-white' : 'text-gray-800'}`}>
                    {message.text}
                  </p>
                  <p className={`text-xs mt-1 ${message.isUser ? 'text-white/80' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Área de Input */}
        <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
          <div className="flex">
            <input 
              ref={inputRef}
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..." 
              className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 bg-white text-gray-900"
              autoComplete="off"
            />
            <button 
              type="submit"
              className="bg-red-600 text-white px-6 py-2 rounded-r-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!newMessage.trim()}
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 