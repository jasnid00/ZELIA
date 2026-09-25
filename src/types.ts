export interface FragranceNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface FragranceCollection {
  id: string;
  name: string;
  frenchName: string;
  tagline: string;
  description: string;
  badge: string;
  accentNote: string;
  accentColor?: string;
  gradientBg?: string;
}

export interface SizeOption {
  ml: string;
  label: string;
  price: number;
  originalPrice?: number;
}

export interface CelebrityPick {
  id: string;
  celebrityName: string;
  title: string;
  photo: string;
  quote: string;
  perfumeId: string;
  signatureScentName: string;
  occasion: string;
}

export interface OccasionGuide {
  id: string;
  category: 'Gifting & Relationships' | 'Wedding & Celebrations' | 'Season' | 'Mood & Energy' | 'Outfit Pairing & Styling';
  title: string;
  subTitle: string;
  description: string;
  stylingTip: string;
  photo: string;
  recommendedPerfumeId: string;
  recommendedPerfumeName: string;
  sillageAdvice: string;
  tags: string[];
}

export interface Perfume {
  id: string;
  name: string;
  subTitle: string;
  tagline: string;
  price: number; // in INR (₹)
  originalPrice?: number; // in INR (₹)
  rating: number;
  reviewsCount: number;
  volume: string;
  concentration: string; // e.g. "Extrait de Parfum (30%)"
  family: 'Floral Silk' | 'Amber & Woods' | 'Solar Warmth' | 'Gourmand Vanilla' | 'Ruby & Crimson' | 'Sapphire Nocturne' | 'Emerald Aromatic';
  collectionId: 'gold-reserve' | 'flora-couture' | 'nocturne-elixirs' | 'brumes-solaires' | 'coffrets-voyage';
  description: string;
  story: string;
  sillage: 'Moderate' | 'Intimate' | 'Enchanting & Strong';
  longevity: '12 - 16 Hours' | '14 - 18 Hours' | '16 - 24 Hours';
  notes: FragranceNotes;
  image: string;
  badge?: string;
  featured: boolean;
  inStock: boolean;
  stockCount?: number;
  sizes?: SizeOption[];
  genderCategory?: 'men' | 'women' | 'unisex';
  isNewArrival?: boolean;
  isAttar?: boolean;
  isGiftSet?: boolean;
  isSale?: boolean;
  isBestSeller?: boolean;
  discountPercent?: number;
  accentColor?: string;
  bgGlow?: string;
  tagColor?: string;
}

export interface CartItem {
  perfume: Perfume;
  quantity: number;
  selectedVolume: string;
  price: number;
}

export interface SlideshowAd {
  id: string;
  badge: string;
  headline: string;
  tagline: string;
  subtext: string;
  celebrityName: string;
  celebrityRole: string;
  celebrityPhoto: string;
  perfumeId: string;
  perfumeName: string;
  concentration: string;
  price: number;
  originalPrice: number;
  discountBadge: string;
  accentColor: string;
  gradient: string;
  notes: string[];
  seductionFactor: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  perfumeName: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface OlfactoryNoteDetail {
  name: string;
  category: 'Top' | 'Heart' | 'Base';
  scentProfile: string;
  botanicalOrigin: string;
  featuredIn: string[];
  description: string;
}

export interface ScentQuizAnswer {
  mood?: string;
  occasion?: string;
  preference?: string;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  perfumeId: string;
  perfumeName: string;
  volume: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
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
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'upi' | 'card' | 'cod';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  status: OrderStatus;
  date: string;
  trackingNumber?: string;
  notes?: string;
}

export interface Customer {
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

export interface ProductCategory {
  id: string;
  name: string;
  frenchName: string;
  description: string;
  itemCount: number;
  status: 'Active' | 'Hidden';
  image?: string;
}

export interface AdminReview {
  id: string;
  author: string;
  perfumeName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  status: 'Approved' | 'Pending' | 'Hidden';
  adminReply?: string;
}

export interface Offer {
  id: string;
  code: string;
  discountPercent: number;
  minSpend: number;
  expiryDate: string;
  usageCount: number;
  status: 'Active' | 'Expired' | 'Paused';
  description: string;
}

export interface InquiryMessage {
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

export interface WebsiteContent {
  announcements: string[];
  heroHeadline: string;
  heroSubtext: string;
  storyHeadline: string;
  storyParagraph: string;
  conciergePhone: string;
  conciergeEmail: string;
  boutiqueAddress: string;
  boutiqueHours: string;
}

export interface AdminSettings {
  boutiqueName: string;
  currencySymbol: string;
  currencyCode: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
  courierPartner: string;
  taxRate: number;
  lowStockThreshold: number;
  notificationsEmail: string;
  smsNotificationsEnabled: boolean;
  orderEmailNotifications: boolean;
}

