import React from 'react';
import { ShieldCheck, Truck, Gift, Banknote, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export const AuthenticGuaranteesBar: React.FC = () => {
  const guarantees = [
    {
      icon: ShieldCheck,
      title: '100% Authentic & Original',
      desc: 'Sourced directly from official Grasse & Dubai distributors with batch code authenticity verification.',
    },
    {
      icon: Truck,
      title: 'Express Pan-India Shipping',
      desc: 'Free 2-4 day express courier with real-time tracking on all orders above ₹2,999.',
    },
    {
      icon: Gift,
      title: '3x Free Deluxe Samples',
      desc: 'Receive three 2ml luxury discovery vials of newest extraits with every full flacon.',
    },
    {
      icon: Banknote,
      title: 'COD & Instant UPI',
      desc: 'Zero-hassle payments via Cash on Delivery, Google Pay, PhonePe, Cards & NetBanking.',
    },
  ];

  return (
    <section className="bg-white border-y border-[#EADBCE] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#FAF7F2]/60 border border-[#EADBCE]/50">
                <div className="p-2.5 rounded-xl bg-[#2C241E] text-[#D4AF37] shrink-0 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C241E] flex items-center gap-1.5">
                    <span>{item.title}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </h4>
                  <p className="text-[11px] text-[#7A6A5D] leading-relaxed mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
