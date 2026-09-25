import React, { createContext, useContext, useState, useEffect } from 'react';
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
  // Products
  perfumes: Perfume[];
  addPerfume: (perfume: Perfume) => void;
  updatePerfume: (id: string, updated: Partial<Perfume>) => void;
  deletePerfume: (id: string) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, trackingNumber?: string) => void;
  deleteOrder: (orderId: string) => void;

  // Customers
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

  // Messages
  messages: InquiryMessage[];
  addMessage: (message: InquiryMessage) => void;
  updateMessageStatus: (id: string, status: 'Unread' | 'Read' | 'Replied', reply?: string) => void;
  deleteMessage: (id: string) => void;

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
    // Enrich with initial stockCount if not present
    return PERFUMES.map((p, idx) => ({
      ...p,
      stockCount: p.stockCount ?? (idx === 0 ? 8 : idx === 3 ? 3 : 15 + ((idx * 7) % 20))
    }));
  });

  // Orders state
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

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem('zelia_perfumes', JSON.stringify(perfumes));
    } catch {
      // ignore
    }
  }, [perfumes]);

  useEffect(() => {
    try {
      localStorage.setItem('zelia_admin_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('zelia_admin_customers', JSON.stringify(customers));
    } catch {
      // ignore
    }
  }, [customers]);

  useEffect(() => {
    try {
      localStorage.setItem('zelia_admin_categories', JSON.stringify(categories));
    } catch {
      // ignore
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('zelia_admin_reviews', JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('zelia_admin_offers', JSON.stringify(offers));
    } catch {
      // ignore
    }
  }, [offers]);

  useEffect(() => {
    try {
      localStorage.setItem('zelia_admin_messages', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('zelia_admin_website_content', JSON.stringify(websiteContent));
    } catch {
      // ignore
    }
  }, [websiteContent]);

  useEffect(() => {
    try {
      localStorage.setItem('zelia_admin_settings', JSON.stringify(settings));
    } catch {
      // ignore
    }
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

  // Handlers for Orders
  const addOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Also check if customer exists, or add/update customer
    setCustomers((prev) => {
      const existing = prev.find((c) => c.email.toLowerCase() === newOrder.customerEmail.toLowerCase());
      if (existing) {
        return prev.map((c) =>
          c.id === existing.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpent: c.totalSpent + newOrder.total,
                lastOrderDate: new Date().toISOString().split('T')[0]
              }
            : c
        );
      } else {
        const newCustomer: Customer = {
          id: `cust-${Date.now()}`,
          name: newOrder.customerName,
          email: newOrder.customerEmail,
          phone: newOrder.customerPhone,
          city: newOrder.shippingAddress.city,
          tier: newOrder.total > 15000 ? 'Gold Reserve VIP' : 'Member',
          totalOrders: 1,
          totalSpent: newOrder.total,
          lastOrderDate: new Date().toISOString().split('T')[0],
          status: 'Active'
        };
        return [newCustomer, ...prev];
      }
    });
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, trackingNumber?: string) => {
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
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((ord) => ord.id !== orderId));
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

  // Handlers for Messages
  const addMessage = (message: InquiryMessage) => {
    setMessages((prev) => [message, ...prev]);
  };

  const updateMessageStatus = (
    id: string,
    status: 'Unread' | 'Read' | 'Replied',
    reply?: string
  ) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          return {
            ...msg,
            status,
            reply: reply !== undefined ? reply : msg.reply
          };
        }
        return msg;
      })
    );
  };

  const deleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
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
