import React, { useState } from 'react';
import { Tag, Sparkles, Gift, Percent, Copy, Check, ArrowRight } from 'lucide-react';

interface OffersSectionProps {
  onExploreOffers: () => void;
}

export const OffersSection: React.FC<OffersSectionProps> = ({ onExploreOffers }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2500);
  };

  const offers = [
    {
      id: 'offer-1',
      code: 'ZELIA20',
      title: 'Grand Festive Privilege',
      discount: 'Flat 20% Off',
      description: 'Applicable on all 100ml & 200ml Extraits de Parfum. Includes complimentary satin travel pouch.',
      expiry: 'Limited Time Celebration',
      accentColor: 'from-[#FEF3C7] to-[#FDE68A]',
      borderColor: 'border-[#D4AF37]',
      textColor: 'text-[#92400E]',
    },
    {
      id: 'offer-2',
      code: 'ROYALGIFT',
      title: 'Complimentary Travel Extrait',
      discount: 'Free 10ml Flacon',
      description: 'Receive a complimentary 10ml Travel Extrait of your choice with every order above ₹6,999.',
      expiry: 'Auto-applied at checkout',
      accentColor: 'from-[#FFE4E6] to-[#FECDD3]',
      borderColor: 'border-[#F43F5E]/50',
      textColor: 'text-[#9F1239]',
    },
    {
      id: 'offer-3',
      code: 'HEIRLOOM',
      title: '24K Gold Coffret Gift Packaging',
      discount: 'Complimentary ₹999 Gift Box',
      description: 'Handcrafted rigid wooden coffret finished with 24k gold leaf hot-stamping and wax-sealed note.',
      expiry: 'On all orders across India',
      accentColor: 'from-[#EDE9FE] to-[#DDD6FE]',
      borderColor: 'border-[#8B5CF6]/50',
      textColor: 'text-[#5B21B6]',
    },
  ];

  return (
    <section className="py-16 bg-[#FAF7F2] border-b border-[#EADBCE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-[#9A7B38] text-xs uppercase tracking-[0.25em] font-semibold flex items-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Exclusive Privileges & Deals
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#2C241E] font-medium tracking-tight">
              Curated Festive Offers
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#7E7368] max-w-md">
            Unlock exclusive privilege codes for hand-blended extraits, complimentary discovery vials, and ceremonial gift boxing.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`relative rounded-2xl bg-gradient-to-br ${offer.accentColor} p-6 border ${offer.borderColor} shadow-sm flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-2.5 py-1 rounded-full bg-white/80 ${offer.textColor}`}>
                    {offer.expiry}
                  </span>
                  <Tag className={`w-4 h-4 ${offer.textColor}`} />
                </div>

                <h3 className="font-serif-luxury text-xl font-bold text-[#1C1714]">
                  {offer.discount}
                </h3>
                <h4 className="text-sm font-semibold text-[#2C241E] mt-0.5">
                  {offer.title}
                </h4>
                <p className="text-xs text-[#5A5046] mt-2 leading-relaxed">
                  {offer.description}
                </p>
              </div>

              {/* Promo Code Copy Pill */}
              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#6E6359] block">Coupon Code</span>
                  <span className="font-mono font-bold text-sm tracking-wider text-[#1C1714]">{offer.code}</span>
                </div>

                <button
                  onClick={() => handleCopy(offer.code)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-xs font-semibold text-[#2C241E] border border-black/10 transition-colors shadow-2xs cursor-pointer active:scale-95"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Applied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#9A7B38]" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
