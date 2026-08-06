import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '../../types';
import { Button } from '../common/Button';
import { cartApi } from '../../api/cartApi';
import { wishlistApi } from '../../api/wishlistApi';

interface ProductCardProps {
  product: Product;
  onCartUpdated?: () => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onCartUpdated, onQuickView }) => {
  const [adding, setAdding] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  const title = product.title || product.name || 'Product';
  const imageUrl = (product.images && product.images[0]) || product.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800';
  const categoryLabel = product.category || product.categoryName || 'General';
  const stockCount = product.stock ?? product.stockQuantity ?? 10;
  const ratingValue = product.rating ?? 4.5;

  const discountPercent = product.comparePrice && product.comparePrice > product.price
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    try {
      await cartApi.addToCart(product.id, 1);
      toast.success(`Added "${title}" to cart`);
      if (onCartUpdated) onCartUpdated();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to add item to cart');
    } finally {
      setAdding(false);
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (inWishlist) {
        await wishlistApi.removeFromWishlist(product.id);
        setInWishlist(false);
        toast.info('Removed from wishlist');
      } else {
        await wishlistApi.addToWishlist(product.id);
        setInWishlist(true);
        toast.success('Saved to wishlist');
      }
    } catch (err: any) {
      toast.error(err?.message || 'Wishlist operation failed');
    }
  };

  return (
    <div className="group bg-app-card rounded-2xl border border-app shadow-xs flex flex-col justify-between overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-4/3 bg-gray-100 dark:bg-gray-800/80 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Floating Quick Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {discountPercent > 0 && (
            <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold tracking-wide uppercase bg-[var(--color-primary)] text-white shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
          {stockCount <= 5 && stockCount > 0 && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase bg-[var(--color-secondary)] text-white shadow-xs">
              Only {stockCount} left
            </span>
          )}
        </div>

        {/* Wishlist & Quick View Hover Overlay Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={handleWishlistToggle}
            title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            className={`p-2 rounded-full backdrop-blur-md transition-all shadow-sm cursor-pointer ${
              inWishlist
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-app-surface text-app-primary hover:bg-[var(--color-primary)] hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>

          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              title="Quick View"
              className="p-2 rounded-full backdrop-blur-md bg-app-surface text-app-primary hover:bg-[var(--color-primary)] hover:text-white transition-all shadow-sm cursor-pointer opacity-0 group-hover:opacity-100"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-app-muted mb-1.5">
            <span className="font-bold text-[var(--color-secondary)] uppercase tracking-wider text-[11px]">
              {categoryLabel}
            </span>
            <div className="flex items-center gap-1 font-bold text-app-primary bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span>{ratingValue}</span>
            </div>
          </div>

          <Link to={`/products/${product.id}`} className="block hover:text-[var(--color-primary)] transition-colors">
            <h3 className="text-[16px] font-bold text-app-primary line-clamp-2 leading-snug">
              {title}
            </h3>
          </Link>
        </div>

        <div className="pt-3 border-t border-app flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-[var(--price-color)]">
                ${product.price.toFixed(2)}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-xs text-app-muted line-through">
                  ${product.comparePrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {/* Stock indicator badge */}
            <div className="mt-1 flex items-center gap-1 text-[11px]">
              {stockCount > 0 ? (
                <span className="inline-flex items-center gap-1 text-[var(--stock-color)] font-semibold">
                  <CheckCircle className="w-3 h-3" /> In Stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[var(--out-stock-color)] font-semibold">
                  <XCircle className="w-3 h-3" /> Out of Stock
                </span>
              )}
            </div>
          </div>

          <Button
            size="sm"
            onClick={handleAddToCart}
            loading={adding}
            disabled={stockCount <= 0}
            icon={<ShoppingCart className="w-3.5 h-3.5" />}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

