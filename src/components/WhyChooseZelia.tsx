import React from 'react';
import { Crown, Sparkles, Clock, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { ZeliaLogo } from './ZeliaLogo';

export const WhyChooseZelia: React.FC = () => {
  const pillars = [
    {
      icon: Crown,
      title: 'Extrait de Parfum Strength',
      subtitle: '28% – 34% Pure Essence',
      cardBg: 'from-[#FFFBEB] via-white to-[#FEF3C7]/40',
      accentColor: 'text-[#B86B1B]',
      borderStyle: 'border-[#FDE68A]',
      description:
        'While typical commercial eau de parfums contain merely 12-15% perfume oil, ZÉLIA formulas are master-concentrated at 30%+ pure nectar, delivering profound depth without harsh alcohol evaporation.',
    },
    {
      icon: Clock,
      title: 'The Art of the Linger',
      subtitle: '16 to 24+ Hour Sillage',
      cardBg: 'from-[#FFF7ED] via-white to-[#FFEDD5]/40',
      accentColor: 'text-[#C2410C]',
      borderStyle: 'border-[#FED7AA]',
      description:
        'Formulated with heavy base resins and natural botanical fixatives that cling lovingly to your pulse points, cashmere knits, and silk scarves for days after application.',
    },
    {
      icon: Sparkles,
      title: 'Rare Botanical Flora',
      subtitle: 'Ethically Sourced in Grasse',
      cardBg: 'from-[#FFF1F2] via-white to-[#FCE7F3]/40',
      accentColor: 'text-[#BE185D]',
      borderStyle: 'border-[#FECDD3]',
      description:
        'Centifolia roses, Sambac jasmine, and Bourbon vanilla beans hand-selected at dawn from heritage family-owned fields in Southern France and Madagascar.',
    },
    {
      icon: Award,
      title: 'Heirloom French Crystal',
      subtitle: 'Weighted Flacon Artistry',
      cardBg: 'from-[#FAF5FF] via-white to-[#EDE9FE]/40',
      accentColor: 'text-[#6D28D9]',
      borderStyle: 'border-[#DDD6FE]',
      description:
        'Crafted in collaboration with historic glass artisans in Normandy. Heavy, light-catching crystal with a hand-polished 24K gold-leaf collar and magnetic closure.',
    },
    {
      icon: ShieldCheck,
      title: 'Clean Haute Formulation',
      subtitle: 'Hypoallergenic & Cruelty-Free',
      cardBg: 'from-[#ECFDF5] via-white to-[#D1FAE5]/40',
      accentColor: 'text-[#047857]',
      borderStyle: 'border-[#A7F3D0]',
      description:
        'Formulated without phthalates, synthetic dyes, or parabens. 100% cruelty-free, vegan-certified, and respectful of delicate skin.',
    },
    {
      icon: HeartHandshake,
      title: 'White Glove Concierge',
      subtitle: 'Bespoke Experience',
      cardBg: 'from-[#F0FDFA] via-white to-[#CCFBF1]/40',
      accentColor: 'text-[#0F766E]',
      borderStyle: 'border-[#99F6E4]',
      description:
        'Every flacon arrives nestled in champagne satin within an embossed rigid coffret, accompanied by 3 complimentary discovery miniatures.',
    },
  ];

  return (
    <section id="why-zelia" className="py-20 md:py-28 bg-gradient-to-b from-[#FAF4EC] via-[#FFFDF9] to-[#FAF6F0] border-t border-b border-[#EADBCE]/80 relative overflow-hidden">
      
      {/* Aesthetic Colorful Ambient Gloom */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-gradient-to-br from-[#FEF3C7]/30 to-[#FCE7F3]/30 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex justify-center mb-1">
            <ZeliaLogo variant="crest" size="sm" />
          </div>
          <div className="inline-flex items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B86B1B] font-bold">
              The Maison Standard
            </span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#2C241E] font-normal tracking-wide">
            Why Choose ZÉLIA
          </h2>
          <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-3" />
          <p className="text-sm sm:text-base text-[#6E5D53] leading-relaxed">
            In a world of mass-produced, fleeting scents, ZÉLIA returns to the sacred roots
            of French haute perfumery. Here is how our creations stand apart.
          </p>
        </div>

        {/* 6 Feature Pillars Grid with Aesthetic Color Themes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                id={`why-choose-pillar-${idx}`}
                className={`bg-gradient-to-br ${pillar.cardBg} p-8 rounded-3xl border-2 ${pillar.borderStyle} shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1`}
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-xs flex items-center justify-center text-[#B86B1B] group-hover:bg-[#2C241E] group-hover:text-[#FAF7F2] transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${pillar.accentColor} block mb-1`}>
                      {pillar.subtitle}
                    </span>
                    <h3 className="font-serif-luxury text-2xl text-[#2C241E] font-medium leading-tight">
                      {pillar.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5A4D43] leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#D4AF37]/20 flex items-center justify-between text-[11px] text-[#7A6A5D]">
                  <span className="font-semibold text-[#2C241E]">Pillar 0{idx + 1}</span>
                  <span className="text-[#B86B1B] font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Grasse Standard
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
