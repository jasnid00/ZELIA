import React, { useState } from 'react';
import { CELEBRITY_PICKS, PERFUMES } from '../data/perfumes';
import { formatINR } from '../utils/currency';
import { Perfume, CelebrityPick } from '../types';
import { Star, Sparkles, ShoppingBag, Zap, Eye, Quote, CheckCircle2 } from 'lucide-react';

interface CelebrityScentsProps {
  onAddToCart: (perfume: Perfume, volume?: string, quantity?: number) => void;
  onBuyNow: (perfume: Perfume, volume?: string) => void;
  onQuickView: (perfume: Perfume) => void;
}

export const CelebrityScents: React.FC<CelebrityScentsProps> = ({
  onAddToCart,
  onBuyNow,
  onQuickView,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activePick: CelebrityPick = CELEBRITY_PICKS[activeIdx];
  const matchedPerfume = PERFUMES.find((p) => p.id === activePick.perfumeId) || PERFUMES[0];

  // Selected volume for this card
  const [selectedSize, setSelectedSize] = useState<string>('100ml');

  const currentSizeObj = matchedPerfume.sizes?.find((s) => s.ml === selectedSize) || {
    ml: '100ml',
    label: '100ml Extrait Standard',
    price: matchedPerfume.price,
    originalPrice: matchedPerfume.originalPrice,
  };

  return (
    <section id="celebrity-scents" className="py-20 bg-gradient-to-b from-[#FAF7F2] via-[#F5ECE2]/50 to-[#FAF7F2] border-b border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2C241E] text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-medium mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Style Icon Repertoire</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#2C241E] font-medium tracking-tight">
            Celebrities Most Used
          </h2>
          <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#6E6359] leading-relaxed">
            Discover the signature extraits and aristocratic accords chosen by cinema royalty and red carpet visionaries for life’s most celebrated moments.
          </p>
        </div>

        {/* Celebrity Tabs / Selectors */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CELEBRITY_PICKS.map((celeb, idx) => {
            const isCurrent = idx === activeIdx;
            return (
              <button
                key={celeb.id}
                onClick={() => {
                  setActiveIdx(idx);
                  setSelectedSize('100ml');
                }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-full border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#2C241E] text-[#FAF7F2] border-[#2C241E] shadow-md scale-102'
                    : 'bg-white/80 text-[#6E6359] border-[#EADBCE] hover:border-[#D4AF37] hover:text-[#2C241E]'
                }`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37]/50 shrink-0">
                  <img
                    src={celeb.photo}
                    alt={celeb.celebrityName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold tracking-wide leading-none">{celeb.celebrityName}</p>
                  <p className="text-[10px] text-[#A69B91] leading-none mt-1">{celeb.signatureScentName.split(' ')[0]}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Spotlight Showcase Bento */}
        <div className="bg-white rounded-3xl border border-[#EADBCE] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left: Celebrity High-Fashion Photo */}
          <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-[500px] overflow-hidden bg-[#2C241E]">
            <img
              src={activePick.photo}
              alt={activePick.celebrityName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
            />
            {/* Ambient vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1714] via-[#1C1714]/30 to-transparent" />
            
            {/* Celebrity Info Overlay */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="bg-[#D4AF37] text-[#2C241E] text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full inline-block mb-2 shadow-xs">
                Signature Favorite
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#FFFDF9] font-medium tracking-wide">
                {activePick.celebrityName}
              </h3>
              <p className="text-xs text-[#EADBCE]/90 mt-1 font-light tracking-wide">
                {activePick.title}
              </p>
              <p className="text-[11px] text-[#D4AF37] mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Worn for: {activePick.occasion}
              </p>
            </div>
          </div>

          {/* Right: Celebrity Quote & Flacon Details with Purchase Options */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-gradient-to-b from-[#FFFDF9] to-[#FAF7F2]">
            
            <div>
              {/* Quote */}
              <div className="relative mb-6">
                <Quote className="w-8 h-8 text-[#D4AF37]/30 absolute -top-3 -left-3" />
                <p className="font-serif-luxury italic text-base sm:text-lg text-[#3E342B] leading-relaxed pl-6">
                  {activePick.quote}
                </p>
              </div>

              {/* Matched Perfume Card Strip */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EADBCE] shadow-xs flex flex-col sm:flex-row gap-5 items-center mb-6">
                
                {/* Perfume Bottle Image (Unobstructed, Clean) */}
                <div 
                  className="w-24 h-28 sm:w-28 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-[#D4AF37]/40 shadow-sm cursor-pointer group relative bg-white"
                  onClick={() => onQuickView(matchedPerfume)}
                >
                  <img
                    src={matchedPerfume.image}
                    alt={matchedPerfume.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Fragrance Info */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#9A7B38] font-bold">
                      {matchedPerfume.subTitle}
                    </span>
                    <span className="text-[#D4AF37] flex items-center text-xs">
                      <Star className="w-3 h-3 fill-[#D4AF37] mr-0.5" />
                      {matchedPerfume.rating} ({matchedPerfume.reviewsCount})
                    </span>
                  </div>

                  <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#2C241E] font-medium">
                    {matchedPerfume.name}
                  </h4>
                  <p className="text-xs text-[#6E6359] line-clamp-2 mt-1">
                    {matchedPerfume.tagline}
                  </p>

                  {/* Accords list */}
                  <div className="flex flex-wrap gap-1.5 mt-2 justify-center sm:justify-start">
                    {matchedPerfume.notes.heart.slice(0, 3).map((note, nIdx) => (
                      <span key={nIdx} className="bg-white text-[#2C241E] text-[10px] px-2 py-0.5 rounded-md border border-[#EADBCE]">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* ML (Milli Litre) Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-[#2C241E] tracking-wider uppercase">
                    Select Flacon Volume:
                  </span>
                  <span className="text-xs text-[#9A7B38] font-medium">
                    {currentSizeObj.label}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {matchedPerfume.sizes?.map((size) => {
                    const isSelected = size.ml === selectedSize;
                    return (
                      <button
                        key={size.ml}
                        onClick={() => setSelectedSize(size.ml)}
                        className={`py-2 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#D4AF37] bg-[#FFFBEB] text-[#2C241E] shadow-sm ring-1 ring-[#D4AF37]'
                            : 'border-[#EADBCE] bg-white text-[#6E6359] hover:border-[#D4AF37]'
                        }`}
                      >
                        <span className="block text-xs font-bold">{size.ml}</span>
                        <span className="block text-[11px] text-[#9A7B38] font-medium mt-0.5">
                          {formatINR(size.price)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price & Savings in Indian Rupees (₹) */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#2C241E]">
                  {formatINR(currentSizeObj.price)}
                </span>
                {currentSizeObj.originalPrice && (
                  <span className="text-sm sm:text-base text-[#9A8F85] line-through">
                    {formatINR(currentSizeObj.originalPrice)}
                  </span>
                )}
                <span className="bg-[#FEF3C7] text-[#92400E] text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-[#FDE68A]">
                  Complimentary Pan-India Delivery
                </span>
              </div>

            </div>

            {/* ACTION BUTTONS: Add to Cart and Buy Now */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#EADBCE]">
              
              {/* Add to Cart Tag Button */}
              <button
                onClick={() => onAddToCart(matchedPerfume, selectedSize, 1)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border-2 border-[#2C241E] text-[#2C241E] hover:bg-[#2C241E] hover:text-[#FAF7F2] font-semibold text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-xs active:scale-98"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>

              {/* Buy Now Tag Button */}
              <button
                onClick={() => onBuyNow(matchedPerfume, selectedSize)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#DFBE4E] hover:to-[#C6A035] text-[#1C1714] font-bold text-sm tracking-wider uppercase transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg active:scale-98"
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
