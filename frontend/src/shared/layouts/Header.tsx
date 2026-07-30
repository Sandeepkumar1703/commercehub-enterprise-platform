import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, Search, User, LogOut, ShieldAlert, Store, X, Camera, Command, Sparkles } from 'lucide-react';
import { ThemeToggle } from '../../shared/components/ThemeToggle';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { toggleCartDrawer } from '../../features/cart/cartSlice';
import { logout } from '../../features/auth/authSlice';
import { useDebounce } from '../../core/hooks/useDebounce';
import { productApi } from '../../features/product/product.api';
import { Product } from '../../types';
import { formatCurrency } from '../../core/utils/formatters';
import { CommandPalette } from '../components/CommandPalette';
import { VisualSearchModal } from '../../features/product/components/VisualSearchModal';
import { useFlyToCart } from '../components/FlyToCart';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { cart } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const { isCartPulsing } = useFlyToCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isVisualSearchOpen, setIsVisualSearchOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const trendingKeywords = ['Mechanical Keyboard', 'Wireless Headphones', 'Smart Watch', 'Leather Wallet', 'USB-C Hub'];

  useEffect(() => {
    if (debouncedSearch.trim().length > 1) {
      setIsSearching(true);
      productApi
        .searchProducts(debouncedSearch)
        .then((res) => {
          setSearchResults(res);
          setShowSearchDropdown(true);
        })
        .catch(() => setSearchResults([]))
        .finally(() => setIsSearching(false));
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  }, [debouncedSearch]);

  const totalCartCount = cart?.items.reduce((sum, i) => sum + i.quantity, 0) || 0;
  const isAdmin = user?.roles?.some((r) => r.name === 'ROLE_ADMIN');

  const handleLogout = () => {
    dispatch(logout());
    setShowUserDropdown(false);
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-border/50 transition-all">
        {/* Top Banner Notice */}
        <div className="bg-gradient-to-r from-[#22223B] via-[#4A4E69] to-[#22223B] text-[#F2E9E4] text-xs font-semibold py-1.5 px-4 text-center shadow-sm border-b border-white/10">
          ⚡ Enterprise Summer Sale: Use code <span className="underline font-extrabold text-[#C9ADA7]">WELCOME10</span> for 10% off orders over $50! Free worldwide shipping on orders over $100.
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-content-primary hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-xl bg-brand text-brand-foreground flex items-center justify-center font-black text-lg shadow-sm">
              C
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-content-primary leading-none">
                Commerce<span className="text-brand">Hub</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-content-muted tracking-widest">Enterprise</span>
            </div>
          </Link>

          {/* Real-time Search Input & Cmd+K Trigger */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-content-muted" />
              <input
                type="text"
                placeholder="Search products, categories, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchDropdown(true)}
                className="w-full pl-10 pr-20 py-2 bg-surface-hover/70 border border-border rounded-full text-xs text-content-primary placeholder:text-content-muted focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all"
              />

              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                {/* Visual Search Button */}
                <button
                  type="button"
                  onClick={() => setIsVisualSearchOpen(true)}
                  className="p-1 rounded-full text-content-muted hover:text-brand hover:bg-surface transition-colors cursor-pointer"
                  title="Search by uploading an image"
                >
                  <Camera className="w-3.5 h-3.5" />
                </button>

                {/* Cmd + K Command Palette Badge */}
                <button
                  type="button"
                  onClick={() => setIsCommandPaletteOpen(true)}
                  className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface border border-border text-[10px] font-mono font-bold text-content-muted hover:border-brand/40 hover:text-brand transition-colors cursor-pointer"
                  title="Open Command Center (Cmd + K)"
                >
                  <Command className="w-3 h-3" />
                  <span>K</span>
                </button>

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="p-1 text-content-muted hover:text-content-primary"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Search Dropdown Modal */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border/80 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-border/60">
                {isSearching ? (
                  <div className="p-4 text-xs text-content-muted text-center animate-pulse flex items-center justify-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand animate-spin" />
                    <span>Searching catalog...</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="max-h-80 overflow-y-auto divide-y divide-border/50">
                    {searchResults.map((prod) => (
                      <Link
                        key={prod.id}
                        to={`/products/${prod.id}`}
                        onClick={() => setShowSearchDropdown(false)}
                        className="flex items-center gap-3 p-3 hover:bg-surface-hover transition-colors"
                      >
                        <img
                          src={prod.imageUrl}
                          alt={prod.name}
                          className="w-10 h-10 object-cover rounded-lg border border-border"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-content-primary truncate">{prod.name}</p>
                          <p className="text-[10px] text-content-muted">{prod.categoryName}</p>
                        </div>
                        <span className="text-xs font-bold text-brand">{formatCurrency(prod.price)}</span>
                      </Link>
                    ))}
                  </div>
                ) : searchQuery.trim().length > 1 ? (
                  <div className="p-4 text-xs text-content-muted text-center">No products found for "{searchQuery}"</div>
                ) : (
                  <div className="p-3 space-y-2">
                    <div className="text-[10px] font-extrabold uppercase text-content-muted tracking-wider">
                      Trending Searches
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {trendingKeywords.map((kw) => (
                        <button
                          key={kw}
                          onClick={() => setSearchQuery(kw)}
                          className="px-2.5 py-1 bg-surface-hover border border-border/60 rounded-full text-[11px] font-medium text-content-secondary hover:text-brand hover:border-brand/40 transition-colors"
                        >
                          {kw}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Nav Links & Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle />

            <Link
              to="/products"
              className="hidden sm:flex items-center gap-1 px-3 py-2 text-xs font-semibold text-content-secondary hover:text-brand rounded-lg hover:bg-surface-hover transition-colors"
            >
              <Store className="w-4 h-4" />
              <span>Catalog</span>
            </Link>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-content-secondary hover:text-brand rounded-lg hover:bg-surface-hover transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-status-danger text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              id="header-cart-icon"
              onClick={() => dispatch(toggleCartDrawer(true))}
              className={`relative p-2 text-content-secondary hover:text-brand rounded-lg hover:bg-surface-hover transition-all cursor-pointer ${
                isCartPulsing ? 'animate-cart-pulse text-brand ring-2 ring-brand/50 bg-brand/10' : ''
              }`}
              title="Cart Drawer"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand text-brand-foreground text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Account / Login */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 border border-border/80 rounded-full bg-surface/80 hover:bg-surface-hover hover:border-brand/40 transition-all cursor-pointer shadow-sm"
                >
                  <div className="w-7 h-7 rounded-full bg-brand text-brand-foreground font-extrabold text-xs flex items-center justify-center shadow-xs">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </div>
                  <span className="hidden md:inline-block text-xs font-bold text-content-primary max-w-[100px] truncate">
                    {user.firstName}
                  </span>
                </button>

                {showUserDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserDropdown(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-60 bg-surface/95 backdrop-blur-xl border border-border/80 rounded-2xl shadow-2xl py-2 z-50 divide-y divide-border/60 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="px-4 py-3">
                        <p className="text-xs font-black text-content-primary">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-[10px] text-content-muted truncate mt-0.5">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/profile"
                          onClick={() => setShowUserDropdown(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-content-primary hover:bg-surface-hover hover:text-brand transition-colors"
                        >
                          <User className="w-4 h-4 text-content-muted" />
                          <span>My Dashboard & Addresses</span>
                        </Link>

                        <Link
                          to="/orders"
                          onClick={() => setShowUserDropdown(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-content-primary hover:bg-surface-hover hover:text-brand transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4 text-content-muted" />
                          <span>My Orders & History</span>
                        </Link>
                      </div>

                      {isAdmin && (
                        <div className="py-1">
                          <Link
                            to="/admin/dashboard"
                            onClick={() => setShowUserDropdown(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-brand hover:bg-brand/10 transition-colors"
                          >
                            <ShieldAlert className="w-4 h-4 text-brand" />
                            <span>Admin Management Suite</span>
                          </Link>
                        </div>
                      )}

                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-status-danger hover:bg-status-danger/10 transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand text-brand-foreground font-semibold text-xs rounded-lg hover:bg-brand-hover transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Overlays */}
      <CommandPalette isOpen={isCommandPaletteOpen} onClose={() => setIsCommandPaletteOpen(false)} />
      <VisualSearchModal isOpen={isVisualSearchOpen} onClose={() => setIsVisualSearchOpen(false)} />
    </>
  );
};

