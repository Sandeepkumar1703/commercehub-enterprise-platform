import React, { useState } from 'react';
import { ShoppingBag, ArrowRight, Trash2, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';
import { VynkLogo } from '../brand/VynkLogo';

export interface VynkProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
  desc: string;
}

export interface VynkCartItem extends VynkProduct {
  quantity: number;
}

const PRODUCTS: VynkProduct[] = [];

export const VynkStore: React.FC = () => {
  const [cart, setCart] = useState<VynkCartItem[]>([]);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  // Cart operations
  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextQty = item.quantity + delta;
          return nextQty > 0 ? { ...item, quantity: nextQty } : item;
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const addToCart = (product: VynkProduct) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Financial Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 || subtotal === 0 ? 0 : 150;
  const total = subtotal + shipping;

  if (orderPlaced) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 bg-[#FAFAFA] dark:bg-[#0E1116] transition-colors duration-200">
        <div className="bg-white dark:bg-[#1A1F26] border border-[#E9ECEF] dark:border-[#2D3540] p-8 rounded-2xl max-w-md w-full text-center shadow-[0_4px_30px_rgba(17,17,17,0.02)]">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-[#D97746] dark:text-[#E08253]" />
          </div>
          <VynkLogo size="sm" iconOnly className="mx-auto mb-2" />
          <h2 className="text-2xl font-extrabold text-[#111317] dark:text-[#F3F4F6] tracking-tight">
            Order Confirmed!
          </h2>
          <p className="text-[#5A626A] dark:text-[#9CA3AF] mt-2 mb-6 text-sm">
            Thank you for shopping with Vynk. Your premium package is being prepared for secure delivery.
          </p>
          <button
            onClick={() => {
              setCart([]);
              setOrderPlaced(false);
            }}
            className="w-full bg-[#D97746] dark:bg-[#E08253] hover:bg-[#C26233] dark:hover:bg-[#F0986C] text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0E1116] py-10 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-[#111317] to-[#1A1F26] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#2D3540]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <VynkLogo size="sm" showTagline={false} />
              <span className="text-xs bg-[#D97746] text-white font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
                Curated
              </span>
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">Curated Essentials Store</h1>
            <p className="text-xs text-[#9CA3AF] mt-1">Frictionless checkout, fast delivery, and high-speed commerce performance.</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#E08253]" />
              <span>Insured Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#E08253]" />
              <span>Express Shipping</span>
            </div>
          </div>
        </div>

        {/* Layout split: 2 Cols on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: Product Catalog Grid (Takes 2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-black tracking-tight text-[#111317] dark:text-[#F3F4F6]">
              Featured Products
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {PRODUCTS.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-[#1A1F26] border border-[#E9ECEF] dark:border-[#2D3540] rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(17,17,17,0.01)] flex flex-col justify-between hover:border-[#D97746] dark:hover:border-[#E08253] transition-colors"
                >
                  <div>
                    <div className="bg-[#FAFAFA] dark:bg-[#0E1116] h-48 flex items-center justify-center text-6xl select-none transition-colors border-b border-[#E9ECEF] dark:border-[#2D3540]">
                      {product.img}
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#D97746] dark:text-[#E08253]">
                        {product.category}
                      </span>
                      <h3 className="text-[#111317] dark:text-[#F3F4F6] font-bold text-lg mt-1 tracking-tight">
                        {product.name}
                      </h3>
                      <p className="text-[#5A626A] dark:text-[#9CA3AF] text-xs mt-2 line-clamp-2">
                        {product.desc}
                      </p>
                    </div>
                  </div>
                  <div className="p-5 pt-0 flex items-center justify-between mt-auto">
                    <span className="text-[#111317] dark:text-[#F3F4F6] font-extrabold text-xl">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-[#D97746] dark:bg-[#E08253] hover:bg-[#C26233] dark:hover:bg-[#F0986C] text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" /> Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Premium Interactive Checkout Card (Takes 1 Column) */}
          <div className="space-y-6">
            <h2 className="text-xl font-black tracking-tight text-[#111317] dark:text-[#F3F4F6]">
              Cart Summary
            </h2>

            <div className="bg-white dark:bg-[#1A1F26] border border-[#E9ECEF] dark:border-[#2D3540] rounded-2xl p-6 shadow-[0_4px_25px_rgba(17,17,17,0.01)] flex flex-col justify-between min-h-[450px]">
              {/* Cart Items Wrapper List */}
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-12 text-[#5A626A] dark:text-[#9CA3AF] text-sm">
                    Your cart is currently empty.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 py-3 border-b border-[#E9ECEF] dark:border-[#2D3540] last:border-0"
                    >
                      <div className="h-12 w-12 rounded-lg bg-[#FAFAFA] dark:bg-[#0E1116] flex items-center justify-center text-2xl border border-[#E9ECEF] dark:border-[#2D3540] shrink-0">
                        {item.img}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-[#111317] dark:text-[#F3F4F6] truncate tracking-tight">
                          {item.name}
                        </h4>
                        <p className="text-xs text-[#5A626A] dark:text-[#9CA3AF] mt-0.5">
                          ₹{item.price.toLocaleString('en-IN')}
                        </p>
                      </div>

                      {/* Counter Controls */}
                      <div className="flex items-center gap-2 border border-[#E9ECEF] dark:border-[#2D3540] rounded-md px-1.5 py-0.5 bg-[#FAFAFA] dark:bg-[#0E1116]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-xs font-bold text-[#5A626A] dark:text-[#9CA3AF] px-1 hover:text-[#111317] dark:hover:text-white cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold text-[#111317] dark:text-[#F3F4F6] min-w-[12px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-xs font-bold text-[#5A626A] dark:text-[#9CA3AF] px-1 hover:text-[#111317] dark:hover:text-white cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#5A626A] hover:text-red-500 dark:text-[#9CA3AF] dark:hover:text-red-400 p-1 cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Price Calculation Breakdowns */}
              <div className="border-t border-[#E9ECEF] dark:border-[#2D3540] pt-4 mt-6 space-y-2">
                <div className="flex justify-between text-xs text-[#5A626A] dark:text-[#9CA3AF]">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-[#5A626A] dark:text-[#9CA3AF]">
                  <span>Estimated Delivery</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 dark:text-green-400 font-medium">FREE</span>
                    ) : (
                      `₹${shipping}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-[#111317] dark:text-[#F3F4F6] pt-2 border-t border-[#E9ECEF] dark:border-[#2D3540]">
                  <span>Total Due</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>

                {/* Checkout CTA */}
                <button
                  disabled={cart.length === 0}
                  onClick={() => setOrderPlaced(true)}
                  className="w-full mt-4 bg-[#D97746] dark:bg-[#E08253] hover:bg-[#C26233] dark:hover:bg-[#F0986C] disabled:bg-gray-300 dark:disabled:bg-gray-800 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs text-sm cursor-pointer"
                >
                  Secure Checkout <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              {/* Security Stamps */}
              <div className="mt-4 pt-3 border-t border-[#E9ECEF] dark:border-[#2D3540] flex items-center justify-around text-[10px] text-[#5A626A] dark:text-[#9CA3AF]">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D97746] dark:text-[#E08253]" />
                  <span>Secure SSL</span>
                </div>
                <div className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-[#D97746] dark:text-[#E08253]" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VynkStore;
