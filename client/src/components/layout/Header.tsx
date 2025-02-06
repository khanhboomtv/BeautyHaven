import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <span className="text-2xl font-bold text-primary cursor-pointer">BeautyEssence</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <span className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Home</span>
            </Link>
            <Link href="/products">
              <span className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Products</span>
            </Link>
            <Link href="/news">
              <span className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">News</span>
            </Link>
          </nav>

          <Button variant="outline" className="hidden md:inline-flex">
            Contact Us
          </Button>
        </div>
      </div>
    </header>
  );
}