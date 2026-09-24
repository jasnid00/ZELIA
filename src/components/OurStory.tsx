import React from 'react';
import { Sparkles, Flower2, Droplets, Feather } from 'lucide-react';
import { STORY_IMAGE } from '../data/perfumes';
import { handleImageError } from '../utils/imageFallback';

export const OurStory: React.FC = () => {
  return (
    <section id="our-story" className="py-20 md:py-28 bg-[#F4EFEA] border-t border-b border-[#EADBCE] relative overflow-hidden">
      {/* Background soft ambient accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#EADBCE]/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#D8C3A5]/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Story Imagery & Artisanal Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D8C3A5]/80 bg-[#FAF7F2]">
              <img
                src={STORY_IMAGE}
                alt="ZÉLIA Master perfumer formulating botanical extractions on atelier table"
                onError={(e) => handleImageError(e, 'L’Atelier ZÉLIA')}
                className="w-full h-auto object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C241E]/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating Quote Stamp */}
            <div className="hidden sm:block absolute -bottom-8 -right-4 md:-right-6 bg-[#FAF7F2] p-6 rounded-xl shadow-xl border border-[#C5A059]/50 max-w-xs">
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#9A7B38] font-bold block mb-1">
                The ZÉLIA Philosophy
              </span>
              <p className="font-serif-luxury italic text-sm text-[#2C241E] leading-relaxed">
                “Fragrance is not an accessory. It is the emotional contour you leave behind in empty rooms.”
              </p>
              <span className="text-[11px] uppercase tracking-wider text-[#7A6A5D] block mt-2 font-medium">
                — Hélène Zélia, Maître Parfumeur
              </span>
            </div>
          </div>

          {/* Right Column: The Narrative */}
          <div className="lg:col-span-6 space-y-6 text-[#2C241E]">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.3em] text-[#9A7B38] font-semibold">
                  Maison Heritage & Craft
                </span>
              </div>
              <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal leading-tight">
                Our Story
              </h2>
              <div className="w-16 h-[1px] bg-[#C5A059] my-2" />
            </div>

            <p className="text-base sm:text-lg font-serif-luxury italic text-[#4A3F35] leading-relaxed">
              Born from a quiet obsession with sillage—the invisible trail that endures long after a conversation ends, a door closes, or a touch fades.
            </p>

            <p className="text-sm sm:text-base text-[#6E5D53] leading-relaxed font-normal">
              ZÉLIA was founded upon a singular principle: modern luxury has become too fleeting.
              In our ateliers nestled between the sunlit hills of Grasse and the historic salons
              of Paris, our perfumers reject diluted formulas and synthetic shortcuts.
            </p>

            <p className="text-sm sm:text-base text-[#6E5D53] leading-relaxed font-normal">
              Instead, we resurrect the revered tradition of <span className="text-[#2C241E] font-medium">Extraits de Parfum</span>.
              Every bottle contains up to 34% pure unadulterated perfume oils, macerated in vintage
              French vessels for five months until each botanical accord bonds harmoniously.
            </p>

            {/* 3 Pillars of Craft */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EADBCE]">
              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#EADBCE]/80 flex items-center justify-center text-[#9A7B38]">
                  <Flower2 className="w-4 h-4" />
                </div>
                <h4 className="font-serif-luxury text-base font-semibold text-[#2C241E]">
                  Dawn Harvesting
                </h4>
                <p className="text-xs text-[#7A6A5D] leading-relaxed">
                  Centifolia roses and jasmine hand-plucked before 7 AM to preserve raw dew.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#EADBCE]/80 flex items-center justify-center text-[#9A7B38]">
                  <Droplets className="w-4 h-4" />
                </div>
                <h4 className="font-serif-luxury text-base font-semibold text-[#2C241E]">
                  Aged Maceration
                </h4>
                <p className="text-xs text-[#7A6A5D] leading-relaxed">
                  Natural botanical essences cured for 150 days to unlock velvet sillage.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-8 h-8 rounded-full bg-[#EADBCE]/80 flex items-center justify-center text-[#9A7B38]">
                  <Feather className="w-4 h-4" />
                </div>
                <h4 className="font-serif-luxury text-base font-semibold text-[#2C241E]">
                  Crystal Couture
                </h4>
                <p className="text-xs text-[#7A6A5D] leading-relaxed">
                  Hand-polished weighted glass with 24k gold leaf engraving and magnetic closure.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
