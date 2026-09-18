import React from 'react';
import { DESIGNER_BRANDS } from '../data/campaignAds';
import { Crown, Sparkles } from 'lucide-react';

interface DesignerBrandsBarProps {
  onSelectBrand?: (brandName: string) => void;
}

export const DesignerBrandsBar: React.FC<DesignerBrandsBarProps> = ({ onSelectBrand }) => {
  return (
    <section className="py-10 bg-[#F4EFEA] border-y border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Crown className="w-4 h-4 text-[#9A7B38]" />
            <h3 className="text-xs uppercase tracking-[0.25em] font-bold text-[#2C241E]">
              Shop by Haute Parfumerie & Designer Houses
            </h3>
          </div>
          <span className="text-[11px] text-[#7A6A5D] font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            100% Authentic Distributor Stock Guaranteed
          </span>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {DESIGNER_BRANDS.map((brand) => (
            <div
              key={brand.id}
              onClick={() => onSelectBrand && onSelectBrand(brand.name)}
              className="bg-white rounded-2xl p-4 border border-[#EADBCE] shadow-2xs hover:shadow-md hover:border-[#D4AF37] transition-all duration-300 text-center cursor-pointer group flex flex-col justify-center items-center h-24 hover:-translate-y-0.5"
            >
              <p className="font-serif-luxury text-sm font-semibold tracking-wider text-[#2C241E] group-hover:text-[#9A7B38] transition-colors leading-tight">
                {brand.name}
              </p>
              <p className="text-[9px] uppercase tracking-widest text-[#7A6A5D] mt-1 font-mono">
                {brand.country}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
