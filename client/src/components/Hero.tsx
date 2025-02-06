import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative h-[80vh] flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url(https://images.unsplash.com/photo-1674301927403-870c370ef75f)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Discover Your Natural Beauty
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Premium cosmetics made with natural ingredients for your daily beauty routine.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90">
            Explore Products
          </Button>
        </div>
      </div>
    </div>
  );
}
