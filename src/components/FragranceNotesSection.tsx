import React, { useState } from 'react';
import { Sparkles, Flower, Mountain, ArrowRight, Check } from 'lucide-react';
import { FRAGRANCE_NOTES_DETAILS } from '../data/perfumes';
import { OlfactoryNoteDetail } from '../types';
import { ZeliaLogo } from './ZeliaLogo';

interface FragranceNotesProps {
  onSelectPerfumeByNote?: (perfumeName: string) => void;
}

export const FragranceNotesSection: React.FC<FragranceNotesProps> = ({
  onSelectPerfumeByNote,
}) => {
  const [selectedNote, setSelectedNote] = useState<OlfactoryNoteDetail>(FRAGRANCE_NOTES_DETAILS[0]);
  const [activeTab, setActiveTab] = useState<'All' | 'Top' | 'Heart' | 'Base'>('All');

  const filteredNotes = activeTab === 'All'
    ? FRAGRANCE_NOTES_DETAILS
    : FRAGRANCE_NOTES_DETAILS.filter((n) => n.category === activeTab);

  return (
    <section id="fragrance-notes" className="py-20 md:py-28 bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EE] to-[#FAF6F0] relative overflow-hidden">
      
      {/* Aesthetic Colorful Ambient Blobs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-[#FCE7F3]/40 to-[#FEF3C7]/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-gradient-to-r from-[#E0F2FE]/40 to-[#EDE9FE]/40 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="flex justify-center mb-1">
            <ZeliaLogo variant="crest" size="sm" />
          </div>
          <div className="inline-flex items-center justify-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B86B1B] font-bold">
              The Art of the Nose
            </span>
          </div>
          <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#2C241E] font-normal tracking-wide">
            Fragrance Notes & Architecture
          </h2>
          <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto my-3" />
          <p className="text-sm sm:text-base text-[#6E5D53] leading-relaxed">
            A master fragrance is an evolving tripartite poem. Explore the rare botanicals,
            heady flower absolutes, and warm amber resins that give ZÉLIA its legendary longevity.
          </p>
        </div>

        {/* The 3-Tier Olfactory Architecture Visual Guide with Aesthetic Color Coding */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          
          {/* Top Notes - Citrus & Fresh Aura */}
          <div className="bg-gradient-to-br from-[#ECFDF5] via-white to-[#F0FDFA] p-7 rounded-3xl border-2 border-[#A7F3D0] shadow-md hover:shadow-xl transition-all duration-300 text-center space-y-3.5 hover:-translate-y-1">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-[#A7F3D0] flex items-center justify-center text-[#059669] shadow-xs">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#059669] block">
              1. Head Notes (Tête)
            </span>
            <h3 className="font-serif-luxury text-2xl text-[#2C241E] font-medium">The First Impression</h3>
            <p className="text-xs text-[#5A4D43] leading-relaxed font-normal">
              Sparkling citrus and crisp dewy blossoms that greet the senses in the first 15–30 minutes with vibrant champagne effervescence.
            </p>
            <div className="text-[11px] text-[#065F46] font-semibold pt-1 bg-[#D1FAE5]/60 py-1.5 px-3 rounded-full inline-block">
              Bergamot • Champagne Accord • Neroli Mist
            </div>
          </div>

          {/* Heart Notes - Floral Grasse Aura */}
          <div className="bg-gradient-to-br from-[#FFF1F2] via-white to-[#FDF2F8] p-7 rounded-3xl border-2 border-[#FECDD3] shadow-lg text-center space-y-3.5 relative hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#9D174D] to-[#C45B73] text-white text-[9px] uppercase tracking-widest px-3.5 py-1 rounded-full font-bold shadow-xs">
              Maison Signature Heart
            </span>
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-[#FECDD3] flex items-center justify-center text-[#C45B73] shadow-xs">
              <Flower className="w-6 h-6" />
            </div>
            <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#C45B73] block">
              2. Heart Notes (Coeur)
            </span>
            <h3 className="font-serif-luxury text-2xl text-[#2C241E] font-medium">The Scent Identity</h3>
            <p className="text-xs text-[#5A4D43] leading-relaxed font-normal">
              The opulent botanical soul that unfurls after 30 minutes, carrying the true romantic and sensual emotion of the composition.
            </p>
            <div className="text-[11px] text-[#9D174D] font-semibold pt-1 bg-[#FCE7F3]/70 py-1.5 px-3 rounded-full inline-block">
              Grasse Centifolia Rose • Jasmine Sambac • Tuberose
            </div>
          </div>

          {/* Base Notes - Amber & Resins */}
          <div className="bg-gradient-to-br from-[#FFFBEB] via-white to-[#FEF3C7] p-7 rounded-3xl border-2 border-[#FDE68A] shadow-md hover:shadow-xl transition-all duration-300 text-center space-y-3.5 hover:-translate-y-1">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-white border border-[#FDE68A] flex items-center justify-center text-[#B86B1B] shadow-xs">
              <Mountain className="w-6 h-6" />
            </div>
            <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-[#B86B1B] block">
              3. Base Notes (Fond)
            </span>
            <h3 className="font-serif-luxury text-2xl text-[#2C241E] font-medium">The Enduring Memory</h3>
            <p className="text-xs text-[#5A4D43] leading-relaxed font-normal">
              Heavy, sensual resins, aged woods, and balsams that anchor the perfume for 16 to 24+ hours, lingering on skin and cashmere scarves.
            </p>
            <div className="text-[11px] text-[#92400E] font-semibold pt-1 bg-[#FEF3C7]/80 py-1.5 px-3 rounded-full inline-block">
              Madagascar Vanilla • Baltic Amber • Mysore Sandalwood
            </div>
          </div>

        </div>

        {/* Interactive Botanical Ingredient Spotlight */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-[#EADBCE] p-6 sm:p-10 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-[#F0E6DA] pb-6 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ZeliaLogo variant="crest" size="sm" />
                <span className="text-xs uppercase tracking-widest text-[#B86B1B] font-bold">Terroir Palette</span>
              </div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#2C241E] font-medium">
                Rare Botanical Ingredients Explorer
              </h3>
              <p className="text-xs sm:text-sm text-[#7A6A5D] mt-0.5">
                Select an essential accord below to inspect its botanical provenance and the ZÉLIA flacons it illuminates.
              </p>
            </div>

            {/* Note Tier Filter */}
            <div className="flex items-center gap-2 bg-[#FAF5EE] p-1 rounded-xl border border-[#EADBCE]">
              {(['All', 'Top', 'Heart', 'Base'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[#2C241E] text-white shadow-xs'
                      : 'text-[#6E5D53] hover:text-[#2C241E]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Chips Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side: Note Buttons */}
            <div className="lg:col-span-6 space-y-3">
              {filteredNotes.map((note) => {
                const isSelected = selectedNote.name === note.name;
                return (
                  <div
                    key={note.name}
                    onClick={() => setSelectedNote(note)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-[#D4AF37] bg-gradient-to-r from-[#FFFBEB] to-[#FFF1F2] shadow-md scale-102'
                        : 'border-[#EADBCE] bg-white hover:bg-[#FAF7F2] hover:border-[#D4AF37]/50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-[#2C241E] font-serif-luxury text-base">
                          {note.name}
                        </span>
                        <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                          note.category === 'Heart'
                            ? 'bg-[#FFF1F2] text-[#9D174D]'
                            : note.category === 'Base'
                            ? 'bg-[#FEF3C7] text-[#92400E]'
                            : 'bg-[#ECFDF5] text-[#065F46]'
                        }`}>
                          {note.category} Note
                        </span>
                      </div>
                      <p className="text-[11px] text-[#7A6A5D] mt-0.5 line-clamp-1">
                        Origin: {note.botanicalOrigin}
                      </p>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-[#D4AF37] translate-x-1' : 'text-[#D8C3A5]'}`} />
                  </div>
                );
              })}
            </div>

            {/* Right side: Detailed Focus Card */}
            <div className="lg:col-span-6 bg-gradient-to-br from-[#FFFDF9] via-[#FAF5EE] to-[#FFF7ED] p-7 rounded-3xl border-2 border-[#D4AF37]/50 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
                <span className="text-xs uppercase tracking-[0.2em] text-[#B86B1B] font-bold">
                  Olfactory Dossier
                </span>
                <span className="text-xs font-medium text-[#7A6A5D] bg-white px-3 py-1 rounded-full border border-[#EADBCE]">
                  {selectedNote.category} Chord
                </span>
              </div>

              <div>
                <h4 className="font-serif-luxury text-3xl text-[#2C241E] font-medium">
                  {selectedNote.name}
                </h4>
                <p className="text-xs text-[#B86B1B] font-semibold mt-1">
                  Provenance: {selectedNote.botanicalOrigin}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#5A4D43] block">
                  Sensory Profile:
                </span>
                <p className="text-xs text-[#5A4D43] italic leading-relaxed">
                  “{selectedNote.scentProfile}”
                </p>
              </div>

              <p className="text-xs text-[#6E5D53] leading-relaxed">
                {selectedNote.description}
              </p>

              <div className="pt-2 border-t border-[#D4AF37]/30">
                <span className="text-[11px] uppercase tracking-wider font-bold text-[#2C241E] block mb-2">
                  Featured in Maison ZÉLIA Flacons:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedNote.featuredIn.map((perfumeName) => (
                    <button
                      key={perfumeName}
                      onClick={() => onSelectPerfumeByNote && onSelectPerfumeByNote(perfumeName)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-[#D4AF37] text-[#2C241E] hover:bg-[#2C241E] hover:text-white transition-colors cursor-pointer shadow-2xs"
                    >
                      {perfumeName}
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
