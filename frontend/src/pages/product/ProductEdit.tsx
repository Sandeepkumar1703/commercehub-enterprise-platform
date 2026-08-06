import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save } from 'lucide-react';
import { productApi } from '../../api/productApi';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Loader } from '../../components/common/Loader';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await productApi.getProductById(id);
        const p = (res as any)?.data ?? res;
        if (p && (p.id || p.title || p.name)) {
          setTitle(p.title || p.name || '');
          setPrice(p.price || 0);
          setStock(p.stockQuantity ?? p.stock ?? 0);
          setDescription(p.description || '');
        } else {
          setError('Product not found');
        }
      } catch (err: any) {
        setError(err?.message || 'Error fetching product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    try {
      const res = await productApi.updateProduct(id, {
        name: title,
        title,
        price: Number(price),
        stockQuantity: Number(stock),
        stock: Number(stock),
        description,
      });
      const resData = (res as any)?.data ?? res;
      if (resData) {
        navigate('/admin/products');
      }
    } catch (err: any) {
      setError(err?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader text="Loading product details..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Edit Product #{id}</h1>

      <form onSubmit={handleSubmit} className="card-surface p-6 space-y-4">
        <Input label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Price ($)" type="number" step="0.01" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
          <Input label="Stock" type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} required />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full text-xs p-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800"
            required
          />
        </div>
        <Button type="submit" loading={saving} icon={<Save className="w-4 h-4" />}>
          Save Changes
        </Button>
      </form>
    </div>
  );
};
