import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} data-testid={`link-product-${product.id}`}>
      <Card className="group overflow-hidden cursor-pointer transition-all duration-300 border-card-border rounded-xl shadow-md hover:shadow-xl hover:-translate-y-2">
        <CardContent className="p-0">
          <div className="aspect-[3/4] overflow-hidden bg-muted">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-testid={`img-product-${product.id}`}
            />
          </div>
          <div className="p-5 space-y-3">
            <h3 className="font-semibold text-lg" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }} data-testid={`text-product-name-${product.id}`}>
              {product.name}
            </h3>
            <p className="text-xl font-semibold text-primary" data-testid={`text-product-price-${product.id}`}>
              ${Number(product.price).toFixed(2)}
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <div className="text-xs text-muted-foreground">
                {product.sizes.length} sizes
              </div>
              <div className="text-xs text-muted-foreground">
                {product.colors.length} colors
              </div>
            </div>
            <button 
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = `/product/${product.id}`;
              }}
              data-testid={`button-add-to-cart-${product.id}`}
            >
              Add to Cart
            </button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
