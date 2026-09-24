import React, { useState } from 'react';
import { Sparkles, ArrowRight, Star, Compass, ShoppingBag, Zap } from 'lucide-react';
import { HERO_IMAGE, PERFUMES } from '../data/perfumes';
import { ZeliaLogo } from './ZeliaLogo';
import { formatINR } from '../utils/currency';
import { Perfume } from '../types';
import { handleImageError } from '../utils/imageFallback';

interface HeroProps {
  onShopNow: () => void;
  onExploreCollection: () => void;
  onOpenQuiz: () => void;
  onAddToCart?: (perfume: Perfume, volume?: string, quantity?: number) => void;
  onBuyNow?: (perfume: Perfume, volume?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopNow,
  onExploreCollection,
  onOpenQuiz,
  onAddToCart,
  onBuyNow,
}) => {
  const heroPerfume = PERFUMES[0]; // Lumina d'Or
  const [selectedMl, setSelectedMl] = useState<string>('100ml');

  const currentSizeObj = heroPerfume.sizes?.find((s) => s.ml === selectedMl) || {
    ml: '100ml',
    price: heroPerfume.price,
    originalPrice: heroPerfume.originalPrice,
  };

  const handleHeroAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(heroPerfume, selectedMl, 1);
    } else {
      onShopNow();
    }
  };

  const handleHeroBuyNow = () => {
    if (onBuyNow) {
      onBuyNow(heroPerfume, selectedMl);
    } else {
      onShopNow();
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF3EC] to-[#F5ECE2] border-b border-[#EADBCE]/80">
      {/* Aesthetic Colorful Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FCE7F3]/60 via-[#FDF2E9]/50 to-[#FEF3C7]/60 blur-3xl pointer-events-none -z-0 animate-pulse-aura" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] rounded-full bg-gradient-to-bl from-[#FEF3C7]/60 via-[#FCE7F3]/40 to-[#E0F2FE]/50 blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text & Call to Action */}
          <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left space-y-6">
            
            {/* House Crest Emblem & Aesthetic Pill */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <ZeliaLogo variant="crest" size="sm" />
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FFF1F2] via-[#FEF3C7] to-[#F0FDFA] border border-[#D4AF37]/50 text-[11px] sm:text-xs font-semibold tracking-[0.25em] text-[#854D0E] uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Haute Parfumerie Française • Grasse
              </span>
            </div>

            {/* Brand Title */}
            <div className="space-y-1">
              <h1 className="font-serif-luxury text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.22em] text-[#2C241E] font-normal leading-[1.05]">
                ZÉLIA
              </h1>
              <p className="text-[12px] sm:text-[13px] tracking-[0.45em] uppercase text-[#B86B1B] font-semibold pt-1">
                PARFUMS DE GRASSE • PARIS
              </p>
            </div>

            {/* Tagline */}
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif-luxury italic text-[#3E2F23] leading-relaxed max-w-xl mx-auto lg:mx-0">
              “A scent that lingers long after you leave.”
            </blockquote>

            {/* Sub-description with warm champagne and floral notes */}
            <p className="text-sm sm:text-base text-[#6E5D53] font-normal leading-relaxed max-w-lg mx-auto lg:mx-0">
              Crafted in the sun-drenched floral hills of Grasse with rare May rose distillates,
              golden Baltic ambers, and uncompromised 30% extrait concentration.
              Designed for the presence that cannot be forgotten.
            </p>

            {/* Aesthetic Colorful Scent Notes Palette */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#8C7A6B] mr-1">
                Signature Accords:
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#FFF1F2] text-[#9D174D] border border-[#FECDD3]">
                Grasse Centifolia Rose
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]">
                Liquid Solar Amber
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#FAF5FF] text-[#6B21A8] border border-[#E9D5FF]">
                Smoked Madagascar Vanilla
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                Calabrian Neroli
              </span>
            </div>

            {/* CTAs: Shop Now & Explore Collection */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="hero-shop-now-btn"
                onClick={onShopNow}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#2C241E] to-[#43352B] text-[#FAF7F2] hover:from-[#43352B] hover:to-[#2C241E] text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 cursor-pointer group rounded-xl"
              >
                <span>Shop All Fragrances</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-explore-collection-btn"
                onClick={onExploreCollection}
                className="w-full sm:w-auto px-8 py-4 border-2 border-[#D4AF37] text-[#2C241E] bg-white/70 hover:bg-[#2C241E] hover:text-[#FAF7F2] hover:border-[#2C241E] text-xs font-semibold tracking-[0.25em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer rounded-xl backdrop-blur-sm shadow-xs"
              >
                <span>Explore 5 Collections</span>
              </button>
            </div>

            {/* Trust / Luxury Hallmarks */}
            <div className="pt-6 border-t border-[#D8C3A5]/70 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <p className="text-xl font-serif-luxury text-[#B86B1B] font-bold">30%–34%</p>
                <p className="text-[10px] tracking-wider uppercase text-[#7A6A5D] font-medium">Pure Extrait</p>
              </div>
              <div>
                <p className="text-xl font-serif-luxury text-[#B86B1B] font-bold">18+ Hours</p>
                <p className="text-[10px] tracking-wider uppercase text-[#7A6A5D] font-medium">Enduring Sillage</p>
              </div>
              <div>
                <p className="text-xl font-serif-luxury text-[#B86B1B] font-bold flex items-center justify-center lg:justify-start gap-1">
                  4.96 <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                </p>
                <p className="text-[10px] tracking-wider uppercase text-[#7A6A5D] font-medium">Pan-India Delivery</p>
              </div>
            </div>

          </div>

          {/* Right Image Composition */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Multi-color radiant backlights */}
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-r from-[#FDE68A]/50 via-[#FBCFE8]/40 to-[#BAE6FD]/40 blur-3xl -z-10 animate-pulse-aura" />

            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Luxury Perfume Visual Frame */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl border-2 border-[#D4AF37]/50 bg-gradient-to-b from-[#FFFDF9] to-[#FAF3EC] group">
                
                {/* Main Flacon Image (Clean, No sticker) */}
                <img
                  src={HERO_IMAGE}
                  alt="ZÉLIA Haute Parfumerie signature bottle on champagne silk with white blossoms"
                  onError={(e) => handleImageError(e, 'Lumina d’Or', '#D4AF37')}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 aspect-[16/12]"
                />
                
                {/* Floating Interactive Flacon Card with INR Price, ml Selector & Quick Actions */}
                <div className="p-4 sm:p-5 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#D4AF37]/40">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#B86B1B] font-bold">
                        Signature Masterpiece
                      </span>
                      <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        In Stock
                      </span>
                    </div>

                    {/* Price in Indian Rupees */}
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#2C241E]">
                        {formatINR(currentSizeObj.price)}
                      </span>
                      {currentSizeObj.originalPrice && (
                        <span className="text-xs text-[#9A8F85] line-through">
                          {formatINR(currentSizeObj.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-serif-luxury text-lg sm:text-xl text-[#2C241E] font-medium">
                    Lumina d’Or • Extrait de Parfum
                  </h3>

                  {/* Millilitre (ml) Quick Selection */}
                  <div className="flex items-center justify-between gap-2 my-2.5">
                    <span className="text-[10px] uppercase tracking-wider text-[#7A6A5D] font-medium">
                      Select Size:
                    </span>
                    <div className="flex gap-1.5">
                      {heroPerfume.sizes?.map((size) => (
                        <button
                          key={size.ml}
                          onClick={() => setSelectedMl(size.ml)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            selectedMl === size.ml
                              ? 'bg-[#2C241E] text-white border-[#2C241E] shadow-2xs'
                              : 'bg-white text-[#5A4D43] border-[#EADBCE] hover:border-[#D4AF37]'
                          }`}
                        >
                          {size.ml}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dual Action Buttons on Hero Flacon: Add to Cart and Buy Now */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={handleHeroAddToCart}
                      className="py-2 px-3 rounded-xl border border-[#2C241E] text-[#2C241E] hover:bg-[#2C241E] hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-98"
                    >
                      <ShoppingBag className="w-3.5 h-3.5 text-[#9A7B38]" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={handleHeroBuyNow}
                      className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#DFBE4E] hover:to-[#C6A035] text-[#1C1714] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer active:scale-98"
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Floating Scent Quiz pill on the side */}
              <div 
                onClick={onOpenQuiz}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-gradient-to-r from-[#2C241E] to-[#3B2C21] text-[#FAF7F2] p-3.5 rounded-xl shadow-2xl border border-[#D4AF37]/60 flex items-center gap-3 cursor-pointer hover:scale-105 transition-transform z-30"
              >
                <div className="w-9 h-9 rounded-full bg-[#D4AF37]/25 flex items-center justify-center text-[#F3D17A]">
                  <Compass className="w-4 h-4" />
                </div>
                <div className="text-left pr-1">
                  <p className="text-[9px] uppercase tracking-wider text-[#D4AF37] font-bold">Fragrance Atelier</p>
                  <p className="text-xs font-serif-luxury font-medium text-white">Find Your Scent</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
