import React, { useState } from 'react';
import { Sparkles, Eye, ShoppingBag, Heart, Star, Compass, Layers, Check, Zap } from 'lucide-react';
import { Perfume } from '../types';
import { COLLECTIONS } from '../data/perfumes';
import { formatINR } from '../utils/currency';
import { handleImageError } from '../utils/imageFallback';

interface ExploreCollectionsProps {
  perfumes: Perfume[];
  onAddToCart: (perfume: Perfume, volume?: string, quantity?: number) => void;
  onBuyNow?: (perfume: Perfume, volume?: string) => void;
  onQuickView: (perfume: Perfume) => void;
  onToggleWishlist: (perfumeId: string) => void;
  wishlistIds: string[];
}

export const ExploreCollections: React.FC<ExploreCollectionsProps> = ({
  perfumes,
  onAddToCart,
  onBuyNow,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
}) => {
  const [activeCollectionId, setActiveCollectionId] = useState<string>('gold-reserve');
  const [addedItemAnimationId, setAddedItemAnimationId] = useState<string | null>(null);
  const [selectedVolumes, setSelectedVolumes] = useState<Record<string, string>>({});

  const activeCollection = COLLECTIONS.find((c) => c.id === activeCollectionId) || COLLECTIONS[0];
  const collectionPerfumes = perfumes.filter((p) => p.collectionId === activeCollectionId);

  const getPerfumeSizeData = (perfume: Perfume) => {
    const selectedMl = selectedVolumes[perfume.id] || (perfume.sizes ? perfume.sizes[0].ml : '100ml');
    const sizeObj = perfume.sizes?.find((s) => s.ml === selectedMl);

    if (sizeObj) {
      return {
        ml: sizeObj.ml,
        price: sizeObj.price,
        originalPrice: sizeObj.originalPrice,
      };
    }

    return {
      ml: '100ml',
      price: perfume.price,
      originalPrice: perfume.originalPrice,
    };
  };

  const handleAddToCart = (perfume: Perfume) => {
    const sizeData = getPerfumeSizeData(perfume);
    onAddToCart(perfume, sizeData.ml, 1);
    setAddedItemAnimationId(perfume.id);
    setTimeout(() => {
      setAddedItemAnimationId(null);
    }, 1800);
  };

  const handleBuyNow = (perfume: Perfume) => {
    const sizeData = getPerfumeSizeData(perfume);
    if (onBuyNow) {
      onBuyNow(perfume, sizeData.ml);
    } else {
      handleAddToCart(perfume);
    }
  };

  // Helper for dynamic aesthetic note badge colors
  const getNoteBadgeStyle = (collectionId: string) => {
    switch (collectionId) {
      case 'flora-couture':
        return 'bg-[#FFF1F2] text-[#9D174D] border-[#FECDD3]';
      case 'gold-reserve':
        return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]';
      case 'nocturne-elixirs':
        return 'bg-[#FAF5FF] text-[#6B21A8] border-[#E9D5FF]';
      case 'brumes-solaires':
        return 'bg-[#F0FDFA] text-[#115E59] border-[#99F6E4]';
      case 'coffrets-voyage':
        return 'bg-[#FEF9C3] text-[#854D0E] border-[#FDE047]';
      default:
        return 'bg-[#FAF7F2] text-[#6E5D53] border-[#EADBCE]';
    }
  };

  // Collection aesthetic tab accents
  const getTabStyle = (colId: string, isActive: boolean) => {
    if (!isActive) {
      return 'bg-white/80 hover:bg-white text-[#5A4D43] border-[#D8C3A5]/60 hover:border-[#D4AF37] hover:shadow-sm';
    }
    switch (colId) {
      case 'flora-couture':
        return 'bg-gradient-to-r from-[#9D174D] to-[#C45B73] text-white border-[#9D174D] shadow-lg scale-102';
      case 'gold-reserve':
        return 'bg-gradient-to-r from-[#2C241E] to-[#B86B1B] text-white border-[#B86B1B] shadow-lg scale-102';
      case 'nocturne-elixirs':
        return 'bg-gradient-to-r from-[#4A1D6D] to-[#6B21A8] text-white border-[#6B21A8] shadow-lg scale-102';
      case 'brumes-solaires':
        return 'bg-gradient-to-r from-[#0F766E] to-[#0D9488] text-white border-[#0D9488] shadow-lg scale-102';
      case 'coffrets-voyage':
        return 'bg-gradient-to-r from-[#854D0E] to-[#D97706] text-white border-[#D97706] shadow-lg scale-102';
      default:
        return 'bg-[#2C241E] text-white shadow-md';
    }
  };

  return (
    <section id="explore-collections" className="py-20 md:py-28 bg-gradient-to-b from-[#FAF4EC] via-[#FFFDF9] to-[#FAF6F0] relative overflow-hidden border-t border-[#EADBCE]/80">
      
      {/* Aesthetic Colorful Ambient Accents */}
      <div className="absolute top-10 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-[#FEF3C7]/30 via-[#FCE7F3]/30 to-[#E0F2FE]/30 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#EADBCE] text-xs uppercase tracking-[0.25em] text-[#9A7B38] font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Five Olfactory Anthologies</span>
          </div>

          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#2C241E] font-normal tracking-wide">
            Explore The Collections
          </h2>

          <div className="w-24 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-3" />

          <p className="text-sm sm:text-base text-[#6E5D53] leading-relaxed">
            Discover the five thematic fragrance worlds of Maison ZÉLIA. Every flacon houses unadulterated botanical extraits aged to perfection in Grasse with direct Indian Rupee pricing.
          </p>
        </div>

        {/* Collection Selector Tabs with Colorful Accents */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-12">
          {COLLECTIONS.map((col) => {
            const isActive = activeCollectionId === col.id;
            return (
              <button
                key={col.id}
                id={`collection-tab-${col.id}`}
                onClick={() => setActiveCollectionId(col.id)}
                className={`px-5 py-3 rounded-xl text-xs tracking-[0.16em] uppercase font-semibold transition-all duration-300 flex items-center gap-2.5 cursor-pointer border ${getTabStyle(
                  col.id,
                  isActive
                )}`}
              >
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#FAF7F2]' : 'bg-[#D4AF37]'}`} />
                <span>{col.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Collection Story Hero Banner with Signature Gradient */}
        <div className={`rounded-3xl border-2 border-[#D4AF37]/50 p-6 sm:p-10 mb-12 shadow-xl relative overflow-hidden bg-gradient-to-br ${activeCollection.gradientBg || 'from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-3.5 text-left">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-[#2C241E] text-[#D4AF37] text-[10px] tracking-[0.2em] uppercase font-bold px-3 py-1 rounded-full border border-[#D4AF37]/50 shadow-xs">
                  {activeCollection.badge}
                </span>
                <span className="text-xs font-serif-luxury italic text-[#78350F]">
                  {activeCollection.frenchName}
                </span>
              </div>

              <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#2C241E] font-medium leading-tight">
                {activeCollection.name}
              </h3>

              <p className="font-serif-luxury italic text-lg sm:text-xl text-[#92400E]">
                “{activeCollection.tagline}”
              </p>

              <p className="text-sm text-[#5A4D43] leading-relaxed max-w-2xl">
                {activeCollection.description}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#78350F]">
                <Layers className="w-4 h-4 text-[#D4AF37]" />
                <span>Signature Sensory Essence: <strong>{activeCollection.accentNote}</strong></span>
              </div>
            </div>

            {/* Right Highlights in Banner */}
            <div className="lg:col-span-4 bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-[#EADBCE] shadow-sm text-left space-y-3">
              <span className="text-[10px] tracking-[0.25em] uppercase font-bold text-[#B86B1B] block">
                Maison Sillage Seal
              </span>
              <p className="text-xs text-[#6E5D53] leading-relaxed">
                Hand-formulated with slow maceration in copper vessels. All flacons arrive with complimentary tasting vials and express courier across India.
              </p>
              <div className="pt-2 border-t border-[#EADBCE] flex items-center justify-between text-xs text-[#2C241E] font-medium">
                <span>Pan-India Transit: <strong>2 - 4 Days</strong></span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">Free Shipping</span>
              </div>
            </div>

          </div>
        </div>

        {/* Collection Flacons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
          {collectionPerfumes.map((perfume) => {
            const isWishlisted = wishlistIds.includes(perfume.id);
            const isJustAdded = addedItemAnimationId === perfume.id;
            const sizeData = getPerfumeSizeData(perfume);
            const activeMl = sizeData.ml;

            return (
              <article
                key={perfume.id}
                id={`collection-card-${perfume.id}`}
                className="group bg-white rounded-3xl overflow-hidden border border-[#EADBCE] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1 relative"
              >
                {/* Media Presentation */}
                <div
                  className={`relative overflow-hidden bg-gradient-to-b ${perfume.bgGlow || 'from-[#FAF7F2] to-[#F5ECE2]'} aspect-[3/4] flex items-center justify-center cursor-pointer`}
                  onClick={() => onQuickView(perfume)}
                >
                  {perfume.badge && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-[#2C241E]/90 backdrop-blur-sm text-[#FAF7F2] text-[9px] tracking-[0.2em] uppercase px-2.5 py-0.5 rounded-full font-semibold border border-[#D4AF37]/50 shadow-xs">
                        {perfume.badge}
                      </span>
                    </div>
                  )}

                  <button
                    id={`col-wishlist-${perfume.id}`}
                    aria-label="Add to wishlist"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(perfume.id);
                    }}
                    className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-[#2C241E] hover:text-[#C45B73] transition-all cursor-pointer border border-[#EADBCE] hover:scale-110"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? 'fill-[#C45B73] text-[#C45B73]' : ''
                      }`}
                    />
                  </button>

                  <img
                    src={perfume.image}
                    alt={`${perfume.name} crystal presentation`}
                    onError={(e) => handleImageError(e, perfume.name, perfume.accentColor)}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Hover Quick View Overlay Action */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C241E]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6 z-20">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickView(perfume);
                      }}
                      className="w-full py-3 bg-white/95 text-[#2C241E] rounded-xl text-xs font-semibold tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#2C241E] hover:text-white cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-[#D4AF37]" />
                      <span>Inspect Notes & Accords</span>
                    </button>
                  </div>

                  <div className="absolute bottom-3 right-3 z-15 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[9px] uppercase tracking-widest text-[#7A6A5D] font-mono border border-[#EADBCE] shadow-xs">
                    {perfume.concentration.split(' ')[0]}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-2.5">
                    
                    <div className="flex items-center justify-between text-[11px] text-[#7A6A5D]">
                      <span className="uppercase tracking-[0.2em] font-semibold text-[#B86B1B]">
                        {perfume.family}
                      </span>
                      <div className="flex items-center gap-1 text-[#D4AF37]">
                        <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                        <span className="text-[#2C241E] font-semibold text-xs">
                          {perfume.rating.toFixed(2)}
                        </span>
                        <span className="text-[#7A6A5D] text-[10px]">({perfume.reviewsCount})</span>
                      </div>
                    </div>

                    <div>
                      <h3
                        onClick={() => onQuickView(perfume)}
                        className="font-serif-luxury text-2xl text-[#2C241E] hover:text-[#B86B1B] transition-colors cursor-pointer font-medium leading-tight"
                      >
                        {perfume.name}
                      </h3>
                      <p className="text-xs text-[#7A6A5D] font-normal tracking-wide mt-0.5">
                        {perfume.subTitle} • {perfume.concentration}
                      </p>
                    </div>

                    <p className="text-xs text-[#6E5D53] leading-relaxed line-clamp-2">
                      {perfume.description}
                    </p>

                    <div className="pt-1">
                      <div className="flex flex-wrap gap-1.5">
                        {perfume.notes.top.slice(0, 2).concat(perfume.notes.base.slice(0, 1)).map((note) => (
                          <span
                            key={note}
                            className={`text-[10px] px-2.5 py-0.5 rounded-full border font-medium ${getNoteBadgeStyle(perfume.collectionId)}`}
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Millilitre (ml) Size Selector */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6A5D]">
                        Flacon Volume:
                      </span>
                      <span className="text-[10px] text-[#9A7B38] font-semibold">
                        {activeMl}
                      </span>
                    </div>

                    <div className="grid grid-cols-4 gap-1.5">
                      {perfume.sizes ? (
                        perfume.sizes.map((size) => {
                          const isSelected = size.ml === activeMl;
                          return (
                            <button
                              key={size.ml}
                              onClick={() => setSelectedVolumes((prev) => ({ ...prev, [perfume.id]: size.ml }))}
                              className={`py-1.5 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'border-[#D4AF37] bg-[#FFFBEB] text-[#2C241E] font-bold shadow-2xs ring-1 ring-[#D4AF37]'
                                  : 'border-[#EADBCE] bg-[#FAF7F2] text-[#6E5D53] hover:border-[#D4AF37]'
                              }`}
                            >
                              <span className="block text-[11px] leading-tight">{size.ml}</span>
                              <span className="block text-[9px] text-[#9A7B38] mt-0.5 leading-tight">
                                {formatINR(size.price)}
                              </span>
                            </button>
                          );
                        })
                      ) : (
                        ['50ml', '100ml', '200ml'].map((ml) => (
                          <button
                            key={ml}
                            onClick={() => setSelectedVolumes((prev) => ({ ...prev, [perfume.id]: ml }))}
                            className="py-1 px-1 rounded-md border text-xs"
                          >
                            {ml}
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Price & Actions: Add to Cart and Buy Now */}
                  <div className="pt-3 border-t border-[#F0E6DA] space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-serif-luxury font-bold text-[#2C241E]">
                          {formatINR(sizeData.price)}
                        </span>
                        {sizeData.originalPrice && (
                          <span className="text-xs text-[#9A8B80] line-through">
                            {formatINR(sizeData.originalPrice)}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
                        Pan-India Delivery
                      </span>
                    </div>

                    {/* Dual Action Buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        id={`col-add-cart-${perfume.id}`}
                        onClick={() => handleAddToCart(perfume)}
                        disabled={isJustAdded}
                        className={`py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-xs border border-[#2C241E] ${
                          isJustAdded
                            ? 'bg-[#059669] text-white border-[#059669]'
                            : 'bg-white text-[#2C241E] hover:bg-[#2C241E] hover:text-white'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5 text-[#9A7B38]" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>

                      <button
                        id={`col-buy-now-${perfume.id}`}
                        onClick={() => handleBuyNow(perfume)}
                        className="py-2.5 px-3 rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer shadow-md bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#DFBE4E] hover:to-[#C6A035] text-[#1C1714] active:scale-98"
                      >
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        <span>Buy Now</span>
                      </button>
                    </div>

                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
