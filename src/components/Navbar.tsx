import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { CartItem } from '../types';
import { ZeliaLogo } from './ZeliaLogo';
import { TOP_ANNOUNCEMENTS } from '../data/campaignAds';

interface NavbarProps {
  cartItems: CartItem[];
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenQuiz: () => void;
  onOpenAdmin?: () => void;
  onSearchChange?: (query: string) => void;
  customAnnouncements?: string[];
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenQuiz,
  onOpenAdmin,
  onSearchChange,
  customAnnouncements,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  const activeAnnouncements = customAnnouncements && customAnnouncements.length > 0
    ? customAnnouncements.map((text) => ({ tag: 'ATELIER', text }))
    : TOP_ANNOUNCEMENTS;

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotating announcement bar
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % activeAnnouncements.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [activeAnnouncements.length]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchChange) {
      onSearchChange(searchQuery);
    }
    const perfumesSection = document.getElementById('featured-perfumes');
    if (perfumesSection) {
      perfumesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Campaign Ads', href: '#campaign-ads' },
    { name: 'Fragrances', href: '#featured-perfumes' },
    { name: 'Celebrity Picks', href: '#celebrity-scents' },
    { name: 'Occasion Guide', href: '#occasion-finder' },
    { name: 'Collections', href: '#explore-collections' },
    { name: 'By Budget', href: '#shop-budget' },
    { name: 'Concierge', href: '#contact-us' },
  ];

  const currentAnnouncement = activeAnnouncements[announcementIndex % activeAnnouncements.length] || activeAnnouncements[0];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* FridayCharm-style Top Rotating Announcement Bar */}
      <div className="bg-[#1C1714] text-[#EADBCE] text-[11px] sm:text-xs tracking-[0.18em] uppercase py-2 px-3 text-center font-medium border-b border-[#3E342B] relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setAnnouncementIndex((prev) => (prev - 1 + TOP_ANNOUNCEMENTS.length) % TOP_ANNOUNCEMENTS.length)}
            aria-label="Previous announcement"
            className="p-1 text-white/50 hover:text-[#D4AF37] transition-colors cursor-pointer hidden sm:block"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <div className="flex-1 flex items-center justify-center gap-2 overflow-hidden px-2">
            <span className="px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-bold tracking-wider hidden md:inline-block">
              {currentAnnouncement.tag}
            </span>
            <span className="transition-opacity duration-300 font-semibold truncate">
              {currentAnnouncement.text}
            </span>
            <button 
              onClick={onOpenQuiz}
              className="hidden lg:inline-flex items-center text-[#D4AF37] hover:underline font-semibold ml-2 transition-colors cursor-pointer text-[10px]"
            >
              Take Scent Quiz <ChevronRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>

          <button
            onClick={() => setAnnouncementIndex((prev) => (prev + 1) % TOP_ANNOUNCEMENTS.length)}
            aria-label="Next announcement"
            className="p-1 text-white/50 hover:text-[#D4AF37] transition-colors cursor-pointer hidden sm:block"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm border-[#EADBCE]/80 py-3.5'
            : 'bg-[#FAF7F2] border-[#EADBCE]/50 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Mobile Menu Button & Search Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              id="mobile-menu-toggle"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-[#2C241E] hover:text-[#C5A059] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              id="mobile-search-toggle"
              aria-label="Toggle search"
              onClick={() => setShowSearch(!showSearch)}
              className="p-1.5 text-[#2C241E] hover:text-[#C5A059] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Left Desktop Links */}
          <div className="hidden lg:flex items-center space-x-7 text-[12px] tracking-[0.18em] uppercase font-medium text-[#4A3F35]">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative hover:text-[#C5A059] transition-colors py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Center Brand Identity with Official ZÉLIA Crest Logo */}
          <div className="text-center flex flex-col items-center">
            <a href="#" className="group flex flex-col items-center">
              <ZeliaLogo variant="full" size="sm" />
            </a>
          </div>

          {/* Right Desktop Links & Actions */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* Desktop right links */}
            <div className="hidden lg:flex items-center space-x-7 text-[12px] tracking-[0.18em] uppercase font-medium text-[#4A3F35] mr-2">
              {navLinks.slice(3).map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative hover:text-[#C5A059] transition-colors py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A059] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Scent Matcher Quiz Button */}
            <button
              id="nav-scent-finder-btn"
              onClick={onOpenQuiz}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#C5A059]/60 rounded-full text-[11px] tracking-[0.15em] uppercase text-[#9A7B38] hover:bg-[#C5A059] hover:text-white transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scent Matcher</span>
            </button>

            {/* Admin Portal Entry Button */}
            {onOpenAdmin && (
              <button
                id="nav-admin-portal-btn"
                onClick={onOpenAdmin}
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] tracking-[0.15em] uppercase font-semibold bg-[#2C241E] text-[#D4AF37] hover:bg-[#3E342B] border border-[#D4AF37]/40 transition-all cursor-pointer shadow-2xs"
                title="Maison ZÉLIA Admin Dashboard"
              >
                <span>Admin Portal</span>
              </button>
            )}

            {/* Search Desktop Toggle */}
            <button
              id="desktop-search-toggle"
              aria-label="Search perfumes"
              onClick={() => setShowSearch(!showSearch)}
              className="hidden lg:block p-1.5 text-[#4A3F35] hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Button */}
            <button
              id="nav-wishlist-btn"
              aria-label="Wishlist items"
              onClick={onOpenWishlist}
              className="relative p-1.5 text-[#4A3F35] hover:text-[#C5A059] transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button
              id="nav-cart-btn"
              aria-label="View shopping bag"
              onClick={onOpenCart}
              className="relative p-2 bg-[#2C241E] text-[#FAF7F2] hover:bg-[#4A3F35] rounded-full transition-all cursor-pointer shadow-sm flex items-center justify-center"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C5A059] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#FAF7F2]">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {showSearch && (
          <div className="border-t border-[#EADBCE] bg-[#F4EFEA] py-3 px-4 transition-all">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
              <Search className="w-4 h-4 text-[#7A6A5D]" />
              <input
                id="header-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (onSearchChange) onSearchChange(e.target.value);
                }}
                placeholder="Search by note (vanilla, amber, rose) or perfume name..."
                className="w-full bg-transparent border-none focus:outline-none text-sm text-[#2C241E] placeholder:text-[#9A8A7D]"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    if (onSearchChange) onSearchChange('');
                  }}
                  className="text-xs uppercase tracking-wider text-[#7A6A5D] hover:text-[#2C241E]"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                className="bg-[#2C241E] text-white text-xs px-4 py-1.5 uppercase tracking-wider hover:bg-[#C5A059] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Menu Slide-out */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 bg-[#FAF7F2] border-b border-[#EADBCE] shadow-xl px-6 py-6 transition-all">
          <div className="flex flex-col space-y-4 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm tracking-[0.2em] uppercase font-medium text-[#2C241E] hover:text-[#C5A059] py-2 border-b border-[#F0E6DA]"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="mt-2 w-full py-2.5 bg-[#2C241E] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              Find My Scent
            </button>
            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 bg-[#FAF7F2] border border-[#D4AF37] text-[#9A7B38] text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-center gap-2"
              >
                <span>⚜️ Admin Portal</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
