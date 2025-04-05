'use client';

import CategoryList from '@/components/Categories/CategoryList';

export default function CategoriesPage() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Explore as Categorias
        </h1>
        <CategoryList />
      </div>
    </main>
  );
} 