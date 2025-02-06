import { type Product, type InsertProduct, type News, type InsertNews } from "@shared/schema";

export interface IStorage {
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getAllNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | null>;
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
      {
        id: 3,
        name: "Anti-Aging Serum",
        description: "Advanced formula for youthful skin",
        price: 4999,
        image: "https://images.unsplash.com/photo-1570194065650-d707c3c52b24",
        category: "skincare"
      },
      {
        id: 4,
        name: "Vitamin C Toner",
        description: "Brightening and refreshing toner",
        price: 1999,
        image: "https://images.unsplash.com/photo-1601049676869-702ea24cfd76",
        category: "skincare"
      },
      {
        id: 5,
        name: "Hydrating Mask",
        description: "Deep hydration treatment",
        price: 1499,
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908",
        category: "masks"
      },
      {
        id: 6,
        name: "Eye Cream",
        description: "Gentle care for delicate eye area",
        price: 3499,
        image: "https://images.unsplash.com/photo-1567165872041-2991e50cc458",
        category: "skincare"
      },
      {
        id: 7,
        name: "Gentle Cleanser",
        description: "Daily facial cleanser for sensitive skin",
        price: 2499,
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571",
        category: "skincare"
      },
      {
        id: 8,
        name: "Sunscreen SPF 50",
        description: "Broad spectrum UV protection",
        price: 2799,
        image: "https://images.unsplash.com/photo-1556227702-d1e4e7b5c232",
        category: "suncare"
      },
      {
        id: 9,
        name: "Night Repair Cream",
        description: "Intensive overnight treatment",
        price: 3999,
        image: "https://images.unsplash.com/photo-1570179538662-31968d08c224",
        category: "skincare"
      }
    ];

    this.news = [
      {
        id: 1,
        title: "The Future of Clean Beauty",
        content: "Discover the latest trends in sustainable cosmetics. The beauty industry is undergoing a major transformation as consumers become more conscious about the ingredients in their products and their impact on the environment. Clean beauty brands are leading the charge by developing innovative formulations that are both effective and environmentally responsible. From biodegradable packaging to ethically sourced ingredients, we're seeing a revolution in how beauty products are created and marketed. This shift isn't just about removing harmful ingredients; it's about creating products that are good for both people and the planet.",
        image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff",
        date: new Date("2024-03-01")
      },
      {
        id: 2,
        title: "Skincare Myths Debunked",
        content: "Leading dermatologists address common skincare misconceptions. Many popular beliefs about skincare have been passed down through generations or spread through social media, but not all of them are based on scientific evidence. Our panel of experts breaks down some of the most persistent myths and provides evidence-based advice for maintaining healthy skin. From the truth about pore size to the real effects of chocolate on acne, we're setting the record straight on these widespread misconceptions.",
        image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19",
        date: new Date("2024-02-28")
      },
      {
        id: 3,
        title: "Natural Ingredients Revolution",
        content: "How traditional ingredients are making a comeback in modern skincare. Ancient beauty secrets from various cultures are being rediscovered and validated by modern science. Ingredients like turmeric, honey, and green tea, which have been used for centuries in traditional medicine, are now being incorporated into high-tech skincare formulations. This fusion of old and new is creating products that honor traditional wisdom while leveraging contemporary scientific advances.",
        image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b",
        date: new Date("2024-02-25")
      },
      {
        id: 4,
        title: "The Science of Anti-Aging",
        content: "Breakthrough research reveals new approaches to skin aging. Scientists have made significant strides in understanding the molecular mechanisms behind skin aging. This new research has led to the development of more effective anti-aging ingredients and treatments. We explore the latest scientific discoveries and how they're being translated into practical skincare solutions that can help maintain youthful, healthy skin at any age.",
        image: "https://images.unsplash.com/photo-1556228720-195a672e8a03",
        date: new Date("2024-02-20")
      },
      {
        id: 5,
        title: "Sustainable Beauty Packaging",
        content: "How the industry is tackling plastic waste. The beauty industry is taking bold steps to address its environmental impact, particularly in packaging. From refillable containers to plastic-free alternatives, brands are innovating to reduce waste while maintaining product integrity. We explore the latest sustainable packaging solutions and how they're changing the way we think about beauty product consumption.",
        image: "https://images.unsplash.com/photo-1585232004423-244e0e6904e3",
        date: new Date("2024-02-15")
      }
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

  async getNewsById(id: number): Promise<News | null> {
    return this.news.find(n => n.id === id) || null;
  }
}

export const storage = new MemStorage();