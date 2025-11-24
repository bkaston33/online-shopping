# TeeTime - Apparel E-Commerce Platform

## Overview

TeeTime is a modern e-commerce platform for selling quality apparel. The application features a visual-first shopping experience with product browsing, cart management, and checkout functionality. Built with a React frontend and Express backend, it emphasizes clean design, smooth user interactions, and a frictionless purchasing flow.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server
- Client-side routing using Wouter (lightweight alternative to React Router)
- Single-page application (SPA) architecture

**State Management:**
- React Context API for global cart state (`CartContext`)
- TanStack Query (React Query) for server state management and data fetching
- Local state with React hooks for component-level state
- LocalStorage for cart persistence between sessions

**UI Component Library:**
- Shadcn UI component system (Radix UI primitives with custom styling)
- Tailwind CSS for utility-first styling with custom design tokens
- Inter and Poppins fonts (Google Fonts) for typography
- Responsive design with mobile-first approach

**Form Management:**
- React Hook Form for form state and validation
- Zod for schema validation
- @hookform/resolvers for integrating Zod with React Hook Form

**Key Design Decisions:**
- Product-first visual hierarchy emphasizing t-shirt imagery
- Gallery-style layouts with 3:4 aspect ratio product cards
- Clean, minimal interface following modern e-commerce patterns
- Client-side cart management for instant feedback without server round-trips

### Backend Architecture

**Server Framework:**
- Express.js for REST API endpoints
- TypeScript for type safety
- Node.js runtime

**API Design:**
- RESTful endpoints following standard conventions
- JSON request/response format
- Simple CRUD operations for products and orders
- No authentication/authorization (public shopping only)

**Data Layer:**
- In-memory storage implementation (`MemStorage` class) for development/demo
- Database-ready interface (`IStorage`) allowing easy migration to persistent storage
- Drizzle ORM configured for PostgreSQL (via Neon serverless driver)
- Schema defined with Drizzle kit for type-safe database operations

**Key Design Decisions:**
- Interface-based storage abstraction allows switching between in-memory and database implementations
- Static product catalog seeded on startup
- Orders stored with generated order numbers for customer reference
- Separation of concerns: routes handle HTTP, storage handles data

### Data Models

**Product Schema:**
- ID, name, description, price (decimal)
- Image URL for product photography
- Arrays for available sizes and colors
- Designed for variant-based product offerings

**Order Schema:**
- Customer information (name, email, phone, address)
- Order totals (subtotal, tax, total)
- Cart items stored as JSON string
- Unique order number for tracking
- No user accounts - guest checkout only

**Cart Structure (Client-side):**
- Product ID, name, price, image URL
- Selected size and color
- Quantity
- Calculated with 8.5% tax rate

### External Dependencies

**Database:**
- PostgreSQL (via Neon serverless) configured but not required
- Drizzle ORM v0.39+ for database operations
- Connection pooling via `@neondatabase/serverless`
- Environment variable `DATABASE_URL` required for database connectivity

**UI Libraries:**
- Radix UI primitives (v1.x) for accessible, unstyled components
- Lucide React for icon system
- Embla Carousel for image carousels
- class-variance-authority (CVA) for component variant management

**Development Tools:**
- Replit-specific plugins for runtime error handling and cartographer
- ESBuild for production bundling
- tsx for TypeScript execution in development

**Asset Management:**
- Static assets served from `/attached_assets` directory
- Product images stored as generated PNG files
- Hero image for landing page

**Key Integration Points:**
- No payment processor integration (orders collected but not processed)
- No email service (confirmation page only)
- No authentication service
- No CDN or image optimization service