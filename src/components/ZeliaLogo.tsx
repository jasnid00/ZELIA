import React from 'react';

interface ZeliaLogoProps {
  className?: string;
  variant?: 'full' | 'crest' | 'stamp' | 'horizontal' | 'gold-plaque' | 'bottle-label' | 'above-name';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  inverted?: boolean;
  fragranceName?: string;
  themeColor?: string;
}

export const ZeliaLogo: React.FC<ZeliaLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
  inverted = false,
  fragranceName,
  themeColor,
}) => {
  const textColor = inverted ? 'text-[#FAF7F2]' : 'text-[#2C241E]';
  const goldColor = themeColor || (inverted ? '#F3D17A' : '#C5A059');
  const subColor = inverted ? 'text-[#D8C3A5]' : 'text-[#7A6A5D]';

  // Crest Seal icon with delicate monogram Z, laurel wreaths, and diamond stars
  const renderCrest = (crestSize: number = 36) => (
    <svg
      width={crestSize}
      height={crestSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      {/* Outer concentric thin rings */}
      <circle cx="50" cy="50" r="47" stroke={goldColor} strokeWidth="1.4" strokeDasharray="3 2" />
      <circle cx="50" cy="50" r="43" stroke={goldColor} strokeWidth="1.8" />
      <circle cx="50" cy="50" r="38" stroke={goldColor} strokeWidth="0.8" opacity="0.7" />
      
      {/* Botanical laurel branches */}
      <path
        d="M20 54C20 40 30 24 50 18C70 24 80 40 80 54C80 72 65 83 50 85C35 83 20 72 20 54Z"
        stroke={goldColor}
        strokeWidth="1"
        strokeOpacity="0.5"
      />
      
      {/* Star / Sparkle at top */}
      <path
        d="M50 11L51.8 15L56 16.8L51.8 18.6L50 23L48.2 18.6L44 16.8L48.2 15L50 11Z"
        fill={goldColor}
      />

      {/* Stylized Serif Z monogram */}
      <text
        x="50"
        y="62"
        fontFamily="'Cormorant Garamond', 'Playfair Display', serif"
        fontSize="44"
        fontWeight="700"
        textAnchor="middle"
        fill={goldColor}
        letterSpacing="0.05em"
      >
        Z
      </text>

      {/* Tiny decorative lower diamond */}
      <polygon points="50,77 53,80.5 50,84 47,80.5" fill={goldColor} />
    </svg>
  );

  // 1. PHYSICAL LUXURY PERFUME BOTTLE LABEL OVERLAY
  // Directly sits on the front surface of the perfume flacon like an embossed metallic gold plaque
  if (variant === 'bottle-label') {
    return (
      <div
        className={`pointer-events-none select-none relative flex flex-col items-center justify-center px-4 py-3 sm:px-5 sm:py-3.5 rounded-lg bg-gradient-to-b from-[#FFFDF8]/96 via-[#FAF4EA]/94 to-[#F5ECE0]/96 backdrop-blur-md border-2 border-[#D4AF37] shadow-[0_10px_30px_rgba(0,0,0,0.45),inset_0_1px_3px_rgba(255,255,255,0.95)] max-w-[86%] w-auto min-w-[140px] text-center ${className}`}
      >
        {/* Subtle corner rivets/screws for authentic French flacon plaque aesthetic */}
        <span className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-[#B86B1B]" />
        <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-[#B86B1B]" />
        <span className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-[#B86B1B]" />
        <span className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-[#B86B1B]" />

        {/* Fine inner filigree border */}
        <div className="absolute inset-1 rounded-md border border-[#D4AF37]/60 pointer-events-none" />
        
        {/* Crest */}
        <div className="relative z-10 mb-0.5 transform scale-95">
          {renderCrest(22)}
        </div>

        {/* Brand Name ZÉLIA */}
        <span className="relative z-10 font-serif-luxury tracking-[0.34em] font-bold text-xs sm:text-sm text-[#2C241E] leading-tight drop-shadow-xs">
          ZÉLIA
        </span>
        <span className="relative z-10 text-[7px] sm:text-[8px] tracking-[0.45em] uppercase text-[#9A7B38] font-bold mt-0.5">
          PARIS
        </span>

        {/* Fragrance Name & Hallmark on the flacon label */}
        {fragranceName && (
          <div className="relative z-10 mt-1 pt-1 border-t border-[#D4AF37]/50 w-full flex flex-col items-center px-1">
            <span className="font-serif-luxury text-[11px] sm:text-xs font-semibold italic text-[#2C241E] tracking-wider truncate max-w-[135px]">
              {fragranceName}
            </span>
            <span className="text-[6px] sm:text-[6.5px] tracking-[0.25em] uppercase text-[#7A6A5D] font-mono mt-0.5 font-semibold">
              EXTRAIT DE PARFUM
            </span>
          </div>
        )}
      </div>
    );
  }

  // 2. ABOVE FRAGRANCE NAME HEADER
  // Sits directly above the fragrance title in cards, modals, and collection displays
  if (variant === 'above-name') {
    return (
      <div className={`flex items-center gap-2 mb-1.5 ${className}`}>
        {renderCrest(18)}
        <div className="flex items-center gap-1.5">
          <span className="font-serif-luxury tracking-[0.26em] text-[11px] sm:text-xs font-bold text-[#A67C1E]">
            ZÉLIA
          </span>
          <span className="w-1 h-1 rounded-full bg-[#D4AF37]" />
          <span className="text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-[#7A6A5D] font-semibold">
            PARIS
          </span>
        </div>
      </div>
    );
  }

  // 3. Crest only
  if (variant === 'crest') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {renderCrest(size === 'sm' ? 28 : size === 'lg' ? 52 : size === 'xl' ? 68 : 38)}
      </div>
    );
  }

  // 4. Gold Plaque Badge
  if (variant === 'gold-plaque') {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gradient-to-r from-[#DFCAAA]/50 via-[#FAF7F2] to-[#DFCAAA]/50 border border-[#C5A059] shadow-[0_2px_8px_rgba(197,160,89,0.3)] ${className}`}
      >
        {renderCrest(18)}
        <div className="flex flex-col">
          <span className="font-serif-luxury tracking-[0.25em] text-[11px] font-semibold text-[#2C241E] leading-tight">
            ZÉLIA
          </span>
          <span className="text-[7px] tracking-[0.3em] uppercase text-[#9A7B38] font-medium leading-none">
            PARIS
          </span>
        </div>
      </div>
    );
  }

  // 5. Stamp
  if (variant === 'stamp') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        {renderCrest(22)}
        <span className={`font-serif-luxury tracking-[0.25em] font-medium text-xs sm:text-sm ${textColor}`}>
          ZÉLIA <span className="text-[9px] tracking-[0.3em] font-sans font-normal opacity-70">PARIS</span>
        </span>
      </div>
    );
  }

  // 6. Horizontal
  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        {renderCrest(size === 'sm' ? 28 : 36)}
        <div className="flex flex-col text-left">
          <span className={`font-serif-luxury text-xl sm:text-2xl tracking-[0.25em] font-normal leading-none ${textColor}`}>
            ZÉLIA
          </span>
          <span className={`text-[8px] sm:text-[9px] tracking-[0.35em] uppercase mt-1 font-medium ${subColor}`}>
            HAUTE PARFUMERIE • PARIS
          </span>
        </div>
      </div>
    );
  }

  // 7. Default 'full' centered brand mark
  return (
    <div className={`flex flex-col items-center text-center group cursor-pointer ${className}`}>
      {renderCrest(size === 'sm' ? 32 : size === 'lg' ? 48 : size === 'xl' ? 60 : 38)}
      <span
        className={`font-serif-luxury tracking-[0.28em] font-normal ${textColor} ${
          size === 'sm'
            ? 'text-2xl mt-1'
            : size === 'lg'
            ? 'text-4xl sm:text-5xl mt-2'
            : size === 'xl'
            ? 'text-5xl sm:text-6xl mt-2.5'
            : 'text-3xl sm:text-4xl mt-1.5'
        }`}
      >
        ZÉLIA
      </span>
      <span
        className={`uppercase tracking-[0.4em] font-medium ${subColor} ${
          size === 'sm'
            ? 'text-[8px] mt-0.5'
            : size === 'lg'
            ? 'text-[11px] sm:text-xs mt-1'
            : 'text-[9px] sm:text-[10px] mt-0.5'
        }`}
      >
        HAUTE PARFUMERIE • PARIS
      </span>
    </div>
  );
};
