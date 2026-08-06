import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { wishlistApi } from '../../api/wishlistApi';
import { cartApi } from '../../api/cartApi';
import { WishlistItem } from '../../types';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { EmptyState } from '../../components/common/EmptyState';
import { BRAND } from '../../constants/brand';

export const Wishlist: React.FC = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await wishlistApi.getWishlist();
      const wishlistData = (res as any)?.data ?? res;
      if (Array.isArray(wishlistData)) {
        setItems(wishlistData);
      } else if (res && (res as any).success === false) {
        setError((res as any).message || 'Failed to load wishlist');
      } else {
        setItems([]);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load wishlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId: string | number) => {
    try {
      await wishlistApi.removeFromWishlist(productId);
      fetchWishlist();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddToCart = async (item: WishlistItem) => {
    const prodId = item.productId || item.id || item.wishlistId;
    if (!prodId) return;
    try {
      await cartApi.addToCart(prodId, 1);
      await handleRemove(prodId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <Loader text="Loading stored wishlist items..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchWishlist} />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Saved Wishlist</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Saved catalog items bookmarked for future purchases.
        </p>
      </div>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((item) => {
            const prodId = item.productId || item.id || item.wishlistId;
            const title = item.productTitle || item.productName || 'Saved Item';
            const price = item.price || 0;
            const img = item.imageUrl || item.image || (item.images && item.images[0]) || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800';

            return (
              <div key={prodId} className="card-surface p-4 space-y-3 flex flex-col justify-between">
                <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img src={img} alt={title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">{title}</h3>
                  <p className="text-sm font-extrabold text-[var(--vynk-brand)] mt-1">${price.toFixed(2)}</p>
                </div>
                <div className="flex gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    size="sm"
                    className="flex-1"
                    icon={<ShoppingCart className="w-3.5 h-3.5" />}
                  >
                    Move to Cart
                  </Button>
                  <button
                    onClick={() => prodId && handleRemove(prodId)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState title="Your Wishlist is Empty" description={BRAND.emptyStates.wishlist} />
      )}
    </div>
  );
};
