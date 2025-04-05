'use client';

import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface EmptySearchFeedbackProps {
  searchTerm: string;
  onClose: () => void;
}

export function EmptySearchFeedback({ searchTerm, onClose }: EmptySearchFeedbackProps) {
  const suggestions = [
    'Tente usar palavras mais gerais',
    'Verifique se há erros de digitação',
    'Use sinônimos',
    'Busque por categoria'
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>

        <div className="flex items-center justify-center mb-4">
          <div className="bg-gray-100 p-3 rounded-full">
            <FiSearch size={24} className="text-gray-600" />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-center mb-2">
          Nenhum resultado encontrado
        </h3>
        
        <p className="text-gray-600 text-center mb-4">
          Não encontramos resultados para "{searchTerm}"
        </p>

        <div className="space-y-3">
          <p className="font-medium text-gray-700">Sugestões:</p>
          <ul className="list-disc pl-5 text-gray-600 space-y-1">
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 