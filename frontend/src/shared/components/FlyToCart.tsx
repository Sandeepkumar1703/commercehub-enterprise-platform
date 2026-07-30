import React, { createContext, useContext, useState } from 'react';

interface FlyingItem {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  imageUrl: string;
}

interface FlyToCartContextType {
  triggerFlyToCart: (event: React.MouseEvent, imageUrl: string) => void;
  isCartPulsing: boolean;
}

const FlyToCartContext = createContext<FlyToCartContextType | undefined>(undefined);

export const FlyToCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [isCartPulsing, setIsCartPulsing] = useState(false);

  const triggerFlyToCart = (event: React.MouseEvent, imageUrl: string) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    const cartIcon = document.getElementById('header-cart-icon');
    let endX = window.innerWidth - 60;
    let endY = 30;

    if (cartIcon) {
      const cartRect = cartIcon.getBoundingClientRect();
      endX = cartRect.left + cartRect.width / 2;
      endY = cartRect.top + cartRect.height / 2;
    }

    const newItem: FlyingItem = {
      id: `fly_${Date.now()}_${Math.random()}`,
      startX,
      startY,
      endX,
      endY,
      imageUrl,
    };

    setFlyingItems((prev) => [...prev, newItem]);

    // Remove flying item after animation completes and trigger cart pulse
    setTimeout(() => {
      setFlyingItems((prev) => prev.filter((i) => i.id !== newItem.id));
      setIsCartPulsing(true);
      setTimeout(() => setIsCartPulsing(false), 500);
    }, 750);
  };

  return (
    <FlyToCartContext.Provider value={{ triggerFlyToCart, isCartPulsing }}>
      {children}
      {/* Flying Elements Layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {flyingItems.map((item) => (
          <div
            key={item.id}
            className="absolute w-10 h-10 rounded-full border-2 border-brand bg-surface shadow-2xl overflow-hidden animate-fly-to-cart"
            style={{
              '--start-x': `${item.startX}px`,
              '--start-y': `${item.startY}px`,
              '--end-x': `${item.endX}px`,
              '--end-y': `${item.endY}px`,
            } as React.CSSProperties}
          >
            <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </FlyToCartContext.Provider>
  );
};

export const useFlyToCart = () => {
  const ctx = useContext(FlyToCartContext);
  if (!ctx) throw new Error('useFlyToCart must be used within FlyToCartProvider');
  return ctx;
};
