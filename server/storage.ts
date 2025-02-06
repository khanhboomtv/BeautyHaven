import { type Product, type InsertProduct, type News, type InsertNews } from "@shared/schema";

export interface IStorage {
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getAllNews(): Promise<News[]>;
}

export class MemStorage implements IStorage {
  private products: Product[];
  private news: News[];

  constructor() {
    this.products = [
      {
        id: 1,
        name: "Natural Face Cream",
        description: "Nourishing cream for all skin types",
        price: 2999,
        image: "https://images.unsplash.com/photo-1503236823255-94609f598e71",
        category: "skincare"
      },
      {
        id: 2,
        name: "Organic Lip Balm",
        description: "Moisturizing lip care",
        price: 999,
        image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
        category: "lips"
      },
      // Add more products...
    ];

    this.news = [
      {
        id: 1,
        title: "The Future of Clean Beauty",
        content: "Discover the latest trends in sustainable cosmetics...",
        image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff",
        date: new Date("2024-03-01")
      },
      // Add more news...
    ];
  }

  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.products.filter(p => p.category === category);
  }

  async getAllNews(): Promise<News[]> {
    return this.news;
  }
}

export const storage = new MemStorage();
