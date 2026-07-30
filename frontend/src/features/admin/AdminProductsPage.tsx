import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Package } from 'lucide-react';
import { productApi } from '../product/product.api';
import { categoryApi } from '../product/category.api';
import { Category, Product } from '../../types';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { Select } from '../../shared/components/Select';
import { Table } from '../../shared/components/Table';
import { Modal } from '../../shared/components/Modal';
import { Badge } from '../../shared/components/Badge';
import { formatCurrency } from '../../core/utils/formatters';
import { useToast } from '../../shared/components/Toast';

export const AdminProductsPage: React.FC = () => {
  const toast = useToast();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [stockQuantity, setStockQuantity] = useState(10);
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFlashSale, setIsFlashSale] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setIsLoading(true);
    Promise.all([productApi.getProducts({ size: 100 }), categoryApi.getCategories()])
      .then(([prodRes, catRes]) => {
        setProducts(prodRes.content);
        setCategories(catRes);
        if (catRes.length > 0) setCategoryId(catRes[0].id);
      })
      .catch(() => toast.error('Failed to load inventory'))
      .finally(() => setIsLoading(false));
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setName('');
    setDescription('');
    setPrice(99.99);
    setOriginalPrice(129.99);
    setStockQuantity(25);
    setImageUrl('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800');
    setIsFlashSale(false);
    setShowModal(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingId(prod.id);
    setName(prod.name);
    setDescription(prod.description);
    setPrice(prod.price);
    setOriginalPrice(prod.originalPrice || prod.price);
    setStockQuantity(prod.stockQuantity);
    setCategoryId(prod.categoryId);
    setImageUrl(prod.imageUrl);
    setIsFlashSale(prod.isFlashSale || false);
    setShowModal(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const selectedCat = categories.find((c) => c.id === categoryId);
      const payload = {
        name,
        description,
        price,
        originalPrice,
        stockQuantity,
        categoryId,
        categoryName: selectedCat?.name || 'Electronics',
        imageUrl,
        isFlashSale,
        rating: 4.8,
        reviewCount: 12,
      };

      if (editingId) {
        await productApi.updateProduct(editingId, payload);
        toast.success('Product Updated Successfully');
      } else {
        await productApi.createProduct(payload);
        toast.success('Product Created Successfully');
      }

      setShowModal(false);
      loadData();
    } catch {
      toast.error('Failed to save product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productApi.deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      toast.info('Product Deleted');
    } catch {
      toast.error('Failed to delete product');
    }
  };

  const filteredProducts = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const columns = [
    {
      key: 'product',
      header: 'Product',
      render: (p: Product) => (
        <div className="flex items-center gap-3">
          <img src={p.imageUrl} alt="" className="w-10 h-10 object-cover rounded-lg border border-border" />
          <div>
            <p className="font-bold text-content-primary line-clamp-1">{p.name}</p>
            <p className="text-[10px] text-content-muted">{p.categoryName}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      render: (p: Product) => <span className="font-bold text-brand">{formatCurrency(p.price)}</span>,
    },
    {
      key: 'stock',
      header: 'Stock Status',
      render: (p: Product) => (
        <Badge variant={p.stockQuantity > 10 ? 'success' : p.stockQuantity > 0 ? 'warning' : 'danger'}>
          {p.stockQuantity} Units
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (p: Product) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEdit(p)}
            className="p-1.5 text-content-muted hover:text-brand border border-border rounded-lg hover:bg-surface-hover cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleDeleteProduct(p.id)}
            className="p-1.5 text-content-muted hover:text-status-danger border border-border rounded-lg hover:bg-surface-hover cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-h1 font-extrabold text-content-primary">Product Catalog CRUD</h1>
          <p className="text-xs text-content-muted mt-0.5">Manage live stock, prices, categories, and promotions</p>
        </div>
        <Button onClick={handleOpenCreate} leftIcon={<Plus className="w-4 h-4" />}>
          Add New Product
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
        <input
          type="text"
          placeholder="Search products by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-surface border border-border rounded-xl text-xs text-content-primary focus:outline-none focus:border-brand"
        />
      </div>

      <Table columns={columns} data={filteredProducts} isLoading={isLoading} />

      {/* Product Edit / Create Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editingId ? 'Edit Product' : 'Create New Product'}>
        <form onSubmit={handleSaveProduct} className="space-y-3">
          <Input label="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <div className="space-y-1">
            <label className="text-xs font-semibold text-content-primary">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 bg-surface border border-border rounded-xl text-xs text-content-primary focus:outline-none focus:border-brand"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input label="Sale Price ($)" type="number" step="0.01" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} required />
            <Input
              label="Original Price ($)"
              type="number"
              step="0.01"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(parseFloat(e.target.value))}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Stock Quantity"
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(parseInt(e.target.value))}
              required
            />
            <Select
              label="Category"
              options={categories.map((c) => ({ label: c.name, value: c.id }))}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </div>

          <Input label="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />

          <div className="flex items-center gap-2 pt-2">
            <input
              id="flashSaleCheckbox"
              type="checkbox"
              checked={isFlashSale}
              onChange={(e) => setIsFlashSale(e.target.checked)}
              className="w-4 h-4 accent-brand rounded border-border"
            />
            <label htmlFor="flashSaleCheckbox" className="text-xs font-bold text-content-primary cursor-pointer">
              Mark as Flash Sale Promotion
            </label>
          </div>

          <Button type="submit" className="w-full mt-2">
            {editingId ? 'Update Product' : 'Create Product'}
          </Button>
        </form>
      </Modal>
    </div>
  );
};
