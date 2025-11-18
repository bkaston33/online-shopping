import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1">
        <Hero />

        <section id="products" className="container max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Our Collection
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Discover unique designs perfect for any occasion
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-[3/4] w-full" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" data-testid="grid-products">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available</p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
