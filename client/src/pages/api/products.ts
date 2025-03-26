// @ts-ignore
import { type NextApiRequest, type NextApiResponse } from "next";
import { storage } from "../../../../server/storage";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category } = req.query;

  if (category) {
    const products = await storage.getProductsByCategory(category as string);
    return res.json(products);
  }

  const products = await storage.getAllProducts();
  return res.json(products);
}
