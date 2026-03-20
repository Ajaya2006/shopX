import React, { createContext, useContext, useEffect, useState } from 'react';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviews?: number;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const WISHLIST_STORAGE_KEY = 'user_wishlist';
const USER_ID = 'current-user';

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`${WISHLIST_STORAGE_KEY}_${USER_ID}`);
    if (stored) {
      try {
        setWishlist(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse wishlist from localStorage', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(`${WISHLIST_STORAGE_KEY}_${USER_ID}`, JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist(prev => {
      if (prev.some(i => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id));
  };

  const isInWishlist = (id: string) => wishlist.some(item => item.id === id);

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, wishlistCount }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}