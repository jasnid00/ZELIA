import React from 'react';
import { BUDGET_OPTIONS } from '../data/campaignAds';
import { Tag, ChevronRight } from 'lucide-react';

interface ShopByBudgetProps {
  selectedBudget: string | null;
  onSelectBudget: (budgetId: string | null) => void;
}

export const ShopByBudget: React.FC<ShopByBudgetProps> = ({
  selectedBudget,
  onSelectBudget,
}) => {
  return (
    <section className="py-10 bg-[#FAF7F2] border-b border-[#EADBCE]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[#9A7B38] text-xs font-bold uppercase tracking-[0.2em]">
              <Tag className="w-3.5 h-3.5" />
              <span>Curated Pricing in INR</span>
            </div>
            <h3 className="font-serif-luxury text-2xl text-[#2C241E] font-medium mt-1">
              Shop by Budget
            </h3>
          </div>

          {selectedBudget && (
            <button
              onClick={() => onSelectBudget(null)}
              className="text-xs text-[#9A7B38] hover:underline font-semibold tracking-wider cursor-pointer"
            >
              Clear Price Filter (Show All)
            </button>
          )}
        </div>

        {/* Budget Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BUDGET_OPTIONS.map((opt) => {
            const isSelected = selectedBudget === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => onSelectBudget(isSelected ? null : opt.id)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-[#2C241E] text-white border-[#D4AF37] shadow-lg'
                    : 'bg-white hover:bg-[#F7F3EE] text-[#2C241E] border-[#EADBCE] shadow-2xs hover:border-[#D4AF37]'
                }`}
              >
                {/* Badge */}
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 ${
                  isSelected ? 'bg-[#D4AF37] text-[#140F0C]' : 'bg-[#F4EFEA] text-[#9A7B38]'
                }`}>
                  {opt.badge}
                </span>

                <div className="flex items-center justify-between">
                  <h4 className="font-serif-luxury text-xl font-bold tracking-tight">
                    {opt.label}
                  </h4>
                  <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    isSelected ? 'text-[#D4AF37]' : 'text-[#7A6A5D]'
                  }`} />
                </div>

                <p className={`text-xs mt-1 ${isSelected ? 'text-[#D1C2B5]' : 'text-[#7A6A5D]'}`}>
                  {opt.subLabel}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
