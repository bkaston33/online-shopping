import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Order } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Confirmation() {
  const [, params] = useRoute("/confirmation/:orderNumber");
  const orderNumber = params?.orderNumber;

  const { data: order, isLoading } = useQuery<Order>({
    queryKey: [`/api/orders/${orderNumber}`],
    enabled: !!orderNumber,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-1 container max-w-3xl mx-auto px-6 py-16">
          <div className="text-center space-y-6">
            <Skeleton className="h-16 w-16 rounded-full mx-auto" />
            <Skeleton className="h-10 w-64 mx-auto" />
            <Skeleton className="h-6 w-48 mx-auto" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-1 container max-w-3xl mx-auto px-6 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Order not found</h2>
            <Link href="/" data-testid="link-home-notfound">
              <Button>Return to Shop</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const items = JSON.parse(order.items);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1 container max-w-3xl mx-auto px-6 py-16">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-500" />
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
              Order Confirmed!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your purchase
            </p>
          </div>

          <Card className="inline-block">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-1">Order Number</p>
              <p className="text-2xl font-bold font-mono" data-testid="text-order-number">
                {order.orderNumber}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="font-display font-semibold text-lg mb-4">
                Shipping Information
              </h2>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{order.customerName}</p>
                <p>{order.address}</p>
                <p>
                  {order.city}, {order.state} {order.zipCode}
                </p>
                <p className="pt-2">{order.email}</p>
                <p>{order.phone}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="font-display font-semibold text-lg mb-4">
                Order Items
              </h2>
              <div className="space-y-4">
                {items.map((item: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${Number(order.subtotal).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${Number(order.tax).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base border-t pt-2">
                    <span>Total</span>
                    <span data-testid="text-order-total">${Number(order.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Your order will be processed and shipped within 2-3 business days.
              You'll receive a shipping confirmation email at {order.email}
            </p>
            <Link href="/" data-testid="link-continue-shopping-confirmation">
              <Button>
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
