import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Category } from '../../types';
import { Button } from '../common/Button';

interface ProductFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  inStockOnly: boolean;
  onInStockToggle: (checked: boolean) => void;
  onReset: () => void;
}

export const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceChange,
  inStockOnly,
  onInStockToggle,
  onReset,
}) => {
  return (
    <div className="card-surface p-5 space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
          <Filter className="w-4 h-4 text-[var(--vynk-brand)]" /> Catalog Filters
        </div>
        <button
          onClick={onReset}
          className="text-xs text-[var(--vynk-brand)] hover:opacity-80 flex items-center gap-1 font-semibold cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Categories */}
      <div>
        <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">Categories</label>
        <div className="space-y-1">
          <button
            onClick={() => onSelectCategory('ALL')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] font-bold'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-1.5 py-0.5 rounded-full">
                {cat.productCount}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
          <span>Max Price</span>
          <span className="text-[var(--vynk-brand)] font-extrabold">${priceRange[1]}</span>
        </div>
        <input
          type="range"
          min="50"
          max="2000"
          step="50"
          value={priceRange[1]}
          onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
          className="w-full accent-[var(--vynk-brand)]"
        />
      </div>

      {/* In Stock Toggle */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">In-Stock Only</span>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockToggle(e.target.checked)}
          className="w-4 h-4 accent-[var(--vynk-brand)] rounded cursor-pointer"
        />
      </div>
    </div>
  );
};
