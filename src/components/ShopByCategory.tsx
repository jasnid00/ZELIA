import React from 'react';
import { SHOP_BY_CATEGORIES, CategoryItem } from '../data/perfumes';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ShopByCategoryProps {
  selectedCategory: string;
  onSelectCategory: (categoryKey: string) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section id="shop-categories" className="py-12 bg-[#FAF7F2] border-b border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching user's image styling */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[#9A7B38] text-[11px] uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Curated Olfactory Wardrobe
            </span>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl text-[#2C241E] font-medium tracking-tight">
              Shop by category
            </h2>
          </div>
          
          <button
            onClick={() => onSelectCategory('all')}
            className="text-xs text-[#9A7B38] hover:text-[#2C241E] font-medium tracking-wider uppercase flex items-center gap-1 transition-colors self-start sm:self-auto cursor-pointer"
          >
            <span>View All Creations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Circular Category Grid - EXACT layout and aesthetic as uploaded reference image */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 sm:gap-6 justify-items-center">
          {SHOP_BY_CATEGORIES.map((cat: CategoryItem) => {
            const isSelected = selectedCategory === cat.filterKey;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.filterKey)}
                className="group flex flex-col items-center text-center focus:outline-none cursor-pointer w-full"
              >
                {/* Circular Photo Container */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-1 transition-all duration-300 transform group-hover:scale-105">
                  {/* Subtle active / hover ring */}
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isSelected
                        ? 'ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#FAF7F2] shadow-md'
                        : 'border border-[#EADBCE] group-hover:border-[#D4AF37] group-hover:shadow-sm'
                    }`}
                  />

                  {/* Inner Circular Image */}
                  <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-xs">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Optional pill badge */}
                  {cat.badge && (
                    <span className="absolute -top-1 right-0 bg-[#2C241E] text-[#D4AF37] text-[8px] sm:text-[9px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full border border-[#D4AF37]/50 shadow-xs">
                      {cat.badge}
                    </span>
                  )}
                </div>

                {/* Category Title */}
                <span
                  className={`mt-3 text-sm sm:text-base font-medium tracking-wide transition-colors ${
                    isSelected
                      ? 'text-[#9A7B38] font-semibold'
                      : 'text-[#2C241E] group-hover:text-[#9A7B38]'
                  }`}
                >
                  {cat.name}
                </span>

                {/* Subtitle / Note */}
                <span className="text-[11px] text-[#8C827A] hidden sm:block mt-0.5 tracking-tight">
                  {cat.subLabel}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
