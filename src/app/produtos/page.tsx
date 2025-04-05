'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';
import ProductCard from '@/components/Product/ProductCard';
import { useSearchParams } from 'next/navigation';

const categories = [
  'Eletrônicos',
  'Móveis',
  'Roupas',
  'Livros',
  'Esportes',
  'Casa',
  'Outros',
];

const conditions = [
  { value: 'new', label: 'Novo' },
  { value: 'like_new', label: 'Como novo' },
  { value: 'good', label: 'Bom' },
  { value: 'fair', label: 'Regular' },
  { value: 'poor', label: 'Ruim' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000000,
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        let q = query(productsRef, where('status', '==', 'active'));

        if (selectedCategory) {
          q = query(q, where('category', '==', selectedCategory));
        }

        if (selectedCondition) {
          q = query(q, where('condition', '==', selectedCondition));
        }

        q = query(q, orderBy('createdAt', 'desc'));

        const snapshot = await getDocs(q);
        const productsList = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
          }))
          .filter(
            (product) =>
              product.price >= priceRange.min && product.price <= priceRange.max
          ) as Product[];

        setProducts(productsList);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedCondition, priceRange]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-200 animate-pulse rounded-lg h-64"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filtros */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Categorias</h3>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input"
            >
              <option value="">Todas</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Condição</h3>
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="input"
            >
              <option value="">Todas</option>
              {conditions.map((condition) => (
                <option key={condition.value} value={condition.value}>
                  {condition.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Preço</h3>
            <div className="space-y-2">
              <input
                type="number"
                placeholder="Mínimo"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    min: Number(e.target.value),
                  }))
                }
                className="input"
              />
              <input
                type="number"
                placeholder="Máximo"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    max: Number(e.target.value),
                  }))
                }
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="flex-1">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              {products.length} Produtos Encontrados
            </h2>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum produto encontrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 