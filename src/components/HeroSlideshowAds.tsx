import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Zap, ShoppingBag, Flame, Star, Play, Pause } from 'lucide-react';
import { SLIDESHOW_ADS } from '../data/campaignAds';
import { PERFUMES } from '../data/perfumes';
import { Perfume } from '../types';
import { formatINR } from '../utils/currency';
import { handleImageError } from '../utils/imageFallback';

interface HeroSlideshowAdsProps {
  onShopNow: () => void;
  onExploreCollection: () => void;
  onAddToCart: (perfume: Perfume, volume?: string, quantity?: number) => void;
  onBuyNow: (perfume: Perfume, volume?: string) => void;
  onQuickView: (perfume: Perfume) => void;
}

export const HeroSlideshowAds: React.FC<HeroSlideshowAdsProps> = ({
  onShopNow,
  onExploreCollection,
  onAddToCart,
  onBuyNow,
  onQuickView,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const slideDuration = 6000; // 6 seconds per slide
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentAd = SLIDESHOW_ADS[currentSlideIndex];
  const matchedPerfume = PERFUMES.find((p) => p.id === currentAd.perfumeId) || PERFUMES[0];

  // Auto-play timer
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    setProgress(0);
    const intervalTime = 50;
    const increment = (intervalTime / slideDuration) * 100;

    progressTimerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    timerRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SLIDESHOW_ADS.length);
      setProgress(0);
    }, slideDuration);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [currentSlideIndex, isPlaying]);

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SLIDESHOW_ADS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + SLIDESHOW_ADS.length) % SLIDESHOW_ADS.length);
    setProgress(0);
  };

  const handleSelectSlide = (index: number) => {
    setCurrentSlideIndex(index);
    setProgress(0);
  };

  const handleAddToCart = () => {
    onAddToCart(matchedPerfume, '100ml', 1);
  };

  const handleBuyNow = () => {
    onBuyNow(matchedPerfume, '100ml');
  };

  return (
    <section 
      className="relative overflow-hidden bg-[#140F0C] text-white select-none border-b border-[#D4AF37]/30"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Top Slide Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 z-30 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F3D17A] to-[#E5C158] transition-all duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main Slide Stage */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[690px] flex items-center">
        
        {/* Background Celebrity Campaign Imagery with Cinematic Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            key={currentAd.id}
            src={currentAd.celebrityPhoto}
            alt={`${currentAd.celebrityName} for ${currentAd.headline} luxury perfume ad`}
            onError={(e) => handleImageError(e, currentAd.perfumeName, currentAd.accentColor)}
            className="w-full h-full object-cover object-center scale-105 animate-ken-burns transition-all duration-1000 filter brightness-75 contrast-110"
          />
          {/* Seductive cinematic multi-layer gradient */}
          <div className={`absolute inset-0 bg-gradient-to-r ${currentAd.gradient} opacity-90 mix-blend-multiply`} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140F0C] via-[#140F0C]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#140F0C] via-[#140F0C]/80 to-transparent w-full lg:w-3/4" />
        </div>

        {/* Floating Ambient Glows */}
        <div 
          className="absolute -top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: currentAd.accentColor }}
        />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Seductive Campaign Headline & Celebrity Endorsement */}
            <div className="lg:col-span-7 space-y-5 text-left">
              
              {/* Campaign Badge & Aphrodisiac Sillage Score */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[#F3D17A] text-[11px] font-bold uppercase tracking-[0.25em] backdrop-blur-md shadow-lg">
                  <Flame className="w-3.5 h-3.5 text-[#F3D17A] fill-current" />
                  <span>{currentAd.badge}</span>
                </span>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/90 text-[10px] font-semibold tracking-wider backdrop-blur-md">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  <span>{currentAd.seductionFactor}</span>
                </span>
              </div>

              {/* Seductive Headline */}
              <div className="space-y-1">
                <h1 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.16em] uppercase text-white leading-[1.05] drop-shadow-md">
                  {currentAd.headline}
                </h1>
                <p className="text-xs sm:text-sm font-serif-luxury italic text-[#EADBCE] tracking-wider pt-1">
                  Maison ZÉLIA Paris • Haute Parfumerie Campaign
                </p>
              </div>

              {/* Celebrity Quote */}
              <blockquote className="text-lg sm:text-2xl font-serif-luxury italic text-[#F5ECE2] border-l-2 border-[#D4AF37] pl-4 py-1 max-w-xl">
                {currentAd.tagline}
              </blockquote>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#D1C2B5] max-w-xl leading-relaxed font-normal">
                {currentAd.subtext}
              </p>

              {/* Starring Celebrity Pill */}
              <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 max-w-md">
                <div className="w-11 h-11 rounded-full overflow-hidden border border-[#D4AF37] shrink-0">
                  <img
                    src={currentAd.celebrityPhoto}
                    alt={currentAd.celebrityName}
                    onError={(e) => handleImageError(e, currentAd.celebrityName, currentAd.accentColor)}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-xs font-bold text-white tracking-wider flex items-center gap-1.5">
                    <span>Starring {currentAd.celebrityName}</span>
                    <Star className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                  </p>
                  <p className="text-[10px] text-[#A8988B] tracking-wide">
                    {currentAd.celebrityRole}
                  </p>
                </div>
              </div>

              {/* Olfactory Scent Notes Accords */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] tracking-wider text-[#A8988B] uppercase font-semibold mr-1">
                  Seductive Accords:
                </span>
                {currentAd.notes.map((note) => (
                  <span
                    key={note}
                    className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/10 border border-white/15 text-[#FAF7F2] backdrop-blur-xs"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Action Buttons in Hero Slideshow Ad */}
              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <button
                  id={`hero-ad-buy-now-${currentAd.id}`}
                  onClick={handleBuyNow}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#B8860B] text-[#140F0C] hover:brightness-110 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2 shadow-2xl transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Instant Buy Now • {formatINR(currentAd.price)}</span>
                </button>

                <button
                  id={`hero-ad-add-cart-${currentAd.id}`}
                  onClick={handleAddToCart}
                  className="px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold text-xs uppercase tracking-[0.2em] flex items-center gap-2 backdrop-blur-md transition-all duration-300 cursor-pointer active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Add to Bag</span>
                </button>

                <button
                  onClick={onShopNow}
                  className="text-xs text-[#EADBCE] hover:text-[#D4AF37] underline underline-offset-4 tracking-wider transition-colors cursor-pointer py-2"
                >
                  View All 16 Fragrances
                </button>
              </div>

            </div>

            {/* Right Column: Featured Flacon Showcase Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-sm bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-[#D4AF37]/50 shadow-2xl relative overflow-hidden group">
                
                {/* Sale / Discount Ribbon */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#140F0C] text-[10px] font-black uppercase tracking-[0.2em] shadow-md">
                    {currentAd.discountBadge}
                  </span>
                </div>

                {/* Quick View Button */}
                <button
                  onClick={() => onQuickView(matchedPerfume)}
                  className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/60 hover:bg-black text-[#FAF7F2] text-[10px] uppercase font-semibold tracking-wider border border-white/20 backdrop-blur-md transition-colors cursor-pointer"
                >
                  Inspect Notes
                </button>

                {/* Perfume Bottle Presentation Image */}
                <div 
                  onClick={() => onQuickView(matchedPerfume)}
                  className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-b from-black/40 to-black/80 flex items-center justify-center p-3 cursor-pointer my-2 border border-white/10 group-hover:border-[#D4AF37]/70 transition-colors"
                >
                  <img
                    src={matchedPerfume.image}
                    alt={matchedPerfume.name}
                    onError={(e) => handleImageError(e, matchedPerfume.name, matchedPerfume.accentColor)}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2 left-2 right-2 p-2 bg-black/70 backdrop-blur-md rounded-xl text-center border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">
                      {currentAd.concentration}
                    </p>
                  </div>
                </div>

                {/* Flacon Info & Price */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-serif-luxury text-xl font-medium text-white tracking-wide">
                        {currentAd.perfumeName}
                      </h3>
                      <p className="text-[11px] text-[#C5B5A5]">
                        100ml Flacon • 18+ Hours Longevity
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="font-serif-luxury text-2xl font-bold text-[#F3D17A]">
                        {formatINR(currentAd.price)}
                      </div>
                      <div className="text-xs text-white/50 line-through">
                        {formatINR(currentAd.originalPrice)}
                      </div>
                    </div>
                  </div>

                  {/* Trust indicator */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-[#C5B5A5]">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      ✓ Pan-India Delivery (2-4 Days)
                    </span>
                    <span>Free 3x Discovery Vials</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Slideshow Controls Bar (Thumbnails, Next/Prev, Play/Pause) */}
      <div className="bg-[#0D0A08]/90 border-t border-white/10 py-3 px-4 sm:px-8 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Thumbnail Slide Selectors with Campaign Names */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            {SLIDESHOW_ADS.map((ad, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={ad.id}
                  onClick={() => handleSelectSlide(idx)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-left transition-all cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-white shadow-md'
                      : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#D4AF37] animate-pulse' : 'bg-white/30'}`} />
                  <span className="text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap">
                    {ad.headline.length > 18 ? ad.headline.substring(0, 18) + '...' : ad.headline}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation Arrows & Play/Pause */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pause Slideshow' : 'Resume Slideshow'}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/15"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handlePrev}
              aria-label="Previous Campaign Ad"
              className="p-2 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#140F0C] text-white transition-colors cursor-pointer border border-white/15"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono text-[#D4AF37] tracking-widest font-semibold px-1">
              0{currentSlideIndex + 1} / 0{SLIDESHOW_ADS.length}
            </span>

            <button
              onClick={handleNext}
              aria-label="Next Campaign Ad"
              className="p-2 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#140F0C] text-white transition-colors cursor-pointer border border-white/15"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};
