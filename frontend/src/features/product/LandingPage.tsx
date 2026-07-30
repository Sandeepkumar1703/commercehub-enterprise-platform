import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, ShieldCheck, Sparkles, TrendingUp, Star, Truck } from 'lucide-react';
import { categoryApi } from './category.api';
import { productApi } from './product.api';
import { Category, Product } from '../../types';
import { ProductCard } from './components/ProductCard';
import { Button } from '../../shared/components/Button';
import { formatCurrency } from '../../core/utils/formatters';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [flashSaleProducts, setFlashSaleProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([categoryApi.getCategories(), productApi.getProducts({ size: 8 })])
      .then(([catRes, prodRes]) => {
        setCategories(catRes);
        setFeaturedProducts(prodRes.content);
        setFlashSaleProducts(prodRes.content.filter((p) => p.isFlashSale));
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface via-background to-background border-b border-border py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand border border-brand/20 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" /> CommerceHub Enterprise Release
            </div>

            <h1 className="text-display font-black text-content-primary tracking-tight">
              Next-Generation Commerce for <span className="text-brand">Modern Enterprises</span>
            </h1>

            <p className="text-body-lg text-content-secondary max-w-xl">
              Shop curated noise-canceling audio, fitness smartwatches, ergonomic workspace furniture, and all-weather apparel with instant global fulfillment.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button size="lg" onClick={() => navigate('/products')} rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Full Catalog
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/products?category=cat_electronics')}>
                Shop Electronics
              </Button>
            </div>

            {/* Metrics */}
            <div className="pt-6 border-t border-border grid grid-cols-3 gap-4">
              <div>
                <p className="text-h2 font-black text-content-primary">8,000+</p>
                <p className="text-xs text-content-muted">Products in Stock</p>
              </div>
              <div>
                <p className="text-h2 font-black text-content-primary">99.9%</p>
                <p className="text-xs text-content-muted">On-Time Delivery</p>
              </div>
              <div>
                <p className="text-h2 font-black text-content-primary">4.9/5</p>
                <p className="text-xs text-content-muted">Customer Rating</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-border shadow-elevated bg-surface relative group">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&auto=format&fit=crop&q=80"
                alt="CommerceHub Hero"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold text-accent uppercase tracking-wider">Featured Product</span>
                <h3 className="text-lg font-bold">AcoustiPro Wireless ANC Headphones</h3>
                <p className="text-xs text-slate-200 mt-1">$299.99 — Free Worldwide Express Shipping</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-h2 font-extrabold text-content-primary">Shop by Category</h2>
            <p className="text-xs text-content-muted mt-1">High-demand categories built for professional workflows</p>
          </div>
          <Link to="/products" className="text-xs font-bold text-brand hover:underline flex items-center gap-1">
            All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.id}`}
              className="group bg-surface border border-border rounded-xl overflow-hidden shadow-card hover:shadow-xl hover:shadow-[0_10px_25px_-5px_rgba(154,140,152,0.25)] hover:-translate-y-1.5 hover:border-brand/40 transition-all duration-300 flex flex-col"
            >
              <div className="aspect-4/3 bg-surface-hover overflow-hidden">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-content-primary group-hover:text-brand transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-content-muted mt-0.5 line-clamp-2">{cat.description}</p>
                </div>
                <span className="text-[10px] font-bold text-brand mt-3 block">Browse Collection →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Flash Sales Banner */}
      {flashSaleProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#22223B] via-[#4A4E69] to-[#22223B] text-[#F2E9E4] rounded-2xl p-8 shadow-xl border border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/10">
                  <Zap className="w-6 h-6 text-[#C9ADA7]" />
                </div>
                <div>
                  <h2 className="text-h2 font-black tracking-tight text-white">Flash Sale Live Now</h2>
                  <p className="text-xs text-slate-300">Limited-time discounts on premium hardware & gear</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono-custom bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 text-white">
                <span>Ends in:</span>
                <span className="font-bold text-[#C9ADA7]">04 : 18 : 32</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {flashSaleProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trending Products Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand" />
            <h2 className="text-h2 font-extrabold text-content-primary">Trending Products</h2>
          </div>
          <Link to="/products" className="text-xs font-bold text-brand hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* Customer Feedback / Testimonial Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface border border-border rounded-2xl p-8 shadow-card text-center space-y-6">
          <div className="flex items-center justify-center gap-1 text-amber-400">
            <Star className="w-5 h-5 fill-amber-400" />
            <Star className="w-5 h-5 fill-amber-400" />
            <Star className="w-5 h-5 fill-amber-400" />
            <Star className="w-5 h-5 fill-amber-400" />
            <Star className="w-5 h-5 fill-amber-400" />
          </div>

          <p className="text-body-lg font-bold text-content-primary max-w-2xl mx-auto italic">
            "CommerceHub has streamlined our entire corporate procurement workflow. From acoustic headsets to ergonomic chairs, their order fulfillment speed and product quality are unbeatable."
          </p>

          <div>
            <p className="text-xs font-bold text-content-primary">Sarah Jenkins</p>
            <p className="text-[10px] text-content-muted">VP of Operations, TechVentures International</p>
          </div>
        </div>
      </section>
    </div>
  );
};
