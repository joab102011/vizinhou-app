'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiSearch, FiMapPin, FiTag } from 'react-icons/fi';

// Dados de exemplo para os produtos
const productElements = [
  {
    id: '1',
    title: 'Produto em Destaque 1',
    price: 'R$ 299,90',
    category: 'Categoria 1',
    location: 'São Paulo, SP',
    imageUrl: '/images/placeholder-product.jpg'
  },
  {
    id: '2',
    title: 'Produto em Destaque 2',
    price: 'R$ 199,90',
    category: 'Categoria 2',
    location: 'Rio de Janeiro, RJ',
    imageUrl: '/images/placeholder-product.jpg'
  },
  {
    id: '3',
    title: 'Produto em Destaque 3',
    price: 'R$ 399,90',
    category: 'Categoria 3',
    location: 'Belo Horizonte, MG',
    imageUrl: '/images/placeholder-product.jpg'
  }
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showEmptyFeedback, setShowEmptyFeedback] = useState(false);

  // Filtra os produtos com base na pesquisa
  const filteredProducts = productElements.filter(product => {
    const searchLower = searchQuery.toLowerCase();
    return (
      product.title.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower) ||
      product.location.toLowerCase().includes(searchLower)
    );
  });

  // Atualiza o feedback quando não há resultados
  useEffect(() => {
    setShowEmptyFeedback(searchQuery !== '' && filteredProducts.length === 0);
  }, [searchQuery, filteredProducts.length]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Barra de Pesquisa */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <FiSearch size={20} />
          </div>
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Feedback quando não há resultados */}
      {showEmptyFeedback && (
        <div className="text-center py-8">
          <p className="text-gray-600">
            Nenhum produto encontrado para "{searchQuery}"
          </p>
        </div>
      )}

      {/* Lista de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link 
            href={`/produtos/${product.id}`} 
            key={product.id}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-t-lg flex items-center justify-center">
              <div className="text-gray-400 text-6xl">🖼️</div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
              <p className="text-primary font-bold mb-2">{product.price}</p>
              <div className="flex items-center text-gray-600 text-sm mb-1">
                <div className="mr-1">
                  <FiTag size={16} />
                </div>
                <span>{product.category}</span>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <div className="mr-1">
                  <FiMapPin size={16} />
                </div>
                <span>{product.location}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 