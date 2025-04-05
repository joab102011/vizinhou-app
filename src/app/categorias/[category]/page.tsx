'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  return (
    <main className="min-h-screen bg-[#111827]">
      <div className="container mx-auto px-4 py-8">
        <Link 
          href="/categorias"
          className="inline-flex items-center text-white hover:text-white/80 mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Voltar para Categorias
        </Link>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6">
            {category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}
          </h1>
          
          <div className="text-white/70 text-center py-12">
            <p className="text-lg mb-4">
              Em breve você poderá ver todos os itens desta categoria.
            </p>
            <p>
              Estamos trabalhando para trazer as melhores ofertas para você!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 