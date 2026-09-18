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
import { PERFUMES } from './data/perfumes';
import { Perfume, CartItem } from './types';
import { Heart, ShoppingBag } from 'lucide-react';
import { formatINR } from './utils/currency';

export default function App() {
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
    // Pre-populate with one signature flacon priced in INR
    const initialPerfume = PERFUMES[0];
    return [
      {
        perfume: initialPerfume,
        quantity: 1,
        selectedVolume: '100ml',
        price: initialPerfume.price, // 7999 INR
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
      setToastMessage(null);
    }, 3000);
  };

  // Add to Cart handler with exact size pricing in Indian Rupees
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

  // Buy Now handler: adds to bag and immediately opens checkout drawer
  const handleBuyNow = (perfume: Perfume, volume: string = '100ml') => {
    handleAddToCart(perfume, volume, 1);
    setIsCartOpen(true);
  };

  // Category selection handler with smooth scroll to catalog
  const handleCategorySelect = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    const el = document.getElementById('featured-perfumes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Budget selection handler
  const handleBudgetSelect = (budgetId: string | null) => {
    setSelectedBudget(budgetId);
    const el = document.getElementById('featured-perfumes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update quantity in cart
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

  // Wishlist toggle
  const handleToggleWishlist = (perfumeId: string) => {
    const exists = wishlistIds.includes(perfumeId);
    const targetPerfume = PERFUMES.find((p) => p.id === perfumeId);
    if (exists) {
      setWishlistIds((prev) => prev.filter((id) => id !== perfumeId));
      if (targetPerfume) showToast(`Removed ${targetPerfume.name} from saved items`, 'heart');
    } else {
      setWishlistIds((prev) => [...prev, perfumeId]);
      if (targetPerfume) showToast(`Saved ${targetPerfume.name} to wishlist`, 'heart');
    }
  };

  const wishlistPerfumes = PERFUMES.filter((p) => wishlistIds.includes(p.id));

  // Navigation helpers
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

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C241E]">
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

      {/* Main Navigation Header with Rotating Announcement Slider */}
      <Navbar
        cartItems={cartItems}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      <main className="flex-grow">
        {/* FridayCharm-style Hero Slideshow Ads with Sexy Celebrity Campaigns */}
        <HeroSlideshowAds
          onShopNow={handleShopNow}
          onExploreCollection={handleExploreCollection}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onQuickView={(p) => setQuickViewPerfume(p)}
        />

        {/* FridayCharm-style Authenticity & Trust Guarantees Bar */}
        <AuthenticGuaranteesBar />

        {/* Circular Categories Grid (Matching FridayCharm category circles) */}
        <ShopByCategory
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* FridayCharm-style Dedicated Celebrity Seduction Slideshow Ads Banner */}
        <div id="campaign-ads">
          <CelebritySlideshowAds
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onQuickView={(p) => setQuickViewPerfume(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        </div>

        {/* FridayCharm-style Shop by Budget in INR */}
        <div id="shop-budget">
          <ShopByBudget
            selectedBudget={selectedBudget}
            onSelectBudget={handleBudgetSelect}
          />
        </div>

        {/* FridayCharm-style Shop by Designer Brand / Haute Parfumerie Houses */}
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
          perfumes={PERFUMES}
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

        {/* Celebrities Most Used Section with Photos, Scent Profiles, Quotes & Instant Actions */}
        <CelebrityScents
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onQuickView={(p) => setQuickViewPerfume(p)}
        />

        {/* Find the Perfect Scent for Every Occasion Guide with Photos (Wedding, Gifting, Season, Mood, Outfit) */}
        <div id="occasion-finder">
          <OccasionScentFinder
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onQuickView={(p) => setQuickViewPerfume(p)}
          />
        </div>

        {/* Explore The 5 Complete Collections Showcase */}
        <ExploreCollections
          perfumes={PERFUMES}
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
        <ContactSection />
      </main>

      {/* Luxury Footer */}
      <Footer />

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
