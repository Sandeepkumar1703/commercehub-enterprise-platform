import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Store,
  ShoppingBag,
  Heart,
  User,
  ShieldAlert,
  Moon,
  Sun,
  LogOut,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useTheme } from '../../app/providers/ThemeProvider';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { logout } from '../../features/auth/authSlice';
import { productApi } from '../../features/product/product.api';
import { Product } from '../../types';
import { formatCurrency } from '../../core/utils/formatters';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSupportChat?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenSupportChat }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { user } = useAppSelector((state) => state.auth);

  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setProducts([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle global Cmd + K or Ctrl + K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Live product search
  useEffect(() => {
    if (!query.trim()) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(() => {
      productApi
        .searchProducts(query)
        .then((res) => setProducts(res.slice(0, 5)))
        .catch(() => setProducts([]))
        .finally(() => setIsLoading(false));
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const isAdmin = user?.roles?.some((r) => r.name === 'ROLE_ADMIN');

  const navActions = [
    { id: 'nav_catalog', title: 'Browse Product Catalog', icon: Store, route: '/products' },
    { id: 'nav_cart', title: 'View Shopping Cart', icon: ShoppingBag, route: '/cart' },
    { id: 'nav_orders', title: 'My Orders & History', icon: ShoppingBag, route: '/orders' },
    { id: 'nav_wishlist', title: 'Saved Wishlist', icon: Heart, route: '/wishlist' },
    { id: 'nav_profile', title: 'User Profile & Addresses', icon: User, route: '/profile' },
    ...(isAdmin
      ? [{ id: 'nav_admin', title: 'Admin Management Suite', icon: ShieldAlert, route: '/admin/dashboard' }]
      : []),
  ];

  const quickActions = [
    {
      id: 'action_theme',
      title: `Switch Theme to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'}`,
      icon: resolvedTheme === 'dark' ? Sun : Moon,
      action: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'),
    },
    {
      id: 'action_support',
      title: 'Open Live Customer Support',
      icon: HelpCircle,
      action: () => {
        onClose();
        onOpenSupportChat?.();
      },
    },
    ...(user
      ? [
          {
            id: 'action_logout',
            title: 'Sign Out of Account',
            icon: LogOut,
            action: () => {
              dispatch(logout());
              navigate('/');
            },
          },
        ]
      : []),
  ];

  const handleSelectNav = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Command Palette Card */}
      <div className="relative w-full max-w-2xl bg-surface/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-border/80">
          <Search className="w-5 h-5 text-content-muted mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-content-primary placeholder:text-content-muted focus:outline-none"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-bold bg-surface-hover border border-border rounded text-content-muted">
            ESC
          </kbd>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-2 space-y-4 divide-y divide-border/40">
          {/* Live Search Products Section */}
          {query.trim().length > 0 && (
            <div className="p-2 space-y-1">
              <div className="px-3 py-1 text-[10px] font-extrabold uppercase text-content-muted tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-brand" />
                <span>Product Matches ({products.length})</span>
              </div>
              {isLoading ? (
                <div className="p-4 text-xs text-content-muted text-center animate-pulse">
                  Searching CommerceHub catalog...
                </div>
              ) : products.length > 0 ? (
                products.map((prod) => (
                  <button
                    key={prod.id}
                    onClick={() => {
                      navigate(`/products/${prod.id}`);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-brand/10 hover:text-brand transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-9 h-9 object-cover rounded-lg border border-border"
                      />
                      <div>
                        <p className="text-xs font-bold text-content-primary group-hover:text-brand">{prod.name}</p>
                        <p className="text-[10px] text-content-muted">{prod.categoryName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-brand">{formatCurrency(prod.price)}</span>
                      <ArrowRight className="w-4 h-4 text-content-muted group-hover:text-brand" />
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-4 text-xs text-content-muted text-center">No products matching "{query}"</div>
              )}
            </div>
          )}

          {/* Navigation Section */}
          <div className="p-2 space-y-1">
            <div className="px-3 py-1 text-[10px] font-extrabold uppercase text-content-muted tracking-wider">
              Quick Navigation
            </div>
            {navActions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectNav(item.route)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-surface-hover transition-colors text-left text-xs font-medium text-content-primary cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-surface border border-border text-content-muted group-hover:text-brand group-hover:border-brand/40">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-content-muted group-hover:text-brand" />
                </button>
              );
            })}
          </div>

          {/* System & Quick Actions Section */}
          <div className="p-2 space-y-1">
            <div className="px-3 py-1 text-[10px] font-extrabold uppercase text-content-muted tracking-wider">
              System Actions
            </div>
            {quickActions.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-surface-hover transition-colors text-left text-xs font-medium text-content-primary cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-surface border border-border text-content-muted group-hover:text-brand group-hover:border-brand/40">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.title}</span>
                  </div>
                  <kbd className="text-[10px] font-mono text-content-muted">EXECUTE</kbd>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 bg-surface-hover/50 border-t border-border/80 flex items-center justify-between text-[11px] text-content-muted">
          <span>CommerceHub Command Center</span>
          <div className="flex items-center gap-2">
            <span>
              Use <kbd className="font-bold">↑</kbd> <kbd className="font-bold">↓</kbd> to navigate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
