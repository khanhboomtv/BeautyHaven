import {type Product, type InsertProduct, type News, type InsertNews, type Admin, type Video} from "@shared/schema";

export interface IStorage {
  validateAdmin(username: string, password: string): Promise<Admin | null>;
  getAllProducts(): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getAllNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | null>;
  getAllVideos(): Promise<Video[]>;
  getFeaturedVideos(): Promise<Video[]>;
}

export class MemStorage implements IStorage {
  private products: Product[];
  private news: News[];
  private videos: Video[];
  private adminUser: Admin;

  constructor() {
    this.adminUser = {
      id: 1,
      username: "admin",
      password: "baohancosmetics" // In a real app, this should be hashed
    };

    this.products = [
      {
        id: 1,
        name: "Màu Nhuộm Thuần Chay Lively",
        description: "100% thành phần từ tự nhiên. Không amoniac, không parapen. Cruelty-Free. An toàn, dịu nhẹ, không gây kích ứng da đầu. Tóc mềm bóng, màu sâu, lâu trôi.",
        price: "",
        image: "/images/products/1.jpg",
        featured: true,
        category: "haircare"
      },
      {
        id: 2,
        name: "Sani Habit",
        description: "Được bào chế với thành phần 100% tự nhiên với chất \"chống trùng\" như mật ong, than, quế, bạch đàn, tinh dầu tràm và prebiotics. Sani Habit làm sạch, cấp nước và sát trùng cho tóc và da đầu của bạn",
        price: "520k / 1 cặp 250ml",
        image: "/images/products/2.jpg",
        featured: true,
        category: "haircare"
      },
      {
        id: 3,
        name: "Uốn Lạnh Nouvelle",
        description: "Loại uốn lạnh có tính kiềm mềm giúp tóc có những lọn xoăn tự nhiên, mềm mại mà không tổn hại đến cấu trúc tóc. Có 3 loại dành cho tóc khỏe, thường và yếu",
        price: "",
        image: "/images/products/3.jpg",
        featured: true,
        category: "haircare"
      },
      {
        id: 5,
        name: "Nouvelle Argan",
        description: "Tinh dầu Argan nguyên chất dung tích 100ml",
        price: "",
        image: "/images/products/5.jpg",
        featured: false,
        category: "haircare"
      },
      {
        id: 6,
        name: "Dưỡng ẩm Moroccanoil",
        description: "Cặp 500ml dưỡng ẩm Moroccanoil tặng kèm 1 lược chải chính hãng",
        price: "",
        image: "/images/products/6.jpg",
        featured: false,
        category: "haircare"
      },
      {
        id: 7,
        name: "Oxy thơm trợ nhuộm",
        description: "Oxy thơm trợ nhuộm, giảm thiểu tối đa cắn, xót, rát da đầu ... ",
        price: "",
        image: "/images/products/7.jpg",
        featured: false,
        category: "haircare"
      },
      {
        id: 4,
        name: "OhkaSakura ND600 - ND630W",
        description: "Cặp kéo Elite 1🌟. <br/>Sản phẩm chính hãng, bảo hành chế độ công ty, 1 đổi 1 nếu do lỗi của nhà sản xuất",
        price: "",
        image: "/images/products/4.jpg",
        featured: true,
        category: "scissor"
      },
      {
        id: 8,
        name: "OhkaSakura ND600C - ND600",
        description: "Sản phẩm chính hãng, bảo hành chế độ công ty, 1 đổi 1 nếu do lỗi của nhà sản xuất",
        price: "",
        image: "/images/products/8.jpg",
        featured: false,
        category: "scissor"
      },
      {
        id: 9,
        name: "OhkaSakura  Model C - Classic Series",
        description: "Độ chính xác vượt trội , tăng cường khả năng kiểm soát và đệm hỗ trợ có thể tháo rời để tùy chỉnh theo mong muốn . Chiếc kéo đa năng này phù hợp với nhiều kỹ thuật cắt khác nhau! Có các kích cỡ 5.5 , 6.0 inch",
        price: "",
        image: "/images/products/9.jpg",
        featured: true,
        category: "scissor"
      },
      {
        id: 10,
        name: "OhkaSakura Model FA600S - Favorit Series 3",
        description: "Lưỡi kéo với thiết kế lưỡi lá độc đáo, cực thích hợp cho những vết cắt khô và kỹ thuật cắt trượt, trải nghiệm sự chính xác và dễ dàng cùng từng đường kéo!",
        price: "",
        image: "/images/products/10.jpg",
        featured: false,
        category: "scissor"
      },
      {
        id: 11,
        name: "OhkaSakura Elite Series - Model ND63010",
        description: "Kéo tỉa size 6.0, có 30 răng, độ rơi tóc 10% ~ 15% giúp tóc mỏng bớt nhưng vẫn giữ được form và độ dày tổng thể!",
        price: "",
        image: "/images/products/11.jpg",
        featured: false,
        category: "scissor"
      },
    ];

    this.news = [
      {
        id: 10,
        title: "Thông báo lịch nghỉ lễ",
        content: "Kính chúc quý khách hàng kỳ nghỉ lễ vui vẻ và an yên ❤️</br></br>Mỹ Phẩm Bảo Hân 🍀</br></br>✪ | Address : Mipec Long Biên, Ngọc Lâm, Hà Nội</br>✆ | Hotline : 0968630592</br>★ | <a href=\"https://shopee.vn/baohancosmeticss\"> shopee.vn/baohancosmeticss</a>",
        image: "/images/news/10.jpg",
        date: new Date("2025-04-28")
      },
      {
        id: 9,
        title: "🇻🇳🇰🇷 Mastering Korean Cuts & Perms 🇰🇷🇻🇳",
        content: "• Kỹ thuật cắt xu hướng Hàn Quốc 2025: Layer đa tầng, tạo độ phồng tự nhiên, cắt mái chuẩn Hàn, kết hợp cắt & uốn để giữ nếp lâu</br>• Kỹ thuật uốn nhiệt không gây hư tổn : Giữ tóc mềm mại, bóng mượt, không khô xơ, tối ưu hiệu suất làm việc</br>• Tuyệt chiêu “Tái uốn” : Uốn lại nhiều lần trên cùng nền tóc mà vẫn giữ được độ chắc khỏe, bồng bềnh</br>• Kỹ thuật chuẩn đoán nền tóc & lựa chọn hóa chất phù hợp của chuyên gia Hàn Quốc : Đảm bảo hiệu quả uốn & duy trì chất tóc khỏe mạnh</br>• Thực hành trên manocanh & mẫu thật, hướng dẫn trực tiếp bởi chuyên gia</br>• Tối ưu hóa quy trình làm việc trong Salon : Rút ngắn thời gian thực hiện, nâng cao chất lượng dịch vụ, gia tăng doanh thu</br></br>⏰ Thời gian : 14, 15 tháng 5</br>📍 Địa điểm : J03-01 khu đô thị An Phú Shop Villa, Dương Nội, Hà Đông</br>📞 Hotline : 0968630592",
        image: "/images/news/9.jpg",
        date: new Date("2025-04-25")
      },
      {
        id: 8,
        title: "🔥Khóa cắt uốn chuyên sâu xu hướng 🇰🇷 2025 🔥",
        content: "★ Cập nhật xu hướng tóc mới nhất năm 2025</br>★ Cách cắt và tạo kiểu shaggy, hushcut, long layer, xoăn bồng bềnh, square layer và xoăn lơi Hàn Quốc</br>★ Cắt & tạo kiểu cá nhân hóa theo yêu cầu của khách hàng</br>★ Mềm hóa & setting perm chuẩn – giữ sóng tự nhiên, không xơ rối, không hư tổn</br>★ Kỹ thuật tái uốn trên nền tóc đã từng qua hóa chất</br>★ Tạo hình ảnh chuyên nghiệp cho hairstylist & salon</br>★ Kỹ thuật chụp ảnh & quay video sản phẩm tóc</br></br>Sau khóa học sẽ được ôn bài qua nhóm online và nhận sự hỗ trợ trực tiếp từ chuyên gia Nam Hair ❤️</br></br>⏰ Thời gian : 15, 16 tháng 4</br>📍 Địa điểm : 90 Nguyễn Tuân, Thanh Xuân, Hà Nội</br>📞 Hotline : 0968630592",
        image: "/images/news/8.jpg",
        date: new Date("2025-03-25")
      },
      {
        id: 7,
        title: "Trải Nghiệm Màu Nhuộm #Gouallty Cùng Master Color Truong Tuan Dung 🔥",
        content: "• Vận dụng và phát huy ánh sắc đa chiều của bộ mã trung tính dựa trên bảng màu tiêu chuẩn quốc tế.</br>• Chuyên sâu về hệ màu mới Gouallty.</br></br><p>Mỹ Phẩm Bảo Hân sẽ có bộ phận chăm sóc gửi thông tin chi tiết đến khách hàng</p></br>⏰ Thời gian : 11 tháng 3</br>📍 Địa điểm : J03-01 khu đô thị An Phú Shop Villa, Dương Nội, Hà Đông.</br>📞 Hotline : 0968630592",
        image: "/images/news/7.jpg",
        date: new Date("2025-03-07")
      },
      {
        id: 6,
        title: "Học quay dựng video bằng smartphone – Vũ Văn Lê",
        content: "<p>Nội Dung Chương Trình 1 Ngày!</p></br>• Làm chủ kỹ thuật quay chuyên nghiệp, căn sáng, bố cục, chuyển động camera làm sao cho mượt mà.</br>• Thành thạo quy trình quay dựng từ chuẩn bị, ghi hình đến hậu kỳ hoàn chỉnh</br>• Biên tập video chuyên sâu, cắt ghép, hiệu ứng, chỉnh màu, thêm âm thanh sống động.</br>• Sáng tạo video ấn tượng, ứng dụng ngay vào quảng cáo, bán hàng sáng tạo nội dung.</br></br><p>Mỹ Phẩm Bảo Hân sẽ có bộ phận chăm sóc gửi thông tin chi tiết đến khách hàng</p></br>⏰ Thời gian : 31 tháng 3</br>📍 Địa điểm : J03-01 khu đô thị An Phú Shop Villa, Dương Nội, Hà Đông.</br>📞 Hotline : 0968630592",
        image: "/images/news/6.jpg",
        date: new Date("2025-03-05")
      },
      {
        id: 5,
        title: "Khóa học cắt uốn Hàn Quốc  xu hướng 2025",
        content: "• Trực tiếp hướng dẫn bởi giáo sư hàng đầu Hàn Quốc - KIM JI SEON!</br>• Học hỏi kinh nghiệm từ đại sứ thương hiệu ECO - NAM HAIR !</br>• Được đào tạo bởi giám đốc kỹ thuật VĨNH HAIR, chuyên gia kỹ thuật đỉnh cao !</br></br><p>Mỹ Phẩm Bảo Hân sẽ có bộ phận chăm sóc gửi thông tin chi tiết đến khách hàng</p></br>📍 Địa điểm: j03-01 khu đô thị An Phú shop villa, Dương Nội, Hà Đông.</br>📞 Hotline: 0968630592",
        image: "/images/news/5.jpg",
        date: new Date("2025-02-24")
      },
      {
        id: 4,
        title: "Training color mastery - Đông Trần",
        content: "<p>Nội Dung Chính Khóa Học 1 Ngày!</p></br>• Ôn lại kiến thức màu căn bản tiêu chuẩn quốc tế.</br>• Phân tích và hệ thống hóa hệ màu Châu Âu.</br>• Nắm rõ phương pháp và cách tính nâng tone - hạ tone.</br>• Xử lý cân bằng màu với nền tóc loang lổ, nhiều khúc màu để bền màu, đặc biệt hậu mầu không bị vàng sỉn.</br>• Giải mã toàn bộ phương pháp nhuộm màu công sở 1 lần max tone.</br>• Phân tích và giải đáp toàn bộ % màu ẩn trên từng tuýp thuốc màu mong muốn.</br></br><p>Mỹ Phẩm Bảo Hân sẽ có bộ phận chăm sóc gửi thông tin chi tiết đến khách hàng</p></br>⏰ Thời gian : 11 tháng 3</br>📍 Địa điểm : j03-01 khu đô thị An Phú shop villa, Dương Nội, Hà Đông.</br>📞 Hotline : 0968630592",
        image: "/images/news/4.jpg",
        date: new Date("2025-02-10")
      },
      {
        id: 3,
        title: "Training hair cutting – Anh Sơn Sassoon",
        content: "<p>Nội Dung Chính Khóa Học 1 Ngày!</p></br>• Kỹ thuật cắt 3 bài tóc ngắn ứng dụng salon 100% (bob, nhật hàn, random) chỉ với 5 phút 1 bài cắt đã tự ôm và mềm mại.</br>• Các mẫu tóc hot trend, được thiết kế trên nhu cầu thực tế của khách hàng hiện nay, dễ áp dụng và phù hợp với mọi salon.</br>• Kỹ thuật cắt nhanh, chuẩn xác giúp tiết kiệm thời gian nhưng vẫn đảm bảo độ chính xác và chất lượng dịch vụ.</br>• Chia sẻ kinh nghiệm thực chiến những mẹo nhỏ nhưng cực kỳ hiệu quả từ chính trải nghiệm thực tế.</br>• Chia sẻ kỹ thuật phối màu, hilight dành cho tóc ngắn.</br>• Thực hành trực tiếp, cầm tay chỉ việc ngay tại lớp học, cam kết học xong về cắt được ngay.</br></br><p>Mỹ Phẩm Bảo Hân sẽ có bộ phận chăm sóc gửi thông tin chi tiết đến khách hàng</p></br>⏰ Thời gian : 11 tháng 3</br>📍 Địa điểm : j03-01 khu đô thị An Phú shop villa, Dương Nội, Hà Đông.</br>📞 Hotline : 0968630592",
        image: "/images/news/3.jpg",
        date: new Date("2025-02-07")
      },
      {
        id: 2,
        title: "Master color & cut – GouJing (Quách Tĩnh)",
        content: "<p>Nội Dung Chương Trình 3 Ngày!</p></br><p>Ngày 1: Nghệ Thuật Phối Màu & Tạo Vân Tóc Cao Cấp</p></br>• Phân tích chất tóc, hệ thống màu sắc và cách nhuộm nhanh, chuẩn xác.</br>• Kỹ thuật phối màu nền và màu cao cấp, tạo hiệu ứng bóng sáng chuyên nghiệp.</br>• Thực hành cách phối màu từ cơ bản đến nâng cao, tạo vân tóc từ đậm đến nhạt không cần nhiều bước.</br>• Kỹ thuật cắt mỏng cấu trúc tóc, cắt tỉa nâng cao và phân vùng nhuộm chính xác.</br></br><p>Ngày 2: Sáng Tạo & Xu Hướng Y2K</p></br>• Kỹ thuật phân vùng nhuộm tóc ngắn, lớp dưới và phân vùng nhuộm Y2K.</br>• Bí quyết làm nổi bật vị trí đẹp nhất với tỷ lệ phối màu hoàn hảo</br>• Giải pháp nhuộm đen, sáng, xử lý tóc yếu và nối chân tóc hiệu quả.</br>• Lý thuyết đánh nền, kiểm soát tỷ lệ oxy và bột tẩy để đạt hiệu ứng đồng đều.</br></br><p>Ngày 3: Thực Hành Trực Tiếp</p></br>• Thực hành với trợ giảng và giáo viên hướng dẫn, ôn tập cách phán đoán và điều chỉnh màu tóc</br>• Phối màu bóng, sáng và cách mở nền chính xác cho mọi chất tóc.</br>• Kỹ thuật cắt trượt, thổi khô và hoàn thiện kiểu tóc đẹp nhất</br>• Chụp ảnh tác phẩm, tham gia chấm điểm, và nhận phần thưởng đặc biệt dành cho những nhà tạo mẫu xuất sắc nhất.</br></br><p>Mỹ Phẩm Bảo Hân sẽ có bộ phận chăm sóc gửi thông tin chi tiết đến khách hàng</p></br>⏰ Thời gian : 24,25,26 tháng 3</br>📍 Địa điểm : j03-01 khu đô thị An Phú shop villa, Dương Nội, Hà Đông.</br>📞 Hotline : 0968630592",
        image: "/images/news/2.jpg",
        date: new Date("2025-02-05")
      },
      {
        id: 1,
        title: "Khai Xuân",
        content: "Mỹ Phẩm Bảo Hân kính chúc quý khách hàng và đối tác một năm mới thật nhiều sức khỏe, vạn sự như ý.</br> Có những phần quà đặc biệt sẽ được tặng kèm cho những đơn hàng đầu tiên.",
        image: "/images/news/1.jpg",
        date: new Date("2025-02-03")
      },
    ];
    this.videos = [
      {
        id: 6,
        description: "Quay dựng Video chuyên nghiệp chỉ với 1 chiếc SmartPhone , đào tạo bởi chuyên gia Vũ Văn Lê sẽ diễn ra vào ngày 31 tháng 3 🔥</br>📍 Địa điểm: J03-01 khu đô thị An Phú shop villa, Dương Nội, Hà Đông.",
        url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F675127261521163%2F&show_text=false&width=267&t=0",
        featured: true
      },
      {
        id: 5,
        description: "Uốn nóng #Eco_br PH 8.0 dành cho tóc đã qua xử lý , cần tái uốn mà vẫn bảo vệ cấu trúc tóc 🔥",
        url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1310931286690812%2F&show_text=false&width=267&t=0",
        featured: true
      },
      {
        id: 4,
        description: "Uốn / Duỗi Eco_Br được chiết xuất từ các thành phần hoàn toàn từ tự nhiên:<br/>\"Lô Hội\" giúp cấp ẩm giữ tóc luôn mềm mại<br/>\"Tảo Xanh\" giúp bảo vệ tóc trước tác động nhiệt</br>\"Hà Thủ Ô\" giúp tóc chắc khỏe từ gốc</br>#Eco_br  cam kết đem lại những giá trị chuẩn Salon cao cấp 🇰🇷",
        url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F914997323897138%2F&show_text=false&width=267&t=0",
        featured: true
      },
      {
        id: 3,
        description: "Uốn PH 8.0 #Eco_br</br>Color 7.35 #Nouvelle",
        url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F676501948290433%2F&show_text=false&width=267&t=0",
        featured: true
      },
      {
        id: 2,
        description: "7.77 Gouallty 🔥",
        url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1959462827912413%2F&show_text=false&width=267&t=0",
        featured: true
      },
      {
        id: 1,
        description: "#Eco_br được thiết kế với 4 nồng độ PH chuyên biệt:</br>• PH 5.0 - tóc yếu<br/>• PH 7.0 - tóc trung bình</br>• PH 8.0 - tóc đã qua xử lý</br>• PH 9.5 - tóc khỏe",
        url: "https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1379402520070307%2F&show_text=false&width=267&t=0",
        featured: true
      },
    ];
  }

  async validateAdmin(username: string, password: string): Promise<Admin | null> {
    if (username === this.adminUser.username && password === this.adminUser.password) {
      return this.adminUser;
    }
    return null;
  }

  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return this.products.filter(p => p.featured);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.products.filter(p => p.category === category);
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const newProduct = {
      ...product,
      id: Math.max(0, ...this.products.map(p => p.id)) + 1,
      featured: product.featured ?? false
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Product not found");

    this.products[index] = { ...this.products[index], ...product };
    return this.products[index];
  }

  async deleteProduct(id: number): Promise<void> {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  async getAllNews(): Promise<News[]> {
    return this.news.sort((a, b) => b.id - a.id);;
  }

  async getNewsById(id: number): Promise<News | null> {
    return this.news.find(n => n.id === id) || null;
  }

  async createNews(news: InsertNews): Promise<News> {
    const newNews = {
      ...news,
      id: Math.max(0, ...this.news.map(n => n.id)) + 1,
      date: new Date()
    };
    this.news.push(newNews);
    return newNews;
  }

  async updateNews(id: number, news: Partial<InsertNews>): Promise<News> {
    const index = this.news.findIndex(n => n.id === id);
    if (index === -1) throw new Error("News not found");

    this.news[index] = { ...this.news[index], ...news };
    return this.news[index];
  }

  async deleteNews(id: number): Promise<void> {
    const index = this.news.findIndex(n => n.id === id);
    if (index !== -1) {
      this.news.splice(index, 1);
    }
  }

  async getAllVideos(): Promise<Video[]> {
    return this.videos;
  }

  async getFeaturedVideos(): Promise<Video[]> {
    return this.videos.filter(v => v.featured);
  }
}

export const storage = new MemStorage();
