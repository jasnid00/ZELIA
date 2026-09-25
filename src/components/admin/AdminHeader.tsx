import React, { useState } from 'react';
import { Menu, Search, Bell, ExternalLink, ShieldCheck, Check, AlertTriangle } from 'lucide-react';
import { AdminTab } from './AdminSidebar';
import { useAdminData } from '../../context/AdminDataContext';
import { formatINR } from '../../utils/currency';

interface AdminHeaderProps {
  activeTab: AdminTab;
  onOpenMobileSidebar: () => void;
  onSwitchToStore: () => void;
  onSelectTab: (tab: AdminTab) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeTab,
  onOpenMobileSidebar,
  onSwitchToStore,
  onSelectTab
}) => {
  const { orders, perfumes, settings } = useAdminData();
  const [showNotifications, setShowNotifications] = useState(false);

  const pendingOrders = orders.filter((o) => o.status === 'Pending');
  const lowStockItems = perfumes.filter(
    (p) => (p.stockCount ?? 10) <= settings.lowStockThreshold
  );

  const totalAlerts = pendingOrders.length + lowStockItems.length;

  const tabTitles: Record<AdminTab, { title: string; subtitle: string }> = {
    dashboard: { title: 'Executive Dashboard', subtitle: 'Overview of sales, luxury flacon inventory & royal clientele' },
    products: { title: 'Perfume Inventory', subtitle: 'Manage luxury extraits de parfum, flacon imagery, prices & stock' },
    orders: { title: 'Orders & Dispatch', subtitle: 'Manage fulfillment across Pending, Confirmed, Shipped, Delivered & Cancelled' },
    customers: { title: 'VIP Clientele', subtitle: 'Haute perfumerie patrons, purchase history & membership tiers' },
    categories: { title: 'Fragrance Families & Collections', subtitle: 'Curate olfactory classifications & luxury collections' },
    reviews: { title: 'Client Endorsements & Reviews', subtitle: 'Moderate olfactory feedback and publish Atelier responses' },
    content: { title: 'Website Content Editor', subtitle: 'Customize announcements, marquee banners, brand story & concierge info' },
    offers: { title: 'Privilege Offers & Codes', subtitle: 'Manage seasonal discounts, voucher codes & spending thresholds' },
    messages: { title: 'Concierge Inquiries', subtitle: 'Respond to bespoke bridal, corporate gifting & client inquiries' },
    settings: { title: 'Boutique Settings', subtitle: 'Configure regional currency, shipping rules, taxes & notifications' }
  };

  const currentMeta = tabTitles[activeTab] || { title: 'Dashboard', subtitle: '' };

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DFD4] px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Left zone: Mobile trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 text-[#6E5D53] hover:text-[#2C241E] rounded-xl hover:bg-[#EDE4D8] lg:hidden cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-[11px] text-[#7A6A5D] font-medium tracking-wider uppercase">
            <span>Maison ZÉLIA</span>
            <span>/</span>
            <span className="text-[#9A7B38] font-semibold">{currentMeta.title}</span>
          </div>
          <h1 className="font-serif-luxury text-xl sm:text-2xl text-[#2C241E] font-medium tracking-wide">
            {currentMeta.title}
          </h1>
        </div>
      </div>

      {/* Right zone: Actions, Notifications & Storefront Link */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Quick Return to Store Button */}
        <button
          onClick={onSwitchToStore}
          className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl border border-[#D4AF37]/50 bg-white hover:bg-[#FFFBEB] text-xs font-medium text-[#2C241E] hover:text-[#9A7B38] transition-colors shadow-2xs cursor-pointer"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Live Storefront</span>
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl border border-[#E8DFD4] bg-white text-[#6E5D53] hover:text-[#2C241E] hover:border-[#D4AF37] transition-colors relative cursor-pointer shadow-2xs"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {totalAlerts > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C5A059] text-[#1C1714] text-[9px] font-bold flex items-center justify-center font-mono">
                {totalAlerts}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E8DFD4] rounded-2xl shadow-xl z-50 p-4 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD4]">
                <h4 className="font-serif-luxury text-base text-[#2C241E] font-medium">
                  Atelier Notifications
                </h4>
                <span className="text-[10px] font-mono tabular-nums text-[#7A6A5D]">
                  {totalAlerts} Active
                </span>
              </div>

              <div className="py-2 space-y-2 max-h-72 overflow-y-auto">
                {pendingOrders.length === 0 && lowStockItems.length === 0 ? (
                  <div className="text-center py-6 text-xs text-[#7A6A5D]">
                    <ShieldCheck className="w-6 h-6 text-emerald-600 mx-auto mb-1.5" />
                    All flacon dispatches and inventory are in pristine order.
                  </div>
                ) : (
                  <>
                    {pendingOrders.map((ord) => (
                      <div
                        key={ord.id}
                        onClick={() => {
                          onSelectTab('orders');
                          setShowNotifications(false);
                        }}
                        className="p-2.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] hover:border-[#D4AF37] transition-colors cursor-pointer text-xs"
                      >
                        <div className="flex items-center justify-between font-medium text-[#2C241E]">
                          <span>New Order: {ord.orderNumber}</span>
                          <span className="font-mono text-[#9A7B38]">{formatINR(ord.total)}</span>
                        </div>
                        <p className="text-[11px] text-[#7A6A5D] mt-0.5">
                          {ord.customerName} • {ord.shippingAddress.city} (Pending Dispatch)
                        </p>
                      </div>
                    ))}

                    {lowStockItems.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          onSelectTab('products');
                          setShowNotifications(false);
                        }}
                        className="p-2.5 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] hover:border-[#F43F5E] transition-colors cursor-pointer text-xs"
                      >
                        <div className="flex items-center justify-between font-medium text-[#2C241E]">
                          <span className="flex items-center gap-1.5 text-rose-800">
                            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                            Low Stock Alert
                          </span>
                          <span className="font-mono font-bold text-rose-700">
                            {item.stockCount} left
                          </span>
                        </div>
                        <p className="text-[11px] text-[#7A6A5D] mt-0.5">
                          {item.name} requires replenishment.
                        </p>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <div className="pt-2 border-t border-[#E8DFD4] text-center">
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-[#9A7B38] hover:underline font-medium cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin Profile Chip */}
        <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-[#E8DFD4]">
          <div className="w-8 h-8 rounded-full bg-[#2C241E] text-[#D4AF37] font-serif-luxury font-semibold flex items-center justify-center text-xs shadow-2xs border border-[#D4AF37]/50">
            Z
          </div>
          <div className="hidden md:block text-left">
            <p className="text-xs font-medium text-[#2C241E] leading-tight">
              Atelier Director
            </p>
            <p className="text-[10px] text-[#7A6A5D] leading-tight font-mono">
              Maison ZÉLIA
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
