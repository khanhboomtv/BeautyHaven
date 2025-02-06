import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function Hero() {
  return (
    <div className="relative h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1674301927403-870c370ef75f"
          >
            <source 
              src="https://vod-progressive.akamaized.net/exp=1707307200~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4487%2F15%2F398560828%2F1698425399.mp4~hmac=5df726760c36d3a83c5edfef51506758e8a4aa2fa816988e6613462c87bc2d38/vimeo-prod-skyfire-std-us/01/4487/15/398560828/1698425399.mp4"
              type="video/mp4"
            />
            {/* Fallback for browsers that don't support video */}
            <img 
              src="https://images.unsplash.com/photo-1674301927403-870c370ef75f"
              alt="Beauty products"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </video>
        </div>
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
          <Link href="/products">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Explore Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}