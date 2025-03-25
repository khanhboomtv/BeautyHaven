import type {Express, NextFunction, Request, Response} from "express";
import {createServer, type Server} from "http";
import {storage} from "./storage";
import {insertNewsSchema, insertProductSchema} from "@shared/schema";

// Middleware to check if user is authenticated via session
const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.session);
  // @ts-ignore
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }
};

export function registerRoutes(app: Express): Server {
  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    const admin = await storage.validateAdmin(username, password);

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // @ts-ignore
    req.session.isAuthenticated = true;
    res.json({ message: "Authenticated successfully" });
  });

  // Check authentication status
  app.get("/api/admin/auth-status", (req, res) => {
    // @ts-ignore
    res.json({ isAuthenticated: !!req.session.isAuthenticated });
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Failed to logout" });
      } else {
        res.json({ message: "Logged out successfully" });
      }
    });
  });

  app.get("/api/products", async (_req, res) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });

  app.get("/api/products/featured", async (_req, res) => {
    const featured = await storage.getFeaturedProducts();
    res.json(featured);
  });

  app.get("/api/products/:category", async (req, res) => {
    const products = await storage.getProductsByCategory(req.params.category);
    res.json(products);
  });

  app.post("/api/products", requireAuth, async (req, res) => {
    const productData = insertProductSchema.parse(req.body);
    const product = await storage.createProduct(productData);
    res.status(201).json(product);
  });

  app.put("/api/products/:id", requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    const productData = insertProductSchema.partial().parse(req.body);
    const product = await storage.updateProduct(id, productData);
    res.json(product);
  });

  app.delete("/api/products/:id", requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteProduct(id);
    res.sendStatus(204);
  });

  app.get("/api/news", async (_req, res) => {
    const news = await storage.getAllNews();
    res.json(news);
  });

  app.get("/api/news/:id", async (req, res) => {
    const newsItem = await storage.getNewsById(parseInt(req.params.id));
    if (!newsItem) {
      res.status(404).json({ message: "News not found" });
      return;
    }
    res.json(newsItem);
  });

  app.post("/api/news", requireAuth, async (req, res) => {
    const newsData = insertNewsSchema.parse(req.body);
    const news = await storage.createNews(newsData);
    res.status(201).json(news);
  });

  app.put("/api/news/:id", requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    const newsData = insertNewsSchema.partial().parse(req.body);
    const news = await storage.updateNews(id, newsData);
    res.json(news);
  });

  app.delete("/api/news/:id", requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteNews(id);
    res.sendStatus(204);
  });

  return createServer(app);
}
