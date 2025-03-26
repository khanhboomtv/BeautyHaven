import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  featured: boolean("featured").default(false).notNull(),
});

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  date: timestamp("date").notNull().defaultNow(),
});

export const admin = pgTable("admin", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });

export const insertNewsSchema = createInsertSchema(news).omit({ id: true, date: true })

export const insertAdminSchema = createInsertSchema(admin).omit({ id: true });

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type News = typeof news.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type Admin = typeof admin.$inferSelect;
