import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Festival_lifestyle_hero_image_3d4ce42a.png";

export function Hero() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("products");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[70vh] md:h-[70vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
      </div>

      <div className="relative h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight text-white">
            Wear Your Creativity
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Custom tees for artists, events, and communities. Express yourself with unique designs.
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              onClick={scrollToProducts}
              className="text-base px-8 bg-primary/90 backdrop-blur-sm hover:bg-primary"
              data-testid="button-shop-collection"
            >
              Shop Collection
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
