import React, { useState } from 'react';
import { X, ShoppingBag, Heart, Star, Check, Sparkles, Shield, Clock, Wind, Zap } from 'lucide-react';
import { Perfume } from '../types';
import { formatINR } from '../utils/currency';
import { handleImageError } from '../utils/imageFallback';

interface ProductQuickViewModalProps {
  perfume: Perfume | null;
  onClose: () => void;
  onAddToCart: (perfume: Perfume, volume: string, quantity: number) => void;
  onBuyNow?: (perfume: Perfume, volume: string) => void;
  onToggleWishlist: (perfumeId: string) => void;
  isWishlisted: boolean;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  perfume,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('100ml');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  if (!perfume) return null;

  // Derive size options from perfume.sizes if available or fallback
  const availableSizes = perfume.sizes || [
    { ml: '10ml', label: '10ml Pocket Extrait', price: Math.round(perfume.price * 0.22) },
    { ml: '50ml', label: '50ml Eau de Parfum', price: Math.round(perfume.price * 0.65) },
    { ml: '100ml', label: '100ml Extrait Standard', price: perfume.price, originalPrice: perfume.originalPrice },
    { ml: '200ml', label: '200ml Grand Decanter', price: Math.round(perfume.price * 1.7) },
  ];

  const currentSizeObj = availableSizes.find((s) => s.ml === selectedSize) || availableSizes[0];
  const unitPrice = currentSizeObj.price;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(perfume, selectedSize, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const handleBuy = () => {
    if (onBuyNow) {
      onBuyNow(perfume, selectedSize);
      onClose();
    } else {
      handleAdd();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1714]/75 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EE] rounded-3xl border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="modal-close-btn"
          aria-label="Close perfume details"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 text-[#7A6A5D] hover:text-[#2C241E] bg-white/80 rounded-full transition-colors cursor-pointer border border-[#EADBCE] shadow-sm hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 p-6 sm:p-8">
          
          {/* Left Column: Flacon Photography */}
          <div className="md:col-span-6 flex flex-col items-center justify-center bg-gradient-to-b from-white to-[#FDF9F3] rounded-2xl p-4 border border-[#EADBCE] shadow-sm">
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-xl border border-[#D4AF37]/30">
              {/* Clean Flacon Image (No Sticker Overlay) */}
              <img
                src={perfume.image}
                alt={perfume.name}
                onError={(e) => handleImageError(e, perfume.name, perfume.accentColor)}
                className="w-full h-full object-cover object-center"
              />

              {perfume.badge && (
                <span className="absolute bottom-3 left-3 z-20 bg-[#2C241E]/90 backdrop-blur-sm text-[#FAF7F2] text-[10px] tracking-[0.2em] uppercase px-3 py-1 rounded-full border border-[#D4AF37]/60 font-semibold shadow-xs">
                  {perfume.badge}
                </span>
              )}

              {perfume.discountPercent && (
                <span className="absolute top-3 left-3 z-20 bg-[#DC2626] text-white text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full font-bold shadow-xs">
                  Save {perfume.discountPercent}%
                </span>
              )}
            </div>
            
            {/* Concentration Hallmark */}
            <div className="mt-4 flex items-center justify-center gap-4 text-xs text-[#7A6A5D] font-medium">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> {perfume.longevity}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Wind className="w-3.5 h-3.5 text-[#D4AF37]" /> {perfume.sillage} Sillage
              </span>
            </div>
          </div>

          {/* Right Column: Details & Olfactory Breakdown */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Family & Rating */}
              <div className="flex items-center justify-between text-xs text-[#7A6A5D] mb-1.5">
                <span className="uppercase tracking-[0.2em] font-semibold text-[#B86B1B]">
                  {perfume.family}
                </span>
                <div className="flex items-center gap-1 text-[#D4AF37]">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  <span className="font-semibold text-[#2C241E]">{perfume.rating}</span>
                  <span className="text-[#7A6A5D]">({perfume.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#2C241E] font-medium leading-tight">
                  {perfume.name}
                </h2>
                <p className="text-sm font-serif-luxury italic text-[#B86B1B] mt-0.5">
                  “{perfume.tagline}”
                </p>
              </div>

              {/* Price in Indian Rupees */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-serif-luxury text-3xl font-bold text-[#2C241E]">
                  {formatINR(totalPrice)}
                </span>
                {currentSizeObj.originalPrice && (
                  <span className="text-sm text-[#9A8F85] line-through">
                    {formatINR(currentSizeObj.originalPrice * quantity)}
                  </span>
                )}
                <span className="text-xs tracking-wider uppercase text-[#7A6A5D] font-medium">
                  {selectedSize} • Complimentary Pan-India Delivery
                </span>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#5A4D43] leading-relaxed mt-3">
                {perfume.description}
              </p>

              {/* Olfactory Pyramid */}
              <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-[#FFFBEB] via-[#FFF8F0] to-[#FDF2F8] border border-[#D4AF37]/40 space-y-2 shadow-xs">
                <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-[#B86B1B]">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>The Olfactory Architecture</span>
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#2C241E] w-12 shrink-0">Top:</span>
                    <span className="text-[#5A4D43] font-medium">{perfume.notes.top.join(' • ')}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#2C241E] w-12 shrink-0">Heart:</span>
                    <span className="text-[#5A4D43] font-medium">{perfume.notes.heart.join(' • ')}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold text-[#2C241E] w-12 shrink-0">Base:</span>
                    <span className="text-[#5A4D43] font-medium">{perfume.notes.base.join(' • ')}</span>
                  </div>
                </div>
              </div>

              {/* Millilitre (ml) Size Selector Options */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="uppercase tracking-wider font-semibold text-[#5A4D43]">
                    Select Flacon Volume (ml):
                  </label>
                  <span className="text-[#9A7B38] font-medium">{currentSizeObj.label}</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size.ml}
                      onClick={() => setSelectedSize(size.ml)}
                      className={`py-2 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                        selectedSize === size.ml
                          ? 'border-[#D4AF37] bg-[#2C241E] text-white shadow-sm ring-1 ring-[#D4AF37]'
                          : 'border-[#EADBCE] bg-white text-[#5A4D43] hover:border-[#D4AF37]'
                      }`}
                    >
                      <span className="block text-xs font-bold">{size.ml}</span>
                      <span className={`block text-[10px] mt-0.5 ${selectedSize === size.ml ? 'text-[#D4AF37]' : 'text-[#9A7B38]'}`}>
                        {formatINR(size.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Actions: Add to Cart and Buy Now */}
            <div className="pt-3 border-t border-[#F0E6DA] space-y-3">
              
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-[#EADBCE] rounded-xl bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2 py-0.5 text-sm font-semibold text-[#7A6A5D] hover:text-[#2C241E] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-2 text-xs font-semibold text-[#2C241E]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 py-0.5 text-sm font-semibold text-[#7A6A5D] hover:text-[#2C241E] cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Wishlist Toggle */}
                <button
                  id="modal-wishlist-toggle"
                  onClick={() => onToggleWishlist(perfume.id)}
                  aria-label="Wishlist toggle"
                  className="p-3 border border-[#EADBCE] bg-white rounded-xl hover:text-[#C45B73] transition-colors cursor-pointer shadow-2xs"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      isWishlisted ? 'fill-[#C45B73] text-[#C45B73]' : 'text-[#7A6A5D]'
                    }`}
                  />
                </button>
              </div>

              {/* DUAL ACTION BUTTONS: Add to Cart & Buy Now */}
              <div className="grid grid-cols-2 gap-2.5">
                
                {/* Add to Cart Tag Button */}
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  disabled={isAdded}
                  className={`py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs border border-[#2C241E] ${
                    isAdded
                      ? 'bg-[#059669] text-white border-[#059669]'
                      : 'bg-white text-[#2C241E] hover:bg-[#2C241E] hover:text-white'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#9A7B38]" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {/* Buy Now Tag Button */}
                <button
                  id="modal-buy-now-btn"
                  onClick={handleBuy}
                  className="py-3 px-4 rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#DFBE4E] hover:to-[#C6A035] text-[#1C1714] active:scale-98"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Buy Now</span>
                </button>

              </div>

              {/* Guarantees */}
              <div className="flex items-center justify-center gap-4 text-[10px] text-[#7A6A5D] uppercase tracking-wider font-medium pt-1">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-[#D4AF37]" /> Free India Delivery
                </span>
                <span>•</span>
                <span>Includes 2ml Tasting Vial</span>
                <span>•</span>
                <span>100% Genuine Grasse Extrait</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
