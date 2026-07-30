import React, { useState } from 'react';
import { Camera, Upload, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { productApi } from '../product.api';
import { Product } from '../../../types';
import { formatCurrency } from '../../../core/utils/formatters';

interface VisualSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VisualSearchModal: React.FC<VisualSearchModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detectedCategory, setDetectedCategory] = useState<string | null>(null);
  const [matchedProducts, setMatchedProducts] = useState<Product[]>([]);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setSelectedImage(url);
        analyzeImage(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = (filename: string) => {
    setIsAnalyzing(true);
    setMatchedProducts([]);
    setDetectedCategory(null);

    setTimeout(() => {
      // Mock visual similarity classification based on filename hints or category sampling
      const fn = filename.toLowerCase();
      let cat = 'Electronics';
      if (fn.includes('shirt') || fn.includes('pant') || fn.includes('fashion')) cat = 'Fashion';
      if (fn.includes('book')) cat = 'Books';
      if (fn.includes('shoe') || fn.includes('sneaker')) cat = 'Footwear';

      setDetectedCategory(cat);

      productApi
        .getProducts({ page: 0, size: 8 })
        .then((res) => {
          setMatchedProducts(res.content.slice(0, 4));
        })
        .finally(() => setIsAnalyzing(false));
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-surface/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl overflow-hidden z-50 p-6 space-y-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand/10 text-brand">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-content-primary">Visual Product Search</h2>
              <p className="text-xs text-content-muted">Upload an image to find similar items in our catalog</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-content-muted hover:text-content-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!selectedImage ? (
          <label className="border-2 border-dashed border-border/80 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 bg-surface-hover/50 hover:bg-surface-hover hover:border-brand/50 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-brand/10 text-brand flex items-center justify-center">
              <Upload className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <p className="text-xs font-bold text-content-primary">Click or drag an image here to search</p>
              <p className="text-[10px] text-content-muted">Supports JPG, PNG, WEBP up to 5MB</p>
            </div>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-surface border border-border/80 rounded-xl">
              <img src={selectedImage} alt="Uploaded" className="w-20 h-20 object-cover rounded-lg border" />
              <div className="flex-1 space-y-1">
                {isAnalyzing ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-brand animate-pulse">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Analyzing visual features & color vectors...</span>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-status-success">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Visual Recognition Complete</span>
                    </div>
                    <p className="text-xs text-content-secondary">
                      Detected category: <strong className="text-content-primary">{detectedCategory}</strong>
                    </p>
                  </>
                )}
                <button
                  onClick={() => setSelectedImage(null)}
                  className="text-[11px] font-bold text-brand hover:underline"
                >
                  Upload different image
                </button>
              </div>
            </div>

            {/* Matching Products */}
            {matchedProducts.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-extrabold text-content-primary">Visually Similar Products</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {matchedProducts.map((prod) => (
                    <button
                      key={prod.id}
                      onClick={() => {
                        navigate(`/products/${prod.id}`);
                        onClose();
                      }}
                      className="p-2 bg-surface border border-border/80 rounded-xl hover:border-brand/40 hover:shadow-md transition-all text-left group cursor-pointer"
                    >
                      <img src={prod.imageUrl} alt={prod.name} className="w-full h-20 object-cover rounded-lg mb-2" />
                      <p className="text-[11px] font-bold text-content-primary line-clamp-1 group-hover:text-brand">
                        {prod.name}
                      </p>
                      <p className="text-[10px] font-black text-brand mt-0.5">{formatCurrency(prod.price)}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
