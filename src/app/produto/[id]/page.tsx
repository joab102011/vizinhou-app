'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../lib/firebase';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  swap: boolean;
  userId: string;
  userName: string;
  userPhotoURL: string;
}

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const productDoc = await getDoc(doc(db, 'products', id as string));
        if (productDoc.exists()) {
          setProduct({ id: productDoc.id, ...productDoc.data() } as Product);
        }
      } catch (error) {
        console.error('Erro ao carregar produto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleStartChat = () => {
    if (!currentUser) {
      router.push('/login');
      return;
    }

    if (product) {
      router.push(`/chat/new?userId=${product.userId}&productId=${product.id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Produto não encontrado</h1>
          <Link href="/" className="text-primary-600 hover:underline">
            Voltar para a página inicial
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-w-16 aspect-h-9">
            <img
              src={product.imageUrl || '/placeholder.png'}
              alt={product.title}
              className="object-cover w-full h-96"
            />
          </div>
          <div className="p-6">
            <div className="flex items-center mb-4">
              <img
                src={product.userPhotoURL || '/avatar-placeholder.png'}
                alt={product.userName}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{product.userName}</h2>
                <p className="text-sm text-gray-500">Vendedor</p>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-2xl font-bold text-primary-600">
                  Kz {product.price.toFixed(2)}
                </span>
                {product.swap && (
                  <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    Aceita troca
                  </span>
                )}
              </div>
              <button
                onClick={handleStartChat}
                className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors"
              >
                Iniciar Conversa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 