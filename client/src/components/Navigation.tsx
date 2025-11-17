import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export function Navigation() {
  const [location] = useLocation();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4 mx-auto max-w-7xl">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 cursor-pointer">
            <h1 className="text-2xl font-display font-bold tracking-tight">
              ThreadArt
            </h1>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" data-testid="link-shop">
            <button className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors">
              Shop
            </button>
          </Link>
        </nav>

        <Link href="/cart" data-testid="link-cart">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
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
        </Link>
      </div>
    </header>
  );
}
