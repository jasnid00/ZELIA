import React, { useState, useEffect } from 'react';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { DashboardView } from './views/DashboardView';
import { ProductsView } from './views/ProductsView';
import { OrdersView } from './views/OrdersView';
import { CustomersView } from './views/CustomersView';
import { CategoriesView } from './views/CategoriesView';
import { ReviewsView } from './views/ReviewsView';
import { WebsiteContentView } from './views/WebsiteContentView';
import { OffersView } from './views/OffersView';
import { MessagesView } from './views/MessagesView';
import { SettingsView } from './views/SettingsView';

interface AdminDashboardProps {
  onSwitchToStore: () => void;
  initialTab?: AdminTab;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onSwitchToStore,
  initialTab = 'dashboard'
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [selectedOrderIdForDetails, setSelectedOrderIdForDetails] = useState<string | null>(null);

  // Sync scroll on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderIdForDetails(orderId);
    setActiveTab('orders');
  };

  const handleAddProductFromDashboard = () => {
    setActiveTab('products');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C241E] flex">
      {/* Fixed Luxury Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSelectedOrderIdForDetails(null);
        }}
        onSwitchToStore={onSwitchToStore}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <AdminHeader
          activeTab={activeTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onSwitchToStore={onSwitchToStore}
          onSelectTab={(tab) => setActiveTab(tab)}
        />

        {/* Viewport Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              onNavigate={(tab) => setActiveTab(tab)}
              onViewOrder={handleViewOrder}
              onAddProduct={handleAddProductFromDashboard}
            />
          )}

          {activeTab === 'products' && <ProductsView />}

          {activeTab === 'orders' && (
            <OrdersView
              initialSelectedOrderId={selectedOrderIdForDetails}
              onClearSelectedOrder={() => setSelectedOrderIdForDetails(null)}
            />
          )}

          {activeTab === 'customers' && <CustomersView />}

          {activeTab === 'categories' && <CategoriesView />}

          {activeTab === 'reviews' && <ReviewsView />}

          {activeTab === 'content' && <WebsiteContentView />}

          {activeTab === 'offers' && <OffersView />}

          {activeTab === 'messages' && <MessagesView />}

          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>
    </div>
  );
};
