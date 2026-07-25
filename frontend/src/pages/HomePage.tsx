import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useRouter } from '../core/router/Router';
import { PRODUCT_CATALOG } from '../data/products';
import { ROUTES } from '../theme/routes';
import {
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Headphones,
  RotateCcw,
  Star,
  Heart,
  ShoppingCart,
  Check,
  Sparkles,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { navigate } = useRouter();

  const featuredProducts = PRODUCT_CATALOG.filter((p) => p.isFeatured || p.rating >= 4.8);

  return (
    <div className="space-y-16 py-6">
      
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white p-8 sm:p-12 lg:p-16 border border-indigo-800/40 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CommerceHub Monolith Engine v1.1</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            {t('home.hero.title')}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigate(ROUTES.PRODUCTS)}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t('home.hero.shopBtn')}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => navigate(ROUTES.API_DOCS)}
              className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{t('home.hero.docsBtn')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition Highlights Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-xs flex items-start gap-4">
          <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Truck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[var(--text-primary)]">
              {t('home.valueProp.fastShipping')}
            </h4>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              {t('home.valueProp.fastShippingDesc')}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-xs flex items-start gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[var(--text-primary)]">
              {t('home.valueProp.securePayment')}
            </h4>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              {t('home.valueProp.securePaymentDesc')}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-xs flex items-start gap-4">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[var(--text-primary)]">
              {t('home.valueProp.support')}
            </h4>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              {t('home.valueProp.supportDesc')}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-xs flex items-start gap-4">
          <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
            <RotateCcw className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[var(--text-primary)]">
              {t('home.valueProp.returns')}
            </h4>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              {t('home.valueProp.returnsDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
              {t('home.topProducts')}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Curated high-performance items verified by CommerceHub inventory services.
            </p>
          </div>
          <button
            onClick={() => navigate(ROUTES.PRODUCTS)}
            className="text-xs font-bold text-[var(--brand-primary)] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Store Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => {
            const isWish = isInWishlist(product.id);
            return (
              <div
                key={product.id}
                className="group bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[var(--brand-primary)] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/3 bg-[var(--bg-surface-raised)] overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`absolute top-3 right-3 p-2 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
                        isWish
                          ? 'bg-rose-500 text-white border-rose-500 shadow-md'
                          : 'bg-[var(--bg-surface)]/80 text-[var(--text-secondary)] border-[var(--border-default)] hover:text-rose-500'
                      }`}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg bg-black/70 text-white backdrop-blur-sm">
                      {product.sku}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-[var(--text-secondary)] font-normal">
                          ({product.reviewCount})
                        </span>
                      </div>
                    </div>

                    <h3
                      onClick={() => navigate(`${ROUTES.PRODUCT_DETAIL}/${product.id}`)}
                      className="text-base font-bold text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition-colors line-clamp-1 cursor-pointer"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between border-t border-[var(--border-default)]/60 mt-4">
                  <div>
                    <span className="text-lg font-black text-[var(--text-primary)]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[var(--text-secondary)] line-through ml-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="px-4 py-2 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>{t('btn.addCart')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
