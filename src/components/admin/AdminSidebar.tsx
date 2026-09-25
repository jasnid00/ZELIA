import React from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  FolderTree,
  Star,
  FileText,
  Tag,
  MessageSquare,
  Settings,
  ExternalLink,
  Sparkles,
  X
} from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';

export type AdminTab =
  | 'dashboard'
  | 'products'
  | 'orders'
  | 'customers'
  | 'categories'
  | 'reviews'
  | 'content'
  | 'offers'
  | 'messages'
  | 'settings';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onSwitchToStore: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  onSwitchToStore,
  isMobileOpen,
  onCloseMobile
}) => {
  const { orders, messages, perfumes } = useAdminData();

  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const unreadMessagesCount = messages.filter((m) => m.status === 'Unread').length;

  const navItems: { id: AdminTab; label: string; icon: React.ElementType; badge?: number | string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package, badge: perfumes.length },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : undefined },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'categories', label: 'Categories', icon: FolderTree },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'content', label: 'Website Content', icon: FileText },
    { id: 'offers', label: 'Offers', icon: Tag },
    { id: 'messages', label: 'Messages', icon: MessageSquare, badge: unreadMessagesCount > 0 ? `${unreadMessagesCount}` : undefined },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-[#1C1714]/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#1C1714] text-[#EADBCE] border-r border-[#3E342B] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-[#3E342B] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif-luxury text-2xl tracking-[0.22em] text-[#D4AF37] font-semibold">
                ZÉLIA
              </span>
              <span className="text-[10px] tracking-[0.16em] uppercase text-[#D4AF37]/80 font-mono">
                ADMIN
              </span>
            </div>
            <p className="text-[11px] text-[#A6978A] tracking-wider mt-0.5 font-light">
              Haute Parfumerie Atelier
            </p>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1.5 text-[#A6978A] hover:text-white lg:hidden cursor-pointer"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-medium tracking-[0.18em] uppercase text-[#A6978A]/60">
            Navigation Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wide transition-colors cursor-pointer text-left ${
                  isActive
                    ? 'bg-[#2C241E] text-[#D4AF37] shadow-xs border border-[#D4AF37]/30'
                    : 'text-[#EADBCE]/80 hover:bg-[#261F1A] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-[#D4AF37]' : 'text-[#A6978A]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono tabular-nums px-2 py-0.5 rounded-full ${
                      item.id === 'orders' && pendingOrdersCount > 0
                        ? 'bg-[#C5A059] text-[#1C1714] font-semibold'
                        : item.id === 'messages' && unreadMessagesCount > 0
                        ? 'bg-[#C45B73] text-white font-semibold'
                        : 'bg-[#2E251F] text-[#A6978A]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#3E342B] bg-[#171310] space-y-3">
          {/* Switch to Storefront Button */}
          <button
            onClick={onSwitchToStore}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#2C241E] hover:bg-[#3E342B] border border-[#5C4E43] text-xs font-medium text-[#EADBCE] hover:text-[#D4AF37] transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>View Live Storefront</span>
          </button>

          {/* Boutique Concierge Status */}
          <div className="px-2 pt-1 flex items-center justify-between text-[11px] text-[#A6978A]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Boutique Live</span>
            </div>
            <span className="font-mono text-[10px] text-[#A6978A]/70">v2.4 Atelier</span>
          </div>
        </div>
      </aside>
    </>
  );
};
