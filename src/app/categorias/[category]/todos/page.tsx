'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import { categories } from '@/components/Categories/data';

export default function CategoryAllItemsPage() {
  const params = useParams();
  const category = params.category as string;

  // Encontra a categoria atual
  const currentCategory = categories.find(c => c.id === category);

  if (!currentCategory) {
    return (
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Link 
            href="/categorias"
            className="inline-flex items-center text-white hover:text-white/80 mb-6 transition-colors"
          >
            <FiArrowLeft size={20} />
            <span className="ml-2">Voltar para Categorias</span>
          </Link>

          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-8">
            <h1 className="text-3xl font-bold text-white mb-6">
              Categoria não encontrada
            </h1>
            <p className="text-white/70">
              A categoria que você procura não existe.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const Icon = currentCategory.icon;

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          <Link 
            href="/categorias"
            className="inline-flex items-center text-white hover:text-white/80 transition-colors"
          >
            <FiArrowLeft size={20} />
            <span className="ml-2">Voltar para Categorias</span>
          </Link>

          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 md:p-8">
            <div className="flex items-center mb-6">
              <div className="text-white mr-4">
                <Icon size={32} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {currentCategory.name}
                </h1>
                <p className="text-white/70 mt-1">
                  Todos os itens desta categoria
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {currentCategory.subcategories.map((sub) => (
                <Link
                  key={sub.id}
                  href={`/categorias/${category}/${sub.id}`}
                  className="p-4 bg-black/10 hover:bg-black/20 rounded-lg transition-all duration-200"
                >
                  <h3 className="text-white font-medium mb-1">{sub.name}</h3>
                  <p className="text-white/70 text-sm">
                    {sub.description}
                  </p>
                </Link>
              ))}
            </div>
            
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
      </div>
    </main>
  );
} 