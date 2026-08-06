import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Flame, Percent, Clock, ArrowRight, ShieldCheck } from 'lucide-react';
import { productApi } from '../../api/productApi';
import { categoryApi } from '../../api/categoryApi';
import { useApi } from '../../hooks/useApi';
import { Product, Category } from '../../types';
import { ProductGrid } from '../../components/product/ProductGrid';
import { ProductFilter } from '../../components/product/ProductFilter';
import { ProductSkeleton } from '../../components/common/skeleton/ProductSkeleton';
import { QuickViewModal } from '../../components/product/QuickViewModal';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { Pagination } from '../../components/common/Pagination';

export const ProductList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchFromUrl = searchParams.get('search') || '';

  const { data: categories } = useApi<Category[]>(categoryApi.getCategories);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let res;
      if (searchFromUrl) {
        res = await productApi.searchProducts(searchFromUrl, currentPage, 12);
      } else if (selectedCategory !== 'ALL') {
        res = await productApi.filterByCategory(selectedCategory, currentPage, 12);
      } else {
        res = await productApi.getProducts(currentPage, 12);
      }

      const resObj = (res as any)?.data ?? res;
      let list: Product[] = [];
      if (Array.isArray(resObj)) {
        list = resObj;
      } else if (resObj && Array.isArray(resObj.content)) {
        list = resObj.content;
      } else if (res && res.data && Array.isArray(res.data.content)) {
        list = res.data.content;
      }

      // Secondary client-side refinement for price & stock if needed
      if (priceRange[1] > 0) {
        list = list.filter((p) => p.price <= priceRange[1]);
      }
      if (inStockOnly) {
        list = list.filter((p) => (p.stockQuantity ?? p.stock ?? 0) > 0);
      }

      setProducts(list);
    } catch (err: any) {
      setError(err?.message || 'Error fetching products from API');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchFromUrl, selectedCategory, priceRange, inStockOnly]);

  useEffect(() => {
    const saved = localStorage.getItem('recently_viewed_products');
    if (saved) {
      try {
        setRecentlyViewed(JSON.parse(saved));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
    // Track recently viewed
    const updated = [product, ...recentlyViewed.filter((p) => p.id !== product.id)].slice(0, 4);
    setRecentlyViewed(updated);
    localStorage.setItem('recently_viewed_products', JSON.stringify(updated));
  };

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setPriceRange([0, 2000]);
    setInStockOnly(false);
  };

  return (
    <div className="space-y-10">
      {/* Hero Banner Section */}
      {!searchFromUrl && selectedCategory === 'ALL' && (
        <div className="relative overflow-hidden rounded-3xl !bg-slate-950 !text-white p-8 md:p-12 shadow-xl border border-slate-800/80">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--vynk-brand)]/25 via-slate-950 to-slate-950 pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-[var(--vynk-brand)] uppercase tracking-widest border border-white/20">
              <Sparkles className="w-3.5 h-3.5" /> Next-Gen Enterprise E-Commerce
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight !text-white drop-shadow-sm">
              Discover High-Performance Hardware & Tech
            </h1>
            <p className="text-sm md:text-base !text-slate-200 font-medium leading-relaxed">
              Shop verified products directly from premier enterprise suppliers with instant fulfillment and full warranty protection.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <a
                href="#catalog-section"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--vynk-brand)] hover:bg-[var(--vynk-brand-hover)] text-white font-extrabold shadow-lg shadow-[var(--vynk-brand)]/25 transition transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-4 h-4" /> Explore Catalog
              </a>
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-300 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Certified Merchant Quality
              </span>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 md:opacity-20 pointer-events-none transform translate-x-12 translate-y-12 text-[var(--vynk-brand)]">
            <ShoppingBag size={380} />
          </div>
        </div>
      )}

      {/* Categories Bar */}
      {categories && categories.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xs font-extrabold text-app-secondary uppercase tracking-wider flex items-center gap-2">
            <Flame className="w-4 h-4 text-[var(--vynk-brand)]" /> Top Categories
          </h2>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                selectedCategory === 'ALL'
                  ? 'bg-[var(--vynk-brand)] text-white shadow-md shadow-[var(--vynk-brand)]/20'
                  : 'bg-app-card text-app-primary border border-app hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[var(--vynk-brand)] text-white shadow-md shadow-[var(--vynk-brand)]/20'
                    : 'bg-app-card text-app-primary border border-app hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Catalog & Filter Grid */}
      <div id="catalog-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-app-primary">Product Catalog</h2>
            <p className="text-xs text-app-muted mt-0.5">
              {searchFromUrl ? `Search results for "${searchFromUrl}"` : 'Browse enterprise products from certified merchants'}
            </p>
          </div>
          <span className="text-xs font-bold text-app-secondary bg-app-card border border-app px-3.5 py-1.5 rounded-full self-start">
            Showing {products.length} Items
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-1">
            <ProductFilter
              categories={categories || []}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              inStockOnly={inStockOnly}
              onInStockToggle={setInStockOnly}
              onReset={handleResetFilters}
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <ProductSkeleton key={idx} />
                ))}
              </div>
            ) : error ? (
              <ErrorMessage message={error} onRetry={fetchProducts} />
            ) : (
              <>
                <ProductGrid
                  products={products}
                  onCartUpdated={fetchProducts}
                  onQuickView={handleQuickView}
                />
                <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recently Viewed Products */}
      {recentlyViewed.length > 0 && (
        <div className="pt-8 border-t border-app space-y-4">
          <div className="flex items-center gap-2 text-app-primary font-bold text-lg">
            <Clock className="w-5 h-5 text-[var(--vynk-brand)]" />
            <span>Recently Viewed Products</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {recentlyViewed.map((prod) => (
              <Link
                key={prod.id}
                to={`/products/${prod.id}`}
                className="p-3 bg-app-card rounded-xl border border-app hover:border-[var(--vynk-brand)] transition flex items-center gap-3 group"
              >
                <img
                  src={prod.images[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'}
                  alt={prod.title}
                  className="w-12 h-12 rounded-lg object-cover bg-slate-100 dark:bg-slate-800"
                />
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-app-primary truncate group-hover:text-[var(--vynk-brand)] transition">
                    {prod.title}
                  </h4>
                  <p className="text-xs font-extrabold text-[var(--vynk-brand)]">
                    ${prod.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onCartUpdated={fetchProducts}
      />
    </div>
  );
};

