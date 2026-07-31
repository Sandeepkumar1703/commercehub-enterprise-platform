import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, Search, Infinity as InfinityIcon, Layers } from 'lucide-react';
import { productApi } from './product.api';
import { categoryApi } from './category.api';
import { Category, Product } from '../../types';
import { ProductCard } from './components/ProductCard';
import { ProductFilterSidebar, FilterState } from './components/ProductFilterSidebar';
import { Select } from '../../shared/components/Select';
import { Pagination } from '../../shared/components/Table';
import { Skeleton } from '../../shared/components/Skeleton';
import { useDebounce } from '../../core/hooks/useDebounce';
import { useLanguage } from '../../core/i18n/LanguageContext';

const initialFilters: FilterState = {
  categoryId: '',
  minPrice: 0,
  maxPrice: 1000,
  minRating: 0,
  inStock: false,
  sort: 'newest',
};

export const ProductCatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLanguage();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  const [scrollMode, setScrollMode] = useState<'pagination' | 'infinite'>('pagination');

  const [searchKeyword, setSearchKeyword] = useState(searchParams.get('search') || '');
  const debouncedKeyword = useDebounce(searchKeyword, 300);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const sentinelRef = useRef<HTMLDivElement>(null);

  const [filters, setFilters] = useState<FilterState>({
    ...initialFilters,
    categoryId: searchParams.get('category') || '',
  });

  useEffect(() => {
    categoryApi.getCategories().then(setCategories).catch(() => {});
  }, []);

  // Fetch initial or page change
  useEffect(() => {
    if (currentPage === 0) setIsLoading(true);
    else setIsFetchingMore(true);

    if (debouncedKeyword.trim().length > 0) {
      productApi
        .searchProducts(debouncedKeyword)
        .then((res) => {
          setProducts(res);
          setTotalElements(res.length);
          setTotalPages(1);
          setCurrentPage(0);
        })
        .finally(() => {
          setIsLoading(false);
          setIsFetchingMore(false);
        });
    } else {
      productApi
        .getProducts({
          page: currentPage,
          size: 12,
          categoryId: filters.categoryId || undefined,
          sort: filters.sort,
          maxPrice: filters.maxPrice < 1000 ? filters.maxPrice : undefined,
          minRating: filters.minRating > 0 ? filters.minRating : undefined,
          inStock: filters.inStock || undefined,
        })
        .then((res) => {
          if (scrollMode === 'infinite' && currentPage > 0) {
            setProducts((prev) => [...prev, ...res.content]);
          } else {
            setProducts(res.content);
          }
          setTotalPages(res.totalPages);
          setTotalElements(res.totalElements);
        })
        .finally(() => {
          setIsLoading(false);
          setIsFetchingMore(false);
        });
    }
  }, [currentPage, filters, debouncedKeyword, scrollMode]);

  // Infinite Scroll IntersectionObserver
  useEffect(() => {
    if (scrollMode !== 'infinite' || currentPage >= totalPages - 1 || isLoading || isFetchingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [scrollMode, currentPage, totalPages, isLoading, isFetchingMore]);

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setSearchKeyword('');
    setCurrentPage(0);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-h1 font-extrabold text-content-primary">{t('header.catalog')}</h1>
          <p className="text-xs text-content-secondary mt-1">
            {t('hero.description')}
          </p>
        </div>

        {/* View mode, Scroll Mode & Sort */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Scroll Mode Toggle */}
          <div className="flex items-center border border-border/80 rounded-xl bg-surface p-1 text-xs">
            <button
              type="button"
              onClick={() => {
                setScrollMode('pagination');
                setCurrentPage(0);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                scrollMode === 'pagination' ? 'bg-brand text-brand-foreground shadow-xs' : 'text-content-muted hover:text-content-primary'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Pagination</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setScrollMode('infinite');
                setCurrentPage(0);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all cursor-pointer font-bold ${
                scrollMode === 'infinite' ? 'bg-brand text-brand-foreground shadow-xs' : 'text-content-muted hover:text-content-primary'
              }`}
            >
              <InfinityIcon className="w-3 h-3" />
              <span>Infinite Scroll</span>
            </button>
          </div>

          <div className="w-44">
            <Select
              options={[
                { label: 'Newest Arrivals', value: 'newest' },
                { label: 'Price: Low to High', value: 'price_asc' },
                { label: 'Price: High to Low', value: 'price_desc' },
                { label: 'Top Rated', value: 'rating' },
              ]}
              value={filters.sort}
              onChange={(e) => {
                setFilters({ ...filters, sort: e.target.value });
                setCurrentPage(0);
              }}
            />
          </div>

          <div className="flex items-center border border-border rounded-xl bg-surface p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-brand text-brand-foreground' : 'text-content-muted hover:text-content-primary'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'list' ? 'bg-brand text-brand-foreground' : 'text-content-muted hover:text-content-primary'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <ProductFilterSidebar
            categories={categories}
            filters={filters}
            onChange={(newF) => {
              setFilters(newF);
              setCurrentPage(0);
            }}
            onReset={handleResetFilters}
          />
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Keyword Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
            <input
              type="text"
              placeholder={t('header.search_placeholder')}
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl text-xs text-content-primary focus:outline-none focus:border-brand"
            />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-surface border border-border rounded-xl p-4 space-y-3">
                  <Skeleton className="w-full h-48 rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="bg-surface border border-border rounded-xl p-12 text-center space-y-3">
              <h3 className="text-sm font-bold text-content-primary">{t('product.no_products')}</h3>
              <p className="text-xs text-content-muted">
                Try adjusting your filters or clearing search terms to see available inventory.
              </p>
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-brand hover:underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {products.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>

              {scrollMode === 'pagination' ? (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalElements={totalElements}
                  onPageChange={setCurrentPage}
                />
              ) : (
                <div ref={sentinelRef} className="py-8 text-center text-xs text-content-muted font-bold">
                  {isFetchingMore ? (
                    <div className="flex items-center justify-center gap-2 animate-pulse text-brand">
                      <InfinityIcon className="w-4 h-4 animate-spin" />
                      <span>Loading additional items...</span>
                    </div>
                  ) : currentPage >= totalPages - 1 ? (
                    <span>You've reached the end of the catalog ({totalElements} products)</span>
                  ) : null}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

