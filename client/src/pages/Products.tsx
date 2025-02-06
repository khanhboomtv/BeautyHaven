import { ProductCard } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { type Product } from "@shared/schema";

export default function Products() {
  const { data: products, isLoading } = useQuery<Product[]>({ 
    queryKey: ["/api/products"]
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Our Products</h1>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[300px] bg-gray-100 animate-pulse rounded-lg" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
