import React, { useState, useMemo } from 'react';
import { ShoppingBag, Eye, Heart, Star, Sparkles, Check, Droplets, Zap, Flame, Tag } from 'lucide-react';
import { Perfume } from '../types';
import { formatINR } from '../utils/currency';
import { handleImageError } from '../utils/imageFallback';

interface FeaturedPerfumesProps {
  perfumes: Perfume[];
  onAddToCart: (perfume: Perfume, volume?: string, quantity?: number) => void;
  onBuyNow: (perfume: Perfume, volume?: string) => void;
  onQuickView: (perfume: Perfume) => void;
  onToggleWishlist: (perfumeId: string) => void;
  wishlistIds: string[];
  searchQuery?: string;
  categoryFilter?: string;
  onSelectCategory?: (cat: string) => void;
  budgetFilter?: string | null;
  onClearBudget?: () => void;
}

type MainCategoryTab = 'All' | 'Best Sellers' | 'Offers' | 'Men' | 'Women' | 'Unisex' | 'Attar' | 'Gifts';

export const FeaturedPerfumes: React.FC<FeaturedPerfumesProps> = ({
  perfumes,
  onAddToCart,
  onBuyNow,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
  searchQuery = '',
  categoryFilter = 'all',
  onSelectCategory,
  budgetFilter = null,
  onClearBudget,
}) => {
  const [activeTab, setActiveTab] = useState<MainCategoryTab>('All');
  const [selectedVolumes, setSelectedVolumes] = useState<Record<string, string>>({});
  const [addedItemAnimationId, setAddedItemAnimationId] = useState<string | null>(null);

  // Sync categoryFilter from parent if provided
  React.useEffect(() => {
    if (categoryFilter === 'men') setActiveTab('Men');
    else if (categoryFilter === 'women') setActiveTab('Women');
    else if (categoryFilter === 'unisex') setActiveTab('Unisex');
    else if (categoryFilter === 'attar') setActiveTab('Attar');
    else if (categoryFilter === 'gifts') setActiveTab('Gifts');
    else if (categoryFilter === 'sale') setActiveTab('Offers');
    else if (categoryFilter === 'all') setActiveTab('All');
  }, [categoryFilter]);

  const tabs: { id: MainCategoryTab; label: string; icon?: React.ReactNode }[] = [
    { id: 'All', label: 'All Fragrances' },
    { id: 'Best Sellers', label: 'Best Sellers', icon: <Flame className="w-3.5 h-3.5 text-amber-600" /> },
    { id: 'Offers', label: 'Festive Offers', icon: <Tag className="w-3.5 h-3.5 text-rose-600" /> },
    { id: 'Men', label: 'Men / Gents' },
    { id: 'Women', label: 'Women' },
    { id: 'Unisex', label: 'Unisex' },
    { id: 'Attar', label: 'Pure Attar' },
    { id: 'Gifts', label: 'Gift Sets' },
  ];

  const filteredPerfumes = useMemo(() => {
    return perfumes.filter((p) => {
      // Budget filter if active
      if (budgetFilter === 'budget-2499' && p.price > 2499) return false;
      if (budgetFilter === 'budget-4999' && (p.price < 2500 || p.price > 4999)) return false;
      if (budgetFilter === 'budget-7999' && (p.price < 5000 || p.price > 7999)) return false;
      if (budgetFilter === 'budget-luxury' && p.price < 8000) return false;

      // Tab filter
      let matchesTab = true;
      if (activeTab === 'Best Sellers') matchesTab = Boolean(p.isBestSeller);
      else if (activeTab === 'Offers') matchesTab = Boolean(p.isSale || p.originalPrice);
      else if (activeTab === 'Men') matchesTab = p.genderCategory === 'men' || p.genderCategory === 'unisex';
      else if (activeTab === 'Women') matchesTab = p.genderCategory === 'women' || p.genderCategory === 'unisex';
      else if (activeTab === 'Unisex') matchesTab = p.genderCategory === 'unisex';
      else if (activeTab === 'Attar') matchesTab = Boolean(p.isAttar);
      else if (activeTab === 'Gifts') matchesTab = Boolean(p.isGiftSet);

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesTab;

      const matchesQuery =
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.family.toLowerCase().includes(query) ||
        p.notes.top.some((n) => n.toLowerCase().includes(query)) ||
        p.notes.heart.some((n) => n.toLowerCase().includes(query)) ||
        p.notes.base.some((n) => n.toLowerCase().includes(query));

      return matchesTab && matchesQuery;
    });
  }, [perfumes, activeTab, searchQuery, budgetFilter]);

  const handleSelectVolume = (perfumeId: string, ml: string) => {
    setSelectedVolumes((prev) => ({ ...prev, [perfumeId]: ml }));
  };

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
    onBuyNow(perfume, sizeData.ml);
  };

  // Helper for dynamic note badge colors
  const getNoteBadgeStyle = (family: string) => {
    switch (family) {
      case 'Ruby & Crimson':
        return 'bg-[#FFF1F2] text-[#9F1239] border-[#FECDD3]';
      case 'Sapphire Nocturne':
        return 'bg-[#EFF6FF] text-[#1E40AF] border-[#BFDBFE]';
      case 'Emerald Aromatic':
        return 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]';
      case 'Floral Silk':
        return 'bg-[#FFF1F2] text-[#9D174D] border-[#FECDD3]';
      case 'Solar Warmth':
        return 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]';
      case 'Gourmand Vanilla':
        return 'bg-[#FAF5FF] text-[#6B21A8] border-[#E9D5FF]';
      case 'Amber & Woods':
        return 'bg-[#FFFBEB] text-[#78350F] border-[#FCD34D]';
      default:
        return 'bg-[#F0FDFA] text-[#115E59] border-[#99F6E4]';
    }
  };

  return (
    <section id="featured-perfumes" className="py-16 md:py-24 bg-gradient-to-b from-[#FAF6F0] via-[#FFFDF9] to-[#FAF4EC] relative overflow-hidden">
      {/* Colorful Ambient Blobs */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#FCE7F3]/40 to-[#FEF3C7]/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-[#E0F2FE]/40 to-[#EDE9FE]/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FAF7F2] border border-[#EADBCE] text-xs uppercase tracking-[0.25em] text-[#9A7B38] font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Haute Parfumerie Française</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl text-[#2C241E] font-normal tracking-wide">
            Extrait de Parfum & Pure Attar Collection
          </h2>
          <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-3" />
          <p className="text-sm sm:text-base text-[#6E5D53] leading-relaxed">
            Handcrafted in limited batches with 28%–34% pure essential extrait concentration. Select your preferred flacon size in millilitres (ml) with direct doorstep delivery across India.
          </p>
        </div>

        {/* Category & Collection Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  if (onSelectCategory) {
                    if (tab.id === 'Men') onSelectCategory('men');
                    else if (tab.id === 'Women') onSelectCategory('women');
                    else if (tab.id === 'Unisex') onSelectCategory('unisex');
                    else if (tab.id === 'Attar') onSelectCategory('attar');
                    else if (tab.id === 'Gifts') onSelectCategory('gifts');
                    else if (tab.id === 'Offers') onSelectCategory('sale');
                    else onSelectCategory('all');
                  }
                }}
                className={`flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full text-xs tracking-wider uppercase font-semibold transition-all duration-300 cursor-pointer shadow-xs border ${
                  isActive
                    ? 'bg-[#2C241E] text-[#FAF7F2] border-[#2C241E] shadow-md scale-102'
                    : 'bg-white/90 hover:bg-white text-[#5A4D43] border-[#D8C3A5]/60 hover:border-[#D4AF37] hover:shadow-xs'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Notice if filtering by text */}
        {searchQuery && (
          <div className="text-center mb-6 text-xs uppercase tracking-wider text-[#7A6A5D]">
            Showing results matching "{searchQuery}" ({filteredPerfumes.length} found)
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredPerfumes.length === 0 ? (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#EADBCE] max-w-lg mx-auto p-8 shadow-sm">
            <Droplets className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
            <p className="font-serif-luxury text-2xl text-[#2C241E]">No fragrances matched</p>
            <p className="text-sm text-[#6E5D53] mt-2">
              Try exploring our other tabs or resetting your search query.
            </p>
            <button
              onClick={() => setActiveTab('All')}
              className="mt-5 px-6 py-2.5 bg-[#2C241E] text-white text-xs uppercase tracking-wider hover:bg-[#B86B1B] transition-colors cursor-pointer rounded-lg font-medium"
            >
              Show All Fragrances
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
            {filteredPerfumes.map((perfume) => {
              const isWishlisted = wishlistIds.includes(perfume.id);
              const isJustAdded = addedItemAnimationId === perfume.id;
              const sizeData = getPerfumeSizeData(perfume);
              const activeMl = sizeData.ml;

              return (
                <article
                  key={perfume.id}
                  id={`product-card-${perfume.id}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-[#EADBCE] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between hover:-translate-y-1 relative"
                >
                  {/* Card Media Header with Clean Bottle Presentation */}
                  <div
                    className={`relative overflow-hidden bg-gradient-to-b ${perfume.bgGlow || 'from-[#FAF7F2] to-[#F5ECE2]'} aspect-[3/4] flex items-center justify-center cursor-pointer`}
                    onClick={() => onQuickView(perfume)}
                  >
                    {/* Top Left: Category & Sale Badge */}
                    <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 items-start">
                      {perfume.badge && (
                        <span className="bg-[#2C241E]/90 backdrop-blur-sm text-[#FAF7F2] text-[9px] tracking-[0.2em] uppercase px-2.5 py-0.5 rounded-full font-semibold border border-[#D4AF37]/50 shadow-xs">
                          {perfume.badge}
                        </span>
                      )}
                      {perfume.discountPercent && (
                        <span className="bg-[#DC2626] text-white text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full font-bold shadow-xs">
                          Save {perfume.discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Top Right: Wishlist Button */}
                    <button
                      id={`wishlist-btn-${perfume.id}`}
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

                    {/* Clear Perfume Bottle Image (No Sticker Overlay) */}
                    <img
                      src={perfume.image}
                      alt={`${perfume.name} crystal flacon presentation by ZÉLIA`}
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

                    {/* Bottom Right Concentration Seal */}
                    <div className="absolute bottom-3 right-3 z-15 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-md text-[9px] uppercase tracking-widest text-[#7A6A5D] font-mono border border-[#EADBCE] shadow-xs">
                      {perfume.concentration.split(' ')[0]}
                    </div>
                  </div>

                  {/* Card Content & Descriptions */}
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-2.5">
                      
                      {/* Family & Rating */}
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

                      {/* Fragrance Title & Tagline */}
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

                      {/* Product Description */}
                      <p className="text-xs text-[#6E5D53] leading-relaxed line-clamp-2">
                        {perfume.description}
                      </p>

                      {/* Key Olfactory Notes preview */}
                      <div className="pt-1">
                        <div className="flex flex-wrap gap-1.5">
                          {perfume.notes.top.slice(0, 2).concat(perfume.notes.base.slice(0, 1)).map((note) => (
                            <span
                              key={note}
                              className={`text-[10px] px-2.5 py-0.5 rounded-full border font-medium ${getNoteBadgeStyle(perfume.family)}`}
                            >
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Millilitre (ml) Size Selector Options */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A6A5D]">
                          Flacon Volume:
                        </span>
                        <span className="text-[10px] text-[#9A7B38] font-semibold">
                          {activeMl} selected
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-1.5">
                        {perfume.sizes ? (
                          perfume.sizes.map((size) => {
                            const isSelected = size.ml === activeMl;
                            return (
                              <button
                                key={size.ml}
                                onClick={() => handleSelectVolume(perfume.id, size.ml)}
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
                              onClick={() => handleSelectVolume(perfume.id, ml)}
                              className={`py-1.5 px-1 rounded-lg border text-center text-xs transition-all cursor-pointer ${
                                ml === activeMl
                                  ? 'border-[#D4AF37] bg-[#FFFBEB] text-[#2C241E] font-bold ring-1 ring-[#D4AF37]'
                                  : 'border-[#EADBCE] bg-[#FAF7F2] text-[#6E5D53]'
                              }`}
                            >
                              {ml}
                            </button>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Price in Indian Rupees (₹) and Dual CTA Buttons: "Add to Cart" & "Buy Now" */}
                    <div className="pt-3 border-t border-[#F0E6DA] space-y-3">
                      
                      {/* Pricing Row */}
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
                          In Stock • Pan-India
                        </span>
                      </div>

                      {/* DUAL ACTION BUTTONS: Add to Cart and Buy Now */}
                      <div className="grid grid-cols-2 gap-2">
                        
                        {/* "Add to Cart" Tag Button */}
                        <button
                          id={`add-to-cart-btn-${perfume.id}`}
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

                        {/* "Buy Now" Tag Button */}
                        <button
                          id={`buy-now-btn-${perfume.id}`}
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
        )}

      </div>
    </section>
  );
};
