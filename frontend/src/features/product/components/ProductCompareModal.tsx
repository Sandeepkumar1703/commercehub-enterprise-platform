import React from 'react';
import { X, Check, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCompare } from '../compareContext';
import { formatCurrency } from '../../../core/utils/formatters';
import { useAppDispatch } from '../../../app/store/hooks';
import { cartApi } from '../../cart/cart.api';
import { setCart } from '../../cart/cartSlice';
import { useToast } from '../../../shared/components/Toast';

export const ProductCompareBar: React.FC = () => {
  const { compareItems, removeFromCompare, clearCompare, setIsModalOpen } = useCompare();

  if (compareItems.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-surface/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl p-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {compareItems.map((prod) => (
            <div
              key={prod.id}
              className="relative flex-shrink-0 w-12 h-12 rounded-xl border border-border/80 bg-surface overflow-hidden group"
            >
              <img src={prod.imageUrl} alt={prod.name} className="w-full h-full object-cover" />
              <button
                onClick={() => removeFromCompare(prod.id)}
                className="absolute top-0.5 right-0.5 p-0.5 bg-status-danger text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
          {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-12 h-12 rounded-xl border border-dashed border-border/60 flex items-center justify-center text-[10px] text-content-muted font-bold"
            >
              +{i + 1}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={clearCompare}
            className="p-2 text-content-muted hover:text-status-danger transition-colors cursor-pointer"
            title="Clear compare selection"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-brand text-brand-foreground font-bold text-xs rounded-xl hover:bg-brand-hover shadow-md transition-all cursor-pointer"
          >
            <span>Compare {compareItems.length} Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProductCompareModal: React.FC = () => {
  const { compareItems, removeFromCompare, isModalOpen, setIsModalOpen } = useCompare();
  const dispatch = useAppDispatch();
  const toast = useToast();

  if (!isModalOpen || compareItems.length === 0) return null;

  const handleAddToCart = async (productId: string, name: string) => {
    try {
      const updatedCart = await cartApi.addItem(productId, 1);
      dispatch(setCart(updatedCart));
      toast.success('Added to Cart', `${name} is in your cart.`);
    } catch {
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in" onClick={() => setIsModalOpen(false)} />

      <div className="relative w-full max-w-5xl max-h-[90vh] bg-surface/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/80">
          <div>
            <h2 className="text-base font-extrabold text-content-primary">Product Comparison Matrix</h2>
            <p className="text-xs text-content-muted">Side-by-side specification & feature breakdown</p>
          </div>
          <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg text-content-muted hover:text-content-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto p-4 flex-1">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-border/80">
                <th className="p-3 text-xs font-bold text-content-muted uppercase w-36">Attribute</th>
                {compareItems.map((prod) => (
                  <th key={prod.id} className="p-3 min-w-[200px] text-center relative group">
                    <button
                      onClick={() => removeFromCompare(prod.id)}
                      className="absolute top-1 right-1 p-1 rounded-full text-content-muted hover:text-status-danger hover:bg-surface-hover"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                    <img src={prod.imageUrl} alt={prod.name} className="w-24 h-24 object-cover rounded-xl border mx-auto mb-2" />
                    <p className="text-xs font-bold text-content-primary line-clamp-2">{prod.name}</p>
                    <p className="text-xs font-extrabold text-brand mt-1">{formatCurrency(prod.price)}</p>
                    <button
                      onClick={() => handleAddToCart(prod.id, prod.name)}
                      className="mt-2 w-full flex items-center justify-center gap-1 px-3 py-1.5 bg-brand text-brand-foreground rounded-lg text-xs font-semibold hover:bg-brand-hover transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-xs">
              <tr>
                <td className="p-3 font-bold text-content-muted">Category</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-3 text-center text-content-primary font-semibold">
                    {p.categoryName}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-content-muted">Rating</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-3 text-center text-amber-500 font-extrabold">
                    ★ {p.rating} ({p.reviewCount} reviews)
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-content-muted">Availability</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    <span className={`font-bold ${p.stockQuantity > 0 ? 'text-status-success' : 'text-status-danger'}`}>
                      {p.stockQuantity > 0 ? `In Stock (${p.stockQuantity})` : 'Out of Stock'}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-content-muted">Warranty</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-3 text-center text-content-primary">
                    1 Year Official Brand Warranty
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-3 font-bold text-content-muted">Free Shipping</td>
                {compareItems.map((p) => (
                  <td key={p.id} className="p-3 text-center">
                    <Check className="w-4 h-4 text-status-success mx-auto" />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
