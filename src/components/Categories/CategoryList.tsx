'use client';

import Link from 'next/link';
import React from 'react';
import { categories } from './data';

export default function CategoryList() {
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);

  const toggleCategory = React.useCallback((categoryId: string) => {
    setExpandedCategory((current: string | null) => current === categoryId ? null : categoryId);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        const isExpanded = expandedCategory === category.id;

        return (
          <div 
            key={category.id}
            className="bg-black/20 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full p-4 flex items-start text-left hover:bg-black/30 transition-colors"
            >
              <div className="flex-shrink-0 text-white mr-3 mt-1">
                <Icon size={24} />
              </div>
              <div className="flex-grow">
                <h3 className="text-white font-medium mb-1">
                  {category.name}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2">
                  {category.description}
                </p>
              </div>
            </button>

            <div 
              className={`overflow-hidden transition-all duration-300 ${
                isExpanded ? 'max-h-[500px]' : 'max-h-0'
              }`}
            >
              <div className="p-4 pt-0 space-y-2">
                <Link
                  href={`/categorias/${category.id}/todos`}
                  className="block p-3 bg-black/10 hover:bg-black/20 rounded-lg text-white transition-all duration-200 transform hover:translate-x-1"
                >
                  <span className="font-medium">Ver todos</span>
                  <p className="text-sm text-white/70">
                    Todos os itens desta categoria
                  </p>
                </Link>
                
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/categorias/${category.id}/${sub.id}`}
                    className="block p-3 bg-black/10 hover:bg-black/20 rounded-lg text-white transition-all duration-200 transform hover:translate-x-1"
                  >
                    <span className="font-medium">{sub.name}</span>
                    <p className="text-sm text-white/70">
                      {sub.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
} 