"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  Product,
  defaultProducts,
  Order,
  initialOrders,
  ChatThread,
  initialChatThreads,
  Language,
  Currency,
  Review,
} from "./data";

interface StoreContextType {
  // Theme
  theme: "dark" | "light";
  toggleTheme: () => void;

  // Language & Currency
  lang: Language;
  setLang: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;

  // User & Auth
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  login: (role: "admin" | "seller" | "buyer" | "artisan" | "customer", password?: string, name?: string, email?: string) => boolean;
  logout: () => void;
  registerSeller: (details: { businessName: string; phone: string; craft: string; bio: string }) => void;

  // Products & Reviews
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => Product;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  addReview: (productId: string, review: Omit<Review, "id" | "date">) => void;

  // Orders & Boda Boda Delivery Workflow
  orders: Order[];
  createOrder: (newOrder: Omit<Order, "id" | "createdAt" | "status" | "afriverseLabelApplied">) => Order;
  sealAfriverseLabel: (orderId: string) => void;
  dispatchBodaBoda: (orderId: string, riderName: string, riderPhone: string, plateNumber: string) => void;
  markOrderDelivered: (orderId: string) => void;

  // Chat Threads
  chatThreads: ChatThread[];
  activeThreadId: string;
  setActiveThreadId: (id: string) => void;
  sendMessage: (threadId: string, text: string) => void;

  // Cart
  cart: { product: Product; quantity: number }[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const PRODUCTS_STORAGE_KEY = "afriverse_products";

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [lang, setLang] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("USD");

  // Start null — AuthProvider will hydrate from localStorage
  const [currentUser, setCurrentUserState] = useState<User | null>(null);

  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(initialChatThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>("chat-1");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);

  // Hydrate products from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
          return;
        }
      }
      // Save initial defaults if empty
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(defaultProducts));
    } catch (e) {
      console.warn("Failed to load products from localStorage", e);
    }
  }, []);

  // ── Session Hydration ─────────────────────────────────────────────────────
  // Restore the logged-in user from localStorage whenever the app mounts or
  // the page is revisited, so that React-context never defaults back to null
  // while a valid session exists in storage.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("afriverse_active_session");
      if (raw) {
        const saved = JSON.parse(raw) as User;
        // Only restore if context is still null (avoid overwriting a fresh login)
        setCurrentUserState((prev) => (prev === null ? saved : prev));
      }
    } catch (e) {
      console.warn("Failed to restore session from localStorage", e);
    }
  }, []);


  // Apply theme class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light-mode");
    } else {
      root.classList.remove("light-mode");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Persist session whenever currentUser changes
  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user);
    if (typeof window !== "undefined") {
      if (user) {
        localStorage.setItem("afriverse_active_session", JSON.stringify(user));
      } else {
        localStorage.removeItem("afriverse_active_session");
      }
    }
  };

  const login = (role: "admin" | "seller" | "buyer" | "artisan" | "customer", password?: string, name?: string, email?: string): boolean => {
    if (role === "admin") {
      if (password !== "8509Sirat#") {
        return false;
      }
      setCurrentUser({
        id: "admin-master",
        name: name || "AFRIVERSE CEO Admin",
        email: email || "admin@afriverse.co.tz",
        role: "admin",
        shopName: "AFRIVERSE Master Admin",
        phone: "+255754998882",
      });
      return true;
    }

    if (role === "seller" || role === "artisan") {
      setCurrentUser({
        id: "a1",
        name: name || "Amina Kessy",
        email: email || "amina@merucrafts.co.tz",
        role: "artisan",
        shopName: "Amina Meru Cultural Crafts Studio",
        phone: "+255754998882",
      });
      return true;
    }

    setCurrentUser({
      id: "buyer-1",
      name: name || "Baraka Edward",
      email: email || "baraka@afriverse.co.tz",
      role: "customer",
      phone: "+255714223344",
    });
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("afriverse_active_session");
    }
  };

  const registerSeller = (details: { businessName: string; phone: string; craft: string; bio: string }) => {
    setCurrentUser({
      id: `seller-${Date.now()}`,
      name: details.businessName,
      email: `${details.businessName.toLowerCase().replace(/\s+/g, "")}@afriverse.co.tz`,
      role: "artisan",
      shopName: details.businessName,
      phone: details.phone || "+255754112233",
    });
  };

  // Add product & sync to localStorage directly
  const addProduct = (newP: Omit<Product, "id">): Product => {
    const created: Product = {
      ...newP,
      id: `p-${Date.now()}`,
    };
    setProducts((prev) => {
      const updated = [created, ...prev];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error("Failed to persist products to localStorage", e);
        }
      }
      return updated;
    });
    return created;
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) => {
      const updated = prev.map((p) => (p.id === productId ? { ...p, ...updates } : p));
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error("Failed to persist products to localStorage", e);
        }
      }
      return updated;
    });
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== productId);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error("Failed to persist products to localStorage", e);
        }
      }
      return updated;
    });
  };

  const addReview = (productId: string, reviewData: Omit<Review, "id" | "date">) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    };
    setProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              reviews: [newRev, ...(p.reviews || [])],
            }
          : p
      );
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(updated));
        } catch {}
      }
      return updated;
    });
  };

  const createOrder = (
    newOrderData: Omit<Order, "id" | "createdAt" | "status" | "afriverseLabelApplied">
  ): Order => {
    const created: Order = {
      ...newOrderData,
      id: `AFR-8882-${Math.floor(10 + Math.random() * 90)}`,
      status: "Pending",
      afriverseLabelApplied: false,
      createdAt: new Date().toLocaleString(),
    };
    setOrders((prev) => [created, ...prev]);
    return created;
  };

  const sealAfriverseLabel = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, afriverseLabelApplied: true, status: o.status === "Pending" ? "Packaged" : o.status } : o
      )
    );
  };

  const dispatchBodaBoda = (orderId: string, riderName: string, riderPhone: string, plateNumber: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: "Boda Boda Dispatched",
              afriverseLabelApplied: true,
              bodaBodaRider: { name: riderName, phone: riderPhone, plateNumber },
            }
          : o
      )
    );
  };

  const markOrderDelivered = (orderId: string) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: "Delivered" } : o)));
  };

  const sendMessage = (threadId: string, text: string) => {
    if (!text.trim()) return;
    const senderRole = currentUser?.role || "buyer";
    const senderName = currentUser?.name || "Customer";

    setChatThreads((prev) =>
      prev.map((thread) => {
        if (thread.id === threadId) {
          return {
            ...thread,
            messages: [
              ...thread.messages,
              {
                id: `msg-${Date.now()}`,
                senderRole,
                senderName,
                text,
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              },
            ],
          };
        }
        return thread;
      })
    );
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <StoreContext.Provider
      value={{
        theme,
        toggleTheme,
        lang,
        setLang,
        currency,
        setCurrency,
        currentUser,
        setCurrentUser,
        login,
        logout,
        registerSeller,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        addReview,
        orders,
        createOrder,
        sealAfriverseLabel,
        dispatchBodaBoda,
        markOrderDelivered,
        chatThreads,
        activeThreadId,
        setActiveThreadId,
        sendMessage,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
