import { Link } from "wouter";

export function Footer() {
  return (
    <footer id="contact" className="border-t bg-muted/30 mt-20">
      <div className="container max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">About</h3>
            <p className="text-sm text-muted-foreground">
              Quality apparel for artists, events, and communities. Designs that tell your story.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" data-testid="link-footer-shop">
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    All Products
                  </button>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">FAQ</li>
              <li className="text-sm text-muted-foreground">Shipping</li>
              <li className="text-sm text-muted-foreground">Returns</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Connect</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Email: hello@threadcraft.com
            </p>
            <p className="text-sm text-muted-foreground">
              Phone: (555) 123-4567
            </p>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ThreadCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
