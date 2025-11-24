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
        name: "Graphic Tee",
        description: "Express yourself with bold graphics and eye-catching designs. This statement piece combines artistic flair with everyday comfort for a look that stands out.",
        price: "27.99",
        imageUrl: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHRzaGlydHxlbnwwfHwwfHx8MA%3D%3D",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["White", "Black", "Navy"],
      },
      {
        name: "Classic Hoodie",
        description: "Comfort meets style in this essential hoodie. Perfect for layering or wearing solo, this versatile piece offers warmth and a relaxed fit for any casual occasion.",
        price: "39.99",
        imageUrl: "https://images.pexels.com/photos/8217416/pexels-photo-8217416.jpeg",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Black", "Charcoal", "Navy"],
      },
      {
        name: "Sweatpants",
        description: "Ultimate comfort for lounging or active days. These premium sweatpants offer a perfect blend of style and coziness with a relaxed fit that moves with you.",
        price: "34.99",
        imageUrl: "https://images.unsplash.com/photo-1608585617748-d55938680e85?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHN3ZWF0cGFudHN8ZW58MHx8MHx8fDA%3D",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Gray", "Black", "Navy"],
      },
      {
        name: "Shorts",
        description: "Stay cool and comfortable in these versatile shorts. Perfect for workouts, casual outings, or relaxing at home. Lightweight fabric with a modern fit.",
        price: "29.99",
        imageUrl: "https://images.pexels.com/photos/8084766/pexels-photo-8084766.jpeg",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Blue", "Black", "Gray"],
      },
      {
        name: "Socks",
        description: "Add a pop of color to your everyday look with these comfortable socks. Soft, breathable fabric keeps your feet cozy all day long. Perfect for mixing and matching.",
        price: "12.99",
        imageUrl: "https://images.pexels.com/photos/1001457/pexels-photo-1001457.jpeg",
        sizes: ["S", "M", "L"],
        colors: ["Pink", "Blue", "Yellow"],
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
