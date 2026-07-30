import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star, Columns } from 'lucide-react';
import { Product } from '../../../types';
import { formatCurrency } from '../../../core/utils/formatters';
import { Badge } from '../../../shared/components/Badge';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { cartApi } from '../../cart/cart.api';
import { setCart } from '../../cart/cartSlice';
import { wishlistApi } from '../../wishlist/wishlist.api';
import { setWishlist } from '../../wishlist/wishlistSlice';
import { useToast } from '../../../shared/components/Toast';
import { useFlyToCart } from '../../../shared/components/FlyToCart';
import { useCompare } from '../compareContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { triggerFlyToCart } = useFlyToCart();
  const { isComparing, addToCompare, removeFromCompare } = useCompare();
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);

  const isWishlisted = wishlistItems.some((w) => w.productId === product.id);
  const isSelectedForCompare = isComparing(product.id);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Trigger Fly-to-Cart Animation
    triggerFlyToCart(e, product.imageUrl);

    try {
      const updatedCart = await cartApi.addItem(product.id, 1);
      dispatch(setCart(updatedCart));
      toast.success('Added to Cart', `${product.name} is now in your cart.`);
    } catch {
      toast.error('Failed to add item to cart.');
    }
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSelectedForCompare) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product);
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      if (isWishlisted) {
        const updated = await wishlistApi.removeFromWishlist(product.id);
        dispatch(setWishlist(updated));
        toast.info('Removed from Wishlist');
      } else {
        const updated = await wishlistApi.addToWishlist(product.id);
        dispatch(setWishlist(updated));
        toast.success('Saved to Wishlist');
      }
    } catch {
      toast.error('Failed to update wishlist');
    }
  };

  return (
    <Link
      to={`/products/${product.id}`}
      className="group bg-surface border border-border rounded-xl shadow-card hover:shadow-xl hover:shadow-[0_10px_25px_-5px_rgba(154,140,152,0.25)] hover:-translate-y-1.5 hover:border-brand/40 transition-all duration-300 flex flex-col overflow-hidden relative"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 bg-surface-hover overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.isFlashSale && <Badge variant="accent">Flash Sale</Badge>}
          {product.stockQuantity < 10 && product.stockQuantity > 0 && (
            <Badge variant="warning">Only {product.stockQuantity} Left</Badge>
          )}
          {product.stockQuantity === 0 && <Badge variant="danger">Out of Stock</Badge>}
        </div>

        {/* Top Right Action Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {/* Compare Button */}
          <button
            type="button"
            onClick={handleToggleCompare}
            className={`p-2 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
              isSelectedForCompare
                ? 'bg-brand text-brand-foreground border-brand'
                : 'bg-surface/80 text-content-secondary border-border hover:bg-surface hover:text-brand'
            }`}
            title={isSelectedForCompare ? 'Remove from comparison' : 'Compare product'}
          >
            <Columns className="w-4 h-4" />
          </button>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={handleToggleWishlist}
            className={`p-2 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
              isWishlisted
                ? 'bg-status-danger text-white border-status-danger'
                : 'bg-surface/80 text-content-secondary border-border hover:bg-surface hover:text-status-danger'
            }`}
            title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>
        </div>
      </div>


      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <span className="text-[10px] font-bold text-content-muted uppercase tracking-wider">
            {product.categoryName}
          </span>
          <h3 className="text-xs font-bold text-content-primary line-clamp-2 mt-0.5 group-hover:text-brand transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Rating & Stock */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating}</span>
            <span className="text-content-muted font-normal">({product.reviewCount})</span>
          </div>

          <span
            className={`text-[11px] font-semibold ${
              product.stockQuantity > 0 ? 'text-status-success' : 'text-status-danger'
            }`}
          >
            {product.stockQuantity > 0 ? 'In Stock' : 'Unavailable'}
          </span>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-extrabold text-content-primary">{formatCurrency(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-content-muted line-through">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className="p-2 bg-brand text-brand-foreground rounded-lg hover:bg-brand-hover transition-colors disabled:opacity-50 cursor-pointer"
            title="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};
