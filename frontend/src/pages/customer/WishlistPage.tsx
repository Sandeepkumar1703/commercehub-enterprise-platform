import React from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { useRouter } from '../../core/router/Router';
import { ROUTES } from '../../theme/routes';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const { t } = useLanguage();
  const { navigate } = useRouter();

  return (
    <div className="space-y-6 py-6">
      
      <div>
        <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">
          {t('nav.wishlist')}
        </h1>
        <p className="text-xs text-[var(--text-secondary)] mt-1">
          Your saved favorite products for future purchasing.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-16 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-3xl space-y-4">
          <Heart className="w-12 h-12 text-[var(--text-secondary)] mx-auto stroke-1" />
          <h3 className="text-base font-bold text-[var(--text-primary)]">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Explore our store catalog and click the heart icon on items you love.
          </p>
          <button
            onClick={() => navigate(ROUTES.PRODUCTS)}
            className="px-5 py-2.5 bg-[var(--brand-primary)] text-white font-bold text-xs rounded-xl cursor-pointer hover:bg-[var(--brand-hover)] transition-all"
          >
            {t('home.hero.shopBtn')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl p-5 space-y-4 shadow-xs flex flex-col justify-between"
            >
              <div className="flex gap-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-20 h-20 rounded-xl object-cover border border-[var(--border-default)] bg-[var(--bg-surface-raised)]"
                />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[var(--text-primary)] line-clamp-2">
                    {product.name}
                  </h4>
                  <p className="text-[10px] font-mono text-[var(--text-secondary)]">SKU: {product.sku}</p>
                  <p className="text-sm font-extrabold text-[var(--text-primary)]">${product.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-default)]">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 py-2 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>{t('btn.addCart')}</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="p-2 border border-[var(--border-default)] hover:border-rose-500 hover:text-rose-500 rounded-xl text-[var(--text-secondary)] cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
