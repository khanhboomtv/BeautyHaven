import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { NewsCard } from "@/components/NewsCard";
import { useQuery } from "@tanstack/react-query";
import { type Product, type News } from "@shared/schema";

export default function Home() {
  const { data: products } = useQuery<Product[]>({ 
    queryKey: ["/api/products"]
  });

  const { data: news } = useQuery<News[]>({ 
    queryKey: ["/api/news"]
  });

  return (
    <div>
      <Hero />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products?.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news?.slice(0, 2).map((item) => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
