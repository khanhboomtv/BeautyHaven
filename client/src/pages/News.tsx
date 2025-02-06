import { useQuery } from "@tanstack/react-query";
import { NewsCard } from "@/components/NewsCard";
import { Link } from "wouter";
import { type News } from "@shared/schema";

export default function News() {
  const { data: news = [] } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-20">
      {news.map((item) => (
        <Link key={item.id} href={`/news/${item.id}`}>
          <span className="block hover:no-underline cursor-pointer">
            <NewsCard news={item} />
          </span>
        </Link>
      ))}
    </div>
  );
}