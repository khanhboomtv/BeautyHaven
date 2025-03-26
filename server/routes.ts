import type {Express} from "express";
import {createServer, type Server} from "http";
import {storage} from "./storage";
import {insertNewsSchema, insertProductSchema} from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    const admin = await storage.validateAdmin(username, password);

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({ message: "Authenticated successfully" });
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

  app.post("/api/products", async (req, res) => {
    const productData = insertProductSchema.parse(req.body);
    const product = await storage.createProduct(productData);
    res.status(201).json(product);
  });

  app.put("/api/products/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const productData = insertProductSchema.partial().parse(req.body);
    const product = await storage.updateProduct(id, productData);
    res.json(product);
  });

  app.delete("/api/products/:id", async (req, res) => {
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

  app.post("/api/news", async (req, res) => {
    const newsData = insertNewsSchema.parse(req.body);
    const news = await storage.createNews(newsData);
    res.status(201).json(news);
  });

  app.put("/api/news/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const newsData = insertNewsSchema.partial().parse(req.body);
    const news = await storage.updateNews(id, newsData);
    res.json(news);
  });

  app.delete("/api/news/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    await storage.deleteNews(id);
    res.sendStatus(204);
  });

  app.get("/api/videos", async (_req, res) => {
    const videos = await storage.getAllVideos();
    res.json(videos);
  });

  app.get("/api/videos/featured", async (_req, res) => {
    const featured = await storage.getFeaturedVideos();
    res.json(featured);
  });

  app.get("/sitemap.xml", (_req, res) => {
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://baohancosmetics.com'
      : `http://0.0.0.0:3000`;

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}/</loc>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
        <url>
          <loc>${baseUrl}/products</loc>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>${baseUrl}/news</loc>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
        <url>
          <loc>${baseUrl}/videos</loc>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      </urlset>`;
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  });


  return createServer(app);
}
