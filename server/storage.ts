import { type Product, type InsertProduct, type News, type InsertNews } from "@shared/schema";

export interface IStorage {
  getAllProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getAllNews(): Promise<News[]>;
  getNewsById(id: number): Promise<News | null>;
}

export class MemStorage implements IStorage {
  private products: Product[];
  private news: News[];

  constructor() {
    this.products = [
      {
        id: 1,
        name: "Màu Nhuộm Thuần Chay Lively",
        description: "100% thành phần từ tự nhiên. Không amoniac, không parapen. Cruelty-Free. An toàn, dịu nhẹ, không gây kích ứng da đầu. Tóc mềm bóng, màu sâu, lâu trôi.",
        price: "",
        image: "/images/products/1.jpg",
        category: ""
      },
      {
        id: 2,
        name: "Sani Habit",
        description: "Được bào chế với thành phần 100% tự nhiên với chất \"chống trùng\" như mật ong, than, quế, bạch đàn, tinh dầu tràm và prebiotics. Sani Habit làm sạch, cấp nước và sát trùng cho tóc và da đầu của bạn",
        price: "520k / 1 cặp 250ml",
        image: "/images/products/2.jpg",
        category: ""
      },
      {
        id: 3,
        name: "Uốn Lạnh Nouvelle",
        description: "Loại uốn lạnh có tính kiềm mềm giúp tóc có những lọn xoăn tự nhiên, mềm mại mà không tổn hại đến cấu trúc tóc. Có 3 loại dành cho tóc khỏe, thường và yếu",
        price: "",
        image: "/images/products/3.jpg",
        category: "skincare"
      },
      {
        id: 4,
        name: "OHKASAKURA ND600 - ND630W",
        description: "Cặp kéo Elite 1🌟. <br/>Sản phẩm chính hãng, bảo hành chế độ công ty, 1 đổi 1 nếu do lỗi của nhà sản xuất",
        price: "",
        image: "/images/products/4.jpg",
        category: "skincare"
      },
      {
        id: 5,
        name: "Nouvelle Argan",
        description: "Tinh dầu Argan nguyên chất dung tích 100ml",
        price: "",
        image: "/images/products/5.jpg",
        category: "masks"
      },
      {
        id: 6,
        name: "Dưỡng ẩm Moroccanoil",
        description: "Cặp 500ml dưỡng ẩm Moroccanoil tặng kèm 1 lược chải chính hãng",
        price: "",
        image: "/images/products/6.jpg",
        category: "skincare"
      },
      {
        id: 7,
        name: "Oxy thơm trợ nhuộm",
        description: "Oxy thơm trợ nhuộm, giảm thiểu tối đa cắn, xót, rát da đầu ... ",
        price: "",
        image: "/images/products/7.jpg",
        category: "skincare"
      },
      {
        id: 8,
        name: "OHKASAKURA ND600C - ND600",
        description: "Sản phẩm chính hãng, bảo hành chế độ công ty, 1 đổi 1 nếu do lỗi của nhà sản xuất",
        price: "",
        image: "/images/products/8.jpg",
        category: "suncare"
      },
    ];

    this.news = [
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
  }

  async getAllProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return this.products.filter(p => p.category === category);
  }

  async getAllNews(): Promise<News[]> {
    return this.news;
  }

  async getNewsById(id: number): Promise<News | null> {
    return this.news.find(n => n.id === id) || null;
  }
}

export const storage = new MemStorage();
