import { useState } from "react";
import { 
  BookOpen, 
  Shield, 
  Bug, 
  Lock, 
  Users,
  Clock,
  ChevronRight,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Lesson } from "@shared/schema";

const lessons: Lesson[] = [
  {
    id: "phishing-1",
    title: "Nhận biết Email Lừa đảo (Phishing)",
    description: "Học cách phát hiện email giả mạo từ ngân hàng, công ty và tổ chức",
    category: "phishing",
    duration: "15 phút",
    level: "beginner",
    content: `
## Email Lừa đảo là gì?

Email lừa đảo (Phishing) là hình thức tấn công mạng phổ biến nhất, chiếm 75% các vụ tấn công an ninh mạng. Kẻ tấn công gửi email giả mạo các tổ chức uy tín như ngân hàng, công ty công nghệ để đánh cắp thông tin cá nhân.

## Các dấu hiệu nhận biết

### 1. Địa chỉ gửi đáng ngờ
- Email thật từ ngân hàng: support@vietcombank.com.vn
- Email giả: support@vietcombank-security.com

### 2. Nội dung tạo cảm giác khẩn cấp
- "Tài khoản sẽ bị khóa trong 24 giờ"
- "Hành động ngay để nhận thưởng"
- "Xác minh thông tin ngay lập tức"

### 3. Lỗi chính tả và ngữ pháp
Email từ tổ chức chính thức luôn được kiểm tra kỹ lưỡng. Nếu thấy lỗi, đó là dấu hiệu đáng ngờ.

### 4. Yêu cầu thông tin nhạy cảm
Không có ngân hàng hay tổ chức nào yêu cầu mật khẩu, OTP qua email.

## Cách xử lý khi nhận email đáng ngờ

1. **Không nhấp vào link** trong email
2. **Kiểm tra địa chỉ gửi** thật kỹ
3. **Liên hệ trực tiếp** với tổ chức qua kênh chính thức
4. **Báo cáo email** lừa đảo
5. **Xóa email** sau khi báo cáo
    `,
    keyPoints: [
      "75% tấn công mạng bắt đầu từ email lừa đảo",
      "Luôn kiểm tra địa chỉ email gửi đến",
      "Không bao giờ cung cấp mật khẩu qua email",
      "Khi nghi ngờ, liên hệ trực tiếp với tổ chức"
    ]
  },
  {
    id: "phishing-2",
    title: "Phishing qua Tin nhắn và Mạng xã hội",
    description: "Cách nhận biết tin nhắn lừa đảo qua SMS, Zalo, Facebook Messenger",
    category: "phishing",
    duration: "12 phút",
    level: "beginner",
    content: `
## Lừa đảo qua Tin nhắn (Smishing)

Smishing là hình thức phishing qua SMS. Các tin nhắn giả mạo ngân hàng, nhà mạng, hoặc thông báo trúng thưởng rất phổ biến.

## Các dạng tin nhắn lừa đảo phổ biến

### 1. Thông báo trúng thưởng
"Chúc mừng bạn đã trúng 500 triệu từ Viettel. Nhấp link để nhận thưởng"

### 2. Giả mạo ngân hàng
"[VCB] Phát hiện giao dịch bất thường. Xác minh tại: vcb-security.xyz"

### 3. Gói cước khuyến mãi
"Nhà mạng tặng 50GB miễn phí. Đăng ký ngay: link.xyz"

## Lừa đảo trên Mạng xã hội

### Facebook/Zalo
- Tin nhắn từ "bạn bè" xin tiền khẩn cấp
- Link video "Có phải bạn trong video này?"
- Thông báo tài khoản sẽ bị xóa

### Cách nhận biết tài khoản giả mạo
- Tài khoản mới tạo, ít bạn bè
- Không có ảnh cá nhân thật
- Yêu cầu chuyển tiền hoặc thông tin cá nhân

## Nguyên tắc bảo vệ

1. Không nhấp link từ tin nhắn lạ
2. Xác minh với người gửi qua cuộc gọi trực tiếp
3. Không chuyển tiền cho người quen online mà chưa xác minh
4. Bật xác thực 2 lớp cho tài khoản mạng xã hội
    `,
    keyPoints: [
      "SMS lừa đảo (Smishing) ngày càng tinh vi",
      "Tin nhắn trúng thưởng gần như luôn là lừa đảo",
      "Xác minh danh tính người gửi qua kênh khác",
      "Bật xác thực 2 lớp cho mọi tài khoản"
    ]
  },
  {
    id: "malware-1",
    title: "Giới thiệu về Malware và Virus",
    description: "Hiểu về các loại mã độc phổ biến và cách chúng lây lan",
    category: "malware",
    duration: "18 phút",
    level: "beginner",
    content: `
## Malware là gì?

Malware (Malicious Software) là phần mềm độc hại được thiết kế để xâm nhập, gây hại hoặc đánh cắp thông tin từ thiết bị của bạn.

## Các loại Malware phổ biến

### 1. Virus
- Tự nhân bản và lây lan
- Thường đính kèm trong file hoặc phần mềm
- Gây hại khi người dùng mở file nhiễm

### 2. Ransomware
- Mã hóa dữ liệu và đòi tiền chuộc
- Thiệt hại trung bình: 4.24 triệu USD/vụ
- Lan nhanh trong mạng nội bộ

### 3. Trojan
- Giả dạng phần mềm hợp pháp
- Mở "cửa hậu" cho hacker
- Thường ẩn trong phần mềm crack

### 4. Spyware
- Theo dõi hoạt động người dùng
- Thu thập thông tin cá nhân
- Ghi lại mọi phím bấm (keylogger)

## Cách Malware lây lan

1. **Email đính kèm file** - Word, Excel, PDF độc hại
2. **Phần mềm crack/lậu** - Chứa mã độc ẩn
3. **Website giả mạo** - Tự động tải malware
4. **USB nhiễm virus** - Lây lan qua thiết bị di động

## Cách phòng chống

- Cài phần mềm diệt virus uy tín
- Không mở file từ nguồn không rõ
- Cập nhật hệ điều hành thường xuyên
- Sao lưu dữ liệu định kỳ
    `,
    keyPoints: [
      "Ransomware có thể gây thiệt hại hàng triệu USD",
      "Phần mềm crack thường chứa mã độc",
      "Luôn cập nhật hệ điều hành và phần mềm",
      "Sao lưu dữ liệu quan trọng định kỳ"
    ]
  },
  {
    id: "password-1",
    title: "Tạo và Quản lý Mật khẩu An toàn",
    description: "Hướng dẫn chi tiết về cách tạo mật khẩu mạnh và quản lý hiệu quả",
    category: "password",
    duration: "15 phút",
    level: "beginner",
    content: `
## Tại sao Mật khẩu Quan trọng?

Mật khẩu là lớp bảo vệ đầu tiên cho tài khoản của bạn. Một mật khẩu yếu có thể bị bẻ khóa trong vài giây.

## Mật khẩu Mạnh có đặc điểm gì?

### Độ dài
- Tối thiểu 12 ký tự
- Lý tưởng: 16+ ký tự

### Độ phức tạp
- Chữ hoa (A-Z)
- Chữ thường (a-z)
- Chữ số (0-9)
- Ký tự đặc biệt (!@#$%^&*)

### Không chứa thông tin cá nhân
- Không dùng tên, ngày sinh
- Không dùng từ có trong từ điển
- Không dùng mẫu phổ biến (123456, qwerty)

## Phương pháp Passphrase

Thay vì mật khẩu ngắn khó nhớ, hãy dùng cụm từ dài:

"TôiYêuCàPhêBuổiSáng@2024!"

Dễ nhớ nhưng cực kỳ khó bẻ khóa!

## Trình Quản lý Mật khẩu

### Tại sao nên dùng?
- Lưu trữ mật khẩu an toàn
- Tự động tạo mật khẩu mạnh
- Đồng bộ giữa các thiết bị

### Lựa chọn phổ biến
- Bitwarden (miễn phí, mã nguồn mở)
- 1Password
- LastPass

## Xác thực 2 lớp (2FA)

Bật 2FA cho tất cả tài khoản quan trọng:
- Email
- Ngân hàng
- Mạng xã hội
    `,
    keyPoints: [
      "Mật khẩu mạnh cần ít nhất 12 ký tự",
      "Dùng Passphrase thay vì password ngắn",
      "Sử dụng trình quản lý mật khẩu",
      "Bật xác thực 2 lớp cho mọi tài khoản"
    ]
  },
  {
    id: "social-1",
    title: "An toàn trên Mạng Xã hội",
    description: "Bảo vệ thông tin cá nhân và quyền riêng tư trên Facebook, Instagram, TikTok",
    category: "social",
    duration: "14 phút",
    level: "beginner",
    content: `
## Rủi ro trên Mạng Xã hội

Mạng xã hội là nguồn thông tin vàng cho kẻ tấn công. Thông tin bạn chia sẻ có thể bị lợi dụng để:
- Giả mạo danh tính
- Tấn công kỹ thuật xã hội
- Theo dõi vị trí và thói quen

## Thông tin Không nên Chia sẻ

### 1. Thông tin Cá nhân
- Số CCCD/CMND
- Số điện thoại
- Địa chỉ nhà

### 2. Thông tin Tài chính
- Số thẻ ngân hàng
- Ảnh hóa đơn, vé
- Thu nhập

### 3. Thông tin Vị trí
- Check-in khi đang đi du lịch
- Ảnh trước cửa nhà
- Lịch trình công việc

## Cài đặt Quyền riêng tư

### Facebook
- Đặt profile ở chế độ "Bạn bè"
- Tắt nhận diện khuôn mặt
- Hạn chế ai có thể tìm kiếm bạn

### Instagram
- Chuyển sang tài khoản riêng tư
- Tắt trạng thái hoạt động
- Kiểm tra ai theo dõi bạn

### TikTok
- Cài đặt tài khoản riêng tư
- Tắt lưu video của người khác
- Hạn chế tin nhắn từ người lạ

## Nhận biết Tài khoản Giả mạo

- Ít bạn bè/follower
- Không có ảnh thật
- Nội dung sao chép
- Gửi tin nhắn xin tiền
    `,
    keyPoints: [
      "Không chia sẻ thông tin cá nhân nhạy cảm",
      "Cài đặt quyền riêng tư cho tất cả tài khoản",
      "Cẩn thận với yêu cầu kết bạn từ người lạ",
      "Xác minh danh tính trước khi tin tưởng"
    ]
  },
  {
    id: "malware-2",
    title: "Bảo vệ Thiết bị khỏi Malware",
    description: "Các biện pháp phòng chống mã độc cho máy tính và điện thoại",
    category: "malware",
    duration: "16 phút",
    level: "intermediate",
    content: `
## Bảo vệ Máy tính

### 1. Phần mềm Diệt virus
Lựa chọn phần mềm uy tín:
- Windows Defender (miễn phí, tích hợp sẵn)
- Kaspersky
- BKAV (Việt Nam)

### 2. Cập nhật Hệ điều hành
- Bật cập nhật tự động
- Không bỏ qua các bản vá bảo mật
- Cập nhật ngay khi có thông báo

### 3. Tường lửa (Firewall)
- Bật tường lửa Windows
- Kiểm soát kết nối ra ngoài
- Chặn ứng dụng không rõ nguồn gốc

## Bảo vệ Điện thoại

### Android
- Chỉ cài app từ Google Play
- Tắt "Cài đặt từ nguồn không xác định"
- Cập nhật bản vá bảo mật hàng tháng

### iPhone
- Không jailbreak
- Cập nhật iOS thường xuyên
- Cẩn thận với profile cấu hình

## Sao lưu Dữ liệu

### Nguyên tắc 3-2-1
- 3 bản sao dữ liệu
- 2 loại phương tiện lưu trữ khác nhau
- 1 bản sao ở nơi khác (cloud)

### Tần suất sao lưu
- Dữ liệu quan trọng: hàng ngày
- Dữ liệu thường: hàng tuần
- Kiểm tra khôi phục: hàng tháng
    `,
    keyPoints: [
      "Luôn cập nhật hệ điều hành và phần mềm",
      "Chỉ cài ứng dụng từ nguồn chính thức",
      "Sao lưu dữ liệu theo nguyên tắc 3-2-1",
      "Bật tường lửa và phần mềm diệt virus"
    ]
  }
];

const categories = [
  { id: "all", label: "Tất cả", icon: BookOpen },
  { id: "phishing", label: "Lừa đảo", icon: Shield },
  { id: "malware", label: "Mã độc", icon: Bug },
  { id: "password", label: "Mật khẩu", icon: Lock },
  { id: "social", label: "Mạng xã hội", icon: Users },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "beginner": return "bg-chart-5/10 text-chart-5";
    case "intermediate": return "bg-chart-4/10 text-chart-4";
    case "advanced": return "bg-chart-3/10 text-chart-3";
    default: return "bg-muted text-muted-foreground";
  }
};

const getLevelLabel = (level: string) => {
  switch (level) {
    case "beginner": return "Cơ bản";
    case "intermediate": return "Trung cấp";
    case "advanced": return "Nâng cao";
    default: return level;
  }
};

export default function Education() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const filteredLessons = selectedCategory === "all" 
    ? lessons 
    : lessons.filter(l => l.category === selectedCategory);

  if (selectedLesson) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedLesson(null)}
          className="gap-2"
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại danh sách
        </Button>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className={getLevelColor(selectedLesson.level)}>
                {getLevelLabel(selectedLesson.level)}
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />
                {selectedLesson.duration}
              </Badge>
            </div>
            <h1 className="font-heading text-3xl font-bold" data-testid="text-lesson-title">
              {selectedLesson.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {selectedLesson.description}
            </p>
          </div>

          <Card>
            <CardContent className="prose prose-slate dark:prose-invert max-w-none pt-6">
              <div 
                className="whitespace-pre-wrap leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: selectedLesson.content
                    .replace(/^## (.+)$/gm, '<h2 class="font-heading text-xl font-bold mt-8 mb-4">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 class="font-heading text-lg font-semibold mt-6 mb-3">$1</h3>')
                    .replace(/^\- (.+)$/gm, '<li class="ml-4">$1</li>')
                    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-heading flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-chart-5" />
                Điểm chính cần nhớ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {selectedLesson.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-chart-5 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold" data-testid="text-education-title">
          Giáo dục An ninh Mạng
        </h1>
        <p className="text-muted-foreground">
          Các bài học tương tác giúp bạn hiểu và phòng tránh các mối đe dọa trực tuyến.
        </p>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="flex-wrap h-auto gap-2 bg-transparent p-0">
          {categories.map((cat) => (
            <TabsTrigger 
              key={cat.id} 
              value={cat.id}
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              data-testid={`tab-category-${cat.id}`}
            >
              <cat.icon className="h-4 w-4" />
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLessons.map((lesson) => (
          <Card 
            key={lesson.id} 
            className="cursor-pointer hover-elevate transition-shadow"
            onClick={() => setSelectedLesson(lesson)}
            data-testid={`card-lesson-${lesson.id}`}
          >
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getLevelColor(lesson.level)}>
                  {getLevelLabel(lesson.level)}
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  {lesson.duration}
                </Badge>
              </div>
              <CardTitle className="font-heading text-lg">{lesson.title}</CardTitle>
              <CardDescription>{lesson.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-primary text-sm font-medium">
                Bắt đầu học
                <ChevronRight className="ml-1 h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredLessons.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Không có bài học nào trong danh mục này</p>
        </div>
      )}
    </div>
  );
}
