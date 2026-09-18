import React, { useState } from 'react';
import { OCCASION_GUIDES, PERFUMES } from '../data/perfumes';
import { formatINR } from '../utils/currency';
import { Perfume, OccasionGuide } from '../types';
import { Sparkles, Gift, Heart, Sun, Shirt, Compass, ShoppingBag, Zap, ArrowRight, Check } from 'lucide-react';

interface OccasionScentFinderProps {
  onAddToCart: (perfume: Perfume, volume?: string, quantity?: number) => void;
  onBuyNow: (perfume: Perfume, volume?: string) => void;
  onQuickView: (perfume: Perfume) => void;
}

export const OccasionScentFinder: React.FC<OccasionScentFinderProps> = ({
  onAddToCart,
  onBuyNow,
  onQuickView,
}) => {
  const [activeCategory, setActiveCategory] = useState<OccasionGuide['category']>('Wedding & Celebrations');
  const [selectedMl, setSelectedMl] = useState<string>('100ml');

  const categories: { id: OccasionGuide['category']; label: string; icon: React.ReactNode }[] = [
    { id: 'Wedding & Celebrations', label: 'Wedding & Ceremonies', icon: <Heart className="w-4 h-4" /> },
    { id: 'Gifting & Relationships', label: 'Gifting & Relationships', icon: <Gift className="w-4 h-4" /> },
    { id: 'Outfit Pairing & Styling', label: 'Outfit Pairing & Styling', icon: <Shirt className="w-4 h-4" /> },
    { id: 'Season', label: 'Seasonal Sillage', icon: <Sun className="w-4 h-4" /> },
    { id: 'Mood & Energy', label: 'Mood & Energy', icon: <Compass className="w-4 h-4" /> },
  ];

  const currentGuide = OCCASION_GUIDES.find((g) => g.category === activeCategory) || OCCASION_GUIDES[0];
  const matchedPerfume = PERFUMES.find((p) => p.id === currentGuide.recommendedPerfumeId) || PERFUMES[0];

  const currentSizeObj = matchedPerfume.sizes?.find((s) => s.ml === selectedMl) || {
    ml: '100ml',
    label: '100ml Extrait Standard',
    price: matchedPerfume.price,
    originalPrice: matchedPerfume.originalPrice,
  };

  return (
    <section id="scent-finder" className="py-20 bg-[#F5ECE2]/40 border-b border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] text-[#9A7B38] text-xs uppercase tracking-[0.25em] font-semibold mb-3 border border-[#EADBCE] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Curated Olfactory Guidance</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#2C241E] font-medium tracking-tight">
            Find the Perfect Scent for Every Occasion
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#6E6359] leading-relaxed">
            From royal wedding sillage and milestone anniversaries to seasonal humidity and couture silk styling—explore tailored pairings crafted by our Master Perfumer.
          </p>
        </div>

        {/* Occasion Category Selector Pills */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedMl('100ml');
                }}
                className={`flex items-center gap-2 px-4 sm:px-5 py-3 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#2C241E] text-[#FAF7F2] shadow-md scale-102 border border-[#2C241E]'
                    : 'bg-white text-[#6E6359] border border-[#EADBCE] hover:border-[#D4AF37] hover:text-[#2C241E]'
                }`}
              >
                <span className={isActive ? 'text-[#D4AF37]' : 'text-[#8C827A]'}>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Guide Bento Card */}
        <div className="bg-white rounded-3xl border border-[#EADBCE] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left: High-Definition Occasion Scene Photo */}
          <div className="lg:col-span-6 relative min-h-[380px] lg:min-h-[550px] overflow-hidden bg-[#2C241E] group">
            <img
              src={currentGuide.photo}
              alt={currentGuide.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1714] via-[#1C1714]/40 to-transparent" />

            {/* Floating Occasion Badge & Tags */}
            <div className="absolute top-6 left-6 right-6 flex flex-wrap gap-2 z-10">
              <span className="bg-[#D4AF37] text-[#1C1714] text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-xs">
                {currentGuide.category}
              </span>
              {currentGuide.tags.slice(0, 2).map((t, idx) => (
                <span key={idx} className="bg-black/60 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full border border-white/20">
                  {t}
                </span>
              ))}
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-6 left-6 right-6 text-white z-10">
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FFFDF9] font-medium tracking-wide">
                {currentGuide.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#EADBCE] mt-1 font-light">
                {currentGuide.subTitle}
              </p>
            </div>
          </div>

          {/* Right: Master Perfumer Styling Advice & Perfume Match */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-b from-[#FFFDF9] to-[#FAF7F2]">
            
            <div>
              {/* Description */}
              <p className="text-sm text-[#5A5046] leading-relaxed mb-5">
                {currentGuide.description}
              </p>

              {/* Styling & Sillage Accordion Cards */}
              <div className="space-y-3 mb-6">
                
                {/* Styling Tip Card */}
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#2C241E] uppercase tracking-wider mb-1">
                    <Shirt className="w-4 h-4 text-[#9A7B38]" />
                    <span>Styling & Wardrobe Pairing</span>
                  </div>
                  <p className="text-xs text-[#6E6359] leading-relaxed">
                    {currentGuide.stylingTip}
                  </p>
                </div>

                {/* Sillage Advice Card */}
                <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A]">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#92400E] uppercase tracking-wider mb-1">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>Application & Aura Technique</span>
                  </div>
                  <p className="text-xs text-[#78350F] leading-relaxed">
                    {currentGuide.sillageAdvice}
                  </p>
                </div>

              </div>

              {/* Recommended Fragrance Flacon Box */}
              <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/50 shadow-xs flex items-center gap-4 mb-6">
                {/* Perfume Bottle Image (Unobstructed, Clean) */}
                <div 
                  className="w-20 h-24 rounded-xl overflow-hidden shrink-0 border border-[#EADBCE] bg-[#FAF7F2] cursor-pointer"
                  onClick={() => onQuickView(matchedPerfume)}
                >
                  <img
                    src={matchedPerfume.image}
                    alt={matchedPerfume.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#9A7B38]">
                    Master Recommendation
                  </span>
                  <h4 className="font-serif-luxury text-lg sm:text-xl text-[#2C241E] font-medium truncate">
                    {matchedPerfume.name}
                  </h4>
                  <p className="text-xs text-[#7E7368] truncate">
                    {matchedPerfume.subTitle} • {matchedPerfume.family}
                  </p>

                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-base font-bold text-[#2C241E]">
                      {formatINR(currentSizeObj.price)}
                    </span>
                    {currentSizeObj.originalPrice && (
                      <span className="text-xs text-[#9A8F85] line-through">
                        {formatINR(currentSizeObj.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => onQuickView(matchedPerfume)}
                  className="p-2 text-xs text-[#9A7B38] hover:text-[#2C241E] underline font-medium cursor-pointer"
                >
                  Quick View
                </button>
              </div>

              {/* Volume (ml) Selector */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#2C241E] tracking-wider uppercase">
                    Select Volume:
                  </span>
                  <span className="text-xs text-[#9A7B38] font-medium">
                    {currentSizeObj.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {matchedPerfume.sizes?.map((size) => {
                    const isSelected = size.ml === selectedMl;
                    return (
                      <button
                        key={size.ml}
                        onClick={() => setSelectedMl(size.ml)}
                        className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#D4AF37] bg-[#FFFBEB] text-[#2C241E] ring-1 ring-[#D4AF37] font-semibold'
                            : 'border-[#EADBCE] bg-white text-[#6E6359] hover:border-[#D4AF37]'
                        }`}
                      >
                        <span className="block text-xs">{size.ml}</span>
                        <span className="block text-[10px] text-[#9A7B38] mt-0.5">
                          {formatINR(size.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* ACTION TAGS: Add to Cart and Buy Now */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#EADBCE]">
              
              <button
                onClick={() => onAddToCart(matchedPerfume, selectedMl, 1)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl border-2 border-[#2C241E] text-[#2C241E] hover:bg-[#2C241E] hover:text-[#FAF7F2] font-semibold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xs active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              <button
                onClick={() => onBuyNow(matchedPerfume, selectedMl)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#DFBE4E] hover:to-[#C6A035] text-[#1C1714] font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-98"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Buy Now</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
