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

  const httpServer = createServer(app);
  return httpServer;
}
