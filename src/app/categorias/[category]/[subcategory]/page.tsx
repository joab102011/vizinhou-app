'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FiArrowLeft } from 'react-icons/fi';
import { categories } from '@/components/Categories/data';

export default function SubcategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const subcategory = params.subcategory as string;

  // Encontra a categoria e subcategoria atual
  const currentCategory = categories.find(c => c.id === category);
  const currentSubcategory = currentCategory?.subcategories.find(s => s.id === subcategory);

  if (!currentCategory || !currentSubcategory) {
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
              Subcategoria não encontrada
            </h1>
            <p className="text-white/70">
              A subcategoria que você procura não existe.
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
          <div className="flex items-center space-x-4">
            <Link 
              href="/categorias"
              className="inline-flex items-center text-white hover:text-white/80 transition-colors"
            >
              <FiArrowLeft size={20} />
              <span className="ml-2">Voltar para Categorias</span>
            </Link>
            <span className="text-white/50">•</span>
            <Link 
              href={`/categorias/${category}/todos`}
              className="text-white hover:text-white/80 transition-colors"
            >
              {currentCategory.name}
            </Link>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 md:p-8">
            <div className="flex items-center mb-6">
              <div className="text-white mr-4">
                <Icon size={32} />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {currentSubcategory.name}
                </h1>
                <p className="text-white/70 mt-1">
                  {currentCategory.name}
                </p>
              </div>
            </div>
            
            <div className="text-white/70 text-center py-12">
              <p className="text-lg mb-4">
                Em breve você poderá ver todos os itens desta subcategoria.
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