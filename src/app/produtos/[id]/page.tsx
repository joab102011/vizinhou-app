'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiTag, FiMapPin, FiUser, FiClock, FiMessageSquare } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import ChatModal from '@/components/Chat/ChatModal';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import toast from 'react-hot-toast';

// Dados de exemplo para o produto
const productData = {
  id: '1',
  title: 'Produto em Destaque',
  description: 'Descrição detalhada do produto em destaque. Este é um produto de alta qualidade com várias características interessantes.',
  price: 'R$ 299,90',
  category: 'Eletrônicos',
  location: 'São Paulo, SP',
  seller: 'João Silva',
  publishedAt: 'Publicado há 2 dias',
  condition: 'Novo',
  whatsapp: '5511999999999', // Número do WhatsApp do vendedor
  images: [
    '/images/placeholder-product.jpg',
    '/images/placeholder-product.jpg',
    '/images/placeholder-product.jpg'
  ]
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [activeImage, setActiveImage] = useState(0);
  const [showChatModal, setShowChatModal] = useState(false);
  const [product] = useState(productData);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Verifica autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      if (!user) {
        toast.error('Você precisa estar logado para acessar esta página');
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Simula carregamento do produto pelo ID
  useEffect(() => {
    if (!isLoading) {
      console.log('Carregando produto com ID:', params.id);
    }
  }, [params.id, isLoading]);

  const handleWhatsAppClick = () => {
    const message = `Olá! Tenho interesse no produto ${product.title}.`;
    const whatsappUrl = `https://wa.me/${product.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Botão Voltar */}
      <Link href="/produtos" className="inline-flex items-center text-gray-600 hover:text-primary mb-6">
        <div className="mr-2">
          <FiArrowLeft size={20} />
        </div>
        <span>Voltar para produtos</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Galeria de Imagens */}
        <div className="space-y-4">
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.images[activeImage]}
              alt={product.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`aspect-w-16 aspect-h-9 rounded-lg overflow-hidden ${
                  activeImage === index ? 'ring-2 ring-primary' : ''
                }`}
              >
                <img
                  src={image}
                  alt={`${product.title} - ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Informações do Produto */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.title}</h1>
          <p className="text-2xl text-primary font-bold mb-4">{product.price}</p>
          
          <div className="flex items-center text-gray-800 mb-2">
            <div className="mr-2">
              <FiTag size={20} />
            </div>
            <span>{product.category}</span>
          </div>
          
          <div className="flex items-center text-gray-800 mb-2">
            <div className="mr-2">
              <FiMapPin size={20} />
            </div>
            <span>{product.location}</span>
          </div>
          
          <div className="flex items-center text-gray-800 mb-2">
            <div className="mr-2">
              <FiUser size={20} />
            </div>
            <span>{product.seller}</span>
          </div>
          
          <div className="flex items-center text-gray-800 mb-6">
            <div className="mr-2">
              <FiClock size={20} />
            </div>
            <span>{product.publishedAt}</span>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Descrição</h2>
            <p className="text-gray-900 font-medium leading-relaxed bg-white/50 p-3 rounded-lg">{product.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Condição</h2>
            <p className="text-gray-900 font-medium bg-white/50 p-3 rounded-lg">{product.condition}</p>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={() => setShowChatModal(true)}
              className="w-full bg-red-600/90 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-red-700/90 transition-colors shadow-md"
            >
              <div className="mr-2">
                <FiMessageSquare size={20} />
              </div>
              <span>Iniciar Conversa com o Vendedor</span>
            </button>

            <button 
              onClick={handleWhatsAppClick}
              className="w-full bg-green-600/90 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-green-700/90 transition-colors shadow-md"
            >
              <div className="mr-2">
                <FaWhatsapp size={20} />
              </div>
              <span>Conversar no WhatsApp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Modal */}
      <ChatModal
        isOpen={showChatModal}
        onClose={() => setShowChatModal(false)}
        productTitle={product.title}
        sellerName={product.seller}
      />
    </div>
  );
} 