import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@shared/schema";
import {
  getCartFromStorage,
  saveCartToStorage,
  clearCartFromStorage,
  calculateCartTotals,
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  updateCartItemQuantity as updateCartItemQuantityUtil,
  getCartItemCount,
} from "@/lib/cart";

interface CartContextType {
  cart: CartItem[];
  itemCount: number;
  subtotal: number;
  tax: number;
  total: number;
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCartFromStorage());
  }, []);

  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCart((prevCart) => addToCartUtil(prevCart, item));
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prevCart) => removeFromCartUtil(prevCart, productId, size, color));
  };

  const updateQuantity = (productId: string, size: string, color: string, quantity: number) => {
    setCart((prevCart) => updateCartItemQuantityUtil(prevCart, productId, size, color, quantity));
  };

  const clearCart = () => {
    setCart([]);
    clearCartFromStorage();
  };

  const itemCount = getCartItemCount(cart);
  const { subtotal, tax, total } = calculateCartTotals(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        itemCount,
        subtotal,
        tax,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
