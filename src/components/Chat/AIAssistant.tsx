import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { FiMessageSquare, FiSend, FiX } from 'react-icons/fi';

interface Message {
  text: string;
  isUser: boolean;
}

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { text: inputMessage, isUser: true };
    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages((prev: Message[]) => [...prev, { text: data.message, isUser: false }]);
      } else {
        throw new Error(data.error || 'Erro ao processar mensagem');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages((prev: Message[]) => [
        ...prev,
        { text: 'Desculpe, ocorreu um erro. Tente novamente mais tarde.', isUser: false },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FiMessageSquare size={24} />
      </motion.button>

      {/* Modal do chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 w-96 bg-white rounded-lg shadow-xl overflow-hidden"
          >
            {/* Cabeçalho */}
            <div className="bg-red-600 text-white p-4 flex justify-between items-center">
              <h3 className="font-semibold">Assistente Virtual</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-200 transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Área de mensagens */}
            <div className="h-96 p-4 overflow-y-auto">
              {messages.map((msg: Message, index: number) => (
                <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
              ))}
              {isLoading && (
                <div className="flex justify-center items-center py-2">
                  <div className="animate-pulse text-gray-400">Digitando...</div>
                </div>
              )}
            </div>

            {/* Input de mensagem */}
            <div className="border-t p-4 flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSend size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 