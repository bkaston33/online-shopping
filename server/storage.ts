import { type Product, type InsertProduct, type Order, type InsertOrder } from "@shared/schema";
import { randomUUID } from "crypto";

// Product image paths
const geometricTee = "/assets/generated_images/Geometric_abstract_design_tee_48a4036b.png";
const createTee = "/assets/generated_images/Create_Everyday_typography_tee_1a0f31c4.png";
const mountainTee = "/assets/generated_images/Mountain_landscape_illustration_tee_ed3ea00c.png";
const coffeeTee = "/assets/generated_images/Coffee_lover_graphic_tee_c42fe65b.png";
const floralTee = "/assets/generated_images/Vintage_floral_botanical_tee_1d3fc4b5.png";
const sunsetTee = "/assets/generated_images/Retro_sunset_palm_tee_f837a416.png";
const cameraTee = "/assets/generated_images/Photography_enthusiast_graphic_tee_2faef45b.png";

export interface IStorage {
  // Products
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrderByNumber(orderNumber: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private orders: Map<string, Order>;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.seedProducts();
  }

  private seedProducts() {
    const productsData: InsertProduct[] = [
      {
        name: "Classic White Tee",
        description: "A timeless essential for any wardrobe. This premium white t-shirt features a clean, minimalist design with superior comfort and quality. Perfect for everyday wear or layering.",
        price: "24.99",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhaW4lMjB0c2hpcnR8ZW58MHx8MHx8fDA%3D",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["White", "Black", "Gray"],
      },
      {
        name: "Create Everyday",
        description: "Daily inspiration printed bold. This motivational typography design reminds you to bring creativity into every moment. Make your mark, every single day.",
        price: "26.99",
        imageUrl: createTee,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Charcoal", "Navy"],
      },
      {
        name: "Mountain Escape",
        description: "For the adventurers and nature lovers. This stunning mountain landscape illustration captures the serenity of the great outdoors. Wear your wanderlust proudly.",
        price: "27.99",
        imageUrl: mountainTee,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Heather Gray", "Forest Green", "Navy"],
      },
      {
        name: "But First Coffee",
        description: "Coffee enthusiasts unite! A minimalist line art design for those who live by the coffee-first philosophy. The perfect tee for your morning ritual and beyond.",
        price: "25.99",
        imageUrl: coffeeTee,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Navy", "Black", "Brown"],
      },
      {
        name: "Botanical Garden",
        description: "Vintage-inspired floral elegance. This soft botanical illustration brings a touch of nature's beauty to your wardrobe. Timeless, graceful, and effortlessly stylish.",
        price: "29.99",
        imageUrl: floralTee,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Pink", "Cream", "Sage Green"],
      },
      {
        name: "Sunset Vibes",
        description: "Retro nostalgia meets tropical paradise. Featuring colorful gradient stripes and palm tree silhouettes that transport you to endless summer evenings and good vibes only.",
        price: "27.99",
        imageUrl: sunsetTee,
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["White", "Cream", "Light Blue"],
      },
    ];

    productsData.forEach((productData) => {
      const id = randomUUID();
      const product: Product = { ...productData, id };
      this.products.set(id, product);
    });
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const order: Order = {
      ...insertOrder,
      id,
      orderNumber,
    };
    this.orders.set(orderNumber, order);
    return order;
  }

  async getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
    return this.orders.get(orderNumber);
  }
}

export const storage = new MemStorage();
