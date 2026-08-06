import React from 'react';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Product } from '../../types';
import { Button } from '../common/Button';
import { cartApi } from '../../api/cartApi';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onCartUpdated?: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onCartUpdated }) => {
  const [adding, setAdding] = React.useState(false);

  if (!product) return null;

  const handleAddToCart = async () => {
    setAdding(true);
    try {
      await cartApi.addToCart(product.id, 1);
      toast.success(`Added "${product.title}" to cart`);
      if (onCartUpdated) onCartUpdated();
      onClose();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to add item to cart');
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-app-card border border-app rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="w-full md:w-1/2 bg-slate-100 dark:bg-slate-900/60 p-6 flex items-center justify-center">
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'}
            alt={product.title}
            className="max-h-80 object-contain rounded-lg shadow-sm"
          />
        </div>

        <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              {product.category}
            </span>
            <h2 className="text-xl font-bold text-app-primary mt-1 leading-snug">
              {product.title}
            </h2>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-500">
                <Star size={16} className="fill-amber-500" />
                <span className="ml-1 text-sm font-bold text-app-primary">{product.rating}</span>
              </div>
              <span className="text-app-muted text-xs">• Certified Enterprise Item</span>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-2xl font-extrabold text-app-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.comparePrice && product.comparePrice > product.price && (
                <span className="text-sm text-app-muted line-through">
                  ${product.comparePrice.toFixed(2)}
                </span>
              )}
            </div>

            <p className="mt-3 text-sm text-app-secondary line-clamp-3">
              {product.description || 'Premium enterprise-grade product verified for high durability and optimal performance.'}
            </p>

            <div className="mt-4 space-y-2 text-xs text-app-muted">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-indigo-500" /> Express 2-Day Shipping Available
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500" /> 1-Year Full Enterprise Warranty
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-app flex items-center gap-3">
            <Button
              className="flex-1"
              onClick={handleAddToCart}
              loading={adding}
              disabled={product.stock <= 0}
              icon={<ShoppingCart size={18} />}
            >
              Add to Shopping Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
