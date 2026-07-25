import React, { useState } from 'react';
import { useRouter } from '../core/router/Router';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { PRODUCT_CATALOG } from '../data/products';
import { ROUTES } from '../theme/routes';
import { ProductReviews } from '../components/product/ProductReviews';
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  CheckCircle,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { pathParam, navigate } = useRouter();
  const { t } = useLanguage();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState(false);

  const productId = Number(pathParam) || 101;
  const product = PRODUCT_CATALOG.find((p) => p.id === productId) || PRODUCT_CATALOG[0];
  const isWish = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2500);
  };

  return (
    <div className="space-y-10 py-6">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(ROUTES.PRODUCTS)}
        className="flex items-center gap-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Product Catalog</span>
      </button>

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-[var(--bg-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] shadow-xs">
        
        {/* Left Gallery Image */}
        <div className="space-y-4">
          <div className="aspect-4/3 rounded-2xl overflow-hidden border border-[var(--border-default)] bg-[var(--bg-surface-raised)] relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-mono font-bold rounded-lg bg-black/80 text-white backdrop-blur-md">
              SKU: {product.sku}
            </span>
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 p-3 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
                isWish
                  ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                  : 'bg-[var(--bg-surface)]/80 text-[var(--text-secondary)] border-[var(--border-default)] hover:text-rose-500'
              }`}
            >
              <Heart className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-xs text-[var(--text-secondary)] font-normal">
                  ({product.reviewCount} customer reviews)
                </span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-[var(--text-primary)]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-[var(--text-secondary)] line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md">
                {product.stockQuantity > 0 ? `${product.stockQuantity} In Stock` : 'Out of Stock'}
              </span>
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed pt-2">
              {product.description}
            </p>
          </div>

          {/* Action Area: Quantity & Add to Cart */}
          <div className="space-y-4 border-t border-[var(--border-default)] pt-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">
                {t('product.quantity')}:
              </span>
              <div className="flex items-center border border-[var(--border-default)] rounded-xl bg-[var(--bg-surface-raised)]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 text-sm font-bold text-[var(--text-primary)]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>{t('btn.addCart')}</span>
              </button>
            </div>

            {addedMessage && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>{t('product.addedToCart')}</span>
              </div>
            )}
          </div>

          {/* Value props bullets */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[var(--border-default)] text-[11px] text-[var(--text-secondary)]">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-indigo-500" />
              <span>Express Dispatch</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>2-Year Warranty</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-purple-500" />
              <span>30-Day Returns</span>
            </div>
          </div>

        </div>
      </div>

      {/* Technical Specifications Section */}
      <div className="bg-[var(--bg-surface)] p-6 sm:p-8 rounded-3xl border border-[var(--border-default)] shadow-xs space-y-4">
        <h3 className="text-lg font-extrabold text-[var(--text-primary)]">
          {t('product.specifications')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, val]) => (
            <div
              key={key}
              className="flex justify-between items-center p-3 rounded-xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] text-xs"
            >
              <span className="font-semibold text-[var(--text-secondary)]">{key}</span>
              <span className="font-bold text-[var(--text-primary)]">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews & Ratings Module */}
      <ProductReviews
        productId={product.id}
        initialRating={product.rating}
        initialCount={product.reviewCount}
      />

    </div>
  );
};
