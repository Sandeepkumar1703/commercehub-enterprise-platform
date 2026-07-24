import React, { useState, useEffect } from 'react';
import { useApp } from '../../app/store/store';
import { Search, ShoppingBag, Box, Users, FileText, Settings, ArrowRight, X } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { commandPaletteOpen, setCommandPaletteOpen, setPortal, setCustomerView, setSellerView, setAdminView, setSelectedProductId, products } = useApp();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const navigateTo = (portalName: any, viewName: any, productId?: string) => {
    setPortal(portalName);
    if (portalName === 'customer') {
      setCustomerView(viewName);
      if (productId) setSelectedProductId(productId);
    } else if (portalName === 'seller') {
      setSellerView(viewName);
    } else if (portalName === 'admin') {
      setAdminView(viewName);
    }
    setCommandPaletteOpen(false);
    setQuery('');
  };

  const filteredProducts = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 flex flex-col">
        {/* Search Header */}
        <div className="flex items-center px-4 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 shrink-0 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search products, orders, merchants, settings... (Cmd + K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-4 text-base bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          />
          <button onClick={() => setCommandPaletteOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-3 max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 text-sm">
          {/* Quick Actions */}
          <div className="pb-2">
            <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Navigation Shortcuts
            </div>
            <button
              onClick={() => navigateTo('customer', 'plp')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-indigo-500" />
                <span>Product Catalog & Shopping (CX)</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => navigateTo('seller', 'dashboard')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Box className="w-4 h-4 text-emerald-500" />
                <span>Seller Operations Portal</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => navigateTo('admin', 'dashboard')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4 text-purple-500" />
                <span>Enterprise Admin & RBAC Governance</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => navigateTo('admin', 'audit')}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-amber-500" />
                <span>Immutable Audit Logs & State Diff</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Catalog Matches */}
          {filteredProducts.length > 0 && (
            <div className="pt-2">
              <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Matching Products ({filteredProducts.length})
              </div>
              {filteredProducts.map(p => (
                <button
                  key={p.id}
                  onClick={() => navigateTo('customer', 'pdp', p.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.title} className="w-8 h-8 rounded object-cover" />
                    <div className="text-left">
                      <p className="font-medium truncate max-w-xs">{p.title}</p>
                      <p className="text-xs text-slate-400">${p.price.toFixed(2)} • {p.brand}</p>
                    </div>
                  </div>
                  <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">View PDP</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-slate-700 dark:text-slate-200">ESC</kbd> to exit</span>
          <span>CommerceHub Search Engine</span>
        </div>
      </div>
    </div>
  );
};
