// @ts-ignore
import { type NextApiRequest, type NextApiResponse } from "next";
import { storage } from "../../../../server/storage";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const news = await storage.getAllNews();
  return res.json(news);
}
