import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export function registerRoutes(app: Express): Server {
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });

  app.get("/api/products/:category", async (req, res) => {
    const products = await storage.getProductsByCategory(req.params.category);
    res.json(products);
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

  const httpServer = createServer(app);
  return httpServer;
}