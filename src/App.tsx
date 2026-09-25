import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlideshowAds } from './components/HeroSlideshowAds';
import { AuthenticGuaranteesBar } from './components/AuthenticGuaranteesBar';
import { ShopByCategory } from './components/ShopByCategory';
import { CelebritySlideshowAds } from './components/CelebritySlideshowAds';
import { ShopByBudget } from './components/ShopByBudget';
import { DesignerBrandsBar } from './components/DesignerBrandsBar';
import { OffersSection } from './components/OffersSection';
import { FeaturedPerfumes } from './components/FeaturedPerfumes';
import { CelebrityScents } from './components/CelebrityScents';
import { OccasionScentFinder } from './components/OccasionScentFinder';
import { ExploreCollections } from './components/ExploreCollections';
import { OurStory } from './components/OurStory';
import { FragranceNotesSection } from './components/FragranceNotesSection';
import { WhyChooseZelia } from './components/WhyChooseZelia';
import { CustomerReviews } from './components/CustomerReviews';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistModal } from './components/WishlistModal';
import { ScentFinderModal } from './components/ScentFinderModal';
import { Perfume, CartItem } from './types';
import { Heart, ShoppingBag, ShieldCheck } from 'lucide-react';
import { formatINR } from './utils/currency';
import { AdminDataProvider, useAdminData } from './context/AdminDataContext';
import { AdminDashboard } from './components/admin/AdminDashboard';

function ZeliaStorefront() {
  const { perfumes, addOrder, addMessage, websiteContent } = useAdminData();

  // View state: 'store' | 'admin'
  const [viewMode, setViewMode] = useState<'store' | 'admin'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#admin') {
      return 'admin';
    }
    return 'store';
  });

  // Category filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  // Cart state persisted to localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('zelia_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    const initialPerfume = perfumes[0];
    return [
      {
        perfume: initialPerfume,
        quantity: 1,
        selectedVolume: '100ml',
        price: initialPerfume?.price || 7999,
      }
    ];
  });

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zelia_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return ['zelia-rose-eternelle'];
  });

  // Modals & Drawers state
  const [quickViewPerfume, setQuickViewPerfume] = useState<Perfume | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<{ text: string; icon: 'cart' | 'heart' } | null>(null);

  // URL Hash Sync for #admin
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setViewMode('admin');
      } else if (viewMode === 'admin') {
        setViewMode('store');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [viewMode]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('zelia_cart', JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('zelia_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  const showToast = (text: string, icon: 'cart' | 'heart' = 'cart') => {
    setToastMessage({ text, icon });
    setTimeout(() => {
      setToastMessage(null), 3000;
    });
  };

  // Add to Cart handler
  const handleAddToCart = (perfume: Perfume, volume: string = '100ml', quantity: number = 1) => {
    let unitPrice = perfume.price;
    const matchedSize = perfume.sizes?.find((s) => s.ml === volume);

    if (matchedSize) {
      unitPrice = matchedSize.price;
    } else {
      if (volume === '50ml') unitPrice = Math.round(perfume.price * 0.65);
      else if (volume === '200ml') unitPrice = Math.round(perfume.price * 1.55);
      else if (volume === '12ml' || volume.includes('15ml')) unitPrice = Math.round(perfume.price * 0.45);
    }

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.perfume.id === perfume.id && item.selectedVolume === volume
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { perfume, selectedVolume: volume, quantity, price: unitPrice }];
      }
    });

    showToast(`${perfume.name} (${volume}) added to bag • ${formatINR(unitPrice)}`, 'cart');
  };

  const handleBuyNow = (perfume: Perfume, volume: string = '100ml') => {
    handleAddToCart(perfume, volume, 1);
    setIsCartOpen(true);
  };

  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    const el = document.getElementById('featured-perfumes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBudgetSelect = (budgetId: string | null) => {
    setSelectedBudget(budgetId);
    const el = document.getElementById('featured-perfumes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (perfumeId: string) => {
    const exists = wishlistIds.includes(perfumeId);
    const targetPerfume = perfumes.find((p) => p.id === perfumeId);
    if (exists) {
      setWishlistIds((prev) => prev.filter((id) => id !== perfumeId));
      if (targetPerfume) showToast(`Removed ${targetPerfume.name} from saved items`, 'heart');
    } else {
      setWishlistIds((prev) => [...prev, perfumeId]);
      if (targetPerfume) showToast(`Saved ${targetPerfume.name} to wishlist`, 'heart');
    }
  };

  const wishlistPerfumes = perfumes.filter((p) => wishlistIds.includes(p.id));

  const handleShopNow = () => {
    const el = document.getElementById('featured-perfumes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreCollection = () => {
    const el = document.getElementById('explore-collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPerfumeByNote = (perfumeName: string) => {
    setSearchQuery(perfumeName);
    const el = document.getElementById('featured-perfumes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectBrand = (brandName: string) => {
    setSearchQuery(brandName);
    const el = document.getElementById('featured-perfumes');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSwitchToAdmin = () => {
    window.location.hash = 'admin';
    setViewMode('admin');
  };

  const handleSwitchToStore = () => {
    window.location.hash = '';
    setViewMode('store');
  };

  // If in Admin Mode, render the full luxury Admin Dashboard
  if (viewMode === 'admin') {
    return <AdminDashboard onSwitchToStore={handleSwitchToStore} />;
  }

  // Otherwise, render Storefront
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C241E]">
      {/* Floating Admin Mode Quick Launcher Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={handleSwitchToAdmin}
          className="px-4 py-2.5 bg-[#1C1714] text-[#D4AF37] hover:text-white border border-[#D4AF37]/50 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold tracking-wider uppercase transition-all hover:scale-105 cursor-pointer backdrop-blur-md"
          title="Open Maison ZÉLIA Modern Admin Dashboard"
        >
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>Admin Dashboard</span>
        </button>
      </div>

      {/* Toast feedback pill */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C241E] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#D4AF37]/60 flex items-center gap-3 animate-fade-in text-xs tracking-wider">
          {toastMessage.icon === 'cart' ? (
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
          ) : (
            <Heart className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Main Navigation Header with Rotating Announcement Slider & Admin Portal Link */}
      <Navbar
        cartItems={cartItems}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenAdmin={handleSwitchToAdmin}
        onSearchChange={(q) => setSearchQuery(q)}
        customAnnouncements={websiteContent.announcements}
      />

      <main className="flex-grow">
        {/* Hero Slideshow Ads with Celebrity Campaigns */}
        <HeroSlideshowAds
          onShopNow={handleShopNow}
          onExploreCollection={handleExploreCollection}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onQuickView={(p) => setQuickViewPerfume(p)}
        />

        {/* Authenticity & Trust Guarantees Bar */}
        <AuthenticGuaranteesBar />

        {/* Circular Categories Grid */}
        <ShopByCategory
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Celebrity Slideshow Ads Banner */}
        <div id="campaign-ads">
          <CelebritySlideshowAds
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onQuickView={(p) => setQuickViewPerfume(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        </div>

        {/* Shop by Budget in INR */}
        <div id="shop-budget">
          <ShopByBudget
            selectedBudget={selectedBudget}
            onSelectBudget={handleBudgetSelect}
          />
        </div>

        {/* Shop by Designer Brand / Haute Parfumerie Houses */}
        <div id="designer-brands">
          <DesignerBrandsBar
            onSelectBrand={handleSelectBrand}
          />
        </div>

        {/* Exclusive Festive Privilege Offers */}
        <OffersSection
          onExploreOffers={handleShopNow}
        />

        {/* Main Product Catalog with Categories, Best Sellers, Offers, ml Selectors & Dual CTAs */}
        <FeaturedPerfumes
          perfumes={perfumes}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onQuickView={(p) => setQuickViewPerfume(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          searchQuery={searchQuery}
          categoryFilter={selectedCategory}
          onSelectCategory={handleCategorySelect}
          budgetFilter={selectedBudget}
          onClearBudget={() => setSelectedBudget(null)}
        />

        {/* Celebrities Most Used Section */}
        <CelebrityScents
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onQuickView={(p) => setQuickViewPerfume(p)}
        />

        {/* Occasion Scent Finder Guide */}
        <div id="occasion-finder">
          <OccasionScentFinder
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onQuickView={(p) => setQuickViewPerfume(p)}
          />
        </div>

        {/* Explore The 5 Complete Collections Showcase */}
        <ExploreCollections
          perfumes={perfumes}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onQuickView={(p) => setQuickViewPerfume(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
        />

        {/* Our Story Section */}
        <OurStory />

        {/* Fragrance Notes & Olfactory Pyramid Section */}
        <FragranceNotesSection
          onSelectPerfumeByNote={handleSelectPerfumeByNote}
        />

        {/* Why Choose ZÉLIA Section */}
        <WhyChooseZelia />

        {/* Customer Reviews Section */}
        <CustomerReviews />

        {/* Contact Us & Boutique Concierge Section */}
        <ContactSection
          onSendMessage={(msg) => {
            addMessage({
              id: `msg-${Date.now()}`,
              name: msg.name,
              email: msg.email,
              subject: msg.subject,
              message: msg.message,
              date: new Date().toISOString(),
              status: 'Unread'
            });
            showToast('Your message has been received by the Atelier Concierge.');
          }}
        />
      </main>

      {/* Luxury Footer with Atelier Admin Access */}
      <Footer onOpenAdmin={handleSwitchToAdmin} />

      {/* Modals & Slide-overs */}
      <ProductQuickViewModal
        perfume={quickViewPerfume}
        onClose={() => setQuickViewPerfume(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isWishlisted={quickViewPerfume ? wishlistIds.includes(quickViewPerfume.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOrderPlaced={(order) => {
          addOrder(order);
          showToast(`Order ${order.orderNumber} successfully registered with Maison ZÉLIA.`);
        }}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistPerfumes={wishlistPerfumes}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p, '100ml', 1)}
        onQuickView={(p) => setQuickViewPerfume(p)}
      />

      <ScentFinderModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onAddToCart={(p) => handleAddToCart(p, '100ml', 1)}
        onQuickView={(p) => setQuickViewPerfume(p)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AdminDataProvider>
      <ZeliaStorefront />
    </AdminDataProvider>
  );
}
