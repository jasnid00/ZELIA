import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Perfume,
  Order,
  OrderStatus,
  Customer,
  ProductCategory,
  AdminReview,
  Offer,
  InquiryMessage,
  WebsiteContent,
  AdminSettings
} from '../types';
import { PERFUMES } from '../data/perfumes';
import {
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_CATEGORIES,
  INITIAL_REVIEWS,
  INITIAL_OFFERS,
  INITIAL_MESSAGES,
  INITIAL_WEBSITE_CONTENT,
  INITIAL_SETTINGS
} from '../data/adminInitialData';

interface AdminDataContextType {
  // Sync status
  isBackendConnected: boolean;
  lastSyncedAt: Date | null;
  refreshOrders: () => Promise<void>;

  // Products
  perfumes: Perfume[];
  addPerfume: (perfume: Perfume) => void;
  updatePerfume: (id: string, updated: Partial<Perfume>) => void;
  deletePerfume: (id: string) => void;

  // Orders (Connected to Central Backend DB)
  orders: Order[];
  addOrder: (order: Order) => Promise<void>;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;

  // Customers (Connected to Central Backend DB)
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomer: (id: string, updated: Partial<Customer>) => void;

  // Categories
  categories: ProductCategory[];
  addCategory: (category: ProductCategory) => void;
  updateCategory: (id: string, updated: Partial<ProductCategory>) => void;

  // Reviews
  reviews: AdminReview[];
  updateReviewStatus: (id: string, status: 'Approved' | 'Pending' | 'Hidden', adminReply?: string) => void;
  deleteReview: (id: string) => void;
  addReview: (review: AdminReview) => void;

  // Offers
  offers: Offer[];
  addOffer: (offer: Offer) => void;
  updateOffer: (id: string, updated: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;

  // Messages (Connected to Central Backend DB)
  messages: InquiryMessage[];
  addMessage: (message: InquiryMessage) => Promise<void>;
  updateMessageStatus: (id: string, status: 'Unread' | 'Read' | 'Replied', reply?: string) => Promise<void>;
  deleteMessage: (id: string) => Promise<void>;

  // Website Content
  websiteContent: WebsiteContent;
  updateWebsiteContent: (content: Partial<WebsiteContent>) => void;

  // Settings
  settings: AdminSettings;
  updateSettings: (settings: Partial<AdminSettings>) => void;

  // Reset to initial
  resetAllData: () => void;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(true);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  // Perfumes state
  const [perfumes, setPerfumes] = useState<Perfume[]>(() => {
    try {
      const saved = localStorage.getItem('zelia_perfumes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return PERFUMES.map((p, idx) => ({
      ...p,
      stockCount: p.stockCount ?? (idx === 0 ? 8 : idx === 3 ? 3 : 15 + ((idx * 7) % 20))
    }));
  });

  // Orders state (Initialized from local cache, then immediately synchronized with central API)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('zelia_admin_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  // Customers state
  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem('zelia_admin_customers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_CUSTOMERS;
  });

  // Categories state
  const [categories, setCategories] = useState<ProductCategory[]>(() => {
    try {
      const saved = localStorage.getItem('zelia_admin_categories');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_CATEGORIES;
  });

  // Reviews state
  const [reviews, setReviews] = useState<AdminReview[]>(() => {
    try {
      const saved = localStorage.getItem('zelia_admin_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  // Offers state
  const [offers, setOffers] = useState<Offer[]>(() => {
    try {
      const saved = localStorage.getItem('zelia_admin_offers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_OFFERS;
  });

  // Messages state
  const [messages, setMessages] = useState<InquiryMessage[]>(() => {
    try {
      const saved = localStorage.getItem('zelia_admin_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_MESSAGES;
  });

  // Website Content state
  const [websiteContent, setWebsiteContent] = useState<WebsiteContent>(() => {
    try {
      const saved = localStorage.getItem('zelia_admin_website_content');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_WEBSITE_CONTENT;
  });

  // Settings state
  const [settings, setSettings] = useState<AdminSettings>(() => {
    try {
      const saved = localStorage.getItem('zelia_admin_settings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_SETTINGS;
  });

  // ================= CENTRAL BACKEND API SYNC =================
  const fetchOrdersFromBackend = useCallback(async () => {
    try {
      const res = await fetch(`/api/orders?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setOrders(json.data);
          setIsBackendConnected(true);
          setLastSyncedAt(new Date());
          try {
            localStorage.setItem('zelia_admin_orders', JSON.stringify(json.data));
          } catch {}
        }
      }
    } catch (err) {
      // Offline or network error
      setIsBackendConnected(false);
    }
  }, []);

  const fetchCustomersFromBackend = useCallback(async () => {
    try {
      const res = await fetch(`/api/customers?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setCustomers(json.data);
          try {
            localStorage.setItem('zelia_admin_customers', JSON.stringify(json.data));
          } catch {}
        }
      }
    } catch {}
  }, []);

  const fetchMessagesFromBackend = useCallback(async () => {
    try {
      const res = await fetch(`/api/messages?_t=${Date.now()}`, {
        cache: 'no-store',
        headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setMessages(json.data);
          try {
            localStorage.setItem('zelia_admin_messages', JSON.stringify(json.data));
          } catch {}
        }
      }
    } catch {}
  }, []);

  // Real-time Server-Sent Events (SSE) Stream Subscription
  useEffect(() => {
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/orders/stream');
      eventSource.onopen = () => {
        setIsBackendConnected(true);
      };
      eventSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === 'order_created' && payload.order) {
            setOrders((prev) => {
              const exists = prev.some(
                (o) => o.id === payload.order.id || o.orderNumber === payload.order.orderNumber
              );
              if (exists) {
                return prev.map((o) => (o.id === payload.order.id ? payload.order : o));
              }
              return [payload.order, ...prev];
            });
            setLastSyncedAt(new Date());
            fetchCustomersFromBackend();
          } else if (payload.type === 'order_updated' && payload.order) {
            setOrders((prev) => prev.map((o) => (o.id === payload.order.id ? payload.order : o)));
            setLastSyncedAt(new Date());
          } else if (payload.type === 'order_deleted' && payload.orderId) {
            setOrders((prev) => prev.filter((o) => o.id !== payload.orderId));
            setLastSyncedAt(new Date());
          }
        } catch (err) {
          console.error('Error handling order stream update:', err);
        }
      };
    } catch (err) {
      console.warn('SSE not supported or failed to connect, falling back to polling:', err);
    }

    return () => {
      if (eventSource) eventSource.close();
    };
  }, [fetchCustomersFromBackend]);

  // Initial fetch and automatic background polling every 2.5 seconds
  useEffect(() => {
    fetchOrdersFromBackend();
    fetchCustomersFromBackend();
    fetchMessagesFromBackend();

    const interval = setInterval(() => {
      fetchOrdersFromBackend();
      fetchCustomersFromBackend();
    }, 2500);

    return () => clearInterval(interval);
  }, [fetchOrdersFromBackend, fetchCustomersFromBackend, fetchMessagesFromBackend]);

  // Persistence effects for local cache
  useEffect(() => {
    try {
      localStorage.setItem('zelia_perfumes', JSON.stringify(perfumes));
    } catch {}
  }, [perfumes]);

  useEffect(() => {
    try {
      localStorage.setItem('zelia_admin_categories', JSON.stringify(categories));
    } catch {}
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('zelia_admin_reviews', JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('zelia_admin_offers', JSON.stringify(offers));
    } catch {}
  }, [offers]);

  useEffect(() => {
    try {
      localStorage.setItem('zelia_admin_website_content', JSON.stringify(websiteContent));
    } catch {}
  }, [websiteContent]);

  useEffect(() => {
    try {
      localStorage.setItem('zelia_admin_settings', JSON.stringify(settings));
    } catch {}
  }, [settings]);

  // Handlers for Products
  const addPerfume = (newPerfume: Perfume) => {
    setPerfumes((prev) => [newPerfume, ...prev]);
  };

  const updatePerfume = (id: string, updated: Partial<Perfume>) => {
    setPerfumes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updated } : item))
    );
  };

  const deletePerfume = (id: string) => {
    setPerfumes((prev) => prev.filter((item) => item.id !== id));
  };

  // Handlers for Orders (Central Database Connected)
  const addOrder = async (newOrder: Order) => {
    // 1. Optimistic update
    setOrders((prev) => [newOrder, ...prev]);

    // 2. Post to central server database
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setOrders((prev) =>
            prev.map((o) => (o.id === newOrder.id ? json.data : o))
          );
          setIsBackendConnected(true);
          setLastSyncedAt(new Date());
          fetchCustomersFromBackend();
        }
      }
    } catch (err) {
      console.error('Error posting order to central database:', err);
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    status: OrderStatus,
    trackingNumber?: string
  ) => {
    // 1. Optimistic update
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            trackingNumber: trackingNumber !== undefined ? trackingNumber : ord.trackingNumber
          };
        }
        return ord;
      })
    );

    // 2. Patch to central server database
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, trackingNumber })
      });
      if (res.ok) {
        setIsBackendConnected(true);
        setLastSyncedAt(new Date());
      }
    } catch (err) {
      console.error('Error updating order on central backend:', err);
    }
  };

  const deleteOrder = async (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
    try {
      await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
      setIsBackendConnected(true);
      setLastSyncedAt(new Date());
    } catch (err) {
      console.error('Error deleting order on central backend:', err);
    }
  };

  // Handlers for Customers
  const addCustomer = (customer: Customer) => {
    setCustomers((prev) => [customer, ...prev]);
  };

  const updateCustomer = (id: string, updated: Partial<Customer>) => {
    setCustomers((prev) =>
      prev.map((cust) => (cust.id === id ? { ...cust, ...updated } : cust))
    );
  };

  // Handlers for Categories
  const addCategory = (category: ProductCategory) => {
    setCategories((prev) => [...prev, category]);
  };

  const updateCategory = (id: string, updated: Partial<ProductCategory>) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, ...updated } : cat))
    );
  };

  // Handlers for Reviews
  const updateReviewStatus = (
    id: string,
    status: 'Approved' | 'Pending' | 'Hidden',
    adminReply?: string
  ) => {
    setReviews((prev) =>
      prev.map((rev) => {
        if (rev.id === id) {
          return {
            ...rev,
            status,
            adminReply: adminReply !== undefined ? adminReply : rev.adminReply
          };
        }
        return rev;
      })
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((rev) => rev.id !== id));
  };

  const addReview = (review: AdminReview) => {
    setReviews((prev) => [review, ...prev]);
  };

  // Handlers for Offers
  const addOffer = (offer: Offer) => {
    setOffers((prev) => [offer, ...prev]);
  };

  const updateOffer = (id: string, updated: Partial<Offer>) => {
    setOffers((prev) =>
      prev.map((off) => (off.id === id ? { ...off, ...updated } : off))
    );
  };

  const deleteOffer = (id: string) => {
    setOffers((prev) => prev.filter((off) => off.id !== id));
  };

  // Handlers for Messages (Central Database Connected)
  const addMessage = async (message: InquiryMessage) => {
    setMessages((prev) => [message, ...prev]);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      });
      if (res.ok) {
        setIsBackendConnected(true);
      }
    } catch (err) {
      console.error('Error saving message to central backend:', err);
    }
  };

  const updateMessageStatus = async (
    id: string,
    status: 'Unread' | 'Read' | 'Replied',
    reply?: string
  ) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status, reply: reply !== undefined ? reply : msg.reply } : msg))
    );
    try {
      await fetch(`/api/messages/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, reply })
      });
    } catch (err) {
      console.error('Error updating message status on central backend:', err);
    }
  };

  const deleteMessage = async (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Error deleting message on central backend:', err);
    }
  };

  // Handlers for Website Content
  const updateWebsiteContent = (content: Partial<WebsiteContent>) => {
    setWebsiteContent((prev) => ({ ...prev, ...content }));
  };

  // Handlers for Settings
  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Reset function
  const resetAllData = () => {
    setPerfumes(
      PERFUMES.map((p, idx) => ({
        ...p,
        stockCount: p.stockCount ?? (idx === 0 ? 8 : idx === 3 ? 3 : 15 + ((idx * 7) % 20))
      }))
    );
    setOrders(INITIAL_ORDERS);
    setCustomers(INITIAL_CUSTOMERS);
    setCategories(INITIAL_CATEGORIES);
    setReviews(INITIAL_REVIEWS);
    setOffers(INITIAL_OFFERS);
    setMessages(INITIAL_MESSAGES);
    setWebsiteContent(INITIAL_WEBSITE_CONTENT);
    setSettings(INITIAL_SETTINGS);
    localStorage.removeItem('zelia_perfumes');
    localStorage.removeItem('zelia_admin_orders');
    localStorage.removeItem('zelia_admin_customers');
    localStorage.removeItem('zelia_admin_categories');
    localStorage.removeItem('zelia_admin_reviews');
    localStorage.removeItem('zelia_admin_offers');
    localStorage.removeItem('zelia_admin_messages');
    localStorage.removeItem('zelia_admin_website_content');
    localStorage.removeItem('zelia_admin_settings');
  };

  return (
    <AdminDataContext.Provider
      value={{
        isBackendConnected,
        lastSyncedAt,
        refreshOrders: fetchOrdersFromBackend,
        perfumes,
        addPerfume,
        updatePerfume,
        deletePerfume,
        orders,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        customers,
        addCustomer,
        updateCustomer,
        categories,
        addCategory,
        updateCategory,
        reviews,
        updateReviewStatus,
        deleteReview,
        addReview,
        offers,
        addOffer,
        updateOffer,
        deleteOffer,
        messages,
        addMessage,
        updateMessageStatus,
        deleteMessage,
        websiteContent,
        updateWebsiteContent,
        settings,
        updateSettings,
        resetAllData
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
};
