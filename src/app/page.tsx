'use client';

import { useState } from 'react';
import Image from 'next/image';
import CategoryList from '@/components/Categories/CategoryList';
import { SubtleSearchFeedback } from '@/components/Search/SubtleSearchFeedback';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmptyFeedback, setShowEmptyFeedback] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Aqui você pode implementar a lógica de pesquisa real
      // Por enquanto, vamos apenas mostrar o feedback
      setShowEmptyFeedback(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Esconde o feedback quando o usuário começa a digitar
    if (showEmptyFeedback) {
      setShowEmptyFeedback(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section com Logo e Pesquisa */}
      <div className="w-full flex flex-col items-center justify-center px-4 py-12 bg-gradient-to-b from-black/40 to-transparent">
        {/* Logo */}
        <div className="relative w-32 h-32 mb-8">
          <Image
            src="/images/logo.png"
            alt="Vizinhou"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Título e Subtítulo */}
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
          Encontre tesouros perto de você
        </h1>
        <p className="text-xl text-white/90 text-center mb-12">
          Compre, venda e troque com seus vizinhos de forma fácil e segura
        </p>

        {/* Barra de Pesquisa e Feedback */}
        <div className="w-full max-w-2xl">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="O que você está procurando?"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-6 py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30 pr-24"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
            >
              Buscar
            </button>
          </div>

          {/* Feedback de Pesquisa Vazia */}
          {showEmptyFeedback && (
            <SubtleSearchFeedback
              searchTerm={searchQuery}
              onClose={() => setShowEmptyFeedback(false)}
            />
          )}
        </div>
      </div>

      {/* Lista de Categorias */}
      <div className="flex-1 bg-black/20 backdrop-blur-sm">
        <CategoryList />
      </div>
    </main>
  );
} 