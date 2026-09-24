import React from 'react';
import { X, Heart, ShoppingBag, Eye, Trash2 } from 'lucide-react';
import { Perfume } from '../types';
import { formatINR } from '../utils/currency';
import { handleImageError } from '../utils/imageFallback';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistPerfumes: Perfume[];
  onRemoveWishlist: (perfumeId: string) => void;
  onAddToCart: (perfume: Perfume) => void;
  onQuickView: (perfume: Perfume) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistPerfumes,
  onRemoveWishlist,
  onAddToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1714]/70 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-[#FAF7F2] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D8C3A5] text-[#2C241E] max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#EADBCE]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#C5A059] fill-[#C5A059]" />
            <h2 className="font-serif-luxury text-2xl font-medium">
              Your Saved Flacons ({wishlistPerfumes.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#7A6A5D] hover:text-[#2C241E] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {wishlistPerfumes.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Heart className="w-12 h-12 text-[#D8C3A5] mx-auto" />
              <p className="font-serif-luxury text-xl text-[#2C241E]">
                No Saved Fragrances Yet
              </p>
              <p className="text-xs text-[#6E5D53]">
                Click the heart icon on any ZÉLIA creation to curate your private wishlist.
              </p>
            </div>
          ) : (
            wishlistPerfumes.map((perfume) => (
              <div
                key={perfume.id}
                className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-[#EADBCE] shadow-sm gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-[#EADBCE] bg-[#FAF7F2]">
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      onError={(e) => handleImageError(e, perfume.name, perfume.accentColor)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-lg font-medium text-[#2C241E]">
                      {perfume.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#B86B1B]">
                      {perfume.family} • {formatINR(perfume.price)}
                    </p>
                    <p className="text-[10px] text-[#9A8A7D] line-clamp-1 mt-0.5">
                      {perfume.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onQuickView(perfume);
                      onClose();
                    }}
                    title="View details"
                    className="p-2 text-[#7A6A5D] hover:text-[#2C241E] border border-[#EADBCE] rounded-xl cursor-pointer transition-colors bg-[#FAF7F2]"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onAddToCart(perfume);
                    }}
                    className="px-3.5 py-2 bg-[#2C241E] text-white hover:bg-[#C5A059] text-xs uppercase tracking-wider font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                  <button
                    onClick={() => onRemoveWishlist(perfume.id)}
                    title="Remove from wishlist"
                    className="p-2 text-[#9A8A7D] hover:text-[#8B0000] cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
