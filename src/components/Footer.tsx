import React from 'react';
import { Sparkles, Instagram, Facebook, Heart, ArrowUp } from 'lucide-react';
import { ZeliaLogo } from './ZeliaLogo';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#231C17] text-[#FAF7F2] border-t border-[#3E342B] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3E342B]">
          
          {/* Brand Col with Official ZÉLIA Emblem */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-1">
              <ZeliaLogo variant="horizontal" inverted={true} />
            </div>

            <p className="font-serif-luxury italic text-sm text-[#D8C3A5] max-w-sm leading-relaxed pt-2">
              “A scent that lingers long after you leave.”
            </p>

            <p className="text-xs text-[#9A8A7D] leading-relaxed max-w-sm">
              Crafted in the floral cradle of the French Riviera with rare botanical absolutes,
              pure artisanal crystal, and unmatched extrait concentration.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="ZÉLIA Facebook Page"
                className="w-8 h-8 rounded-full border border-[#3E342B] hover:border-[#C5A059] flex items-center justify-center text-[#D8C3A5] hover:text-[#C5A059] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="ZÉLIA Instagram"
                className="w-8 h-8 rounded-full border border-[#3E342B] hover:border-[#C5A059] flex items-center justify-center text-[#D8C3A5] hover:text-[#C5A059] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A059]">
              The House
            </h4>
            <ul className="space-y-2 text-xs text-[#D8C3A5]">
              <li>
                <a href="#featured-perfumes" className="hover:text-white transition-colors">
                  Signature Flacons
                </a>
              </li>
              <li>
                <a href="#explore-collections" className="hover:text-white transition-colors flex items-center gap-1.5 text-[#C5A059] font-medium">
                  <span>Explore Collections</span>
                  <Sparkles className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#our-story" className="hover:text-white transition-colors">
                  Our Story & Terroir
                </a>
              </li>
              <li>
                <a href="#fragrance-notes" className="hover:text-white transition-colors">
                  Olfactory Pyramid
                </a>
              </li>
              <li>
                <a href="#why-zelia" className="hover:text-white transition-colors">
                  Why Choose ZÉLIA
                </a>
              </li>
              <li>
                <a href="#customer-reviews" className="hover:text-white transition-colors">
                  Guestbook & Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Fragrance Families */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A059]">
              Fragrance Families
            </h4>
            <ul className="space-y-2 text-xs text-[#D8C3A5]">
              <li>
                <a href="#featured-perfumes" className="hover:text-white transition-colors">
                  Solar Warmth & Amber
                </a>
              </li>
              <li>
                <a href="#featured-perfumes" className="hover:text-white transition-colors">
                  Floral Silk & Grasse May Rose
                </a>
              </li>
              <li>
                <a href="#featured-perfumes" className="hover:text-white transition-colors">
                  Smoked Bourbon Vanilla
                </a>
              </li>
              <li>
                <a href="#featured-perfumes" className="hover:text-white transition-colors">
                  Crisp Neroli & Cashmere
                </a>
              </li>
              <li>
                <a href="#featured-perfumes" className="hover:text-white transition-colors">
                  Discovery Sample Coffrets
                </a>
              </li>
            </ul>
          </div>

          {/* Client Concierge & Boutiques */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#C5A059]">
              Client Concierge
            </h4>
            <div className="space-y-2 text-xs text-[#D8C3A5]">
              <p>Place Vendôme, Paris • Grasse Atelier</p>
              <p>Email: concierge@zelia-parfums.com</p>
              <p>Toll-Free: +33 (0)1 42 68 55 90</p>
              <div className="pt-2 text-[11px] text-[#9A8A7D]">
                <span>Hours: Lun–Sam, 9h to 19h CET</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#9A8A7D]">
          <p>© {new Date().getFullYear()} ZÉLIA Parfums S.A. Tous droits réservés. Haute Parfumerie Française.</p>
          
          <div className="flex items-center gap-6">
            <span>Cruelty-Free & Sustainable</span>
            <span>•</span>
            {onOpenAdmin && (
              <>
                <button
                  onClick={onOpenAdmin}
                  className="text-[#D8C3A5] hover:text-[#C5A059] transition-colors cursor-pointer"
                >
                  Atelier Administration
                </button>
                <span>•</span>
              </>
            )}
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#C5A059] hover:underline cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
