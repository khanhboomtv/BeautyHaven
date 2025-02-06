import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { type Product } from "@shared/schema";

export default function Products() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    queryFn: () => fetch("/api/products").then(res => res.json())
  });

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-20">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}