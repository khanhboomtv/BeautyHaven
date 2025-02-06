import { type NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { NewsCard } from "@/components/NewsCard";

const News: NextPage = () => {
  const { data: news = [] } = useQuery({
    queryKey: ["news"],
    queryFn: () => fetch("/api/news").then(res => res.json())
  });

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
};

export default News;