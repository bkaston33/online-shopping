import { Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function Cart() {
  const { cart, itemCount, subtotal, tax, total, updateQuantity, removeFromCart } = useCart();

  if (itemCount === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container max-w-7xl mx-auto px-4 py-12">
          <div className="text-center py-16">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-display font-bold mb-2" data-testid="text-empty-cart">
              Your cart is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link href="/" data-testid="link-continue-shopping-empty">
              <Button>
                Browse Products
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <Card key={`${item.productId}-${item.size}-${item.color}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        data-testid={`img-cart-item-${index}`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1" data-testid={`text-cart-item-name-${index}`}>
                        {item.name}
                      </h3>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p data-testid={`text-cart-item-size-${index}`}>Size: {item.size}</p>
                        <p data-testid={`text-cart-item-color-${index}`}>Color: {item.color}</p>
                      </div>
                      <p className="font-semibold mt-2" data-testid={`text-cart-item-price-${index}`}>
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.productId, item.size, item.color)}
                        data-testid={`button-remove-item-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          data-testid={`button-decrease-${index}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center" data-testid={`text-quantity-${index}`}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                          }
                          data-testid={`button-increase-${index}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display font-semibold text-lg">
                  Order Summary
                </h3>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8.5%)</span>
                    <span data-testid="text-tax">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span data-testid="text-total">${total.toFixed(2)}</span>
                </div>

                <Link href="/checkout" data-testid="link-checkout">
                  <Button className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/" data-testid="link-continue-shopping">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
