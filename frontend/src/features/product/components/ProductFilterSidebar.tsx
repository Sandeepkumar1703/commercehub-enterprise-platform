import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Category } from '../../../types';
import { Button } from '../../../shared/components/Button';

export interface FilterState {
  categoryId: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStock: boolean;
  sort: string;
}

export interface ProductFilterSidebarProps {
  categories: Category[];
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({
  categories,
  filters,
  onChange,
  onReset,
}) => {
  return (
    <div className="bg-surface border border-border rounded-xl p-5 shadow-card space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2 font-bold text-xs text-content-primary uppercase tracking-wider">
          <Filter className="w-4 h-4 text-brand" />
          <span>Filter Products</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-content-muted hover:text-brand flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-content-primary">Categories</h4>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onChange({ ...filters, categoryId: '' })}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filters.categoryId === ''
                ? 'bg-brand text-brand-foreground'
                : 'text-content-secondary hover:bg-surface-hover'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange({ ...filters, categoryId: cat.id })}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                filters.categoryId === cat.id
                  ? 'bg-brand text-brand-foreground'
                  : 'text-content-secondary hover:bg-surface-hover'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2 pt-4 border-t border-border">
        <h4 className="text-xs font-bold text-content-primary">Max Price: ${filters.maxPrice}</h4>
        <input
          type="range"
          min="10"
          max="1000"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: parseFloat(e.target.value) })}
          className="w-full accent-brand cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-content-muted">
          <span>$10</span>
          <span>$1000</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-2 pt-4 border-t border-border">
        <h4 className="text-xs font-bold text-content-primary">Minimum Rating</h4>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onChange({ ...filters, minRating: filters.minRating === rating ? 0 : rating })}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                filters.minRating === rating
                  ? 'bg-brand/10 text-brand border border-brand/20'
                  : 'text-content-secondary hover:bg-surface-hover'
              }`}
            >
              <span>★ {rating}.0 & Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="pt-4 border-t border-border flex items-center justify-between">
        <label htmlFor="inStockToggle" className="text-xs font-bold text-content-primary cursor-pointer">
          In-Stock Items Only
        </label>
        <input
          id="inStockToggle"
          type="checkbox"
          checked={filters.inStock}
          onChange={(e) => onChange({ ...filters, inStock: e.target.checked })}
          className="w-4 h-4 accent-brand rounded border-border cursor-pointer"
        />
      </div>
    </div>
  );
};
