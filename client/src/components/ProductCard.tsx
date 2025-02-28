import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { type Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardContent>
      <CardFooter className="p-4 flex flex-col">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground text-center mt-1" dangerouslySetInnerHTML={{__html: product.description}}></p>
        {/*<p className="mt-2 font-medium">{product.price}</p>*/}
      </CardFooter>
    </Card>
  );
}
