import React, { useState } from 'react';
import { useApp } from '../../../app/store/store';
import { Button } from '../../../shared/components/Button';
import { Badge } from '../../../shared/components/Badge';
import { MOCK_REVIEWS } from '../../../core/auth/mockData';
import {
  Star, ShoppingBag, ShieldCheck, Truck, RotateCcw,
  Check, ThumbsUp, ArrowLeft, Zap, Sparkles
} from 'lucide-react';

export const PDP: React.FC = () => {
  const { products, selectedProductId, addToCart, setCustomerView, setCartOpen } = useApp();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  const [activeImage, setActiveImage] = useState(product.images[0] || '');
  const [selectedColor, setSelectedColor] = useState('Midnight Black');
  const [selectedSize, setSelectedSize] = useState('Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'materials' | 'reviews'>('specs');
  const [reviewsList, setReviewsList] = useState(MOCK_REVIEWS);

  const handleVoteHelpful = (reviewId: string) => {
    setReviewsList(prev => prev.map(r => {
      if (r.id === reviewId) {
        const voted = r.userVotedHelpful;
        return {
          ...r,
          helpfulCount: voted ? r.helpfulCount - 1 : r.helpfulCount + 1,
          userVotedHelpful: !voted
        };
      }
      return r;
    }));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setCartOpen(true);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Back to Catalog */}
      <button
        onClick={() => setCustomerView('plp')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Product Catalog
      </button>

      {/* Top Main Section: Gallery Left (55%) & Details Right (45%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Left Column Gallery (55%) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Zoom Preview Frame */}
          <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-700/60">
            <img
              src={activeImage || product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.discountPercentage && (
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="error" size="md">
                  SAVE {product.discountPercentage}% TODAY
                </Badge>
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                  (activeImage || product.images[0]) === img ? 'border-indigo-600 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column Sticky Details (45%) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{product.brand}</span>
                <span>SKU: {product.sku}</span>
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
                {product.title}
              </h1>
              {product.subtitle && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{product.subtitle}</p>
              )}
            </div>

            {/* Ratings Summary */}
            <div className="flex items-center gap-3 py-2 border-y border-slate-100 dark:border-slate-800 text-xs">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 dark:text-slate-300 font-medium">{product.reviewCount} Verified Customer Reviews</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-600 font-bold">98% Recommended</span>
            </div>

            {/* Pricing Section */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900 dark:text-slate-100">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Color Swatches */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-slate-500">Color Option: <strong className="text-slate-900 dark:text-slate-100">{selectedColor}</strong></label>
              <div className="flex gap-2">
                {['Midnight Black', 'Space Gray', 'Titanium Silver'].map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      selectedColor === c ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 font-bold' : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Primary Actions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <label className="text-xs font-bold uppercase text-slate-500">Quantity:</label>
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-extrabold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button variant="outline" size="lg" className="w-full" leftIcon={<ShoppingBag className="w-5 h-5" />} onClick={handleAddToCart}>
                  Add to Cart
                </Button>
                <Button variant="primary" size="lg" className="w-full" leftIcon={<Zap className="w-5 h-5" />} onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </div>
            </div>
          </div>

          {/* Trust Badges & Shipping Estimator */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-indigo-600" />
              <span>Free Express Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>2-Year Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-purple-600" />
              <span>30-Day Money Back</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tabs Section: Specifications, Materials, Customer Reviews */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`pb-3 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'specs' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Detailed Specifications
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`pb-3 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'materials' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Materials & Craft
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-sm font-bold transition-all border-b-2 ${
              activeTab === 'reviews' ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Customer Reviews ({reviewsList.length})
          </button>
        </div>

        {activeTab === 'specs' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <span className="font-semibold text-slate-500">{key}</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{val}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'materials' && (
          <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            {product.materials.map((m, i) => (
              <li key={i} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {reviewsList.map(r => (
              <div key={r.id} className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={r.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                    <div>
                      <span className="font-bold text-slate-900 dark:text-slate-100">{r.author}</span>
                      {r.verifiedPurchase && <span className="ml-2 text-[10px] text-emerald-600 font-bold">✓ Verified Purchase</span>}
                    </div>
                  </div>
                  <span className="text-slate-400">{r.date}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{r.comment}</p>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500">
                  <span>Was this review helpful?</span>
                  <button
                    onClick={() => handleVoteHelpful(r.id)}
                    className={`px-2 py-1 rounded border flex items-center gap-1 font-semibold transition-colors ${
                      r.userVotedHelpful ? 'bg-indigo-50 border-indigo-300 text-indigo-600' : 'border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" /> ({r.helpfulCount})
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PDP;
