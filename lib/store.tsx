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
  login: (role: "admin" | "seller" | "buyer", password?: string, name?: string, email?: string) => boolean;
  logout: () => void;
  registerSeller: (details: { businessName: string; phone: string; craft: string; bio: string }) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => Product;

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
  addToCart: (product: Product) => void;
  clearCart: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [lang, setLang] = useState<Language>("en");
  const [currency, setCurrency] = useState<Currency>("USD");

  // Default User = Admin / Seller / Buyer demo
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: "user-admin",
    name: "AFRIVERSE CEO Admin",
    email: "admin@afriverse.co.tz",
    role: "admin",
    shopName: "AFRIVERSE Arusha HQ",
    phone: "+255754998882",
  });

  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(initialChatThreads);
  const [activeThreadId, setActiveThreadId] = useState<string>("chat-1");
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);

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

  const login = (role: "admin" | "seller" | "buyer", password?: string, name?: string, email?: string): boolean => {
    if (role === "admin") {
      if (password !== "8509Sirat#") {
        return false;
      }
      setCurrentUser({
        id: "admin-master",
        name: "AFRIVERSE CEO Admin",
        email: email || "admin@afriverse.co.tz",
        role: "admin",
        shopName: "AFRIVERSE Master Admin",
        phone: "+255754998882",
      });
      return true;
    }

    if (role === "seller") {
      setCurrentUser({
        id: "seller-1",
        name: name || "Amina Kessy",
        email: email || "amina@afriverse.co.tz",
        role: "seller",
        shopName: "Amina Arusha Fine Crafts",
        phone: "+255754998882",
      });
      return true;
    }

    setCurrentUser({
      id: "buyer-1",
      name: name || "Baraka Edward",
      email: email || "baraka@afriverse.co.tz",
      role: "buyer",
      phone: "+255754998882",
    });
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const registerSeller = (details: { businessName: string; phone: string; craft: string; bio: string }) => {
    setCurrentUser({
      id: `seller-${Date.now()}`,
      name: details.businessName,
      email: `${details.businessName.toLowerCase().replace(/\s+/g, "")}@afriverse.co.tz`,
      role: "seller",
      shopName: details.businessName,
      phone: details.phone || "+255754998882",
    });
  };

  const addProduct = (newP: Omit<Product, "id">): Product => {
    const created: Product = {
      ...newP,
      id: `p-${Date.now()}`,
    };
    setProducts((prev) => [created, ...prev]);
    return created;
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

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
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
        login,
        logout,
        registerSeller,
        products,
        addProduct,
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
