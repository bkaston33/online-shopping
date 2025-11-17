# T-Shirt E-Commerce Design Guidelines

## Design Approach

**Reference-Based Approach** drawing from modern e-commerce leaders (Shopify, Etsy, contemporary fashion retail) to create a visual-first shopping experience that emphasizes product imagery and seamless browsing.

**Core Principles:**
- Product-first visual hierarchy emphasizing t-shirt designs
- Clean, gallery-style layouts that let designs shine
- Frictionless cart and checkout experience
- Trust-building through clear pricing and transparent process

---

## Typography System

**Font Families** (Google Fonts):
- Primary: 'Inter' for UI elements, buttons, navigation (weights: 400, 500, 600)
- Secondary: 'Playfair Display' or 'Poppins' for headings and product names (weights: 600, 700)

**Hierarchy:**
- Hero/Page titles: 48px-64px, bold weight
- Product names: 20px-24px, semibold
- Section headings: 32px-36px, bold
- Body text: 16px, regular
- Prices: 20px-24px, semibold
- Cart/Checkout labels: 14px, medium
- Buttons: 16px, medium, uppercase letter-spacing

---

## Layout System

**Spacing Primitives** (Tailwind units): 2, 4, 6, 8, 12, 16, 20
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-20
- Grid gaps: gap-6 to gap-8
- Button padding: px-8 py-3

**Container Strategy:**
- Homepage hero: Full-width with max-w-7xl inner container
- Product grid: max-w-7xl with generous margins
- Cart/Checkout: max-w-4xl centered for focus
- Product cards: Consistent aspect ratio (4:5 for product images)

---

## Component Library

### Navigation Header
- Sticky navigation with site logo/name left-aligned
- Centered navigation links: "Shop" | "About" | "Contact"
- Cart icon with item count badge right-aligned
- Subtle shadow on scroll for depth
- Height: 80px desktop, 64px mobile

### Hero Section
Large, impactful hero featuring lifestyle image of people wearing the t-shirts in authentic settings (outdoor gathering, campus event, art show). Image should be high-quality, vibrant, and aspirational.

**Hero Elements:**
- Full-width background image with subtle overlay for text readability
- Centered headline: "Wear Your Creativity" or brand-specific tagline
- Subheading explaining the mission (e.g., "Custom tees for artists, events, and communities")
- Primary CTA button: "Shop Collection" with blurred background treatment
- Hero height: 70vh desktop, 50vh mobile

### Product Grid (Homepage)
- 4-column grid desktop (grid-cols-4), 2-column tablet (md:grid-cols-2), 1-column mobile
- Product cards with clean white/neutral background
- Product image fills card top (hover: subtle scale transform)
- Product name below image
- Price displayed prominently
- Size/color indicators as small badges
- "Add to Cart" button appears on hover (desktop) or always visible (mobile)

### Product Detail Page
- Two-column layout: Large product image left (60%), details right (40%)
- Image gallery with 3-4 thumbnails below main image
- Product name as h1
- Price prominently displayed
- Size selector: Radio buttons or visual size swatches (S, M, L, XL, XXL)
- Color selector: Color circles showing available colors
- Quantity stepper (+/- buttons)
- "Add to Cart" primary button
- Product description section below fold
- Related products carousel at bottom

### Shopping Cart Page
- Split layout: Cart items (65%) | Order summary sidebar (35%)
- Each cart item row includes: thumbnail, name, size/color, quantity stepper, price, remove icon
- Order summary sticky sidebar with subtotal, tax (8.5%), total
- "Proceed to Checkout" prominent button
- "Continue Shopping" secondary link
- Empty cart state: Centered message with "Browse Products" CTA

### Checkout Flow
**Three-Step Visual Progress Indicator:**
1. Shipping Information
2. Review Order
3. Confirmation

**Step 1 - Shipping Form:**
- Single-column form, max-w-2xl centered
- Form fields: Full name, email, phone, address, city, state, zip
- Each field group with clear labels above inputs
- Input fields with border styling, focus states
- Order summary panel on right (desktop) or collapsed (mobile)

**Step 2 - Review:**
- Order items list with images
- Editable quantities
- Complete address display
- Price breakdown
- Mock payment section (card number, expiry, CVV fields - visual only)
- "Place Order" primary button

**Step 3 - Confirmation:**
- Success icon/checkmark graphic
- "Order Confirmed!" headline
- Generated order number prominently displayed
- Order summary with shipping details
- Expected delivery timeline
- "Continue Shopping" CTA button

### Footer
- Four-column layout: About | Shop | Support | Connect
- Newsletter signup: Email input with submit button
- Social media icons
- Copyright and basic legal links
- Contact information included

---

## Images

**Hero Image:**
- Lifestyle shot showing 3-4 people wearing custom t-shirts at an event/gathering
- Bright, energetic atmosphere with natural lighting
- People should look diverse, authentic, and engaged
- Image dimensions: 1920x1080px minimum

**Product Images:**
- Clean product shots on neutral background (white or light gray)
- Flat lay style for each t-shirt showing design clearly
- Lifestyle shots showing tee worn by models (diverse representation)
- Detail shots highlighting print quality/fabric texture
- Minimum 800x1000px per image

**Additional Images:**
- About section: Team photo or creative workspace shot
- Social proof: Customer photos wearing products (Instagram-style grid)

---

## Interactions & States

**Minimal Animation Strategy:**
- Product card hover: Subtle image scale (1.05x) with smooth transition
- Button hover: Slight elevation with shadow
- Cart icon: Gentle bounce when items added
- No scroll-triggered animations or parallax effects
- Focus on snappy, responsive interactions

**Form Validation:**
- Real-time validation with inline error messages
- Success states with checkmarks
- Clear error styling without aggressive colors

---

This design creates a modern, trustworthy e-commerce experience that puts products first while maintaining simplicity for easy customization by creators with varying technical skills.