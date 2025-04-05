'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/types/product';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency, formatDateTime } from '@/utils/format';
import ChatWindow from '@/components/Chat/ChatWindow';

const conditions = [
  { value: 'new', label: 'Novo' },
  { value: 'like_new', label: 'Como novo' },
  { value: 'good', label: 'Bom' },
  { value: 'fair', label: 'Regular' },
  { value: 'poor', label: 'Ruim' },
] as const;

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'products', id as string);
        const productDoc = await getDoc(productRef);

        if (productDoc.exists()) {
          setProduct({
            id: productDoc.id,
            ...productDoc.data(),
            createdAt: productDoc.data().createdAt?.toDate(),
            updatedAt: productDoc.data().updatedAt?.toDate(),
          } as Product);
        }
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-200 h-96 rounded-lg mb-8" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Produto não encontrado
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagem do Produto */}
        <div>
          <img
            src={product.imageUrl || '/placeholder.png'}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Detalhes do Produto */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
            <p className="text-2xl font-bold text-primary-600 mt-2">
              {formatCurrency(product.price)}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <img
              src={product.userPhotoURL || '/avatar-placeholder.png'}
              alt={product.userName}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium">{product.userName}</p>
              <p className="text-sm text-gray-500">
                Publicado em {formatDateTime(product.createdAt)}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Descrição</h2>
            <p className="text-gray-600 whitespace-pre-line">
              {product.description}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <span className="font-medium w-24">Categoria:</span>
              <span className="text-gray-600">{product.category}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-24">Condição:</span>
              <span className="text-gray-600">
                {
                  conditions.find((c) => c.value === product.condition)?.label ||
                  product.condition
                }
              </span>
            </div>
            {product.swap && (
              <div className="flex items-center">
                <span className="font-medium w-24">Troca:</span>
                <span className="text-blue-600">Aceita troca</span>
              </div>
            )}
          </div>

          {user && user.uid !== product.userId && (
            <div className="pt-6 border-t">
              <button
                onClick={() => setShowChat(true)}
                className="w-full btn-primary"
              >
                Conversar com o Vendedor
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Chat */}
      {showChat && user && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">Chat</h2>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ChatWindow
              productId={product.id}
              receiverId={product.userId}
              receiverName={product.userName}
              receiverPhotoURL={product.userPhotoURL}
            />
          </div>
        </div>
      )}
    </div>
  );
} 