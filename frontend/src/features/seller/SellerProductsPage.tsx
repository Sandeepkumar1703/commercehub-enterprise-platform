import React, { useEffect, useState } from 'react';
import { Package, Plus, Edit2, Trash2, Search, CheckCircle, AlertCircle } from 'lucide-react';
import { productApi } from '../product/product.api';
import { Product } from '../../types';
import { Can } from '../../core/auth/Can';

export const SellerProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    productApi
      .getProducts({ size: 50 })
      .then((res) => {
        setProducts(res.content || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface border border-border p-6 rounded-2xl shadow-sm">
        <div>
          <h1 className="text-xl font-black text-content-primary">My Merchant Products</h1>
          <p className="text-xs text-content-muted mt-1">Create, update pricing, and manage inventory for your products</p>
        </div>

        <Can permission="PRODUCT_CREATE" explainDisabled disabledReason="PRODUCT_CREATE permission required to create products">
          <button
            onClick={() => setMessage('Product Creation Modal opened')}
            className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Product</span>
          </button>
        </Can>
      </div>

      {message && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-content-muted absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Filter merchant products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl text-xs text-content-primary focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Products Table */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-xs text-content-muted animate-pulse">
            Loading merchant catalog...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center text-xs text-content-muted space-y-2">
            <Package className="w-8 h-8 mx-auto text-content-muted" />
            <p>No products found in catalog.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-background text-content-muted uppercase text-[10px] font-bold border-b border-border">
                <tr>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-content-primary">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-surface-hover transition-colors">
                    <td className="py-3.5 px-4 font-bold flex items-center gap-3">
                      <img
                        src={p.imageUrl || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100'}
                        alt={p.name}
                        className="w-9 h-9 rounded-lg object-cover border border-border shrink-0"
                      />
                      <span className="truncate max-w-xs">{p.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-content-secondary">{p.categoryName || 'General'}</td>
                    <td className="py-3.5 px-4 font-bold text-content-primary">${p.price?.toFixed(2)}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          p.stockQuantity > 5
                            ? 'bg-emerald-500/10 text-emerald-600'
                            : 'bg-amber-500/10 text-amber-600'
                        }`}
                      >
                        {p.stockQuantity} in stock
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold">★ {p.rating || '5.0'}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Can permission="PRODUCT_UPDATE" explainDisabled disabledReason="Requires PRODUCT_UPDATE">
                          <button
                            onClick={() => setMessage(`Editing ${p.name}`)}
                            className="p-1.5 hover:bg-background rounded-lg text-content-secondary hover:text-content-primary cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </Can>

                        <Can permission="PRODUCT_DELETE" explainDisabled disabledReason="Requires PRODUCT_DELETE">
                          <button
                            onClick={() => setMessage(`Deleted ${p.name}`)}
                            className="p-1.5 hover:bg-status-danger/10 rounded-lg text-status-danger cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </Can>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
