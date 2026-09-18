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
