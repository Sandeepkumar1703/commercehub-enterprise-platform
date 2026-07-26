import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useAppConfig } from '../context/ConfigContext';
import { useRouter } from '../core/router/Router';
import { PRODUCT_CATALOG, ProductItem } from '../data/products';
import { productService } from '../core/api/productService';
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
  Sparkles,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { navigate } = useRouter();
  const { config } = useAppConfig();

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    const fetchHomeProducts = async () => {
      setLoading(true);
      try {
        const liveItems = await productService.getAllProducts();
        if (isMounted && Array.isArray(liveItems) && liveItems.length > 0) {
          const mapped: ProductItem[] = liveItems.map((item) => ({
            id: item.id,
            name: item.name,
            sku: item.sku || `SKU-${item.id}`,
            category: item.categoryName || 'General',
            categoryId: item.categoryId || 1,
            price: item.price || 0,
            rating: 4.8,
            reviewCount: 24,
            stockQuantity: item.stockQuantity || 10,
            imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
            description: item.description || '',
            specifications: {},
            isFeatured: true,
          }));
          setProducts(mapped);
        } else if (isMounted) {
          setProducts(PRODUCT_CATALOG);
        }
      } catch (e) {
        console.info('Backend product API offline, using fallback catalog', e);
        if (isMounted) setProducts(PRODUCT_CATALOG);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchHomeProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const featuredProducts = products.filter((p) => p.isFeatured || p.rating >= 4.7).slice(0, 6);

  return (
    <div className="space-y-16 py-6">
      
      {/* Hero Banner Section - Enterprise Platform Theme */}
      <section className="relative overflow-hidden rounded-3xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] p-8 sm:p-12 lg:p-16 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF4F8] dark:bg-[#2B3645] text-[#4F6D8C] dark:text-[#88BDF2] border border-[#D6DEE6] dark:border-[#374151] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#4F6D8C] dark:text-[#88BDF2]" />
            <span>CommerceHub Enterprise Monolith Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-[var(--text-primary)]">
            {t('home.hero.title')}
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            {t('home.hero.subtitle')}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => navigate(ROUTES.PRODUCTS)}
              className="px-6 py-3.5 bg-[#4F6D8C] hover:bg-[#3E5973] text-white dark:bg-[#88BDF2] dark:text-[#111827] dark:hover:bg-[#6EA8DF] font-bold text-sm rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer border border-[#4F6D8C] dark:border-[#88BDF2]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t('home.hero.shopBtn')}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => navigate(ROUTES.API_DOCS)}
              className="px-6 py-3.5 bg-[#EEF4F8] dark:bg-[#2B3645] hover:bg-[#D6DEE6] dark:hover:bg-[#374151] text-[#24313D] dark:text-[#F8FAFC] border border-[#D6DEE6] dark:border-[#374151] font-bold text-sm rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{t('home.hero.docsBtn')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Value Proposition Highlights Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] shadow-xs flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#EEF4F8] dark:bg-[#2B3645] text-[#4F6D8C] dark:text-[#88BDF2]">
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

        <div className="p-6 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] shadow-xs flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#EEF4F8] dark:bg-[#2B3645] text-[#4F6D8C] dark:text-[#88BDF2]">
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

        <div className="p-6 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] shadow-xs flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#EEF4F8] dark:bg-[#2B3645] text-[#4F6D8C] dark:text-[#88BDF2]">
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

        <div className="p-6 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] shadow-xs flex items-start gap-4">
          <div className="p-3 rounded-xl bg-[#EEF4F8] dark:bg-[#2B3645] text-[#4F6D8C] dark:text-[#88BDF2]">
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

      {/* Featured Products Grid with Skeleton Placeholders */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
              {t('home.topProducts')}
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Curated items dynamically fetched from backend REST endpoints.
            </p>
          </div>
          <button
            onClick={() => navigate(ROUTES.PRODUCTS)}
            className="text-xs font-bold text-[#4F6D8C] dark:text-[#88BDF2] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View Store Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          /* Ink Wash Skeleton Loading Placeholders */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="bg-[var(--bg-surface-raised)] border border-[var(--border-default)] rounded-2xl p-5 space-y-4 animate-skeleton"
              >
                <div className="w-full h-48 bg-[var(--border-default)] rounded-xl"></div>
                <div className="h-4 w-1/3 bg-[var(--border-default)] rounded"></div>
                <div className="h-5 w-3/4 bg-[var(--border-default)] rounded"></div>
                <div className="h-3 w-full bg-[var(--border-default)] rounded"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 w-20 bg-[var(--border-default)] rounded"></div>
                  <div className="h-9 w-28 bg-[var(--border-default)] rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => {
              const isWish = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-[var(--bg-surface)] border border-[var(--border-default)] hover:border-[#6D8196] rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
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
                            ? 'bg-rose-600 text-white border-rose-600 shadow-md'
                            : 'bg-[var(--bg-surface)]/80 text-[var(--text-secondary)] border-[var(--border-default)] hover:text-rose-600'
                        }`}
                      >
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                      <span className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg bg-[#1A1A1A]/80 text-[#FFFFE3] backdrop-blur-sm border border-[#4A4A4A]">
                        {product.sku}
                      </span>
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-[#6D8196] bg-[#6D8196]/15 px-2.5 py-0.5 rounded-full border border-[#6D8196]/30">
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
                        className="text-base font-bold text-[var(--text-primary)] hover:text-[#6D8196] transition-colors line-clamp-1 cursor-pointer"
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
                      className="px-4 py-2 bg-[#4A4A4A] text-[#FFFFE3] hover:bg-[#1A1A1A] rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer border border-[#4A4A4A]"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>{t('btn.addCart')}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

    </div>
  );
};

