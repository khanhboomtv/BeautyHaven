import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">BeautyEssence</h3>
            <p className="text-sm opacity-80">
              Your trusted source for premium beauty and skincare products.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/products">
                <a className="block text-sm opacity-80 hover:opacity-100">Products</a>
              </Link>
              <Link href="/news">
                <a className="block text-sm opacity-80 hover:opacity-100">News</a>
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm opacity-80">
              <p>Email: contact@beautyessence.com</p>
              <p>Phone: (555) 123-4567</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center text-sm opacity-60">
          <p>&copy; 2024 BeautyEssence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
