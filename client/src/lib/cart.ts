import { CartItem } from "@shared/schema";

const CART_STORAGE_KEY = "threadart_cart";
const TAX_RATE = 0.085; // 8.5%

export function getCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveCartToStorage(cart: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Failed to save cart:", error);
  }
}

export function clearCartFromStorage(): void {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear cart:", error);
  }
}

export function calculateCartTotals(cart: CartItem[]) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return {
    subtotal: Number(subtotal.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

export function addToCart(cart: CartItem[], newItem: Omit<CartItem, "quantity"> & { quantity?: number }): CartItem[] {
  const existingItemIndex = cart.findIndex(
    (item) =>
      item.productId === newItem.productId &&
      item.size === newItem.size &&
      item.color === newItem.color
  );

  if (existingItemIndex >= 0) {
    const updatedCart = [...cart];
    updatedCart[existingItemIndex] = {
      ...updatedCart[existingItemIndex],
      quantity: updatedCart[existingItemIndex].quantity + (newItem.quantity || 1),
    };
    return updatedCart;
  }

  return [...cart, { ...newItem, quantity: newItem.quantity || 1 }];
}

export function removeFromCart(cart: CartItem[], productId: string, size: string, color: string): CartItem[] {
  return cart.filter(
    (item) => !(item.productId === productId && item.size === size && item.color === color)
  );
}

export function updateCartItemQuantity(
  cart: CartItem[],
  productId: string,
  size: string,
  color: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(cart, productId, size, color);
  }

  return cart.map((item) =>
    item.productId === productId && item.size === size && item.color === color
      ? { ...item, quantity }
      : item
  );
}

export function getCartItemCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}
