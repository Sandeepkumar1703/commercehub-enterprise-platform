import React from 'react';
import { 
  Key, 
  Package, 
  Layers, 
  ShoppingBag, 
  CreditCard, 
  Truck, 
  Tag, 
  Star, 
  Heart, 
  ShoppingCart, 
  LayoutDashboard, 
  BarChart3, 
  Bell, 
  Globe, 
  ShieldCheck 
} from 'lucide-react';

export const ApplicationModules: React.FC = () => {
  const modules = [
    {
      title: 'Authentication Module',
      icon: <Key className="w-5 h-5 text-amber-500" />,
      desc: 'Handles stateless login, registration, JWT bearer token generation, HttpOnly refresh token rotation, password reset flows, and session invalidation.',
    },
    {
      title: 'Product Module',
      icon: <Package className="w-5 h-5 text-indigo-500" />,
      desc: 'Manages catalog items, SKU generation, inventory allocation, search criteria specification, image asset URLs, and soft-deletion flags.',
    },
    {
      title: 'Category Module',
      icon: <Layers className="w-5 h-5 text-sky-500" />,
      desc: 'Supports multi-level category hierarchies, parent-child taxonomy, dynamic slug generation, and category-level product filtering.',
    },
    {
      title: 'Order Module',
      icon: <ShoppingBag className="w-5 h-5 text-[var(--vynk-brand)]" />,
      desc: 'Orchestrates the order state machine (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED), line item total calculations, and invoice summaries.',
    },
    {
      title: 'Payment Module',
      icon: <CreditCard className="w-5 h-5 text-emerald-500" />,
      desc: 'Abstracts payment gateway integrations, records transaction payment intents, handles status callbacks, and manages refund processing.',
    },
    {
      title: 'Shipping Module',
      icon: <Truck className="w-5 h-5 text-blue-500" />,
      desc: 'Manages shipping carrier selection, tracking number generation, dispatch status transitions, and customer delivery estimation.',
    },
    {
      title: 'Coupon Module',
      icon: <Tag className="w-5 h-5 text-rose-500" />,
      desc: 'Processes percentage and flat-rate discount codes, usage limit tracking, expiration logic, and minimum order validation checks.',
    },
    {
      title: 'Review Module',
      icon: <Star className="w-5 h-5 text-amber-400" />,
      desc: 'Allows verified buyers to post star ratings and text reviews, with admin moderation and real-time average rating calculation.',
    },
    {
      title: 'Wishlist Module',
      icon: <Heart className="w-5 h-5 text-rose-500" />,
      desc: 'Enables customers to bookmark favorite products, receive back-in-stock notifications, and transfer items to active cart.',
    },
    {
      title: 'Cart Module',
      icon: <ShoppingCart className="w-5 h-5 text-purple-500" />,
      desc: 'Manages active persistent user cart items, quantity updates, stock availability checks, and guest-to-account cart merging.',
    },
    {
      title: 'Admin Dashboard',
      icon: <LayoutDashboard className="w-5 h-5 text-indigo-600" />,
      desc: 'Provides platform administrators with centralized user management, merchant approval toggles, product overrides, and configuration controls.',
    },
    {
      title: 'Analytics Module',
      icon: <BarChart3 className="w-5 h-5 text-teal-500" />,
      desc: 'Aggregates sales conversion data, revenue metrics, top-selling product reports, and customer acquisition insights.',
    },
    {
      title: 'Notification Module',
      icon: <Bell className="w-5 h-5 text-yellow-500" />,
      desc: 'Dispatches asynchronous email notifications, transactional order confirmations, and system status alerts.',
    },
    {
      title: 'Localization Module',
      icon: <Globe className="w-5 h-5 text-cyan-500" />,
      desc: 'Manages dynamic multi-language translation dictionaries (EN, ES, FR, DE, HI, AR), locale switching, and RTL text direction support.',
    },
    {
      title: 'Permission Module',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />,
      desc: 'Evaluates method-level security (@PreAuthorize), dynamic user authority matrices, and frontend route access guards.',
    },
  ];

  return (
    <section className="space-y-6">
      <div className="border-b border-app pb-4">
        <h2 className="text-2xl font-black text-app-primary tracking-tight">
          Application Modules
        </h2>
        <p className="text-xs text-app-secondary mt-1">
          15 modular enterprise sub-systems decoupling core e-commerce capabilities, governance, analytics, and global operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m, idx) => (
          <div
            key={idx}
            className="p-5 bg-app-card rounded-2xl border border-app shadow-xs hover:border-[var(--vynk-brand)]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-xl bg-app-surface border border-app group-hover:scale-105 transition-transform">
                  {m.icon}
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-app-muted bg-app-surface px-2 py-0.5 rounded border border-app">
                  Module {idx + 1}
                </span>
              </div>
              <h3 className="font-bold text-base text-app-primary">{m.title}</h3>
              <p className="text-xs text-app-secondary leading-relaxed">{m.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
