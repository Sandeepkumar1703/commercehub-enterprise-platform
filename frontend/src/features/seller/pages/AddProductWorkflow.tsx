import React, { useState } from 'react';
import { useApp } from '../../../app/store/store';
import { Input } from '../../../shared/components/Input';
import { Button } from '../../../shared/components/Button';
import { Select } from '../../../shared/components/Select';
import { Upload, Plus, Trash2, Check, ArrowRight, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export const AddProductWorkflow: React.FC = () => {
  const { addProduct, setSellerView } = useApp();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [brand, setBrand] = useState('TechGear');
  const [category, setCategory] = useState('Electronics');
  const [sku, setSku] = useState(`SKU-${Math.floor(1000 + Math.random() * 9000)}`);
  const [price, setPrice] = useState(149.00);
  const [originalPrice, setOriginalPrice] = useState(179.00);
  const [stockQuantity, setStockQuantity] = useState(25);
  const [description, setDescription] = useState('');

  // Media Images
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
  ]);

  // Variant Matrix
  const [variants, setVariants] = useState<{ color: string; size: string; stock: number; price: number }[]>([
    { color: 'Black', size: 'Standard', stock: 15, price: 149.00 },
    { color: 'Silver', size: 'Standard', stock: 10, price: 149.00 }
  ]);

  const handleAddSampleImage = () => {
    const sample = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';
    setImages(prev => [...prev, sample]);
  };

  const handlePublish = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      addProduct({
        title: title || 'New Product Item',
        subtitle,
        brand,
        category,
        sku,
        price,
        originalPrice,
        discountPercentage: Math.round(((originalPrice - price) / originalPrice) * 100),
        inStock: stockQuantity > 0,
        stockQuantity,
        description: description || 'High quality product engineered for excellence.',
        specs: { 'Brand': brand, 'SKU': sku },
        materials: ['Premium Alloy', 'Recycled Packaging'],
        images,
        sellerId: 'sel_1',
        sellerName: 'TechGear Official',
        status: 'published',
        tags: ['New Arrival', category]
      });
      setSellerView('inventory');
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Wizard Header Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Add New Product to Catalog</h2>
            <p className="text-xs text-slate-400">Step {step} of 4: Multi-Step Catalog & Media Matrix Engine</p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-3 py-1 rounded-full">
            Draft Auto-Saved
          </span>
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-4 gap-2 text-xs font-bold text-center">
          {[
            { s: 1, name: '1. Basic Details' },
            { s: 2, name: '2. Media Upload' },
            { s: 3, name: '3. Price & Variants' },
            { s: 4, name: '4. Logistics & Publish' }
          ].map(st => (
            <div
              key={st.s}
              onClick={() => setStep(st.s as any)}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                step === st.s
                  ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300'
                  : 'border-slate-200 dark:border-slate-800 text-slate-400'
              }`}
            >
              {st.name}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: Basic Information */}
      {step === 1 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">1. Product Identification</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Product Title"
              placeholder="e.g. AeroPulse Wireless Headphones"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Input
              label="Subtitle / Headline"
              placeholder="e.g. High-Fidelity Audio with 40-Hour Battery"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
            <Select
              label="Brand"
              options={[
                { value: 'TechGear', label: 'TechGear' },
                { value: 'AeroPulse', label: 'AeroPulse' },
                { value: 'Chronos', label: 'Chronos' },
                { value: 'Keycraft', label: 'Keycraft' }
              ]}
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <Select
              label="Category"
              options={[
                { value: 'Electronics', label: 'Electronics' },
                { value: 'Wearables', label: 'Wearables' },
                { value: 'Computer Peripherals', label: 'Computer Peripherals' },
                { value: 'Home Theater', label: 'Home Theater' }
              ]}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Input
              label="SKU Identifier"
              value={sku}
              onChange={(e) => setSku(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Description (Rich Text)
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe product features, build materials, and key selling points..."
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="pt-4 flex justify-end">
            <Button onClick={() => setStep(2)} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Next: Media Dropzone
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: Media Upload Dropzone */}
      {step === 2 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">2. Drag-and-Drop Media Gallery</h3>

          {/* Dropzone Box */}
          <div
            onClick={handleAddSampleImage}
            className="border-2 border-dashed border-indigo-300 dark:border-indigo-800 rounded-2xl p-8 text-center space-y-2 cursor-pointer hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mx-auto">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
              Drag & Drop product photos here, or <span className="text-indigo-600">click to add sample image</span>
            </p>
            <p className="text-[11px] text-slate-400">Supports JPG, PNG, WEBP up to 10MB per file</p>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 gap-4 pt-2">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 group">
                <img src={img} alt="" className="w-full h-full object-cover" />
                {i === 0 && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-indigo-600 text-white text-[9px] font-bold rounded uppercase">
                    Primary
                  </span>
                )}
                <button
                  onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                  className="absolute top-2 right-2 p-1 bg-rose-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-between">
            <Button variant="ghost" onClick={() => setStep(1)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
            <Button onClick={() => setStep(3)} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Next: Pricing & Variants
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: Pricing & Variant Matrix */}
      {step === 3 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">3. Pricing & Inventory Matrix</h3>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Regular Price ($)"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <Input
              label="Original MSRP ($)"
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(Number(e.target.value))}
            />
            <Input
              label="Initial Stock Units"
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
            />
          </div>

          {/* Variant Matrix Generator */}
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Variant Combinations</h4>
              <button
                onClick={() => setVariants([...variants, { color: 'Blue', size: 'Standard', stock: 10, price }])}
                className="text-xs text-indigo-600 font-bold hover:underline"
              >
                + Add Variant Option
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {variants.map((v, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{v.color} / {v.size}</span>
                  <div className="flex items-center gap-3">
                    <span>Stock: {v.stock}</span>
                    <span className="font-extrabold">${v.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <Button variant="ghost" onClick={() => setStep(2)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
            <Button onClick={() => setStep(4)} rightIcon={<ArrowRight className="w-4 h-4" />}>
              Next: Logistics & Publish
            </Button>
          </div>
        </div>
      )}

      {/* STEP 4: Logistics & Final Publish */}
      {step === 4 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">4. Shipping & Compliance</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Package Weight (kg)" defaultValue="0.45" />
            <Input label="Dimensions (L x W x H cm)" defaultValue="20 x 15 x 8" />
            <Input label="HSN / Tax Code" defaultValue="HSN-851830" />
            <Input label="Country of Origin" defaultValue="United States" />
          </div>

          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-xl text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
            <p className="font-bold">Ready to Publish!</p>
            <p>Your product will immediately sync across global search engines, CX storefronts, and multi-channel feeds.</p>
          </div>

          <div className="pt-4 flex justify-between">
            <Button variant="ghost" onClick={() => setStep(3)} leftIcon={<ArrowLeft className="w-4 h-4" />}>
              Back
            </Button>
            <Button variant="primary" loading={loading} onClick={handlePublish} leftIcon={<Check className="w-4 h-4" />}>
              Publish Product Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProductWorkflow;
