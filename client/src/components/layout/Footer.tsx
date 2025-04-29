import { Link } from "wouter";

export function Footer() {
  return (
      <footer className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Mỹ phẩm Bảo Hân</h3>
              <p className="text-sm opacity-90">
                Chuyên cung cấp mỹ phẩm chính hãng
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Lối tắt</h4>
              <div className="space-y-2">
                <Link href="/products">
                <span className="block text-sm opacity-90 hover:opacity-100 cursor-pointer">
                  Sản phẩm
                </span>
                </Link>
                <Link href="/news">
                <span className="block text-sm opacity-90 hover:opacity-100 cursor-pointer">
                  Tin tức
                </span>
                </Link>
                <Link href="/videos">
                <span className="block text-sm opacity-90 hover:opacity-100 cursor-pointer">
                  Video
                </span>
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Liên hệ</h4>
              <div className="space-y-2 text-sm opacity-90">
                <p>Địa chỉ: Mipec Long Biên, Ngọc Lâm, Hà Nội</p>
                <p>Email: nth30592@gmail.com</p>
                <p>Số điện thoại: 096 863 05 92</p>
                <p>
                  Facebook:{" "}
                  <a
                      className="hover:underline"
                      href="https://www.facebook.com/profile.php?id=100066135197517"
                      target="_blank"
                  >
                    MP Bảo Hân
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-primary-foreground text-center text-sm opacity-60">
            <p>&copy; 2025 BaoHanCosmetics. All rights reserved.</p>
          </div>
        </div>
      </footer>
  );
}
