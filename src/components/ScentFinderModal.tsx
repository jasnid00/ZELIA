import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, Check, RotateCcw, ShoppingBag, Eye } from 'lucide-react';
import { PERFUMES } from '../data/perfumes';
import { Perfume } from '../types';
import { formatINR } from '../utils/currency';
import { handleImageError } from '../utils/imageFallback';

interface ScentFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (perfume: Perfume) => void;
  onQuickView: (perfume: Perfume) => void;
}

export const ScentFinderModal: React.FC<ScentFinderModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  onQuickView,
}) => {
  const [step, setStep] = useState(1);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedFamily, setSelectedFamily] = useState<string | null>(null);
  const [matchedPerfume, setMatchedPerfume] = useState<Perfume | null>(null);

  if (!isOpen) return null;

  const handleSelectMood = (mood: string) => {
    setSelectedMood(mood);
    setStep(2);
  };

  const handleSelectOccasion = (occ: string) => {
    setSelectedOccasion(occ);
    setStep(3);
  };

  const handleSelectFamily = (family: string) => {
    setSelectedFamily(family);

    // Matching logic
    let match = PERFUMES[0];
    if (family === 'Solar Warmth' || selectedMood === 'Golden Sunlit Glow') {
      match = PERFUMES.find((p) => p.id === 'zelia-lumina-d-or') || PERFUMES[0];
    } else if (family === 'Floral Silk' || selectedMood === 'Romantic Parisian Rose') {
      match = PERFUMES.find((p) => p.id === 'zelia-rose-eternelle') || PERFUMES[1];
    } else if (family === 'Clean & Luminous' || selectedMood === 'Clean Whisper of Linen') {
      match = PERFUMES.find((p) => p.id === 'zelia-blanc-sublime') || PERFUMES[2];
    } else if (family === 'Gourmand Vanilla' || selectedMood === 'Smoky Mysterious Vanilla') {
      match = PERFUMES.find((p) => p.id === 'zelia-nuit-vanille') || PERFUMES[3];
    } else {
      match = PERFUMES.find((p) => p.id === 'zelia-ambre-precieux') || PERFUMES[4];
    }

    setMatchedPerfume(match);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedMood(null);
    setSelectedOccasion(null);
    setSelectedFamily(null);
    setMatchedPerfume(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1714]/70 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-[#FAF7F2] rounded-2xl max-w-2xl w-full p-6 sm:p-10 shadow-2xl border border-[#D8C3A5] text-[#2C241E]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7A6A5D] hover:text-[#2C241E] p-2"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Progress header */}
        <div className="mb-8 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] font-bold text-[#9A7B38]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The ZÉLIA Scent Matcher</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-[#2C241E] font-medium">
            Find Your Signature Flacon
          </h2>
          {step < 4 && (
            <p className="text-xs text-[#7A6A5D]">
              Step {step} of 3 • Curated by our Grasse perfume nose
            </p>
          )}
        </div>

        {/* STEP 1: Mood */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-serif-luxury text-xl text-center text-[#2C241E]">
              What emotional atmosphere speaks to you?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { label: 'Golden Sunlit Glow', sub: 'Warm skin, amber honey, radiant elegance' },
                { label: 'Romantic Parisian Rose', sub: 'Dewy fresh petals, lychee, pure silk' },
                { label: 'Clean Whisper of Linen', sub: 'Airy neroli, sheer jasmine, timeless grace' },
                { label: 'Smoky Mysterious Vanilla', sub: 'Madagascan orchid, roasted tonka, nocturne' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelectMood(opt.label)}
                  className="p-4 rounded-xl border border-[#D8C3A5] bg-white hover:border-[#2C241E] hover:bg-[#F4EFEA] transition-all text-left group cursor-pointer"
                >
                  <strong className="block text-sm font-serif-luxury text-[#2C241E] group-hover:text-[#9A7B38]">
                    {opt.label}
                  </strong>
                  <span className="text-xs text-[#7A6A5D]">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: Occasion */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-serif-luxury text-xl text-center text-[#2C241E]">
              When do you wish this scent to linger?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { label: 'Everyday Signature', sub: 'Effortless luxury from morning to evening' },
                { label: 'Intimate Evenings', sub: 'Sensual warmth for dinners & close whispers' },
                { label: 'Grand Occasions', sub: 'A commanding trail for galas & milestone moments' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelectOccasion(opt.label)}
                  className="p-4 rounded-xl border border-[#D8C3A5] bg-white hover:border-[#2C241E] hover:bg-[#F4EFEA] transition-all text-left group cursor-pointer"
                >
                  <strong className="block text-sm font-serif-luxury text-[#2C241E] group-hover:text-[#9A7B38]">
                    {opt.label}
                  </strong>
                  <span className="text-xs text-[#7A6A5D]">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Scent Family */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-serif-luxury text-xl text-center text-[#2C241E]">
              Which fragrance family captivates your senses?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { label: 'Solar Warmth', sub: 'Bergamot, Cashmere, Golden Resins' },
                { label: 'Floral Silk', sub: 'May Rose, Sambac Jasmine, Petals' },
                { label: 'Gourmand Vanilla', sub: 'Dark Bourbon Vanilla, Spiced Amber' },
                { label: 'Clean & Luminous', sub: 'White Neroli, Ambrox, Cashmere Musk' },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelectFamily(opt.label)}
                  className="p-4 rounded-xl border border-[#D8C3A5] bg-white hover:border-[#2C241E] hover:bg-[#F4EFEA] transition-all text-left group cursor-pointer"
                >
                  <strong className="block text-sm font-serif-luxury text-[#2C241E] group-hover:text-[#9A7B38]">
                    {opt.label}
                  </strong>
                  <span className="text-xs text-[#7A6A5D]">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: The Resulting Soulmate Match */}
        {step === 4 && matchedPerfume && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-6 bg-white rounded-xl border border-[#C5A059] shadow-md flex flex-col sm:flex-row items-center gap-6">
              <div className="w-32 h-40 shrink-0 overflow-hidden rounded-lg border border-[#EADBCE]">
                <img
                  src={matchedPerfume.image}
                  alt={matchedPerfume.name}
                  onError={(e) => handleImageError(e, matchedPerfume.name, matchedPerfume.accentColor)}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A7B38] bg-[#FAF7F2] px-2.5 py-0.5 rounded-full border border-[#EADBCE]">
                  Your Perfect Scent Soulmate
                </span>
                <h3 className="font-serif-luxury text-3xl text-[#2C241E] font-medium">
                  {matchedPerfume.name}
                </h3>
                <p className="text-xs font-serif-luxury italic text-[#6E5D53]">
                  “{matchedPerfume.tagline}”
                </p>
                <p className="text-xs text-[#5A4D43] leading-relaxed">
                  {matchedPerfume.description}
                </p>
                <div className="text-xs font-semibold text-[#2C241E] pt-1">
                  {formatINR(matchedPerfume.price)} • {matchedPerfume.volume}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                onClick={handleReset}
                className="text-xs uppercase tracking-wider text-[#7A6A5D] hover:text-[#2C241E] flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    onClose();
                    onQuickView(matchedPerfume);
                  }}
                  className="flex-1 sm:flex-none px-4 py-3 border border-[#2C241E] text-[#2C241E] text-xs uppercase tracking-wider rounded-lg hover:bg-[#F4EFEA] transition-colors cursor-pointer"
                >
                  View Details
                </button>
                <button
                  onClick={() => {
                    onAddToCart(matchedPerfume);
                    onClose();
                  }}
                  className="flex-1 sm:flex-none px-6 py-3 bg-[#2C241E] text-white hover:bg-[#C5A059] text-xs uppercase tracking-[0.2em] font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add Flacon to Bag</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
