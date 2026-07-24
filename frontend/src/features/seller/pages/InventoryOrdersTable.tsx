import React, { useState } from 'react';
import { useApp } from '../../../app/store/store';
import { Table, Column } from '../../../shared/components/Table';
import { Badge } from '../../../shared/components/Badge';
import { Modal } from '../../../shared/components/Modal';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { Product } from '../../../shared/types';
import { Search, SlidersHorizontal, Edit3, Trash2, Download, PackageCheck } from 'lucide-react';

export const InventoryOrdersTable: React.FC = () => {
  const { products, updateProductStock, deleteProduct, showToast } = useApp();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterTab, setFilterTab] = useState<'all' | 'published' | 'low_stock' | 'archived'>('all');
  const [search, setSearch] = useState('');

  // Stock Adjustment Modal
  const [adjustingProduct, setAdjustingProduct] = useState<Product | null>(null);
  const [newStock, setNewStock] = useState<number>(0);
  const [reason, setReason] = useState('Restock');

  const filteredProducts = products.filter(p => {
    if (filterTab === 'published' && p.status !== 'published') return false;
    if (filterTab === 'low_stock' && p.stockQuantity >= 5) return false;
    if (filterTab === 'archived' && p.status !== 'archived') return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.sku.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const columns: Column<Product>[] = [
    {
      key: 'title',
      header: 'Product Item',
      render: (r) => (
        <div className="flex items-center gap-3">
          <img src={r.images[0]} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0 border" />
          <div className="min-w-0">
            <p className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate max-w-xs">{r.title}</p>
            <p className="text-[11px] text-slate-400">SKU: {r.sku} • {r.brand}</p>
          </div>
        </div>
      )
    },
    { key: 'category', header: 'Category' },
    {
      key: 'price',
      header: 'Price',
      render: (r) => <span className="font-extrabold text-xs">${r.price.toFixed(2)}</span>
    },
    {
      key: 'stockQuantity',
      header: 'Stock Units',
      render: (r) => (
        <div className="flex items-center gap-2">
          <span className={`font-bold ${r.stockQuantity < 5 ? 'text-rose-600' : 'text-slate-900 dark:text-slate-100'}`}>
            {r.stockQuantity} units
          </span>
          {r.stockQuantity < 5 && <Badge variant="warning" size="sm">Low</Badge>}
        </div>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (r) => (
        <Badge variant={r.status === 'published' ? 'success' : r.status === 'low_stock' ? 'warning' : 'neutral'}>
          {r.status.toUpperCase()}
        </Badge>
      )
    },
    {
      key: 'actions',
      header: 'Stock Adjust',
      align: 'right',
      render: (r) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setAdjustingProduct(r);
              setNewStock(r.stockQuantity);
            }}
            className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1"
          >
            <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
            <span>Adjust</span>
          </button>
          <button
            onClick={() => deleteProduct(r.id)}
            className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-500 rounded-lg"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )
    }
  ];

  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? filteredProducts.map(p => p.id) : []);
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelectedIds(prev => checked ? [...prev, id] : prev.filter(i => i !== id));
  };

  const handleConfirmStockAdjust = () => {
    if (adjustingProduct) {
      updateProductStock(adjustingProduct.id, newStock);
      setAdjustingProduct(null);
    }
  };

  const handleExportCSV = () => {
    showToast('Export Started', 'Exporting inventory records to CSV file...', 'info');
  };

  return (
    <div className="space-y-4">
      {/* Search & Bulk Operations Toolbar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {['all', 'published', 'low_stock', 'archived'].map(tab => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab as any)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                  filterTab === tab ? 'bg-white dark:bg-slate-900 text-indigo-600 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search SKU or title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus:outline-none"
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleExportCSV} leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export
            </Button>
          </div>
        </div>

        {/* Floating Bulk Actions Indicator */}
        {selectedIds.length > 0 && (
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-xl flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-900 dark:text-indigo-200">
              ⚡ {selectedIds.length} Products Selected
            </span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => showToast('Batch Update', 'Updated selected SKUs status', 'info')}>
                Batch Status
              </Button>
              <Button size="sm" variant="destructive" onClick={() => { selectedIds.forEach(id => deleteProduct(id)); setSelectedIds([]); }}>
                Archive Selected
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Main Table */}
      <Table
        columns={columns}
        data={filteredProducts}
        keyExtractor={(p) => p.id}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectRow={handleSelectRow}
        emptyText="No inventory items found matching filters."
      />

      {/* Stock Adjustment Modal */}
      {adjustingProduct && (
        <Modal
          isOpen={!!adjustingProduct}
          onClose={() => setAdjustingProduct(null)}
          title="Manual Inventory Stock Adjustment"
        >
          <div className="space-y-4 text-xs">
            <p className="font-bold text-slate-900 dark:text-slate-100">{adjustingProduct.title} (SKU: {adjustingProduct.sku})</p>

            <Input
              label="New Stock Quantity"
              type="number"
              value={newStock}
              onChange={(e) => setNewStock(Number(e.target.value))}
            />

            <div className="space-y-1">
              <label className="font-semibold uppercase text-slate-500">Audit Reason Tag</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900"
              >
                <option value="Restock">Restock Shipment Arrival</option>
                <option value="Damaged">Damaged / Defective Removal</option>
                <option value="Customer Return">Customer Return Restock</option>
                <option value="Audit Correction">Audit Count Correction</option>
              </select>
            </div>

            <div className="pt-3 flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setAdjustingProduct(null)}>Cancel</Button>
              <Button variant="primary" onClick={handleConfirmStockAdjust}>Confirm Adjustment</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default InventoryOrdersTable;
