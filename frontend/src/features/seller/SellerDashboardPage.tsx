import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, ShoppingCart, Package, AlertTriangle, ArrowRight, TrendingUp, Plus, Boxes, Tag, BarChart3 } from 'lucide-react';
import { productApi } from '../product/product.api';
import { orderApi } from '../order/order.api';
import { Product, Order } from '../../types';
import { useLanguage } from '../../core/i18n/LanguageContext';
import { Can } from '../../core/auth/Can';

export const SellerDashboardPage: React.FC = () => {
  const { getLocalizedPath } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productApi.getProducts({ size: 20 }),
      orderApi.getMyOrders(),
    ])
      .then(([prodRes, ordRes]) => {
        setProducts(prodRes.content || []);
        setOrders(Array.isArray(ordRes) ? ordRes : (ordRes as any)?.content || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || o.subtotal || 0), 0);
  const lowStockCount = products.filter((p) => (p.stockQuantity || 0) < 5).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full inline-block mb-2">
            Merchant Overview
          </span>
          <h1 className="text-2xl font-black tracking-tight">Seller Merchant Hub</h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Monitor product performance, track inventory fulfillment, manage customer orders, and issue seller coupons.
          </p>
        </div>

        <Can permission="PRODUCT_CREATE" explainDisabled disabledReason="PRODUCT_CREATE permission required to add products">
          <Link
            to={getLocalizedPath('seller/products')}
            className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 font-black text-xs px-5 py-2.5 rounded-xl hover:bg-emerald-400 transition-colors shadow-sm shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
        </Can>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-content-muted">Total Sales Revenue</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-content-primary mt-2">${totalRevenue.toFixed(2)}</p>
          <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +14.2% this month
          </span>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-content-muted">Merchant Orders</span>
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-content-primary mt-2">{orders.length}</p>
          <span className="text-[11px] font-semibold text-content-muted mt-1 inline-block">
            {orders.filter((o) => o.orderStatus === 'PROCESSING').length} pending fulfillment
          </span>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-content-muted">Active Products</span>
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-content-primary mt-2">{products.length}</p>
          <span className="text-[11px] font-semibold text-content-muted mt-1 inline-block">
            In store catalog
          </span>
        </div>

        <div className="bg-surface border border-border rounded-xl p-5 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-content-muted">Low Stock Alerts</span>
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-2xl font-black text-content-primary mt-2">{lowStockCount}</p>
          <span className="text-[11px] font-bold text-amber-500 mt-1 inline-block">
            Items under 5 units
          </span>
        </div>
      </div>

      {/* Quick Action Navigation Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Link
          to={getLocalizedPath('seller/products')}
          className="bg-surface border border-border rounded-xl p-4 hover:border-emerald-500 transition-colors shadow-sm flex items-center gap-3"
        >
          <Package className="w-5 h-5 text-emerald-500" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-content-primary truncate">My Products</p>
            <p className="text-[10px] text-content-muted truncate">Manage listings & prices</p>
          </div>
        </Link>

        <Link
          to={getLocalizedPath('seller/inventory')}
          className="bg-surface border border-border rounded-xl p-4 hover:border-emerald-500 transition-colors shadow-sm flex items-center gap-3"
        >
          <Boxes className="w-5 h-5 text-emerald-500" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-content-primary truncate">Stock & Inventory</p>
            <p className="text-[10px] text-content-muted truncate">Update quantities</p>
          </div>
        </Link>

        <Link
          to={getLocalizedPath('seller/coupons')}
          className="bg-surface border border-border rounded-xl p-4 hover:border-emerald-500 transition-colors shadow-sm flex items-center gap-3"
        >
          <Tag className="w-5 h-5 text-emerald-500" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-content-primary truncate">Create Coupon</p>
            <p className="text-[10px] text-content-muted truncate">Promotions & discounts</p>
          </div>
        </Link>

        <Link
          to={getLocalizedPath('seller/analytics')}
          className="bg-surface border border-border rounded-xl p-4 hover:border-emerald-500 transition-colors shadow-sm flex items-center gap-3"
        >
          <BarChart3 className="w-5 h-5 text-emerald-500" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-content-primary truncate">Sales Analytics</p>
            <p className="text-[10px] text-content-muted truncate">Revenue reports</p>
          </div>
        </Link>
      </div>

      {/* Orders Needing Fulfillment */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-border pb-4">
          <div>
            <h2 className="text-base font-extrabold text-content-primary">Pending Fulfillment</h2>
            <p className="text-xs text-content-muted">Orders waiting to be packed and shipped</p>
          </div>
          <Link to={getLocalizedPath('seller/orders')} className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
            <span>Manage All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-6 text-center text-xs text-content-muted animate-pulse">
            Loading seller orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="py-6 text-center text-xs text-content-muted">
            No pending merchant orders at this time.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-background text-content-muted uppercase text-[10px] font-bold border-b border-border">
                <tr>
                  <th className="py-3 px-4">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-content-primary">
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="hover:bg-surface-hover transition-colors">
                    <td className="py-3.5 px-4 font-bold">#{o.orderNumber || o.id.slice(0, 8)}</td>
                    <td className="py-3.5 px-4 text-content-secondary">{o.userName || o.userEmail || 'Customer'}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-blue-500/10 text-blue-600 uppercase">
                        {o.orderStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold">${(o.totalAmount || o.subtotal || 0).toFixed(2)}</td>
                    <td className="py-3.5 px-4">
                      <Link
                        to={getLocalizedPath(`seller/orders`)}
                        className="text-xs font-bold text-emerald-600 hover:underline"
                      >
                        Pack & Ship
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
