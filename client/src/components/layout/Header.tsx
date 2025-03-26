import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Header() {
  function scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <img src="/images/logo.png" className="w-[171px] h-[55px]" alt="Logo" />
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/">
              <span className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Trang chủ</span>
            </Link>
            <Link href="/products">
              <span className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Sản phẩm</span>
            </Link>
            <Link href="/news">
              <span className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Tin tức</span>
            </Link>
            <Link href="/videos">
              <span className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">Video</span>
            </Link>
          </nav>

          <Button variant="outline" className="hidden md:inline-flex" onClick={scrollToBottom}>
            Liên hệ
          </Button>
        </div>
      </div>
    </header>
  );
}
