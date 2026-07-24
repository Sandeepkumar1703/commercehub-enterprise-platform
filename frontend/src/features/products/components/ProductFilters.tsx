import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

export interface FilterState {
  priceMax: number;
  selectedCategory: string;
  selectedBrands: string[];
  inStockOnly: boolean;
  selectedColor: string;
}

export interface ProductFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  categories: string[];
  brands: string[];
  onReset: () => void;
  maxPriceLimit?: number;
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  setFilters,
  categories,
  brands,
  onReset,
  maxPriceLimit = 5000
}) => {
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Silver', hex: '#E2E8F0' },
    { name: 'Titanium', hex: '#64748B' },
    { name: 'Indigo', hex: '#6366F1' },
    { name: 'Emerald', hex: '#10B981' }
  ];

  const handleBrandToggle = (brand: string) => {
    setFilters(prev => {
      const exists = prev.selectedBrands.includes(brand);
      return {
        ...prev,
        selectedBrands: exists ? prev.selectedBrands.filter(b => b !== brand) : [...prev.selectedBrands, brand]
      };
    });
  };

  return (
    <div className="w-full lg:w-72 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 space-y-6 shrink-0 h-fit shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-slate-100">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> Reset All
        </button>
      </div>

      {/* Category Accordion */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Category</h4>
        <div className="space-y-1 text-sm">
          <button
            onClick={() => setFilters(prev => ({ ...prev, selectedCategory: 'All' }))}
            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filters.selectedCategory === 'All' ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300 font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Categories
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilters(prev => ({ ...prev, selectedCategory: cat }))}
              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filters.selectedCategory === cat ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300 font-bold' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Max Price</span>
          <span className="font-extrabold text-slate-900 dark:text-slate-100">${filters.priceMax.toLocaleString()}</span>
        </div>
        <input
          type="range"
          min="10"
          max={maxPriceLimit}
          step="25"
          value={filters.priceMax}
          onChange={(e) => setFilters(prev => ({ ...prev, priceMax: Number(e.target.value) }))}
          className="w-full accent-indigo-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>$10</span>
          <span>${maxPriceLimit.toLocaleString()}</span>
        </div>
      </div>

      {/* Color Swatches */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">Color Swatch</h4>
        <div className="flex flex-wrap gap-2">
          {colors.map(c => (
            <button
              key={c.name}
              onClick={() => setFilters(prev => ({ ...prev, selectedColor: prev.selectedColor === c.name ? '' : c.name }))}
              style={{ backgroundColor: c.hex }}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${
                filters.selectedColor === c.name ? 'scale-125 border-indigo-600 ring-2 ring-indigo-500/50' : 'border-slate-300 dark:border-slate-700 hover:scale-110'
              }`}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Brand Checkboxes */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Brands</h4>
        <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
          {brands.map(b => (
            <label key={b} className="flex items-center gap-2 cursor-pointer hover:text-slate-900 dark:hover:text-slate-100">
              <input
                type="checkbox"
                checked={filters.selectedBrands.includes(b)}
                onChange={() => handleBrandToggle(b)}
                className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      {/* In Stock Only Toggle */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <label className="flex items-center justify-between cursor-pointer text-xs font-semibold text-slate-700 dark:text-slate-300">
          <span>In Stock Items Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
            className="rounded border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500"
          />
        </label>
      </div>
    </div>
  );
};
