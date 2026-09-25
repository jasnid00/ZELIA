export interface ServerOrderItem {
  perfumeId: string;
  perfumeName: string;
  volume: string;
  quantity: number;
  price: number;
  image: string;
}

export interface ServerOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    address: string;
    city: string;
    pinCode: string;
    state?: string;
  };
  items: ServerOrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'upi' | 'card' | 'cod';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  trackingNumber?: string;
  notes?: string;
}

export interface ServerCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  tier: 'Gold Reserve VIP' | 'Haute Member' | 'Connoisseur' | 'Member';
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  status: 'Active' | 'Inactive';
}

export interface ServerMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Read' | 'Replied';
  reply?: string;
}

export const SEED_ORDERS: ServerOrder[] = [
  {
    id: 'ord-1001',
    orderNumber: 'ZEL-9842',
    customerName: 'Maharani Gayatri Devi',
    customerEmail: 'gayatri.devi@heritage.in',
    customerPhone: '+91 98201 44552',
    shippingAddress: {
      address: 'Suite 402, Rambagh Enclave, Civil Lines',
      city: 'Jaipur',
      pinCode: '302006',
      state: 'Rajasthan'
    },
    items: [
      {
        perfumeId: 'zelia-gold-reserve',
        perfumeName: "Lumina d'Or - Haute Réserve",
        volume: '100ml',
        quantity: 1,
        price: 8999,
        image: '/src/assets/images/zelia_hero_perfume_1789635975720.jpg'
      },
      {
        perfumeId: 'zelia-rose-eternelle',
        perfumeName: 'Rose Éternelle',
        volume: '100ml',
        quantity: 1,
        price: 7499,
        image: '/src/assets/images/zelia_rose_eternelle_1789636002228.jpg'
      }
    ],
    subtotal: 16498,
    discount: 1649,
    shipping: 0,
    total: 14849,
    paymentMethod: 'upi',
    paymentStatus: 'Paid',
    status: 'Pending',
    date: '2026-09-25T01:42:00Z',
    trackingNumber: '',
    notes: 'Gift packaging requested with gold wax seal calligraphy tag.'
  },
  {
    id: 'ord-1002',
    orderNumber: 'ZEL-9841',
    customerName: 'Vikramaditya Singhania',
    customerEmail: 'vikram.singhania@corp.in',
    customerPhone: '+91 99300 87123',
    shippingAddress: {
      address: 'Altamount Road, Penthouse 18B',
      city: 'Mumbai',
      pinCode: '400026',
      state: 'Maharashtra'
    },
    items: [
      {
        perfumeId: 'zelia-oud-celeste',
        perfumeName: 'Oud Céleste',
        volume: '100ml',
        quantity: 1,
        price: 9499,
        image: '/src/assets/images/zelia_oud_celeste_1789636860028.jpg'
      }
    ],
    subtotal: 9499,
    discount: 0,
    shipping: 0,
    total: 9499,
    paymentMethod: 'card',
    paymentStatus: 'Paid',
    status: 'Confirmed',
    date: '2026-09-24T22:15:00Z',
    trackingNumber: 'BD-AIR-948271',
    notes: 'Fragile handling for crystal flacon.'
  },
  {
    id: 'ord-1003',
    orderNumber: 'ZEL-9840',
    customerName: 'Meera Rajput',
    customerEmail: 'meera.rajput@designhouse.com',
    customerPhone: '+91 98110 56234',
    shippingAddress: {
      address: 'B-14 Golf Links',
      city: 'New Delhi',
      pinCode: '110003',
      state: 'Delhi'
    },
    items: [
      {
        perfumeId: 'zelia-jasmin-nocturne',
        perfumeName: 'Jasmin Nocturne',
        volume: '100ml',
        quantity: 1,
        price: 7999,
        image: '/src/assets/images/zelia_jasmin_nocturne_1789636890824.jpg'
      },
      {
        perfumeId: 'zelia-nuit-vanille',
        perfumeName: 'Nuit de Vanille Impériale',
        volume: '50ml',
        quantity: 1,
        price: 4999,
        image: '/src/assets/images/zelia_nuit_vanille_1789636057814.jpg'
      }
    ],
    subtotal: 12998,
    discount: 1300,
    shipping: 0,
    total: 11698,
    paymentMethod: 'upi',
    paymentStatus: 'Paid',
    status: 'Shipped',
    date: '2026-09-24T14:30:00Z',
    trackingNumber: 'DEL-EXP-772183',
    notes: 'Dispatched via Bluedart Apex Express.'
  },
  {
    id: 'ord-1004',
    orderNumber: 'ZEL-9839',
    customerName: 'Arjun Kapoor',
    customerEmail: 'arjun.k@venturecapital.io',
    customerPhone: '+91 97412 88901',
    shippingAddress: {
      address: 'Villa 12, Palm Meadows, Whitefield',
      city: 'Bengaluru',
      pinCode: '560066',
      state: 'Karnataka'
    },
    items: [
      {
        perfumeId: 'zelia-blanc-sublime',
        perfumeName: 'Blanc Sublime',
        volume: '100ml',
        quantity: 2,
        price: 7999,
        image: '/src/assets/images/zelia_blanc_sublime_1789636015907.jpg'
      }
    ],
    subtotal: 15998,
    discount: 0,
    shipping: 0,
    total: 15998,
    paymentMethod: 'card',
    paymentStatus: 'Paid',
    status: 'Delivered',
    date: '2026-09-23T11:05:00Z',
    trackingNumber: 'BD-AIR-948102',
    notes: 'Hand delivered to recipient with verification.'
  },
  {
    id: 'ord-1005',
    orderNumber: 'ZEL-9838',
    customerName: 'Natasha Poonawalla',
    customerEmail: 'natasha.p@hauteliving.in',
    customerPhone: '+91 98220 33819',
    shippingAddress: {
      address: 'Clover Highlands, Kondhwa',
      city: 'Pune',
      pinCode: '411048',
      state: 'Maharashtra'
    },
    items: [
      {
        perfumeId: 'zelia-coffret-voyage',
        perfumeName: 'Coffret Voyage Privé (5 x 15ml)',
        volume: '75ml Total',
        quantity: 1,
        price: 12499,
        image: '/src/assets/images/zelia_coffret_set_1789636874527.jpg'
      },
      {
        perfumeId: 'zelia-cognac-amber',
        perfumeName: 'Santal & Cognac Royale',
        volume: '100ml',
        quantity: 1,
        price: 8999,
        image: '/src/assets/images/zelia_cognac_amber_1789637885220.jpg'
      }
    ],
    subtotal: 21498,
    discount: 2150,
    shipping: 0,
    total: 19348,
    paymentMethod: 'card',
    paymentStatus: 'Paid',
    status: 'Delivered',
    date: '2026-09-22T16:40:00Z',
    trackingNumber: 'DEL-EXP-771920',
    notes: 'VIP concierge delivery confirmed.'
  }
];

export const SEED_CUSTOMERS: ServerCustomer[] = [
  {
    id: 'cust-01',
    name: 'Maharani Gayatri Devi',
    email: 'gayatri.devi@heritage.in',
    phone: '+91 98201 44552',
    city: 'Jaipur',
    tier: 'Gold Reserve VIP',
    totalOrders: 6,
    totalSpent: 84500,
    lastOrderDate: '2026-09-25',
    status: 'Active'
  },
  {
    id: 'cust-02',
    name: 'Vikramaditya Singhania',
    email: 'vikram.singhania@corp.in',
    phone: '+91 99300 87123',
    city: 'Mumbai',
    tier: 'Gold Reserve VIP',
    totalOrders: 8,
    totalSpent: 112000,
    lastOrderDate: '2026-09-24',
    status: 'Active'
  },
  {
    id: 'cust-03',
    name: 'Meera Rajput',
    email: 'meera.rajput@designhouse.com',
    phone: '+91 98110 56234',
    city: 'New Delhi',
    tier: 'Haute Member',
    totalOrders: 4,
    totalSpent: 48900,
    lastOrderDate: '2026-09-24',
    status: 'Active'
  },
  {
    id: 'cust-04',
    name: 'Arjun Kapoor',
    email: 'arjun.k@venturecapital.io',
    phone: '+91 97412 88901',
    city: 'Bengaluru',
    tier: 'Haute Member',
    totalOrders: 5,
    totalSpent: 62400,
    lastOrderDate: '2026-09-23',
    status: 'Active'
  },
  {
    id: 'cust-05',
    name: 'Natasha Poonawalla',
    email: 'natasha.p@hauteliving.in',
    phone: '+91 98220 33819',
    city: 'Pune',
    tier: 'Gold Reserve VIP',
    totalOrders: 9,
    totalSpent: 154000,
    lastOrderDate: '2026-09-22',
    status: 'Active'
  }
];

export const SEED_MESSAGES: ServerMessage[] = [
  {
    id: 'msg-01',
    name: 'Pooja Dhingra',
    email: 'pooja@luxuryevents.in',
    phone: '+91 98205 11928',
    subject: 'Bespoke Wedding Gifting & Scent Bar (Udaipur)',
    message: 'Greetings Maison ZÉLIA team. We are curating a royal destination wedding at Jagmandir Island Palace in December. We would love to commission 200 custom miniature 30ml flacons with monogrammed gold seals for VIP guests.',
    date: '2026-09-25T01:10:00Z',
    status: 'Unread'
  }
];
