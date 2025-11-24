import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "wouter";
import { useState } from "react";

export function CartDrawer() {
  const { cart, itemCount, subtotal, tax, total, updateQuantity, removeFromCart } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-white hover:bg-white/10"
          data-testid="button-cart-drawer"
        >
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              data-testid="badge-cart-count"
            >
              {itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Your Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        {itemCount === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="h-16 w-16 mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Add some items to get started</p>
            <Button 
              onClick={() => setOpen(false)}
              className="bg-green-600 hover:bg-green-700"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cart.map((item, index) => (
                <div 
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      data-testid={`img-drawer-item-${index}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-sm" data-testid={`text-drawer-item-name-${index}`}>
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {item.size} / {item.color}
                        </p>
                      </div>
                      <button
                        className="text-red-600 hover:text-red-700 text-xs font-medium"
                        onClick={() => removeFromCart(item.productId, item.size, item.color)}
                        data-testid={`button-drawer-remove-${index}`}
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          data-testid={`button-drawer-decrease-${index}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                          }
                          data-testid={`button-drawer-increase-${index}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="font-bold text-sm">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (8.5%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
              </div>

              <div className="space-y-2 pt-2">
                <Link href="/checkout" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    Checkout
                  </Button>
                </Link>
                <Link href="/cart" onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full" size="lg">
                    View Full Cart
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
