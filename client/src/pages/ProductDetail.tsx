import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Product } from "@shared/schema";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:id");
  const productId = params?.id;

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId,
  });

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (!product) return;

    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }

    if (!selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: Number(product.price),
      imageUrl: product.imageUrl,
      size: selectedSize,
      color: selectedColor,
      quantity,
    });

    toast({
      title: "Added to cart",
      description: `${quantity} ${product.name} added to your cart`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-1 container max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="aspect-square w-full" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navigation />
        <main className="flex-1 container max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Product not found</h2>
            <Button onClick={() => window.location.href = "/"}>
              Return to Shop
            </Button>
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
        <div className="grid md:grid-cols-2 gap-12">
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
              data-testid="img-product-detail"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4" data-testid="text-product-detail-name">
                {product.name}
              </h1>
              <p className="text-3xl font-semibold text-primary" data-testid="text-product-detail-price">
                ${Number(product.price).toFixed(2)}
              </p>
            </div>

            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground" data-testid="text-product-description">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-3">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[60px]"
                      data-testid={`button-size-${size}`}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      onClick={() => setSelectedColor(color)}
                      data-testid={`button-color-${color}`}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    data-testid="button-decrease-quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-12 text-center" data-testid="text-quantity">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    data-testid="button-increase-quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              data-testid="button-add-to-cart"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
