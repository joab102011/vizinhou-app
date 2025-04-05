import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Implementar a busca
    console.log('Buscando por:', searchQuery);
  };

  return (
    <div className="bg-gradient-to-br from-red-700 via-red-500 to-red-400 pt-12 pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent z-0"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="flex items-center justify-center mb-8"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Image
              src="/images/logo.png"
              alt="Vizinhou Logo"
              width={180}
              height={60}
              className="h-16 w-auto"
              priority
            />
          </motion.div>
          
          <motion.h1 
            className="text-4xl sm:text-6xl font-bold text-white mb-6 text-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Encontre tesouros perto de você
          </motion.h1>
          
          <motion.p
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Compre, venda e troque com seus vizinhos de forma fácil e segura
          </motion.p>
          
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="O que você está procurando?"
                className="w-full px-6 py-4 rounded-full text-lg shadow-xl focus:ring-2 focus:ring-red-300 focus:outline-none backdrop-blur-md bg-white/90 pl-12"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <svg 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button 
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Buscar
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}; 