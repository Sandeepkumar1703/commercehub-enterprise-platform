import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../../app/store/store';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters, FilterState } from '../components/ProductFilters';
import { Select } from '../../../shared/components/Select';
import { SlidersHorizontal, PackageSearch, ChevronLeft, ChevronRight } from 'lucide-react';

export const PLP: React.FC = () => {
  const { products, refreshProducts } = useApp();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');

  // Dynamic max price from products catalog
  const maxCatalogPrice = useMemo(() => {
    if (!products || products.length === 0) return 5000;
    const maxP = Math.max(...products.map(p => p.price || 0));
    return maxP > 1000 ? Math.ceil(maxP / 500) * 500 : 1000;
  }, [products]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  // Refresh products from API on PLP mount
  useEffect(() => {
    console.log("PLP Mounted");
    if (products.length === 0) {
        refreshProducts();
    }
}, [products.length, refreshProducts]);

  const [filters, setFilters] = useState<FilterState>({
    priceMax: 10000,
    selectedCategory: 'All',
    selectedBrands: [],
    inStockOnly: false,
    selectedColor: ''
  });

  // Keep priceMax updated if maxCatalogPrice increases
  useEffect(() => {
    if (maxCatalogPrice > filters.priceMax) {
      setFilters(prev => ({ ...prev, priceMax: maxCatalogPrice }));
    }
  }, [maxCatalogPrice]);

  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products]);
  const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (p.price > filters.priceMax) return false;
      if (filters.selectedCategory !== 'All' && p.category !== filters.selectedCategory) return false;
      if (filters.selectedBrands.length > 0 && !filters.selectedBrands.includes(p.brand)) return false;
      if (filters.inStockOnly && !p.inStock) return false;
      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      return 0; // featured/default
    });
  }, [products, filters, sortOption]);

  // Reset to page 1 whenever filters, sorting, or itemsPerPage change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortOption, itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  const handleResetFilters = () => {
    setFilters({
      priceMax: maxCatalogPrice,
      selectedCategory: 'All',
      selectedBrands: [],
      inStockOnly: false,
      selectedColor: ''
    });
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-xs text-slate-400 mb-1 flex items-center gap-1.5">
            <span>Home</span> <span>/</span> <span>Shop</span> <span>/</span> <span className="text-slate-700 dark:text-slate-200 font-semibold">{filters.selectedCategory}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Product Catalog
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Showing <strong className="text-slate-900 dark:text-slate-100">{filteredProducts.length}</strong> verified products
          </p>
        </div>

        {/* Sorting Dropdown & Mobile Filter Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-2 py-2 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200"
          >
            <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
            <span>Filters</span>
          </button>

          <Select
            options={[
              { value: 'featured', label: 'Sort by: Featured' },
              { value: 'price-low', label: 'Price: Low to High' },
              { value: 'price-high', label: 'Price: High to Low' },
              { value: 'rating', label: 'Highest Customer Rating' }
            ]}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            containerClassName="w-48"
          />
        </div>
      </div>

      {/* Main Grid & Sidebar Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar Filters */}
        <div className="hidden lg:block">
          <ProductFilters
            filters={filters}
            setFilters={setFilters}
            categories={categories}
            brands={brands}
            onReset={handleResetFilters}
            maxPriceLimit={maxCatalogPrice}
          />
        </div>

        {/* Mobile Filters Drawer Modal */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm lg:hidden flex justify-end">
            <div className="w-80 bg-white dark:bg-slate-900 h-full p-6 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Filter Products</h3>
                <button onClick={() => setMobileFilterOpen(false)} className="text-slate-400">✕</button>
              </div>
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                categories={categories}
                brands={brands}
                onReset={handleResetFilters}
                maxPriceLimit={maxCatalogPrice}
              />
            </div>
          </div>
        )}

        {/* Product Grid Area */}
        <div className="flex-1 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
                <PackageSearch className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">No Products Match Filters</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try loosening your price slider or clearing brand selections to view the complete catalog.
              </p>
              <button
                onClick={handleResetFilters}
                className="py-2 px-4 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Showing <strong className="text-slate-900 dark:text-slate-100">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length)}</strong> to{' '}
                  <strong className="text-slate-900 dark:text-slate-100">{Math.min(currentPage * itemsPerPage, filteredProducts.length)}</strong> of{' '}
                  <strong className="text-slate-900 dark:text-slate-100">{filteredProducts.length}</strong> products
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>Show:</span>
                    <Select
                      options={[
                        { value: '6', label: '6 per page' },
                        { value: '12', label: '12 per page' },
                        { value: '24', label: '24 per page' },
                        { value: '48', label: '48 per page' },
                        { value: '100', label: 'All products' }
                      ]}
                      value={String(itemsPerPage)}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      containerClassName="w-32"
                    />
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                          page === currentPage
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                      title="Next Page"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PLP;
