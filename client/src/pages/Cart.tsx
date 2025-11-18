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
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-1 container max-w-7xl mx-auto px-6 py-16">
          <div className="text-center py-20">
            <div className="bg-white rounded-lg shadow-md p-12 max-w-md mx-auto">
              <ShoppingBag className="h-20 w-20 mx-auto mb-6 text-gray-400" />
              <h2 className="text-3xl font-bold mb-3" data-testid="text-empty-cart">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Looks like you haven't added anything to your cart yet
              </p>
              <Link href="/" data-testid="link-continue-shopping-empty">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1 container max-w-7xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <Card key={`${item.productId}-${item.size}-${item.color}`} className="shadow-sm">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-28 h-28 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        data-testid={`img-cart-item-${index}`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-2" data-testid={`text-cart-item-name-${index}`}>
                            {item.name}
                          </h3>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p data-testid={`text-cart-item-size-${index}`}>Size: <span className="font-medium">{item.size}</span></p>
                            <p data-testid={`text-cart-item-color-${index}`}>Color: <span className="font-medium">{item.color}</span></p>
                          </div>
                        </div>
                        <button
                          className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 rounded hover:bg-red-50 transition-colors"
                          onClick={() => removeFromCart(item.productId, item.size, item.color)}
                          data-testid={`button-remove-item-${index}`}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
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
                          <span className="w-10 text-center font-medium" data-testid={`text-quantity-${index}`}>
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
                        <p className="font-bold text-xl" data-testid={`text-cart-item-price-${index}`}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardContent className="p-6 space-y-5">
                <h3 className="font-display font-semibold text-xl mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium" data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base">
                    <span className="text-gray-600">Tax (8.5%)</span>
                    <span className="font-medium" data-testid="text-tax">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center py-2">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-3xl font-bold text-green-600" data-testid="text-total">${total.toFixed(2)}</span>
                </div>

                <Link href="/checkout" data-testid="link-checkout">
                  <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                    Proceed to Checkout
                  </Button>
                </Link>

                <Link href="/" data-testid="link-continue-shopping">
                  <Button variant="outline" className="w-full hover:bg-gray-100" size="lg">
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
