// Image fallback utility that ensures no broken image icons ever appear
import type React from 'react';

export function getLuxuryPerfumeSvg(name: string = 'ZÉLIA Parfums', accent: string = '#D4AF37'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 750" width="100%" height="100%">
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#2D231C" />
        <stop offset="100%" stop-color="#120E0B" />
      </radialGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FDE68A" />
        <stop offset="50%" stop-color="${accent}" />
        <stop offset="100%" stop-color="#92400E" />
      </linearGradient>
      <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.15" />
        <stop offset="50%" stop-color="#FFFFFF" stop-opacity="0.05" />
        <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0.2" />
      </linearGradient>
    </defs>
    <rect width="600" height="750" fill="url(#bgGrad)" />
    <!-- Ambient Halo Glow -->
    <circle cx="300" cy="380" r="180" fill="${accent}" opacity="0.18" filter="blur(40px)" />
    <!-- Cap -->
    <rect x="260" y="160" width="80" height="60" rx="6" fill="url(#goldGrad)" stroke="#FAF7F2" stroke-opacity="0.3" stroke-width="2" />
    <rect x="250" y="215" width="100" height="15" rx="3" fill="url(#goldGrad)" />
    <!-- Flacon Body -->
    <rect x="180" y="235" width="240" height="340" rx="28" fill="url(#glassGrad)" stroke="url(#goldGrad)" stroke-width="3" />
    <!-- Inner Liquid Glow -->
    <rect x="200" y="275" width="200" height="280" rx="16" fill="${accent}" opacity="0.25" />
    <!-- Label Shield -->
    <rect x="220" y="340" width="160" height="140" rx="8" fill="#1A1410" stroke="url(#goldGrad)" stroke-width="1.5" />
    <text x="300" y="390" fill="#D4AF37" font-family="serif" font-size="22" font-weight="600" text-anchor="middle" letter-spacing="4">ZÉLIA</text>
    <text x="300" y="415" fill="#FAF7F2" font-family="serif" font-size="11" text-anchor="middle" letter-spacing="2">PARIS</text>
    <line x1="245" y1="428" x2="355" y2="428" stroke="#D4AF37" stroke-width="1" opacity="0.5" />
    <text x="300" y="450" fill="#EADBCE" font-family="sans-serif" font-size="10" text-anchor="middle" letter-spacing="1.5">EXTRAIT DE PARFUM</text>
    <!-- Bottle Title Below -->
    <text x="300" y="630" fill="#FAF7F2" font-family="serif" font-size="24" text-anchor="middle" letter-spacing="2">${name}</text>
    <text x="300" y="660" fill="#D4AF37" font-family="sans-serif" font-size="12" font-weight="bold" text-anchor="middle" letter-spacing="3">HAUTE PARFUMERIE</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackTitle: string = 'ZÉLIA Parfums', accentColor: string = '#D4AF37') {
  const target = e.currentTarget;
  const currentSrc = target.src || '';

  // If already at fallback, stop to prevent infinite loop
  if (currentSrc.startsWith('data:image/svg+xml')) {
    return;
  }

  // If failed on /assets/images/, try /src/assets/images/ first
  if (currentSrc.includes('/assets/images/') && !target.dataset.triedSrcFallback) {
    target.dataset.triedSrcFallback = 'true';
    target.src = currentSrc.replace('/assets/images/', '/src/assets/images/');
    return;
  }

  // If failed on /src/assets/images/, try /assets/images/
  if (currentSrc.includes('/src/assets/images/') && !target.dataset.triedPublicFallback) {
    target.dataset.triedPublicFallback = 'true';
    target.src = currentSrc.replace('/src/assets/images/', '/assets/images/');
    return;
  }

  // Final guaranteed fallback: elegant golden flacon SVG
  target.src = getLuxuryPerfumeSvg(fallbackTitle, accentColor);
}
