'use client';

import { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';

interface Condominium {
  id: string;
  name: string;
  formatted_address: string;
  location: {
    lat: number;
    lng: number;
  };
}

export function LocationDisplay() {
  const [condominium, setCondominium] = useState<Condominium | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCondominium = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar o condomínio atual
        const response = await fetch('/api/condominiums/current', {
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        
        if (!response.ok) {
          throw new Error('Erro ao carregar localização');
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }

        setCondominium(data);
      } catch (error: any) {
        console.error('Erro:', error);
        setError(error.message || 'Não foi possível carregar a localização');
      } finally {
        setLoading(false);
      }
    };

    loadCondominium();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-white/80">
        <FiMapPin className="w-5 h-5" />
        <span>Carregando localização...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 text-white/80">
        <FiMapPin className="w-5 h-5" />
        <span>{error}</span>
      </div>
    );
  }

  if (!condominium) {
    return (
      <div className="flex items-center gap-2 text-white/80">
        <FiMapPin className="w-5 h-5" />
        <span>Nenhuma localização encontrada</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-white">
      <FiMapPin className="w-5 h-5 flex-shrink-0" />
      <div className="flex flex-col">
        <span className="font-medium">{condominium.name}</span>
        <span className="text-sm text-white/80">{condominium.formatted_address}</span>
      </div>
    </div>
  );
} 