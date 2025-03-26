import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { NewsCard } from "@/components/NewsCard";
import { useQuery } from "@tanstack/react-query";
import { type Product, type News } from "@shared/schema";
import Carousel from "@/components/Carousel";
import { Link } from "wouter";

export default function Home() {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products/featured"]
  });

  const { data: news } = useQuery<News[]>({
    queryKey: ["/api/news"]
  });

  return (
    <div>
      <Hero />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Sản phẩm nổi bật</h2>
          <Carousel>
            {products?.map((product) => (
              <div key={product.id} className="flex-[0_0_100%] md:flex-[0_0_33.333%] px-2">
                <ProductCard product={product} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Tin mới nhất</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {news?.slice(0, 2).map((item) => (
              <Link key={item.id} href={`/news/${item.id}`}>
                <span className="block hover:no-underline cursor-pointer">
                  <NewsCard news={item} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
