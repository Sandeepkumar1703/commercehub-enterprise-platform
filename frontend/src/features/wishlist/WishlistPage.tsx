import React, { useEffect } from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { wishlistApi } from './wishlist.api';
import { setWishlist } from './wishlistSlice';
import { cartApi } from '../cart/cart.api';
import { setCart, toggleCartDrawer } from '../cart/cartSlice';
import { Button } from '../../shared/components/Button';
import { formatCurrency } from '../../core/utils/formatters';
import { useToast } from '../../shared/components/Toast';

export const WishlistPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { items, isLoading } = useAppSelector((state) => state.wishlist);

  useEffect(() => {
    wishlistApi.getWishlist().then((res) => dispatch(setWishlist(res))).catch(() => {});
  }, [dispatch]);

  const handleMoveToCart = async (productId: string) => {
    try {
      const updatedCart = await cartApi.addItem(productId, 1);
      dispatch(setCart(updatedCart));
      const updatedWishlist = await wishlistApi.removeFromWishlist(productId);
      dispatch(setWishlist(updatedWishlist));
      toast.success('Moved to Cart');
      dispatch(toggleCartDrawer(true));
    } catch {
      toast.error('Failed to move item to cart');
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      const updated = await wishlistApi.removeFromWishlist(productId);
      dispatch(setWishlist(updated));
      toast.info('Item removed from wishlist');
    } catch {
      toast.error('Failed to remove item');
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-surface-hover flex items-center justify-center text-content-muted mx-auto">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="text-h2 font-extrabold text-content-primary">Your Wishlist is Empty</h2>
        <p className="text-xs text-content-muted">Save your favorite hardware and apparel to easily track price drops and restocks.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="border-b border-border pb-4">
        <h1 className="text-h1 font-extrabold text-content-primary">Saved Wishlist ({items.length} items)</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-surface border border-border rounded-xl p-4 shadow-card hover:border-brand/30 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-full h-48 object-cover rounded-lg border border-border"
              />
              <div>
                <span className="text-[10px] font-bold text-content-muted uppercase">{item.product.categoryName}</span>
                <h3 className="text-xs font-bold text-content-primary line-clamp-1">{item.product.name}</h3>
                <p className="text-sm font-extrabold text-brand mt-1">{formatCurrency(item.product.price)}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <Button
                onClick={() => handleMoveToCart(item.product.id)}
                size="sm"
                className="flex-1"
                leftIcon={<ShoppingBag className="w-3.5 h-3.5" />}
              >
                Move to Cart
              </Button>
              <button
                onClick={() => handleRemove(item.product.id)}
                className="p-2 text-content-muted hover:text-status-danger border border-border rounded-lg hover:bg-surface-hover cursor-pointer"
                title="Remove from wishlist"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
