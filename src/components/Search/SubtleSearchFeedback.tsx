'use client';

import { FiSearch, FiX } from 'react-icons/fi';

interface SubtleSearchFeedbackProps {
  searchTerm: string;
  onClose: () => void;
}

export function SubtleSearchFeedback({ searchTerm, onClose }: SubtleSearchFeedbackProps) {
  const suggestions = [
    'Tente usar palavras mais gerais',
    'Verifique se há erros de digitação',
    'Use sinônimos',
    'Busque por categoria'
  ];

  return (
    <div className="mt-4 bg-black/20 backdrop-blur-sm rounded-lg p-4 text-white/90">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center">
          <FiSearch className="mr-2 text-white/70" />
          <p className="text-sm">
            Nenhum resultado encontrado para <span className="font-medium">"{searchTerm}"</span>
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-colors"
        >
          <FiX size={16} />
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-white/70">Sugestões:</p>
        <ul className="text-sm space-y-1 list-disc list-inside text-white/60">
          {suggestions.map((suggestion, index) => (
            <li key={index}>{suggestion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 