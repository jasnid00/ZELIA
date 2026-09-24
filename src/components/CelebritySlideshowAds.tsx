import React, { useState } from 'react';
import { Sparkles, Star, ShoppingBag, Zap, Heart, Flame, Shield, ArrowRight, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { SLIDESHOW_ADS } from '../data/campaignAds';
import { PERFUMES } from '../data/perfumes';
import { Perfume } from '../types';
import { formatINR } from '../utils/currency';
import { handleImageError } from '../utils/imageFallback';

interface CelebritySlideshowAdsProps {
  onAddToCart: (perfume: Perfume, volume?: string, quantity?: number) => void;
  onBuyNow?: (perfume: Perfume, volume?: string) => void;
  onQuickView: (perfume: Perfume) => void;
  onToggleWishlist?: (perfumeId: string) => void;
  wishlistIds?: string[];
}

export const CelebritySlideshowAds: React.FC<CelebritySlideshowAdsProps> = ({
  onAddToCart,
  onBuyNow,
  onQuickView,
  onToggleWishlist,
  wishlistIds = [],
}) => {
  const [activeAdIndex, setActiveAdIndex] = useState(0);

  const currentAd = SLIDESHOW_ADS[activeAdIndex];
  const matchedPerfume = PERFUMES.find((p) => p.id === currentAd.perfumeId) || PERFUMES[0];
  const isWishlisted = wishlistIds.includes(matchedPerfume.id);

  const handleNext = () => {
    setActiveAdIndex((prev) => (prev + 1) % SLIDESHOW_ADS.length);
  };

  const handlePrev = () => {
    setActiveAdIndex((prev) => (prev - 1 + SLIDESHOW_ADS.length) % SLIDESHOW_ADS.length);
  };

  const handleAddToCart = () => {
    onAddToCart(matchedPerfume, '100ml', 1);
  };

  const handleBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(matchedPerfume, '100ml');
    } else {
      handleAddToCart();
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-[#140F0C] via-[#1E1713] to-[#140F0C] text-white relative overflow-hidden border-y border-[#D4AF37]/30">
      
      {/* Background Ambient Glows */}
      <div 
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: currentAd.accentColor }}
      />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] rounded-full bg-[#D4AF37]/15 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header (matching FridayCharm's high-drama celebrity fragrance banner) */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#D4AF37]/60 text-[#F3D17A] text-xs font-bold uppercase tracking-[0.25em] shadow-lg backdrop-blur-md">
            <Flame className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            <span>Fragrances Celebrities Actually Wear</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white">
            The Seduction Campaign
          </h2>

          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />

          <p className="text-sm text-[#C5B5A5] leading-relaxed max-w-xl mx-auto font-normal">
            Direct from private suites and European red carpets. Discover the intoxicating, seductive signature scents chosen by the world’s most magnetic stars.
          </p>
        </div>

        {/* Interactive Slideshow Ad Feature Card */}
        <div className="bg-[#1A1410]/80 rounded-3xl border-2 border-[#D4AF37]/40 shadow-2xl overflow-hidden backdrop-blur-xl">
          
          {/* Top Carousel Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-b border-white/10 bg-black/40">
            {SLIDESHOW_ADS.map((ad, idx) => {
              const isActive = idx === activeAdIndex;
              return (
                <button
                  key={ad.id}
                  onClick={() => setActiveAdIndex(idx)}
                  className={`p-3.5 text-left border-b-2 transition-all cursor-pointer flex items-center gap-3 ${
                    isActive
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-white shadow-inner'
                      : 'border-transparent text-[#9E8E81] hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 shrink-0">
                    <img
                      src={ad.celebrityPhoto}
                      alt={ad.celebrityName}
                      onError={(e) => handleImageError(e, ad.perfumeName, ad.accentColor)}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="truncate">
                    <p className="text-[11px] font-bold uppercase tracking-wider truncate">
                      {ad.celebrityName}
                    </p>
                    <p className="text-[9px] text-[#C5B5A5] truncate">
                      {ad.perfumeName}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Main Billboard Layout: Seductive Campaign Visual & Product Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px]">
            
            {/* Left 6 cols: Seductive Celebrity Photo & Atmosphere */}
            <div className="lg:col-span-6 relative overflow-hidden group min-h-[380px] lg:min-h-full">
              <img
                src={currentAd.celebrityPhoto}
                alt={`${currentAd.celebrityName} in ${currentAd.headline}`}
                onError={(e) => handleImageError(e, currentAd.perfumeName, currentAd.accentColor)}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 filter brightness-90 contrast-110"
              />
              {/* Vignette & Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1410] via-transparent to-transparent lg:hidden" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#1A1410]/90 hidden lg:block" />

              {/* Floating Campaign Badge */}
              <div className="absolute top-5 left-5 z-20">
                <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#D4AF37] text-[#F3D17A] text-[10px] uppercase font-bold tracking-[0.2em] shadow-lg flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#D4AF37] fill-current" />
                  <span>{currentAd.badge}</span>
                </span>
              </div>

              {/* Bottom Celebrity Signature on Photo */}
              <div className="absolute bottom-5 left-5 right-5 z-20 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif-luxury text-xl text-white font-medium">
                      {currentAd.celebrityName}
                    </h3>
                    <p className="text-[11px] text-[#D4AF37] font-semibold tracking-wider">
                      {currentAd.celebrityRole}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[#D4AF37]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right 6 cols: Scent Profile, Aphrodisiac Metrics, INR Pricing & Direct Buying */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6 text-left">
              
              <div className="space-y-4">
                
                {/* Headline & Seduction Index */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold">
                    Official Fragrance Campaign
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                    In Stock • Grasse Batch
                  </span>
                </div>

                <h3 className="font-serif-luxury text-3xl sm:text-4xl text-white font-light tracking-wide leading-tight">
                  {currentAd.headline}
                </h3>

                {/* Seductive Quote */}
                <blockquote className="font-serif-luxury italic text-base sm:text-lg text-[#F3D17A] border-l-2 border-[#D4AF37] pl-3.5 py-1">
                  {currentAd.tagline}
                </blockquote>

                <p className="text-xs sm:text-sm text-[#C5B5A5] leading-relaxed">
                  {currentAd.subtext}
                </p>

                {/* Sillage & Aphrodisiac Score Metres */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A8988B] block">
                      Aphrodisiac Rating:
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#F3D17A] flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{currentAd.seductionFactor}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A8988B] block">
                      Longevity on Skin:
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-white">
                      18+ Hours (Extrait)
                    </span>
                  </div>
                </div>

                {/* Scent Notes Accords */}
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-[#A8988B] font-semibold block">
                    Signature Accords:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentAd.notes.map((note) => (
                      <span
                        key={note}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/15"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Bottom Price & Dual CTAs */}
              <div className="pt-4 border-t border-white/10 space-y-4">
                
                {/* Price Display */}
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-serif-luxury text-3xl font-bold text-[#F3D17A]">
                        {formatINR(currentAd.price)}
                      </span>
                      <span className="text-sm text-white/50 line-through">
                        {formatINR(currentAd.originalPrice)}
                      </span>
                      <span className="text-xs font-black text-[#140F0C] bg-[#D4AF37] px-2 py-0.5 rounded-md">
                        {currentAd.discountBadge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A8988B]">
                      100ml Extrait Flacon • Includes 3 Free Samples & Gift Box
                    </p>
                  </div>

                  {onToggleWishlist && (
                    <button
                      onClick={() => onToggleWishlist(matchedPerfume.id)}
                      className="p-2.5 rounded-xl border border-white/20 text-white hover:text-[#C45B73] hover:border-[#C45B73] transition-colors cursor-pointer bg-white/5"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#C45B73] text-[#C45B73]' : ''}`} />
                    </button>
                  )}
                </div>

                {/* Dual Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    id={`celeb-ad-add-${currentAd.id}`}
                    onClick={handleAddToCart}
                    className="py-3 px-4 rounded-xl border border-white/30 hover:bg-white/15 text-white text-xs uppercase tracking-wider font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    id={`celeb-ad-buy-${currentAd.id}`}
                    onClick={handleBuyNow}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B8860B] hover:brightness-110 text-[#140F0C] text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Previous / Next Slideshow Controls */}
                <div className="flex items-center justify-between pt-2 text-xs text-[#A8988B]">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span>Campaign 0{activeAdIndex + 1} of 0{SLIDESHOW_ADS.length}</span>
                    <button
                      onClick={handleNext}
                      className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => onQuickView(matchedPerfume)}
                    className="text-xs text-[#EADBCE] hover:text-[#D4AF37] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Flacon</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
