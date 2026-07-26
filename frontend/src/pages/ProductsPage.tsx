import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useRouter } from '../core/router/Router';
import { PRODUCT_CATALOG, ProductItem } from '../data/products';
import { productService } from '../core/api/productService';
import { ROUTES } from '../theme/routes';
import {
  Search,
  Filter,
  Star,
  Heart,
  ShoppingCart,
  X,
  RefreshCw,
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { t } = useLanguage();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const { navigate } = useRouter();

  const [products, setProducts] = useState<ProductItem[]>(PRODUCT_CATALOG);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('NEWEST');
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  // Fetch from live /api/products on mount if available
  useEffect(() => {
    let isMounted = true;
    const fetchLiveProducts = async () => {
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
            reviewCount: 25,
            stockQuantity: item.stockQuantity || 10,
            imageUrl: item.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
            description: item.description || '',
            specifications: {},
          }));
          setProducts(mapped);
        }
      } catch (e) {
        console.info('Live /api/products backend endpoint unreachable. Using default catalog.', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLiveProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['ALL', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
      const matchesPrice = p.price <= maxPrice;
      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'PRICE_LOW') return a.price - b.price;
      if (sortBy === 'PRICE_HIGH') return b.price - a.price;
      if (sortBy === 'RATING') return b.rating - a.rating;
      return b.id - a.id;
    });
  }, [products, searchQuery, selectedCategory, sortBy, maxPrice]);

  return (
    <div className="space-y-8 py-6">
      
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] tracking-tight">
            {t('nav.products')}
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Explore enterprise product catalog connected to GET /api/products.
          </p>
        </div>

        {loading && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] text-xs text-[var(--text-secondary)]">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-[var(--brand-primary)]" />
            <span>Syncing with Spring Boot /api/products...</span>
          </div>
        )}
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-[var(--bg-surface)] p-5 rounded-2xl border border-[var(--border-default)] shadow-xs">
        
        {/* Search Field */}
        <div className="relative md:col-span-2">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('product.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
          >
            <option value="ALL">{t('product.categoryAll')}</option>
            {categories.filter((c) => c !== 'ALL').map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
          >
            <option value="NEWEST">{t('product.sortNewest')}</option>
            <option value="PRICE_LOW">{t('product.sortPriceLow')}</option>
            <option value="PRICE_HIGH">{t('product.sortPriceHigh')}</option>
            <option value="RATING">{t('product.sortRating')}</option>
          </select>
        </div>
      </div>

      {/* Product Grid Listing */}
      {loading ? (
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
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl">
          <Filter className="w-10 h-10 text-[var(--text-secondary)] mx-auto mb-3 stroke-1" />
          <h3 className="text-base font-bold text-[var(--text-primary)]">
            No products match your filters
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Try adjusting your search criteria or resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
              setMaxPrice(1000);
            }}
            className="mt-4 px-4 py-2 bg-[#4F6D8C] hover:bg-[#3E5973] text-white dark:bg-[#88BDF2] dark:text-[#111827] dark:hover:bg-[#6EA8DF] text-xs font-semibold rounded-xl transition-all cursor-pointer border border-[#4F6D8C] dark:border-[#88BDF2]"
          >
            {t('btn.clear')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
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
                      SKU: {product.sku}
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

    </div>
  );
};
