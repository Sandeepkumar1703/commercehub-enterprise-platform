import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';
import { EmptyState } from '../common/EmptyState';

interface ProductGridProps {
  products: Product[];
  onCartUpdated?: () => void;
  onQuickView?: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onCartUpdated, onQuickView }) => {
  if (products.length === 0) {
    return (
      <EmptyState
        title="No Products Found"
        description="We couldn't find any products matching your catalog query or filter parameters."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onCartUpdated={onCartUpdated}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};
