import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, Sparkles, Gift, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { formatINR } from '../utils/currency';
import { handleImageError } from '../utils/imageFallback';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onOrderPlaced?: (order: any) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderPlaced,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [promoError, setPromoError] = useState('');
  const [isGiftWrapped, setIsGiftWrapped] = useState(true);
  const [selectedSamples, setSelectedSamples] = useState<string[]>([
    'Rose Éternelle (2ml)',
    'Lumina d’Or (2ml)',
    'Blanc Sublime (2ml)'
  ]);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');

  // Checkout shipping fields
  const [fullName, setFullName] = useState('Vikramaditya Singhania');
  const [phone, setPhone] = useState('+91 99300 87123');
  const [address, setAddress] = useState('Altamount Road, Penthouse 18B');
  const [city, setCity] = useState('Mumbai');
  const [pinCode, setPinCode] = useState('400026');

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = promoApplied ? Math.round(rawSubtotal * (discountPercent / 100)) : 0;
  const subtotal = rawSubtotal - discount;
  const shippingThreshold = 2999;
  const freeShippingUnlocked = rawSubtotal >= shippingThreshold;
  const shippingCost = freeShippingUnlocked ? 0 : 250;
  const total = subtotal + shippingCost;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === 'ZELIA20') {
      setPromoApplied(true);
      setDiscountPercent(20);
      setPromoError('');
    } else if (cleanCode === 'ZELIA10' || cleanCode === 'WELCOME10') {
      setPromoApplied(true);
      setDiscountPercent(10);
      setPromoError('');
    } else if (cleanCode === 'FESTIVE15') {
      setPromoApplied(true);
      setDiscountPercent(15);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "ZELIA20" for 20% off or "FESTIVE15"');
    }
  };

  const handleToggleSample = (sampleName: string) => {
    if (selectedSamples.includes(sampleName)) {
      setSelectedSamples(selectedSamples.filter((s) => s !== sampleName));
    } else if (selectedSamples.length < 3) {
      setSelectedSamples([...selectedSamples, sampleName]);
    }
  };

  const sampleOptions = [
    'Lumina d’Or (2ml)',
    'Rose Éternelle (2ml)',
    'Blanc Sublime (2ml)',
    'Nuit de Vanille (2ml)',
    'Rubis Envoûtant (2ml)',
    'Oud Céleste (2ml)',
  ];

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutComplete(true);

    if (onOrderPlaced) {
      const orderNumber = `ZEL-${Math.floor(1000 + Math.random() * 9000)}`;
      onOrderPlaced({
        id: `ord-${Date.now()}`,
        orderNumber,
        customerName: fullName || 'Maison Patron',
        customerEmail: `${(fullName || 'patron').toLowerCase().replace(/\s+/g, '.')}@luxury.in`,
        customerPhone: phone || '+91 98765 43210',
        shippingAddress: {
          address: address || 'Boutique Residence',
          city: city || 'Mumbai',
          pinCode: pinCode || '400001',
          state: 'Maharashtra'
        },
        items: cartItems.map((item) => ({
          perfumeId: item.perfume.id,
          perfumeName: item.perfume.name,
          volume: item.selectedVolume,
          quantity: item.quantity,
          price: item.price,
          image: item.perfume.image
        })),
        subtotal,
        discount,
        shipping: shippingCost,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
        status: 'Pending',
        date: new Date().toISOString(),
        trackingNumber: '',
        notes: isGiftWrapped ? 'Complimentary wax-sealed gift wrapping requested.' : ''
      });
    }

    setTimeout(() => {
      onClearCart();
      setCheckoutComplete(false);
      setShowCheckoutModal(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1C1714]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl border-l border-[#D8C3A5] flex flex-col justify-between text-[#2C241E]">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#EADBCE] flex items-center justify-between bg-[#F4EFEA]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#9A7B38]" />
              <h2 className="font-serif-luxury text-2xl text-[#2C241E] font-medium tracking-wide">
                Your Shopping Bag
              </h2>
              <span className="text-xs text-[#7A6A5D] font-medium">
                ({cartItems.reduce((a, b) => a + b.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#7A6A5D] hover:text-[#2C241E] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator across India */}
          <div className="bg-[#EADBCE]/50 px-6 py-3 border-b border-[#EADBCE] text-xs">
            {freeShippingUnlocked ? (
              <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Complimentary Pan-India Doorstep Delivery Unlocked!</span>
              </div>
            ) : (
              <div>
                <p className="text-[#6E5D53]">
                  Add <strong className="text-[#2C241E]">{formatINR(shippingThreshold - rawSubtotal)}</strong> more for complimentary delivery across India.
                </p>
                <div className="w-full bg-[#D8C3A5] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#C5A059] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min(100, (rawSubtotal / shippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Cart Items Scrollable Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F4EFEA] border border-[#D8C3A5] flex items-center justify-center mx-auto text-[#9A7B38]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-luxury text-2xl text-[#2C241E]">
                  Your Bag Is Empty
                </h3>
                <p className="text-xs text-[#6E5D53] max-w-xs mx-auto">
                  Allow your senses to guide you through our signature extraits de parfum and pure attars.
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-6 py-2.5 bg-[#2C241E] text-white text-xs uppercase tracking-wider rounded-xl hover:bg-[#C5A059] transition-colors cursor-pointer font-semibold"
                >
                  Discover Collection
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div
                      key={`${item.perfume.id}-${item.selectedVolume}-${index}`}
                      className="flex gap-4 p-3 bg-white rounded-2xl border border-[#EADBCE] shadow-sm relative group"
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-24 rounded-xl overflow-hidden shrink-0 border border-[#EADBCE] bg-[#FAF7F2]">
                        <img
                          src={item.perfume.image}
                          alt={item.perfume.name}
                          onError={(e) => handleImageError(e, item.perfume.name, item.perfume.accentColor)}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h4 className="font-serif-luxury text-base text-[#2C241E] font-medium leading-tight">
                              {item.perfume.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(index)}
                              className="text-[#9A8A7D] hover:text-[#8B0000] p-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="text-[11px] text-[#7A6A5D]">
                            Flacon: <strong>{item.selectedVolume}</strong> • {item.perfume.concentration.split(' ')[0]}
                          </p>
                        </div>

                        {/* Quantity and Price */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center border border-[#D8C3A5] rounded-lg bg-[#FAF7F2]">
                            <button
                              onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                              className="px-2 py-1 text-xs text-[#4A3F35] hover:bg-[#EADBCE] cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-semibold text-[#2C241E]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                              className="px-2 py-1 text-xs text-[#4A3F35] hover:bg-[#EADBCE] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-serif-luxury text-base font-bold text-[#2C241E]">
                            {formatINR(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Complimentary Deluxe Discovery Samples Selector */}
                <div className="p-4 bg-[#F4EFEA] rounded-2xl border border-[#D8C3A5]/70 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif-luxury font-semibold text-[#2C241E] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      Select 3 Complimentary Samples:
                    </span>
                    <span className="text-[11px] text-[#9A7B38] font-bold">
                      {selectedSamples.length}/3 selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    {sampleOptions.map((opt) => {
                      const isPicked = selectedSamples.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleToggleSample(opt)}
                          className={`text-[10px] p-1.5 rounded-lg text-left border transition-all truncate cursor-pointer ${
                            isPicked
                              ? 'bg-[#2C241E] text-white border-[#2C241E]'
                              : 'bg-white text-[#6E5D53] border-[#D8C3A5] hover:bg-[#FAF7F2]'
                          }`}
                        >
                          {isPicked ? '✓ ' : '+ '}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Gift Packaging Toggle */}
                <div className="p-3 bg-white rounded-2xl border border-[#EADBCE] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#C5A059]" />
                    <div>
                      <span className="font-medium text-[#2C241E] block">
                        Complimentary Silk Gift Coffret
                      </span>
                      <span className="text-[10px] text-[#7A6A5D]">
                        Embossed rigid box with 24k gold leaf seal & wax note
                      </span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isGiftWrapped}
                    onChange={(e) => setIsGiftWrapped(e.target.checked)}
                    className="w-4 h-4 accent-[#C5A059] cursor-pointer"
                  />
                </div>

                {/* Privilege Code Input */}
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Coupon Code (e.g. ZELIA20)"
                      className="flex-1 bg-white border border-[#D8C3A5] rounded-xl px-3 py-2 text-xs text-[#2C241E] uppercase placeholder:normal-case placeholder:text-[#9A8A7D] focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#2C241E] text-white text-xs uppercase tracking-wider rounded-xl hover:bg-[#C5A059] transition-colors cursor-pointer font-semibold"
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-[11px] text-emerald-700 font-medium">
                      ✓ Privilege code applied: {discountPercent}% Festive Discount!
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-[#8B0000]">{promoError}</p>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Drawer Footer & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-[#EADBCE] bg-[#F4EFEA] space-y-3">
              <div className="space-y-1.5 text-xs text-[#6E5D53]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#2C241E]">{formatINR(rawSubtotal)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Festive Privilege ({discountPercent}%)</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Pan-India Delivery</span>
                  <span>{shippingCost === 0 ? 'Complimentary' : formatINR(shippingCost)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#D8C3A5] text-lg font-serif-luxury font-bold text-[#2C241E]">
                  <span>Total Amount</span>
                  <span>{formatINR(total)}</span>
                </div>
              </div>

              <button
                id="cart-checkout-trigger"
                onClick={() => setShowCheckoutModal(true)}
                className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#DFBE4E] hover:to-[#C6A035] text-[#1C1714] text-xs uppercase tracking-[0.2em] font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Proceed to Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#7A6A5D] uppercase tracking-wider pt-1">
                <Shield className="w-3 h-3 text-[#C5A059]" />
                <span>UPI • NetBanking • Credit/Debit Cards • Cash on Delivery</span>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Instant Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C1714]/80 backdrop-blur-md">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#D8C3A5] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCheckoutModal(false)}
              className="absolute top-4 right-4 text-[#7A6A5D] hover:text-[#2C241E] p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {checkoutComplete ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border-2 border-[#C5A059] text-[#9A7B38] flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 animate-spin" />
                </div>
                <h3 className="font-serif-luxury text-3xl text-[#2C241E]">
                  Order Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-[#6E5D53] leading-relaxed max-w-sm mx-auto">
                  Thank you for placing your trust in Maison ZÉLIA. Your flacons are being hand-packaged with your 3 complimentary discovery samples and wax-sealed note.
                </p>
                <div className="p-3 bg-white rounded-xl border border-[#EADBCE] text-xs font-mono text-[#7A6A5D]">
                  Order Ref: #ZELIA-IN-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <p className="text-xs text-emerald-800 font-medium">
                  Dispatch within 24 hours via Express Bluedart Air.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCompleteOrder} className="space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#9A7B38]">
                    Maison ZÉLIA • Pan-India Delivery
                  </span>
                  <h3 className="font-serif-luxury text-2xl text-[#2C241E]">
                    Shipping & Payment Details
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-[#4A3F35] block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singhania"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white border border-[#D8C3A5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#4A3F35] block mb-1">
                      Phone Number (for SMS Tracking)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-[#D8C3A5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium text-[#4A3F35] block mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Apartment, Street, Landmark"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white border border-[#D8C3A5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium text-[#4A3F35] block mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Mumbai / Delhi / Bengaluru"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-white border border-[#D8C3A5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium text-[#4A3F35] block mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 400001"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      className="w-full bg-white border border-[#D8C3A5] rounded-xl px-3 py-2 text-xs text-[#2C241E] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Payment Options */}
                <div className="space-y-2 pt-2">
                  <label className="text-[11px] uppercase tracking-wider font-semibold text-[#4A3F35] block">
                    Select Payment Mode:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-[#D4AF37] bg-[#FFFBEB] text-[#2C241E] ring-1 ring-[#D4AF37]'
                          : 'border-[#EADBCE] bg-white text-[#6E5D53]'
                      }`}
                    >
                      UPI / GPay / Paytm
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                        paymentMethod === 'card'
                          ? 'border-[#D4AF37] bg-[#FFFBEB] text-[#2C241E] ring-1 ring-[#D4AF37]'
                          : 'border-[#EADBCE] bg-white text-[#6E5D53]'
                      }`}
                    >
                      Cards / NetBanking
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center cursor-pointer transition-all ${
                        paymentMethod === 'cod'
                          ? 'border-[#D4AF37] bg-[#FFFBEB] text-[#2C241E] ring-1 ring-[#D4AF37]'
                          : 'border-[#EADBCE] bg-white text-[#6E5D53]'
                      }`}
                    >
                      Cash on Delivery
                    </button>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-[#EADBCE] text-xs space-y-1">
                  <div className="flex justify-between font-bold text-base text-[#2C241E]">
                    <span>Total Payable:</span>
                    <span>{formatINR(total)}</span>
                  </div>
                  <p className="text-[11px] text-[#7A6A5D]">
                    Includes all GST taxes, complimentary gift packaging, and express Bluedart Air courier.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#B38F24] hover:from-[#DFBE4E] hover:to-[#C6A035] text-[#1C1714] text-xs uppercase tracking-[0.2em] font-bold rounded-xl shadow-lg transition-all cursor-pointer"
                >
                  Confirm Order ({formatINR(total)})
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
