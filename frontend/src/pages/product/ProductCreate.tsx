import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { PackagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { productApi } from '../../api/productApi';
import { categoryApi } from '../../api/categoryApi';
import { useApi } from '../../hooks/useApi';
import { Category } from '../../types';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { ErrorMessage } from '../../components/common/ErrorMessage';

const productSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  sku: z.string().min(3, 'SKU code must be at least 3 characters'),
  brand: z.string().min(1, 'Brand is required'),
  price: z.number().positive('Price must be greater than 0'),
  stock: z.number().min(0, 'Stock cannot be negative'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  imageUrl: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

export const ProductCreate: React.FC = () => {
  const navigate = useNavigate();
  const { data: categories } = useApi<Category[]>(categoryApi.getCategories);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductFormData) => {
    setServerError(null);
    try {
      const selectedCatObj = categories?.find((c) => c.name === data.category);
      const res = await productApi.createProduct({
        name: data.title,
        title: data.title,
        sku: data.sku,
        description: data.description,
        price: data.price,
        stockQuantity: data.stock,
        stock: data.stock,
        category: data.category,
        categoryId: selectedCatObj ? selectedCatObj.id : undefined,
        brand: data.brand,
        images: data.imageUrl ? [data.imageUrl] : [],
        imageUrl: data.imageUrl,
      });

      const resData = (res as any)?.data ?? res;
      if (resData && (resData.id || resData.name || resData.title)) {
        toast.success(`Product "${data.title}" created successfully`);
        navigate('/admin/products');
      } else {
        setServerError((res as any)?.message || 'Failed to create product');
      }
    } catch (err: any) {
      setServerError(err?.message || 'Error creating product');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-app-primary">Create New Product</h1>
        <p className="text-xs text-app-muted mt-1">
          Add product item details to the Spring Boot REST inventory catalog with full Zod validation.
        </p>
      </div>

      {serverError && <ErrorMessage message={serverError} />}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-app-card p-6 rounded-2xl border border-app shadow-sm space-y-4">
        <div>
          <Input label="Product Title" {...register('title')} />
          {errors.title && <p className="text-xs font-semibold text-red-500 mt-1">{errors.title.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input label="SKU Code" {...register('sku')} />
            {errors.sku && <p className="text-xs font-semibold text-red-500 mt-1">{errors.sku.message}</p>}
          </div>
          <div>
            <Input label="Brand" {...register('brand')} />
            {errors.brand && <p className="text-xs font-semibold text-red-500 mt-1">{errors.brand.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Input label="Price ($)" type="number" step="0.01" {...register('price', { valueAsNumber: true })} />
            {errors.price && <p className="text-xs font-semibold text-red-500 mt-1">{errors.price.message}</p>}
          </div>
          <div>
            <Input label="Inventory Stock" type="number" {...register('stock', { valueAsNumber: true })} />
            {errors.stock && <p className="text-xs font-semibold text-red-500 mt-1">{errors.stock.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-app-primary mb-1.5">Category</label>
            <select
              {...register('category')}
              className="w-full text-xs p-2.5 rounded-xl border border-app bg-app-card text-app-primary focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-xs font-semibold text-red-500 mt-1">{errors.category.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-app-primary mb-1.5">Description</label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full text-xs p-3 rounded-xl border border-app bg-app-card text-app-primary focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.description && <p className="text-xs font-semibold text-red-500 mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <Input
            label="Product Image URL (Optional)"
            {...register('imageUrl')}
            placeholder="https://images.unsplash.com/..."
          />
          {errors.imageUrl && <p className="text-xs font-semibold text-red-500 mt-1">{errors.imageUrl.message}</p>}
        </div>

        <Button type="submit" loading={isSubmitting} icon={<PackagePlus className="w-4 h-4" />}>
          Create & Submit for Approval
        </Button>
      </form>
    </div>
  );
};
