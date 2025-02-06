import { NewsCard } from "@/components/NewsCard";
import { useQuery } from "@tanstack/react-query";
import { type News } from "@shared/schema";

export default function News() {
  const { data: news, isLoading } = useQuery<News[]>({ 
    queryKey: ["/api/news"]
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Latest News</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[300px] bg-gray-100 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news?.map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
