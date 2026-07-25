export interface ProductItem {
  id: number;
  name: string;
  sku: string;
  category: string;
  categoryId: number;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stockQuantity: number;
  imageUrl: string;
  description: string;
  specifications: Record<string, string>;
  isFeatured?: boolean;
}

export const PRODUCT_CATALOG: ProductItem[] = [
  {
    id: 101,
    name: 'Acoustic Pro Active Noise Cancelling Headphones',
    sku: 'TECH-HEAD-001',
    category: 'Audio & Electronics',
    categoryId: 1,
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.8,
    reviewCount: 142,
    stockQuantity: 45,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    description: 'Industry-leading Active Noise Cancellation with dual acoustic sensors. Delivers pristine 24-bit high-resolution audio, custom equalizer tuning, and up to 40 hours of continuous battery life.',
    specifications: {
      'Driver Size': '40mm Neodymium',
      'Battery Life': '40 Hours (ANC On)',
      'Connectivity': 'Bluetooth 5.3 & 3.5mm Aux',
      'Weight': '250g',
      'Warranty': '2-Year Enterprise Global',
    },
  },
  {
    id: 102,
    name: 'Ultra Slim OLED Mechanical Keyboard',
    sku: 'TECH-KEYB-002',
    category: 'Computers & Accessories',
    categoryId: 2,
    price: 189.50,
    originalPrice: 219.00,
    rating: 4.9,
    reviewCount: 89,
    stockQuantity: 28,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    description: 'Precision aircraft-grade aluminum alloy top plate with low-profile hot-swappable tactile mechanical switches and per-key RGB backlighting.',
    specifications: {
      'Switch Type': 'Hot-swappable Tactile Brown',
      'Layout': '75% Compact Keybed',
      'Connection': 'Tri-mode (2.4GHz / BT 5.1 / Type-C)',
      'Backlight': 'RGB 16.8M Colors',
    },
  },
  {
    id: 103,
    name: 'Ergonomic Executive Mesh Office Chair',
    sku: 'FURN-CHAIR-003',
    category: 'Furniture & Workstation',
    categoryId: 3,
    price: 450.00,
    originalPrice: 520.00,
    rating: 4.7,
    reviewCount: 64,
    stockQuantity: 12,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1580481072645-022f9a6d8310?w=800&q=80',
    description: 'Self-adjusting lumbar support system with breathable Korean mesh matrix and 4D adjustable armrests designed for 12+ hour ergonomic comfort.',
    specifications: {
      'Max Capacity': '150 kg (330 lbs)',
      'Lumbar Support': 'Dynamic Adaptive Flex',
      'Recline Angle': '90° to 135° Lockable',
    },
  },
  {
    id: 104,
    name: 'Smart 4K Ultra-HD Laser Projector',
    sku: 'TECH-PROJ-004',
    category: 'Audio & Electronics',
    categoryId: 1,
    price: 899.00,
    rating: 4.6,
    reviewCount: 37,
    stockQuantity: 18,
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    description: 'Ultra short-throw 4K laser projector broadcasting up to 150-inch cinema display with HDR10+ and integrated Harman Kardon stereo soundbar.',
    specifications: {
      'Resolution': '3840 x 2160 4K UHD',
      'Brightness': '2500 ANSI Lumens',
      'Audio': 'Dual 15W Speakers',
    },
  },
  {
    id: 105,
    name: 'Modular Minimalist Waterproof Backpack',
    sku: 'BAG-MOD-005',
    category: 'Apparel & Bags',
    categoryId: 4,
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.8,
    reviewCount: 210,
    stockQuantity: 60,
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    description: 'Made from 100% recycled Cordura fabric with magnetic Fidlock closures, TSA laptop compartment, and integrated power bank passthrough.',
    specifications: {
      'Capacity': '25L (Expandable to 32L)',
      'Laptop Fit': 'Up to 16-inch MacBook Pro',
      'Waterproof Rating': 'IPX6 Sealed Zippers',
    },
  },
  {
    id: 106,
    name: 'Titanium Smart Health & Fitness Watch',
    sku: 'TECH-SMART-006',
    category: 'Audio & Electronics',
    categoryId: 1,
    price: 349.00,
    rating: 4.9,
    reviewCount: 175,
    stockQuantity: 32,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    description: 'Grade-5 titanium casing with sapphire crystal glass, continuous ECG biometric monitoring, dual-frequency GPS, and 14-day battery reserve.',
    specifications: {
      'Water Resistance': '100m (10 ATM)',
      'Display': '1.4" AMOLED 1000 nits',
      'Sensors': 'ECG, SpO2, Temperature, Heart Rate',
    },
  },
];
