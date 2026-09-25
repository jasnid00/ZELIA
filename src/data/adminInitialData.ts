import { Order, Customer, ProductCategory, AdminReview, Offer, InquiryMessage, WebsiteContent, AdminSettings } from '../types';
import { IMAGES } from '../assets/images';

export const INITIAL_ORDERS: Order[] = [
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
        image: IMAGES.zeliaHeroPerfume
      },
      {
        perfumeId: 'zelia-rose-eternelle',
        perfumeName: 'Rose Éternelle',
        volume: '100ml',
        quantity: 1,
        price: 7499,
        image: IMAGES.zeliaRoseEternelle
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
        image: IMAGES.zeliaOudCeleste
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
        image: IMAGES.zeliaJasminNocturne
      },
      {
        perfumeId: 'zelia-nuit-vanille',
        perfumeName: 'Nuit de Vanille Impériale',
        volume: '50ml',
        quantity: 1,
        price: 4999,
        image: IMAGES.zeliaNuitVanille
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
        image: IMAGES.zeliaBlancSublime
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
        image: IMAGES.zeliaCoffretSet
      },
      {
        perfumeId: 'zelia-cognac-amber',
        perfumeName: 'Santal & Cognac Royale',
        volume: '100ml',
        quantity: 1,
        price: 8999,
        image: IMAGES.zeliaCognacAmber
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
  },
  {
    id: 'ord-1006',
    orderNumber: 'ZEL-9837',
    customerName: 'Devendra Rathore',
    customerEmail: 'devendra.rathore@polo.in',
    customerPhone: '+91 99291 00234',
    shippingAddress: {
      address: 'Rathore Haveli, Paota',
      city: 'Jodhpur',
      pinCode: '342006',
      state: 'Rajasthan'
    },
    items: [
      {
        perfumeId: 'zelia-fleur-soie',
        perfumeName: 'Fleur de Soie',
        volume: '50ml',
        quantity: 1,
        price: 4999,
        image: IMAGES.zeliaFleurSoie
      }
    ],
    subtotal: 4999,
    discount: 0,
    shipping: 250,
    total: 5249,
    paymentMethod: 'cod',
    paymentStatus: 'Pending',
    status: 'Cancelled',
    date: '2026-09-21T09:12:00Z',
    trackingNumber: '',
    notes: 'Cancelled upon customer request before packing.'
  },
  {
    id: 'ord-1007',
    orderNumber: 'ZEL-9836',
    customerName: 'Ananya Deshmukh',
    customerEmail: 'ananya.deshmukh@architects.in',
    customerPhone: '+91 98490 12847',
    shippingAddress: {
      address: 'Banjara Hills, Road No. 12',
      city: 'Hyderabad',
      pinCode: '500034',
      state: 'Telangana'
    },
    items: [
      {
        perfumeId: 'zelia-amber-solaris',
        perfumeName: 'Ambre Solaris Intense',
        volume: '100ml',
        quantity: 1,
        price: 8499,
        image: IMAGES.zeliaAmberSolaris
      }
    ],
    subtotal: 8499,
    discount: 850,
    shipping: 0,
    total: 7649,
    paymentMethod: 'upi',
    paymentStatus: 'Paid',
    status: 'Delivered',
    date: '2026-09-20T18:22:00Z',
    trackingNumber: 'BD-AIR-947819',
    notes: 'Signed by household concierge.'
  },
  {
    id: 'ord-1008',
    orderNumber: 'ZEL-9835',
    customerName: 'Rohan Malhotra',
    customerEmail: 'rohan.m@investments.com',
    customerPhone: '+91 98302 91823',
    shippingAddress: {
      address: 'Queens Mansion, Park Street',
      city: 'Kolkata',
      pinCode: '700016',
      state: 'West Bengal'
    },
    items: [
      {
        perfumeId: 'zelia-ruby-bottle',
        perfumeName: 'Santal & Cognac Royale',
        volume: '100ml',
        quantity: 1,
        price: 8999,
        image: IMAGES.zeliaRubyBottle
      }
    ],
    subtotal: 8999,
    discount: 0,
    shipping: 0,
    total: 8999,
    paymentMethod: 'upi',
    paymentStatus: 'Paid',
    status: 'Shipped',
    date: '2026-09-24T19:50:00Z',
    trackingNumber: 'BD-AIR-948332',
    notes: 'Out for delivery via Kolkata Hub.'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
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
  },
  {
    id: 'cust-06',
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@architects.in',
    phone: '+91 98490 12847',
    city: 'Hyderabad',
    tier: 'Connoisseur',
    totalOrders: 3,
    totalSpent: 28400,
    lastOrderDate: '2026-09-20',
    status: 'Active'
  },
  {
    id: 'cust-07',
    name: 'Rohan Malhotra',
    email: 'rohan.m@investments.com',
    phone: '+91 98302 91823',
    city: 'Kolkata',
    tier: 'Connoisseur',
    totalOrders: 2,
    totalSpent: 17998,
    lastOrderDate: '2026-09-24',
    status: 'Active'
  },
  {
    id: 'cust-08',
    name: 'Devendra Rathore',
    email: 'devendra.rathore@polo.in',
    phone: '+91 99291 00234',
    city: 'Jodhpur',
    tier: 'Member',
    totalOrders: 1,
    totalSpent: 5249,
    lastOrderDate: '2026-09-21',
    status: 'Inactive'
  }
];

export const INITIAL_CATEGORIES: ProductCategory[] = [
  {
    id: 'cat-floral',
    name: 'Floral Silk',
    frenchName: 'Soie Florale',
    description: 'Centifolia rose, nocturnal jasmine, osmanthus petals bathed in white musk.',
    itemCount: 3,
    status: 'Active',
    image: IMAGES.catWomenPerfume
  },
  {
    id: 'cat-amber',
    name: 'Amber & Woods',
    frenchName: 'Ambre & Bois Rares',
    description: 'Warm Baltic amber, Mysore sandalwood, smoky vetiver, and sacred oud accords.',
    itemCount: 4,
    status: 'Active',
    image: IMAGES.catMenPerfume
  },
  {
    id: 'cat-solar',
    name: 'Solar Warmth',
    frenchName: 'Brumes Solaires',
    description: 'Golden bergamot, saffron filaments, sunny orange blossom, and molten cashmeran.',
    itemCount: 2,
    status: 'Active',
    image: IMAGES.zeliaAmberSolaris
  },
  {
    id: 'cat-gourmand',
    name: 'Gourmand Vanilla',
    frenchName: 'Vanille Impériale',
    description: 'Madagascan Bourbon vanilla beans, roasted tonka, pralines, and almond milk.',
    itemCount: 2,
    status: 'Active',
    image: IMAGES.zeliaNuitVanille
  },
  {
    id: 'cat-nocturne',
    name: 'Sapphire Nocturne',
    frenchName: 'Nocturne Électrique',
    description: 'Deep midnight vetiver, smoky incense, black tea leaves, and velvet woods.',
    itemCount: 2,
    status: 'Active',
    image: IMAGES.zeliaSapphireBottle
  },
  {
    id: 'cat-ruby',
    name: 'Ruby & Crimson',
    frenchName: 'Élixirs Carmin',
    description: 'Sultry Bulgarian rose, dark plum, spiced cognac, and crushed leather petals.',
    itemCount: 2,
    status: 'Active',
    image: IMAGES.zeliaRubyBottle
  },
  {
    id: 'cat-attars',
    name: 'Pure Attar Oils',
    frenchName: 'Attars Concentrés Purs',
    description: 'Alcohol-free 100% pure botanical and wood extraits in cut crystal tolas.',
    itemCount: 2,
    status: 'Active',
    image: IMAGES.catAttarOil
  },
  {
    id: 'cat-coffrets',
    name: 'Luxury Coffrets',
    frenchName: 'Coffrets de Voyage & Cadeaux',
    description: 'Signature discovery atomizers presented in handcrafted champagne velvet boxes.',
    itemCount: 2,
    status: 'Active',
    image: IMAGES.catLuxuryGifts
  }
];

export const INITIAL_REVIEWS: AdminReview[] = [
  {
    id: 'rev-01',
    author: 'Vikramaditya Singhania',
    perfumeName: "Lumina d'Or",
    rating: 5,
    title: 'Unmatched regal sillage in the boardroom',
    comment: 'Lumina d’Or leaves an unforgettable trace. Wore this to an international summit in Geneva and received four inquiries within minutes. The saffron and amber resonance lasts over 18 hours on linen.',
    date: '2026-09-20',
    verified: true,
    status: 'Approved',
    adminReply: 'Thank you Vikramaditya. Lumina d’Or was distilled specifically for commanding presence.'
  },
  {
    id: 'rev-02',
    author: 'Maharani Gayatri Devi',
    perfumeName: 'Rose Éternelle',
    rating: 5,
    title: 'The purest May Rose extraction in high perfumery',
    comment: 'Having collected Grasse vintage perfumes for over 25 years, Rose Éternelle is nothing short of sublime. Crisp dewy morning petals without any synthetic harshness.',
    date: '2026-09-18',
    verified: true,
    status: 'Approved',
    adminReply: 'We are deeply honored by your royal appreciation for our Grasse harvest extraits.'
  },
  {
    id: 'rev-03',
    author: 'Natasha Poonawalla',
    perfumeName: 'Oud Céleste',
    rating: 5,
    title: 'Dark, intoxicating and sensually hypnotic',
    comment: 'Oud Céleste transforms completely on the skin. Starts with a burst of spiced incense and deepens into a liquid cashmere smoke.',
    date: '2026-09-15',
    verified: true,
    status: 'Approved'
  },
  {
    id: 'rev-04',
    author: 'Siddharth M.',
    perfumeName: 'Blanc Sublime',
    rating: 4,
    title: 'Crisp white flowers and clean linen',
    comment: 'Extremely fresh and opulent for Mumbai summers. Sillage is moderate but longevity easily crosses 12 hours.',
    date: '2026-09-12',
    verified: true,
    status: 'Approved'
  },
  {
    id: 'rev-05',
    author: 'Ayesha K.',
    perfumeName: 'Nuit de Vanille Impériale',
    rating: 5,
    title: 'Pure indulgence without being cloying',
    comment: 'The Bourbon vanilla note is smoky and sensual rather than sweet candy. Absolutely addictive for evening dinners.',
    date: '2026-09-08',
    verified: true,
    status: 'Approved'
  }
];

export const INITIAL_OFFERS: Offer[] = [
  {
    id: 'off-01',
    code: 'ZELIA20',
    discountPercent: 20,
    minSpend: 9999,
    expiryDate: '2026-10-31',
    usageCount: 42,
    status: 'Active',
    description: 'Exclusive 20% privilege savings for orders exceeding ₹9,999.'
  },
  {
    id: 'off-02',
    code: 'ROYALGOLD',
    discountPercent: 15,
    minSpend: 6999,
    expiryDate: '2026-11-15',
    usageCount: 78,
    status: 'Active',
    description: '15% savings across all Gold Reserve and Haute Extraits.'
  },
  {
    id: 'off-03',
    code: 'WELCOME10',
    discountPercent: 10,
    minSpend: 3999,
    expiryDate: '2026-12-31',
    usageCount: 156,
    status: 'Active',
    description: 'Welcome token of 10% discount on your debut ZÉLIA purchase.'
  },
  {
    id: 'off-04',
    code: 'FESTIVE15',
    discountPercent: 15,
    minSpend: 7999,
    expiryDate: '2026-10-15',
    usageCount: 91,
    status: 'Active',
    description: 'Autumn Festive Celebration discount with complimentary wax-sealed gift wrap.'
  }
];

export const INITIAL_MESSAGES: InquiryMessage[] = [
  {
    id: 'msg-01',
    name: 'Pooja Dhingra',
    email: 'pooja@luxuryevents.in',
    phone: '+91 98205 11928',
    subject: 'Bespoke Wedding Gifting & Scent Bar (Udaipur)',
    message: 'Greetings Maison ZÉLIA team. We are curating a royal destination wedding at Jagmandir Island Palace in December. We would love to commission 200 custom miniature 30ml flacons with monogrammed gold seals for VIP guests.',
    date: '2026-09-25T01:10:00Z',
    status: 'Unread'
  },
  {
    id: 'msg-02',
    name: 'Aditya Birla Group Concierge',
    email: 'executive.desk@adityabirla.com',
    phone: '+91 22 6652 5000',
    subject: 'Diwali Executive Hampers - 100 Coffrets',
    message: 'We are requesting a quote for 100 units of the Coffret Voyage Privé along with Lumina d’Or flacons for our Managing Directors board suite before mid October.',
    date: '2026-09-24T18:45:00Z',
    status: 'Read',
    reply: 'Proposal and sample flacons dispatched to Worli headquarters via private courier on 24 Sep.'
  },
  {
    id: 'msg-03',
    name: 'Dr. Sunita Rao',
    email: 'sunita.rao@chemburclinic.in',
    phone: '+91 98402 33419',
    subject: 'Allergy inquiry regarding natural oakmoss and civet',
    message: 'Could you confirm if Oud Céleste and Rose Éternelle utilize IFRA-compliant synthetic substitutes for oakmoss and animalic notes? I have sensitive skin but adore your formulation profile.',
    date: '2026-09-23T11:20:00Z',
    status: 'Replied',
    reply: 'Confirmed: 100% cruelty-free, IFRA 50th amendment certified vegan musk and organic bio-fermented amber.'
  }
];

export const INITIAL_WEBSITE_CONTENT: WebsiteContent = {
  announcements: [
    '✨ COMPLIMENTARY EXPRESS AIR DELIVERY ON ALL PRESTIGE ORDERS ABOVE ₹2,999',
    '⚜️ INTRODUCING LUMINA D’OR — EXTRAIT DE PARFUM (30% OIL CONCENTRATION)',
    '🎁 RECEIVE 3 CURATED DISCOVERY SAMPLES WITH EVERY HAND-CRAFTED FLACON',
    '👑 CELEBRITY PICK: WORN & ENDORSED BY BOLLYWOOD & GLOBAL ICONS'
  ],
  heroHeadline: 'A Scent That Lingers Long After You Leave',
  heroSubtext: 'Distilled from the world’s rarest botanical harvests in Grasse and Mysore. Extraits de Parfum formulated with an opulent 30% concentration for unyielding sillage.',
  storyHeadline: 'Born from the Golden Light of the French Riviera & Royal Mysore',
  storyParagraph: 'Founded on the philosophy that scent is memory distilled into liquid gold, Maison ZÉLIA merges classical French perfumery precision with the sacred resinous heritage of the East.',
  conciergePhone: '+91 (022) 8900 4500',
  conciergeEmail: 'concierge@zeliaparfums.com',
  boutiqueAddress: 'Atelier ZÉLIA, Luxury Galleria, 44 Nariman Point, Mumbai 400021',
  boutiqueHours: 'Monday – Sunday: 10:30 AM – 9:00 PM IST'
};

export const INITIAL_SETTINGS: AdminSettings = {
  boutiqueName: 'Maison ZÉLIA Parfums',
  currencySymbol: '₹',
  currencyCode: 'INR',
  freeShippingThreshold: 2999,
  standardShippingFee: 250,
  courierPartner: 'Bluedart Express Air',
  taxRate: 18,
  lowStockThreshold: 5,
  notificationsEmail: 'orders@zeliaparfums.com',
  smsNotificationsEnabled: true,
  orderEmailNotifications: true
};
