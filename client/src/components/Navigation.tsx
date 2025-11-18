import { ShoppingCart } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

export function Navigation() {
  const [location, setLocation] = useLocation();
  const { itemCount } = useCart();

  const handleProductsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (location === "/") {
      // Already on home page, just scroll to products section
      const productsSection = document.getElementById("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Navigate to home page first
      setLocation("/");
      // Wait for navigation to complete, then scroll
      setTimeout(() => {
        const productsSection = document.getElementById("products");
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 text-white shadow-lg">
      <div className="container flex h-20 items-center justify-between px-6 mx-auto max-w-7xl">
        <Link href="/" data-testid="link-home">
          <div className="flex items-center gap-2 cursor-pointer">
            <h1 className="text-3xl font-display font-bold tracking-tight">
              ThreadCraft
            </h1>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" data-testid="link-home-nav">
            <button className="text-base font-medium hover:text-gray-300 transition-colors px-3 py-2">
              Home
            </button>
          </Link>
          <button 
            onClick={handleProductsClick}
            className="text-base font-medium hover:text-gray-300 transition-colors px-3 py-2"
            data-testid="link-products"
          >
            Products
          </button>
          <Link href="/cart" data-testid="link-cart-nav">
            <button className="text-base font-medium hover:text-gray-300 transition-colors px-3 py-2">
              Cart
            </button>
          </Link>
          <button className="text-base font-medium hover:text-gray-300 transition-colors px-3 py-2" data-testid="link-contact">
            Contact
          </button>
        </nav>

        <Link href="/cart" data-testid="link-cart">
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:bg-white/10"
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
