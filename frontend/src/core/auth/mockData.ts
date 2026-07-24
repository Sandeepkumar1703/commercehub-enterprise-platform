import { Product, Order, Seller, AuditLog, Review, PayoutTransaction, User } from '../../shared/types';

export const INITIAL_USERS: User[] = [
  { id: 'usr_1', name: 'Alex Morgan', email: 'alex.m@commercehub.io', role: 'super_admin', status: 'active', lastActive: 'Just now' },
  { id: 'usr_2', name: 'Devon Lane', email: 'devon.l@commercehub.io', role: 'ops_manager', status: 'active', lastActive: '12 mins ago' },
  { id: 'usr_3', name: 'Courtney Henry', email: 'courtney.h@commercehub.io', role: 'auditor', status: 'suspended', lastActive: '2 days ago' },
  { id: 'usr_4', name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'customer', status: 'active', lastActive: '1 hour ago' },
  { id: 'usr_5', name: 'TechGear Official', email: 'merchant@techgear.com', role: 'seller', status: 'active', lastActive: '5 mins ago' }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'PRD-8021',
    title: 'AeroPulse Wireless Noise-Canceling Headphones',
    subtitle: 'High-Fidelity Audio with 40-Hour Battery Life & Adaptive ANC',
    brand: 'AeroPulse',
    category: 'Electronics',
    price: 199.00,
    originalPrice: 249.00,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 324,
    inStock: true,
    stockQuantity: 42,
    sku: 'AP-ANC-01',
    description: 'Experience pure acoustic clarity with state-of-the-art hybrid noise cancellation, dual custom 40mm beryllium drivers, and ultra-comfortable memory foam ear cushions designed for long listening sessions.',
    specs: {
      'Driver Size': '40mm Beryllium',
      'Battery Life': 'Up to 40 Hours',
      'Connectivity': 'Bluetooth 5.3 & 3.5mm Aux',
      'Weight': '250g',
      'ANC Modes': 'Adaptive, Transparency, Off'
    },
    materials: ['Recycled Aluminum Housing', 'Protein Leather Ear Cushions', 'Braided Cable'],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'sel_1',
    sellerName: 'TechGear Official',
    status: 'published',
    createdAt: '2026-06-15',
    tags: ['Best Seller', 'Wireless', 'Audio']
  },
  {
    id: 'PRD-8022',
    title: 'Chronos Smart Watch Pro Series',
    subtitle: 'Sapphire Glass, Titanium Casing, BioSensor V3 & Multi-Day GPS',
    brand: 'Chronos',
    category: 'Wearables',
    price: 349.00,
    originalPrice: 399.00,
    discountPercentage: 12,
    rating: 4.7,
    reviewCount: 189,
    inStock: true,
    stockQuantity: 18,
    sku: 'CH-SW-PRO',
    description: 'Designed for high performance and daily elegance. Track HRV, ECG, VO2 max, sleep stages, and multi-sport GPS routes with an always-on AMOLED display.',
    specs: {
      'Display': '1.4" AMOLED 454x454',
      'Water Resistance': '5 ATM / 50 meters',
      'Sensors': 'Optical Heart Rate, SpO2, ECG, Barometer',
      'Battery': '7 Days Typical Usage'
    },
    materials: ['Titanium Grade 5', 'Sapphire Crystal Screen', 'Fluoroelastomer Strap'],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'sel_1',
    sellerName: 'TechGear Official',
    status: 'published',
    createdAt: '2026-06-20',
    tags: ['Smartwatch', 'Fitness', 'Titanium']
  },
  {
    id: 'PRD-8023',
    title: 'Minimalist Ergonomic Mechanical Keyboard',
    subtitle: 'Hot-swappable Switches, CNC Anodized Aluminum Base, PBT Keycaps',
    brand: 'Keycraft',
    category: 'Computer Peripherals',
    price: 129.50,
    originalPrice: 150.00,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 412,
    inStock: true,
    stockQuantity: 4, // low stock!
    sku: 'KC-75-PRO',
    description: 'Precision typing engineered for developers and creators. Pre-lubed linear switches, gasket mount design, and customizable RGB per-key lighting.',
    specs: {
      'Layout': '75% Compact',
      'Switches': 'Gateron Oil King Linear',
      'Keycaps': 'Double-shot PBT Cherry Profile',
      'Connectivity': 'USB-C / 2.4GHz / Bluetooth 5.1'
    },
    materials: ['6063 Aluminum Chassis', 'FR4 Plate', 'Poron Gasket Dampeners'],
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'sel_1',
    sellerName: 'TechGear Official',
    status: 'low_stock',
    createdAt: '2026-07-01',
    tags: ['Mechanical Keyboard', 'Developer', 'Ergonomic']
  },
  {
    id: 'PRD-8024',
    title: 'Lumina Portable OLED Projector 4K',
    subtitle: 'HDR10+, Built-in Harman Kardon Speakers & Auto-Keystone Correction',
    brand: 'Lumina',
    category: 'Home Theater',
    price: 699.00,
    originalPrice: 799.00,
    discountPercentage: 12,
    rating: 4.6,
    reviewCount: 88,
    inStock: true,
    stockQuantity: 15,
    sku: 'LUM-4K-PRO',
    description: 'Transform any wall into a 150-inch cinematic experience. Intelligent obstacle avoidance and auto-focus yield crystal clear images instantly.',
    specs: {
      'Resolution': 'Native 4K UHD',
      'Brightness': '2200 ANSI Lumens',
      'Audio': 'Dual 12W Harman Kardon Speakers',
      'OS': 'Android TV 11.0'
    },
    materials: ['ABS Polymer', 'Aluminum Mesh', 'Coated Optical Lens'],
    images: [
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'sel_2',
    sellerName: 'Lumina Vision',
    status: 'published',
    createdAt: '2026-07-05',
    tags: ['4K', 'Projector', 'Home Cinema']
  },
  {
    id: 'PRD-8025',
    title: 'TitanBook Ultra 16 M3 Max Laptop',
    subtitle: '36GB Unified Memory, 1TB NVMe SSD, Liquid Retina XDR 120Hz Display',
    brand: 'TitanBook',
    category: 'Laptops',
    price: 2499.00,
    originalPrice: 2799.00,
    discountPercentage: 10,
    rating: 4.9,
    reviewCount: 512,
    inStock: true,
    stockQuantity: 28,
    sku: 'TB-ULTRA-16',
    description: 'The ultimate workstation for software engineers, 3D artists, and video editors. Features 22-hour battery life and fanless silence under everyday workloads.',
    specs: {
      'Processor': '16-core CPU / 40-core GPU',
      'Display': '16.2" Liquid Retina XDR',
      'RAM': '36GB Unified Memory',
      'Storage': '1TB PCIe 4.0 SSD'
    },
    materials: ['Unibody Recycled Aluminum', 'MagSafe 3 Braided Cable'],
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    sellerId: 'sel_1',
    sellerName: 'TechGear Official',
    status: 'published',
    createdAt: '2026-07-08',
    tags: ['Laptop', 'Workstation', 'Creator']
  },
  {
    id: 'PRD-8026',
    title: 'Apex Pro Wireless Studio Monitors (Pair)',
    subtitle: 'Bi-amplified Active Reference Speakers with DSP Room Correction',
    brand: 'Apex Audio',
    category: 'Audio',
    price: 899.00,
    originalPrice: 999.00,
    discountPercentage: 10,
    rating: 4.8,
    reviewCount: 145,
    inStock: true,
    stockQuantity: 12,
    sku: 'APX-MON-8',
    description: 'Precision studio acoustic monitors delivering ultra-flat frequency response from 35Hz to 24kHz. Includes XLR, TRS, and lossless Wi-Fi audio streaming.',
    specs: {
      'Woofer': '8" Kevlar Composite',
      'Tweeter': '1" Silk Dome',
      'Power': '200W Class-D RMS',
      'Frequency Response': '35Hz - 24kHz'
    },
    materials: ['MDF Cabinet with Vinyl Wrap', 'Kevlar Cone'],
    images: ['https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'],
    sellerId: 'sel_1',
    sellerName: 'TechGear Official',
    status: 'published',
    createdAt: '2026-07-10',
    tags: ['Studio', 'Speakers', 'Audio']
  },
  {
    id: 'PRD-8027',
    title: 'Prism 4K Cinema Mirrorless Camera',
    subtitle: '35.4MP Full-Frame Sensor, 10-Bit 4:2:2 Internal Recording & 5-Axis IBIS',
    brand: 'Prism Vision',
    category: 'Cameras',
    price: 1899.00,
    originalPrice: 2199.00,
    discountPercentage: 13,
    rating: 4.9,
    reviewCount: 204,
    inStock: true,
    stockQuantity: 9,
    sku: 'PRISM-CAM-4K',
    description: 'Engineered for filmmakers and high-resolution photographers. Real-time AI eye autofocus tracking with Dual Native ISO technology for low-light mastery.',
    specs: {
      'Sensor': '35.4MP Full-Frame CMOS',
      'Video': '4K 120fps / 8K 30fps RAW',
      'Autofocus': '759 Hybrid Phase Detection Points',
      'Stabilization': '5-Axis In-Body Image Stabilization'
    },
    materials: ['Magnesium Alloy Weather-sealed Chassis'],
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
    sellerId: 'sel_2',
    sellerName: 'Lumina Vision',
    status: 'published',
    createdAt: '2026-07-12',
    tags: ['Camera', '4K', 'Photography']
  },
  {
    id: 'PRD-8028',
    title: 'EvoGlide Ergonomic Mesh Office Chair',
    subtitle: '3D Lumbar Support, 4D Armrests, Breathable Italian Mesh',
    brand: 'EvoForm',
    category: 'Furniture',
    price: 499.00,
    originalPrice: 599.00,
    discountPercentage: 16,
    rating: 4.7,
    reviewCount: 310,
    inStock: true,
    stockQuantity: 22,
    sku: 'EVO-CHAIR-01',
    description: 'Designed in Switzerland to eliminate lower back fatigue during long desk sessions. Fully adjustable synchro-tilt mechanism and aluminum base.',
    specs: {
      'Weight Capacity': '350 lbs',
      'Recline Angle': '90° to 135°',
      'Base': 'Heavy-duty Polished Aluminum',
      'Casters': '65mm Soft Polyurethane Wheels'
    },
    materials: ['Italian Elastomeric Mesh', 'Polished Aluminum Alloy'],
    images: ['https://images.unsplash.com/photo-1580481072645-022f9a6d83d0?auto=format&fit=crop&w=800&q=80'],
    sellerId: 'sel_1',
    sellerName: 'TechGear Official',
    status: 'published',
    createdAt: '2026-07-14',
    tags: ['Furniture', 'Ergonomic', 'Office']
  },
  {
    id: 'PRD-8029',
    title: 'AromaCraft Precision Espresso Machine',
    subtitle: '19-Bar Italian Pump, PID Temperature Control & Integrated Conical Burr Grinder',
    brand: 'AromaCraft',
    category: 'Appliances',
    price: 749.00,
    originalPrice: 849.00,
    discountPercentage: 11,
    rating: 4.8,
    reviewCount: 265,
    inStock: true,
    stockQuantity: 14,
    sku: 'AC-ESP-500',
    description: 'Barista-quality espresso at home. Dual boilers allow simultaneous coffee extraction and powerful microfoam milk steaming.',
    specs: {
      'Pump Pressure': '19-Bar Italian Made',
      'Water Tank': '2.8L Removable Reservoir',
      'Grinder': '30 Precision Grind Settings',
      'Boiler': 'Dual Stainless Steel ThermoCoil'
    },
    materials: ['Brushed 304 Stainless Steel', 'Brass Portafilter'],
    images: ['https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=800&q=80'],
    sellerId: 'sel_2',
    sellerName: 'Lumina Vision',
    status: 'published',
    createdAt: '2026-07-15',
    tags: ['Coffee', 'Espresso', 'Appliance']
  },
  {
    id: 'PRD-8030',
    title: 'NovaCharge 150W GaN Fast Wall Charger',
    subtitle: '4 USB-C PD 3.1 Ports, Compact Foldable Plug & Smart Temperature Guard',
    brand: 'NovaCharge',
    category: 'Electronics',
    price: 79.99,
    originalPrice: 99.99,
    discountPercentage: 20,
    rating: 4.9,
    reviewCount: 620,
    inStock: true,
    stockQuantity: 85,
    sku: 'NC-GAN-150',
    description: 'Charge 4 devices simultaneously including 2 laptops at full speed. Gallium Nitride technology reduces size by 45% while operating cool.',
    specs: {
      'Total Output': '150W Max',
      'Ports': '3x USB-C PD, 1x USB-A QC 4.0',
      'Input Voltage': '100-240V Universal Travel'
    },
    materials: ['Fire-retardant Polycarbonate'],
    images: ['https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80'],
    sellerId: 'sel_1',
    sellerName: 'TechGear Official',
    status: 'published',
    createdAt: '2026-07-16',
    tags: ['Charger', 'GaN', 'Accessories']
  },
  {
    id: 'PRD-8031',
    title: 'QuantumGrip Wireless Gaming Mouse',
    subtitle: '30,000 DPI Optical Sensor, 49g Ultra-lightweight, 8K Hz Polling Rate',
    brand: 'Quantum',
    category: 'Computer Peripherals',
    price: 119.00,
    originalPrice: 139.00,
    discountPercentage: 14,
    rating: 4.8,
    reviewCount: 198,
    inStock: true,
    stockQuantity: 30,
    sku: 'QM-MO-8K',
    description: 'Designed with esports pros. Zero motion latency, optical switches rated for 90 million clicks, and pure PTFE skates.',
    specs: {
      'Sensor': 'Focus Pro 30K Optical',
      'Weight': '49 grams',
      'Battery Life': 'Up to 90 Hours'
    },
    materials: ['Honeycomb Plastic Shell', '100% PTFE Skates'],
    images: ['https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80'],
    sellerId: 'sel_1',
    sellerName: 'TechGear Official',
    status: 'published',
    createdAt: '2026-07-18',
    tags: ['Gaming', 'Mouse', 'Peripherals']
  },
  {
    id: 'PRD-8032',
    title: 'SolarPulse 1000W Portable Power Station',
    subtitle: '1024Wh LiFePO4 Battery, 12 Output Ports, 800W Solar Input',
    brand: 'SolarPulse',
    category: 'Electronics',
    price: 899.00,
    originalPrice: 1099.00,
    discountPercentage: 18,
    rating: 4.9,
    reviewCount: 175,
    inStock: true,
    stockQuantity: 10,
    sku: 'SP-BAT-1000',
    description: 'Power your outdoor adventures or home emergency backups. Recharges from 0 to 80% in just 50 minutes via wall outlet.',
    specs: {
      'Capacity': '1024Wh (320,000mAh)',
      'AC Output': '1800W Pure Sine Wave (2700W Surge)',
      'Cycle Life': '3000+ Cycles to 80%'
    },
    materials: ['Impact-resistant ABS', 'Heavy-duty Handles'],
    images: ['https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80'],
    sellerId: 'sel_2',
    sellerName: 'Lumina Vision',
    status: 'published',
    createdAt: '2026-07-19',
    tags: ['Power', 'Solar', 'Outdoor']
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-9482',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.j@example.com',
    shippingAddress: {
      fullName: 'Sarah Jenkins',
      street: '742 Evergreen Terrace',
      city: 'Springfield',
      state: 'OR',
      zip: '97477',
      country: 'United States'
    },
    items: [
      {
        productId: 'PRD-8021',
        title: 'AeroPulse Wireless Noise-Canceling Headphones',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        price: 199.00,
        quantity: 1,
        selectedColor: 'Midnight Black'
      }
    ],
    totalAmount: 199.00,
    taxAmount: 15.92,
    shippingFee: 0.00,
    paymentMethod: 'Credit Card (•••• 4242)',
    paymentStatus: 'paid',
    status: 'processing',
    trackingNumber: 'TRK-9920148',
    carrier: 'FedEx Express',
    createdAt: '2026-07-23T14:22:00Z',
    estimatedDelivery: 'Jul 26, 2026'
  },
  {
    id: 'ORD-9481',
    customerName: 'Michael Chang',
    customerEmail: 'm.chang@example.com',
    shippingAddress: {
      fullName: 'Michael Chang',
      street: '120 Market Street Suite 400',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
      country: 'United States'
    },
    items: [
      {
        productId: 'PRD-8023',
        title: 'Minimalist Ergonomic Mechanical Keyboard',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
        price: 129.50,
        quantity: 2
      }
    ],
    totalAmount: 259.00,
    taxAmount: 22.01,
    shippingFee: 12.00,
    paymentMethod: 'Apple Pay',
    paymentStatus: 'paid',
    status: 'shipped',
    trackingNumber: 'TRK-8810293',
    carrier: 'UPS Ground',
    createdAt: '2026-07-22T09:15:00Z',
    estimatedDelivery: 'Jul 25, 2026'
  },
  {
    id: 'ORD-9480',
    customerName: 'Emily Vance',
    customerEmail: 'e.vance@example.com',
    shippingAddress: {
      fullName: 'Emily Vance',
      street: '88 Boston Post Rd',
      city: 'Boston',
      state: 'MA',
      zip: '02108',
      country: 'United States'
    },
    items: [
      {
        productId: 'PRD-8022',
        title: 'Chronos Smart Watch Pro Series',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
        price: 349.00,
        quantity: 1,
        selectedColor: 'Titanium Slate'
      }
    ],
    totalAmount: 349.00,
    taxAmount: 27.92,
    shippingFee: 0.00,
    paymentMethod: 'PayPal',
    paymentStatus: 'paid',
    status: 'delivered',
    trackingNumber: 'TRK-7719203',
    carrier: 'USPS Priority',
    createdAt: '2026-07-20T11:00:00Z',
    estimatedDelivery: 'Jul 23, 2026'
  }
];

export const MOCK_SELLERS: Seller[] = [
  {
    id: 'sel_1',
    storeName: 'TechGear Official',
    ownerName: 'Alex Rivera',
    email: 'merchant@techgear.com',
    rating: 4.9,
    grossRevenue: 48290.00,
    availableBalance: 4280.50,
    pendingBalance: 1120.00,
    activeOrdersCount: 142,
    status: 'verified',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    joinedDate: '2025-11-10'
  },
  {
    id: 'sel_2',
    storeName: 'Lumina Vision',
    ownerName: 'David Zhang',
    email: 'david@luminavision.com',
    rating: 4.6,
    grossRevenue: 28900.00,
    availableBalance: 2450.00,
    pendingBalance: 800.00,
    activeOrdersCount: 38,
    status: 'verified',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    joinedDate: '2026-01-15'
  }
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-1009',
    timestamp: '2026-07-23T19:42:11Z',
    actorId: 'usr_1',
    actorName: 'Alex Morgan',
    actorRole: 'super_admin',
    ipAddress: '192.168.1.104',
    geoLocation: 'San Francisco, CA, US',
    actionType: 'UPDATE',
    targetEntity: 'Merchant Status',
    targetId: 'sel_1',
    beforeState: { status: 'pending', verifiedByAdmin: false },
    afterState: { status: 'verified', verifiedByAdmin: true }
  },
  {
    id: 'LOG-1008',
    timestamp: '2026-07-23T18:15:02Z',
    actorId: 'usr_2',
    actorName: 'Devon Lane',
    actorRole: 'ops_manager',
    ipAddress: '10.0.4.12',
    geoLocation: 'New York, NY, US',
    actionType: 'REFUND',
    targetEntity: 'Order Authorization',
    targetId: 'ORD-9475',
    beforeState: { paymentStatus: 'paid', refundedAmount: 0 },
    afterState: { paymentStatus: 'refunded', refundedAmount: 199.00 }
  },
  {
    id: 'LOG-1007',
    timestamp: '2026-07-23T15:00:00Z',
    actorId: 'usr_3',
    actorName: 'Courtney Henry',
    actorRole: 'auditor',
    ipAddress: '172.16.0.8',
    geoLocation: 'Austin, TX, US',
    actionType: 'LOGIN',
    targetEntity: 'System Session',
    targetId: 'sess_88201',
    beforeState: {},
    afterState: { authMethod: '2FA_TOTP', ip: '172.16.0.8' }
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    author: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: 'Jul 18, 2026',
    comment: 'The noise cancellation is astonishingly good on plane flights! Battery lasted through my entire trip from NY to Tokyo with 30% remaining.',
    helpfulCount: 42,
    verifiedPurchase: true
  },
  {
    id: 'rev_2',
    author: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    rating: 5,
    date: 'Jul 12, 2026',
    comment: 'Comfortable ear cups that don’t press against glasses. Microphones isolate voice well during Zoom calls.',
    helpfulCount: 19,
    verifiedPurchase: true
  }
];

export const MOCK_PAYOUTS: PayoutTransaction[] = [
  {
    id: 'PAY-8821',
    date: 'Jul 21, 2026',
    amount: 3250.00,
    status: 'completed',
    bankAccount: 'Chase Business Premier (•••• 8829)',
    commissionDeduction: 487.50,
    shippingDeduction: 120.00,
    netPayout: 2642.50
  },
  {
    id: 'PAY-8820',
    date: 'Jul 14, 2026',
    amount: 2800.00,
    status: 'completed',
    bankAccount: 'Chase Business Premier (•••• 8829)',
    commissionDeduction: 420.00,
    shippingDeduction: 95.00,
    netPayout: 2285.00
  }
];
