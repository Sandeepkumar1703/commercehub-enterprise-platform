import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, CheckCircle, XCircle, Search } from 'lucide-react';
import { toast } from 'sonner';
import { productApi } from '../../api/productApi';
import { Product } from '../../types';
import { Button } from '../../components/common/Button';
import { TableSkeleton } from '../../components/common/skeleton/TableSkeleton';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { PermissionGuard } from '../../components/auth/PermissionGuard';

export const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await productApi.getProducts();
      const resObj = (res as any)?.data ?? res;
      let list: Product[] = [];
      if (Array.isArray(resObj)) {
        list = resObj;
      } else if (resObj && Array.isArray(resObj.content)) {
        list = resObj.content;
      } else if (res && res.data && Array.isArray(res.data.content)) {
        list = res.data.content;
      }
      setProducts(list);
    } catch (err: any) {
      setError(err?.message || 'Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (confirm('Delete this product permanently?')) {
      try {
        await productApi.deleteProduct(id);
        toast.success('Product deleted successfully');
        fetchProducts();
      } catch (e: any) {
        toast.error('Failed to delete product');
      }
    }
  };

  const handleApproveToggle = async (id: string | number, currentStatus: boolean) => {
    try {
      await productApi.approveProduct(id, !currentStatus);
      toast.success(!currentStatus ? 'Product approved' : 'Product approval revoked');
      fetchProducts();
    } catch (e: any) {
      toast.error('Failed to update product approval status');
    }
  };

  const filtered = products.filter((p) => {
    const t = p.title || p.name || '';
    const s = p.sku || '';
    return t.toLowerCase().includes(search.toLowerCase()) || s.toLowerCase().includes(search.toLowerCase());
  });

  if (loading) return <TableSkeleton cols={6} rows={6} />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProducts} />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-app-primary">Product Inventory Management</h1>
          <p className="text-xs text-app-muted mt-0.5">
            Manage catalog items, merchant approvals, and inventory stock allocations.
          </p>
        </div>

        <PermissionGuard permission="PRODUCT_CREATE">
          <Link to="/admin/products/create">
            <Button icon={<Plus className="w-4 h-4" />}>Add New Product</Button>
          </Link>
        </PermissionGuard>
      </div>

      <div className="bg-app-card p-4 rounded-2xl border border-app shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search SKU or title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-app bg-app-card text-app-primary focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="w-4 h-4 text-app-muted absolute left-2.5 top-2.5" />
        </div>
      </div>

      <div className="bg-app-card rounded-2xl border border-app shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 dark:bg-gray-800/80 text-app-muted font-extrabold uppercase tracking-wider border-b border-app">
              <tr>
                <th className="p-4">Item Details</th>
                <th className="p-4">SKU / Brand</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-app">
              {filtered.map((p) => {
                const titleStr = p.title || p.name || 'Product';
                const imgStr = (p.images && p.images[0]) || p.imageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800';
                const catStr = p.category || p.categoryName || 'General';
                const stockVal = p.stockQuantity ?? p.stock ?? 0;
                const isAppr = (p as any).isApproved ?? true;

                return (
                  <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={imgStr}
                          alt={titleStr}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
                        />
                        <div>
                          <div className="font-bold text-app-primary">{titleStr}</div>
                          <div className="text-[10px] text-app-muted">{catStr}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-mono font-bold text-app-secondary">{p.sku || `SKU-${p.id}`}</div>
                      <div className="text-[10px] text-app-muted">{p.brand || 'VYNK'}</div>
                    </td>
                    <td className="p-4 font-bold text-app-primary">${p.price.toFixed(2)}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                          stockVal < 5 ? 'bg-red-100 dark:bg-red-950/60 text-red-600' : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600'
                        }`}
                      >
                        {stockVal} units
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleApproveToggle(p.id, isAppr)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold cursor-pointer transition ${
                          isAppr
                            ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600'
                            : 'bg-amber-100 dark:bg-amber-950/60 text-amber-600'
                        }`}
                      >
                        {isAppr ? <CheckCircle size={12} /> : <XCircle size={12} />}
                        {isAppr ? 'Approved' : 'Pending'}
                      </button>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/products/edit/${p.id}`}
                          className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-app-primary hover:bg-indigo-50 dark:hover:bg-indigo-950/60 transition"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/60 transition cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
