import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  return (
    <div className="relative h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/images/hero.jpg"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Mỹ phẩm Bảo Hân
          </h1>
          <p className="text-lg md:text-xl mb-8 font-bold">
            Chuyên cung cấp mỹ phẩm tóc chính hãng Nouvelle, Polan, Stapiz, Addmino18, KeraSublime, OhkaSakura ...
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Xem sản phẩm
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
