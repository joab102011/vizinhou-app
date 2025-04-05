'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { formatCurrency } from '@/utils/format';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produtos/${product.id}`} className="group">
      <div className="aspect-h-4 aspect-w-3 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={product.imageUrl || '/placeholder.png'}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
          width={300}
          height={400}
        />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm text-gray-700">{product.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.condition}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">
          {formatCurrency(product.price)}
        </p>
      </div>
    </Link>
  );
} 