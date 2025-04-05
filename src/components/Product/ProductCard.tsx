'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { Product } from '@/types/product';
import { formatPrice } from '@/utils/format';
import { FiMapPin } from 'react-icons/fi';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/produto/${product.id}`}>
      <motion.div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.isSwappable && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Aceita Troca
            </div>
          )}
          {product.status !== 'disponível' && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-semibold uppercase">
                {product.status}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-2xl font-bold text-red-600 mb-2">
            {formatPrice(product.price)}
          </p>
          
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              {product.userPhoto ? (
                <Image
                  src={product.userPhoto}
                  alt={product.userName}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
              )}
              <span>{product.userName}</span>
            </div>
          </div>

          <div className="mt-2 flex flex-col space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <FiMapPin className="w-4 h-4" />
              <span>{product.condominiumName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                product.condition === 'novo'
                  ? 'bg-green-100 text-green-800'
                  : product.condition === 'seminovo'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {product.condition}
              </span>
              <span className="text-xs text-gray-500">
                {product.category}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}; 