'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit, DocumentData } from 'firebase/firestore';
import ProductCard from '@/components/Product/ProductCard';
import { Product } from '@/types/product';
import Link from 'next/link';
import { db } from '@/lib/firebase';

export default function Home() {
  const [highlightedProducts, setHighlightedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHighlightedProducts = async () => {
      try {
        const productsQuery = query(
          collection(db, 'products'),
          orderBy('createdAt', 'desc'),
          limit(8)
        );

        const querySnapshot = await getDocs(productsQuery);
        const products = querySnapshot.docs.map((doc) => {
          const data = doc.data() as DocumentData & {
            createdAt?: { toDate(): Date };
            updatedAt?: { toDate(): Date };
          };
          
          return {
            id: doc.id,
            title: data.title || '',
            description: data.description || '',
            price: data.price || 0,
            imageUrl: data.imageUrl,
            category: data.category || '',
            condition: data.condition || 'new',
            swap: data.swap || false,
            userId: data.userId || '',
            userName: data.userName || '',
            userPhotoURL: data.userPhotoURL,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            location: data.location,
          } as Product;
        });

        setHighlightedProducts(products);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlightedProducts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold mb-8">Bem-vindo ao Vizinhou</h1>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link
          href="/produtos"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Produtos{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Encontre produtos à venda na sua região.
          </p>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-h-4 aspect-w-3 w-full overflow-hidden rounded-lg bg-gray-200" />
              <div className="mt-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {highlightedProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
} 