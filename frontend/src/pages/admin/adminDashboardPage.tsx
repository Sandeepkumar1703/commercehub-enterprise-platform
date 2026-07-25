import React, { useState } from 'react';
import { useRouter } from '../../core/router/Router';
import { ROUTES } from '../../theme/routes';
import { useCart } from '../../context/CartContext';
import { PRODUCT_CATALOG, ProductItem } from '../../data/products';
import {
  BarChart3,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Ticket,
  Truck,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  Shield,
  ShieldAlert,
  ArrowUpRight,
  Download,
  Trash2,
  Edit,
  Tag,
  DollarSign,
  Boxes,
  Eye,
  XCircle,
  RefreshCw,
} from 'lucide-react';

type AdminTab =
  | 'overview'
  | 'products'
  | 'categories'
  | 'inventory'
  | 'orders'
  | 'coupons'
  | 'users'
  | 'analytics';

interface AdminUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  status: 'ACTIVE' | 'SUSPENDED';
  joinedDate: string;
}

interface Coupon {
  code: string;
  discountType: 'PERCENTAGE' | 'FLAT';
  value: number;
  minOrder: number;
  usageCount: number;
  maxUsage: number;
  status: 'ACTIVE' | 'EXPIRED';
}

export const AdminDashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const { orders, updateOrderStatus } = useCart();

  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Product Management State
  const [productList, setProductList] = useState<ProductItem[]>(PRODUCT_CATALOG);
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    sku: '',
    stockQuantity: '25',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    categoryName: 'Audio & Electronics',
  });

  // Category State
  const [categories, setCategories] = useState<string[]>([
    'Audio & Electronics',
    'Computers & Accessories',
    'Wearables & Smart Devices',
    'Gaming Gear',
    'Smart Home Tech',
  ]);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Coupon State
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      code: 'COMMERCE10',
      discountType: 'PERCENTAGE',
      value: 10,
      minOrder: 50,
      usageCount: 142,
      maxUsage: 500,
      status: 'ACTIVE',
    },
    {
      code: 'WELCOME20',
      discountType: 'PERCENTAGE',
      value: 20,
      minOrder: 100,
      usageCount: 89,
      maxUsage: 200,
      status: 'ACTIVE',
    },
    {
      code: 'FLAT50OFF',
      discountType: 'FLAT',
      value: 50,
      minOrder: 300,
      usageCount: 22,
      maxUsage: 100,
      status: 'ACTIVE',
    },
  ]);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'PERCENTAGE' as 'PERCENTAGE' | 'FLAT',
    value: '',
    minOrder: '',
    maxUsage: '100',
  });

  // User Management State
  const [usersList, setUsersList] = useState<AdminUser[]>([
    {
      id: 1,
      firstName: 'Sandeep',
      lastName: 'Prasad',
      email: 'sandeepkumarprasad01@gmail.com',
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
      status: 'ACTIVE',
      joinedDate: '2026-01-15',
    },
    {
      id: 2,
      firstName: 'Ananya',
      lastName: 'Sharma',
      email: 'ananya.sharma@example.com',
      roles: ['ROLE_USER'],
      status: 'ACTIVE',
      joinedDate: '2026-02-10',
    },
    {
      id: 3,
      firstName: 'Rahul',
      lastName: 'Verma',
      email: 'rahul.v@example.com',
      roles: ['ROLE_MANAGER', 'ROLE_USER'],
      status: 'ACTIVE',
      joinedDate: '2026-03-01',
    },
  ]);

  // Order Fulfillment State
  const [orderFilter, setOrderFilter] = useState<string>('ALL');
  const [selectedOrderTracking, setSelectedOrderTracking] = useState<{
    orderId: string;
    trackingNum: string;
    carrier: string;
  }>({ orderId: '', trackingNum: '', carrier: 'FedEx Express' });

  // Calculate Aggregates
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 128450.00);
  const totalOrdersCount = orders.length + 154;
  const lowStockCount = productList.filter((p) => p.stockQuantity < 15).length;

  // Handlers
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const created: ProductItem = {
      id: Date.now(),
      name: newProduct.name,
      description: newProduct.description || 'Enterprise catalog entry',
      price: parseFloat(newProduct.price),
      sku: newProduct.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      stockQuantity: parseInt(newProduct.stockQuantity) || 20,
      imageUrl: newProduct.imageUrl,
      category: newProduct.categoryName,
      categoryId: 1,
      rating: 5.0,
      reviewCount: 1,
      specifications: { Category: newProduct.categoryName },
    };

    setProductList([created, ...productList]);
    setNewProduct({
      name: '',
      description: '',
      price: '',
      sku: '',
      stockQuantity: '25',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      categoryName: 'Audio & Electronics',
    });
    setIsAddProductOpen(false);
  };

  const handleStockUpdate = (productId: number, delta: number) => {
    setProductList((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, stockQuantity: Math.max(0, p.stockQuantity + delta) }
          : p
      )
    );
  };

  const handleDeleteProduct = (productId: number) => {
    setProductList((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;
    if (!categories.includes(newCategoryName.trim())) {
      setCategories([...categories, newCategoryName.trim()]);
    }
    setNewCategoryName('');
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code || !newCoupon.value) return;

    const coupon: Coupon = {
      code: newCoupon.code.toUpperCase().trim(),
      discountType: newCoupon.discountType,
      value: parseFloat(newCoupon.value),
      minOrder: parseFloat(newCoupon.minOrder) || 0,
      usageCount: 0,
      maxUsage: parseInt(newCoupon.maxUsage) || 100,
      status: 'ACTIVE',
    };

    setCoupons([coupon, ...coupons]);
    setNewCoupon({
      code: '',
      discountType: 'PERCENTAGE',
      value: '',
      minOrder: '',
      maxUsage: '100',
    });
  };

  const handleToggleUserRole = (userId: number, role: string) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const hasRole = u.roles.includes(role);
          const updatedRoles = hasRole
            ? u.roles.filter((r) => r !== role)
            : [...u.roles, role];
          return { ...u, roles: updatedRoles };
        }
        return u;
      })
    );
  };

  const handleToggleUserStatus = (userId: number) => {
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' }
          : u
      )
    );
  };

  const filteredProducts = productList.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCat =
      selectedCategory === 'ALL' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const filteredOrders = orders.filter((o) =>
    orderFilter === 'ALL' ? true : o.status === orderFilter
  );

  return (
    <div className="py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Enterprise Admin Banner Header */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-2xl relative overflow-hidden border border-indigo-500/20">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-mono font-bold tracking-wider uppercase border border-indigo-500/30 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-indigo-400" />
                Enterprise Operations Portal
              </span>
              <span className="text-xs text-slate-400">Spring Boot Microservices Connected</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white">
              CommerceHub Platform Console
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Monitor multi-tenant metrics, fulfill order queues, manage catalogs, configure promotional campaigns, and manage RBAC user privileges.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddProductOpen(true)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product Item</span>
            </button>
            <button
              onClick={() => navigate(ROUTES.API_DOCS)}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer"
            >
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              <span>Open OpenAPI Specs</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 border-t border-slate-800 mt-6 scrollbar-none">
          {[
            { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
            { id: 'products', label: 'Products Catalog', icon: Package },
            { id: 'categories', label: 'Categories', icon: Layers },
            { id: 'inventory', label: 'Inventory & Stock', icon: Boxes, badge: lowStockCount },
            { id: 'orders', label: 'Order Fulfillment', icon: ShoppingBag, badge: orders.length },
            { id: 'coupons', label: 'Coupons & Promos', icon: Ticket },
            { id: 'users', label: 'Users & Roles', icon: Users },
            { id: 'analytics', label: 'Revenue Analytics', icon: TrendingUp },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as AdminTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-md font-extrabold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-800 text-indigo-300'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in">
          
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Total Sales Revenue</p>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-[var(--text-primary)] mt-3">
                ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-emerald-600 font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+14.2% from last month</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Total Orders Processed</p>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-[var(--text-primary)] mt-3">
                {totalOrdersCount}
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-indigo-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>99.4% fulfillment rate</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Active Catalog Products</p>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-[var(--text-primary)] mt-3">
                {productList.length}
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-slate-500 font-medium">
                <span>Across {categories.length} store categories</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">Low Stock Inventory Alerts</p>
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-extrabold text-[var(--text-primary)] mt-3">
                {lowStockCount} Items
              </p>
              <div className="flex items-center gap-1 mt-2 text-xs text-amber-600 font-semibold">
                <span>Requires restock attention</span>
              </div>
            </div>
          </div>

          {/* Quick Recent Orders Table & Live Feed */}
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Recent Customer Orders</h3>
                <p className="text-xs text-[var(--text-secondary)]">Live feed from PostgreSQL `orders` table</p>
              </div>
              <button
                onClick={() => setActiveTab('orders')}
                className="text-xs text-[var(--brand-primary)] hover:underline font-bold flex items-center gap-1"
              >
                <span>View All Orders</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-default)] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Order ID</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Carrier Tracking</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-default)] font-medium">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[var(--bg-surface-raised)]/50 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-indigo-600">{o.id}</td>
                      <td className="py-3 px-4 text-[var(--text-primary)]">{o.shippingAddress.name}</td>
                      <td className="py-3 px-4 text-[var(--text-secondary)]">{o.date}</td>
                      <td className="py-3 px-4 font-bold text-[var(--text-primary)]">${o.total.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            o.status === 'DELIVERED'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : o.status === 'SHIPPED'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[var(--text-secondary)]">
                        {o.trackingNumber || 'Unassigned'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => navigate(`${ROUTES.ORDER_TRACKING}/${o.id}`)}
                          className="p-1.5 rounded-lg bg-[var(--bg-surface-raised)] text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors cursor-pointer"
                          title="Track & Print Invoice"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS CATALOG */}
      {activeTab === 'products' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-default)]">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--text-secondary)]" />
              <input
                type="text"
                placeholder="Search products or SKU..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--brand-primary)]"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-xs font-semibold text-[var(--text-primary)] cursor-pointer"
              >
                <option value="ALL">All Categories ({categories.length})</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-hover)] rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Product</span>
              </button>
            </div>
          </div>

          {/* Modal / Inline Add Product Form */}
          {isAddProductOpen && (
            <form
              onSubmit={handleAddProduct}
              className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-indigo-500/30 shadow-xl space-y-4 animate-in slide-in-from-top duration-200"
            >
              <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3">
                <h3 className="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
                  <Package className="w-5 h-5 text-indigo-500" />
                  <span>Add New Store Product Item</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="text-xs text-[var(--text-secondary)] hover:text-rose-500"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-[var(--text-secondary)] mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Wireless Ergonomic Mouse"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[var(--text-secondary)] mb-1">SKU Code</label>
                  <input
                    type="text"
                    placeholder="e.g. TECH-MOUSE-009"
                    value={newProduct.sku}
                    onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[var(--text-secondary)] mb-1">Category</label>
                  <select
                    value={newProduct.categoryName}
                    onChange={(e) => setNewProduct({ ...newProduct, categoryName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)]"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[var(--text-secondary)] mb-1">Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="99.99"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[var(--text-secondary)] mb-1">Initial Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={newProduct.stockQuantity}
                    onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[var(--text-secondary)] mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newProduct.imageUrl}
                    onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-[var(--text-primary)]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Save Product to Catalog
                </button>
              </div>
            </form>
          )}

          {/* Product Grid / Table */}
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-default)] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">SKU</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4 text-right">Manage Stock & Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-default)] font-medium">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[var(--bg-surface-raised)]/50 transition-colors">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-10 h-10 rounded-xl object-cover border border-[var(--border-default)]"
                        />
                        <div>
                          <p className="font-bold text-[var(--text-primary)]">{p.name}</p>
                          <p className="text-[10px] text-[var(--text-secondary)] truncate max-w-xs">{p.description}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-slate-500">{p.sku}</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[10px]">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-extrabold text-[var(--text-primary)]">${p.price.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            p.stockQuantity === 0
                              ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                              : p.stockQuantity < 15
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          }`}
                        >
                          {p.stockQuantity} in stock
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleStockUpdate(p.id, 10)}
                            className="px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 hover:bg-indigo-100 text-[10px] font-bold cursor-pointer"
                            title="Restock +10"
                          >
                            +10 Stock
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Product Category Management</h3>
                <p className="text-xs text-[var(--text-secondary)]">Organize storefront navigation and hierarchical catalogs</p>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="New Category Name..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] text-xs text-[var(--text-primary)]"
                />
                <button
                  onClick={handleAddCategory}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 cursor-pointer"
                >
                  Add Category
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {categories.map((cat, idx) => {
                const count = productList.filter((p) => p.category === cat).length;
                return (
                  <div key={idx} className="p-4 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold">
                        <Tag className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[var(--text-primary)]">{cat}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{count} products assigned</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INVENTORY & STOCK */}
      {activeTab === 'inventory' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Inventory Stock Control</h3>
              <p className="text-xs text-[var(--text-secondary)]">Real-time stock reservation, available levels, and low stock threshold warnings</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <p className="text-xs font-bold text-amber-800 dark:text-amber-300">Low Stock Threshold (&lt; 15)</p>
                <p className="text-2xl font-black text-amber-900 dark:text-amber-200 mt-1">{lowStockCount} Products</p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Total Units Available</p>
                <p className="text-2xl font-black text-emerald-900 dark:text-emerald-200 mt-1">
                  {productList.reduce((acc, p) => acc + p.stockQuantity, 0)} Units
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
                <p className="text-xs font-bold text-indigo-800 dark:text-indigo-300">Reserved in Checkout Carts</p>
                <p className="text-2xl font-black text-indigo-900 dark:text-indigo-200 mt-1">42 Units</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-default)] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">Product Name</th>
                    <th className="py-3 px-4">SKU</th>
                    <th className="py-3 px-4">Stock Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-default)]">
                  {productList.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 px-4 font-bold text-[var(--text-primary)]">{p.name}</td>
                      <td className="py-3 px-4 font-mono text-[var(--text-secondary)]">{p.sku}</td>
                      <td className="py-3 px-4 font-bold">
                        {p.stockQuantity < 15 ? (
                          <span className="text-amber-600 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Low ({p.stockQuantity})</span>
                          </span>
                        ) : (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Healthy ({p.stockQuantity})</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleStockUpdate(p.id, 25)}
                          className="px-3 py-1 bg-indigo-600 text-white rounded-lg font-bold text-[10px] cursor-pointer"
                        >
                          Restock +25 Units
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ORDERS & FULFILLMENT */}
      {activeTab === 'orders' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Order Fulfillment Management</h3>
                <p className="text-xs text-[var(--text-secondary)]">Update status, generate tracking numbers, assign carriers</p>
              </div>

              <div className="flex items-center gap-2">
                {['ALL', 'PENDING', 'PAID', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      orderFilter === st
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-[var(--bg-surface-raised)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-[var(--border-default)]">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-extrabold text-sm text-indigo-600">{ord.id}</span>
                        <span className="text-xs text-[var(--text-secondary)]">• Placed on {ord.date}</span>
                      </div>
                      <p className="text-xs text-[var(--text-primary)] font-semibold mt-1">
                        Customer: {ord.shippingAddress.name} ({ord.shippingAddress.street}, {ord.shippingAddress.city})
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          updateOrderStatus(ord.id, e.target.value as any)
                        }
                        className="px-3 py-1.5 rounded-xl border border-indigo-300 dark:border-indigo-800 bg-[var(--bg-surface)] text-xs font-bold text-[var(--text-primary)] cursor-pointer"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PAID">PAID</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>

                      <button
                        onClick={() => navigate(`${ROUTES.ORDER_TRACKING}/${ord.id}`)}
                        className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 cursor-pointer flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Track / Print Invoice</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="font-bold text-[var(--text-secondary)] mb-1">Carrier Details:</p>
                      <p className="font-semibold text-[var(--text-primary)]">
                        Carrier: {ord.carrier || 'FedEx Express'} | Tracking: {ord.trackingNumber || 'Unassigned'}
                      </p>
                    </div>
                    <div className="text-right font-bold text-[var(--text-primary)] text-sm">
                      Total: ${ord.total.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: COUPONS */}
      {activeTab === 'coupons' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Promotional Coupon Engine</h3>

            <form onSubmit={handleCreateCoupon} className="p-4 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-3">
              <p className="text-xs font-bold text-[var(--text-primary)]">Create New Discount Campaign</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                <input
                  type="text"
                  required
                  placeholder="Coupon Code (e.g. FLASH30)"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)]"
                />
                <select
                  value={newCoupon.discountType}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as any })}
                  className="px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)]"
                >
                  <option value="PERCENTAGE">Percentage (%)</option>
                  <option value="FLAT">Flat Amount ($)</option>
                </select>
                <input
                  type="number"
                  required
                  placeholder="Value (e.g. 20)"
                  value={newCoupon.value}
                  onChange={(e) => setNewCoupon({ ...newCoupon, value: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)]"
                />
                <input
                  type="number"
                  placeholder="Min Order ($)"
                  value={newCoupon.minOrder}
                  onChange={(e) => setNewCoupon({ ...newCoupon, minOrder: e.target.value })}
                  className="px-3 py-2 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs hover:bg-indigo-500 cursor-pointer"
                >
                  Create Coupon
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.code} className="p-4 rounded-2xl bg-[var(--bg-surface-raised)] border border-indigo-500/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-extrabold text-indigo-600 text-sm tracking-wider">{c.code}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {c.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-[var(--text-primary)]">
                    {c.discountType === 'PERCENTAGE' ? `${c.value}% OFF` : `$${c.value} FLAT DISCOUNT`}
                  </p>
                  <p className="text-[11px] text-[var(--text-secondary)]">
                    Min spend: ${c.minOrder} | Redeemed: {c.usageCount}/{c.maxUsage}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: USERS & RBAC ROLES */}
      {activeTab === 'users' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[var(--text-primary)]">User Management & Role Based Access Control</h3>
              <p className="text-xs text-[var(--text-secondary)]">Assign ROLE_ADMIN, ROLE_MANAGER, ROLE_USER privileges instantly</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border-default)] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Active Roles</th>
                    <th className="py-3 px-4">Account Status</th>
                    <th className="py-3 px-4 text-right">Role Toggles</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-default)]">
                  {usersList.map((u) => (
                    <tr key={u.id}>
                      <td className="py-3 px-4 font-bold text-[var(--text-primary)]">
                        {u.firstName} {u.lastName}
                      </td>
                      <td className="py-3 px-4 text-[var(--text-secondary)]">{u.email}</td>
                      <td className="py-3 px-4 flex gap-1">
                        {u.roles.map((r) => (
                          <span key={r} className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-mono text-[10px] font-bold">
                            {r}
                          </span>
                        ))}
                      </td>
                      <td className="py-3 px-4 font-bold">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] ${u.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleToggleUserRole(u.id, 'ROLE_ADMIN')}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-bold text-[10px] cursor-pointer"
                        >
                          Toggle ADMIN
                        </button>
                        <button
                          onClick={() => handleToggleUserStatus(u.id)}
                          className="px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-[var(--text-primary)] font-bold text-[10px] cursor-pointer"
                        >
                          {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 8: ANALYTICS & REVENUE */}
      {activeTab === 'analytics' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-default)] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">Revenue & Sales Performance Analytics</h3>
                <p className="text-xs text-[var(--text-secondary)]">Quarterly sales trends, average order value, conversion analytics</p>
              </div>
              <button
                onClick={() => alert('Exporting full financial statement report in CSV format...')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Export Sales CSV</span>
              </button>
            </div>

            {/* Simulated Sales Bar Chart */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-4">
              <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider">2026 Monthly Sales Volume ($)</p>
              <div className="h-44 flex items-end justify-between gap-2 pt-6 px-2">
                {[
                  { month: 'Jan', amount: 12400 },
                  { month: 'Feb', amount: 18900 },
                  { month: 'Mar', amount: 24500 },
                  { month: 'Apr', amount: 31200 },
                  { month: 'May', amount: 28400 },
                  { month: 'Jun', amount: 39100 },
                  { month: 'Jul', amount: 48900 },
                ].map((bar) => {
                  const heightPercent = (bar.amount / 50000) * 100;
                  return (
                    <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
                      <span className="text-[10px] font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        ${(bar.amount / 1000).toFixed(1)}k
                      </span>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full max-w-[36px] rounded-t-lg bg-indigo-600 group-hover:bg-indigo-500 transition-all shadow-md"
                      />
                      <span className="text-[11px] font-bold text-[var(--text-secondary)]">{bar.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
