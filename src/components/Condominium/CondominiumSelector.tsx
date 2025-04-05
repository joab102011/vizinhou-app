'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';

const CONDOMINIUM = {
  id: 'parque-do-planalto',
  name: 'Condomínio Clube Parque do Planalto',
  address: 'Rua do Condomínio, 1000',
  city: 'São Paulo',
  state: 'SP'
};

interface CondominiumSelectorProps {
  onSelect: (id: string, name: string) => void;
}

export function CondominiumSelector({ onSelect }: CondominiumSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = () => {
    onSelect(CONDOMINIUM.id, CONDOMINIUM.name);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-white transition-colors"
      >
        <FiMapPin className="w-5 h-5" />
        <span>{CONDOMINIUM.name}</span>
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg overflow-hidden z-50"
        >
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Selecione o Condomínio</h3>
            <div
              onClick={handleSelect}
              className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
            >
              <FiMapPin className="w-5 h-5 text-red-600 mt-1" />
              <div>
                <p className="font-medium text-gray-900">{CONDOMINIUM.name}</p>
                <p className="text-sm text-gray-500">
                  {CONDOMINIUM.address}, {CONDOMINIUM.city} - {CONDOMINIUM.state}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 