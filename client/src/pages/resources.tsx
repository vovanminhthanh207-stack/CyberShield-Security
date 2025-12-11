import { useState } from "react";
import { 
  BookOpen, 
  Video, 
  FileText, 
  CheckSquare,
  Users,
  Briefcase,
  GraduationCap,
  Filter,
  ExternalLink,
  Download
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Resource } from "@shared/schema";

const resources: Resource[] = [
  {
    id: "r1",
    title: "Hướng dẫn Bảo mật cho Người cao tuổi",
    description: "Tài liệu dễ hiểu giúp người cao tuổi nhận biết và tránh các hình thức lừa đảo trực tuyến phổ biến.",
    type: "guide",
    targetAudience: "elderly",
    content: `
## Những điều cần nhớ

### 1. Không tin vào tin nhắn trúng thưởng
- Nếu bạn không tham gia chương trình nào thì không thể trúng thưởng
- Không nhấp vào link trong tin nhắn

### 2. Không chia sẻ mật khẩu
- Không ai có quyền hỏi mật khẩu của bạn
- Ngân hàng không bao giờ hỏi mật khẩu qua điện thoại

### 3. Kiểm tra với con cháu
- Khi nhận yêu cầu lạ, hãy gọi điện cho con cháu
- Không chuyển tiền cho người lạ
    `
  },
  {
    id: "r2",
    title: "Video: Cách Nhận biết Email Lừa đảo",
    description: "Video hướng dẫn chi tiết cách phát hiện email phishing với các ví dụ thực tế.",
    type: "video",
    targetAudience: "all",
    url: "https://youtube.com"
  },
  {
    id: "r3",
    title: "Checklist Bảo mật cho Doanh nghiệp Nhỏ",
    description: "Danh sách 20 bước bảo mật thiết yếu mà mọi doanh nghiệp nhỏ cần thực hiện.",
    type: "checklist",
    targetAudience: "business",
    content: `
## Checklist Bảo mật Doanh nghiệp

### Bảo mật Tài khoản
- [ ] Sử dụng mật khẩu mạnh cho tất cả tài khoản
- [ ] Bật xác thực 2 lớp cho email công ty
- [ ] Thay đổi mật khẩu mặc định của thiết bị

### Bảo mật Mạng
- [ ] Đặt mật khẩu WiFi mạnh
- [ ] Phân chia mạng khách và mạng công ty
- [ ] Cài đặt tường lửa

### Đào tạo Nhân viên
- [ ] Tổ chức đào tạo an ninh mạng hàng quý
- [ ] Mô phỏng tấn công phishing
- [ ] Có quy trình báo cáo sự cố

### Sao lưu Dữ liệu
- [ ] Sao lưu dữ liệu hàng ngày
- [ ] Lưu trữ bản sao ở nơi khác
- [ ] Kiểm tra khôi phục dữ liệu định kỳ
    `
  },
  {
    id: "r4",
    title: "Infographic: 10 Dấu hiệu Email Lừa đảo",
    description: "Hình ảnh minh họa trực quan về các dấu hiệu nhận biết email phishing.",
    type: "infographic",
    targetAudience: "all"
  },
  {
    id: "r5",
    title: "An toàn Mạng xã hội cho Học sinh",
    description: "Hướng dẫn sử dụng mạng xã hội an toàn, tránh bắt nạt trực tuyến và bảo vệ thông tin cá nhân.",
    type: "guide",
    targetAudience: "student",
    content: `
## An toàn trên Mạng xã hội

### Bảo vệ Thông tin Cá nhân
- Không chia sẻ số điện thoại, địa chỉ nhà
- Đặt tài khoản ở chế độ riêng tư
- Không chấp nhận kết bạn từ người lạ

### Tránh Bắt nạt Trực tuyến
- Không trả lời tin nhắn xúc phạm
- Chụp màn hình làm bằng chứng
- Báo cáo với người lớn và nền tảng

### Bảo vệ Tài khoản Game
- Dùng mật khẩu khác cho mỗi game
- Bật xác thực 2 lớp
- Không chia sẻ tài khoản với người khác
    `
  },
  {
    id: "r6",
    title: "Video: Ransomware và Cách Phòng chống",
    description: "Hiểu về ransomware, cách nó lây lan và biện pháp phòng chống hiệu quả.",
    type: "video",
    targetAudience: "business",
    url: "https://youtube.com"
  },
  {
    id: "r7",
    title: "Checklist Bảo mật Điện thoại",
    description: "Các bước đơn giản để bảo vệ điện thoại của bạn khỏi mã độc và trộm cắp thông tin.",
    type: "checklist",
    targetAudience: "all",
    content: `
## Bảo mật Điện thoại

### Cài đặt Cơ bản
- [ ] Đặt mã PIN hoặc vân tay khóa màn hình
- [ ] Bật tính năng tìm điện thoại khi mất
- [ ] Cập nhật hệ điều hành thường xuyên

### Ứng dụng
- [ ] Chỉ cài app từ cửa hàng chính thức
- [ ] Kiểm tra quyền truy cập của app
- [ ] Xóa app không dùng đến

### Kết nối
- [ ] Tắt Bluetooth khi không dùng
- [ ] Không kết nối WiFi công cộng cho giao dịch nhạy cảm
- [ ] Dùng VPN khi cần bảo mật cao
    `
  },
  {
    id: "r8",
    title: "Hướng dẫn Mua sắm Online An toàn",
    description: "Cách nhận biết website uy tín và thanh toán an toàn khi mua hàng trực tuyến.",
    type: "guide",
    targetAudience: "elderly",
    content: `
## Mua sắm Online An toàn

### Chọn Website Uy tín
- Mua hàng từ website có tiếng (Shopee, Lazada, Tiki)
- Kiểm tra https:// và biểu tượng ổ khóa
- Đọc đánh giá từ người mua khác

### Thanh toán An toàn
- Ưu tiên thanh toán khi nhận hàng (COD)
- Không lưu thông tin thẻ trên website
- Kiểm tra lịch sử giao dịch thường xuyên

### Nhận biết Lừa đảo
- Giá quá rẻ so với thị trường
- Website mới, không có thông tin liên hệ
- Yêu cầu chuyển khoản trực tiếp
    `
  },
  {
    id: "r9",
    title: "Infographic: Mật khẩu Mạnh vs Yếu",
    description: "So sánh trực quan giữa mật khẩu an toàn và không an toàn với ví dụ cụ thể.",
    type: "infographic",
    targetAudience: "all"
  },
  {
    id: "r10",
    title: "Bảo mật Tài khoản Game cho Học sinh",
    description: "Hướng dẫn bảo vệ tài khoản game khỏi bị hack và lừa đảo vật phẩm.",
    type: "guide",
    targetAudience: "student",
    content: `
## Bảo vệ Tài khoản Game

### Tạo Mật khẩu Mạnh
- Ít nhất 12 ký tự
- Kết hợp chữ, số, ký tự đặc biệt
- Khác với mật khẩu các tài khoản khác

### Bật Bảo mật 2 lớp
- Liên kết số điện thoại
- Sử dụng app xác thực
- Lưu mã khôi phục an toàn

### Tránh Bị Lừa đảo
- Không tin vào "hack kim cương miễn phí"
- Không chia sẻ tài khoản để "nhận quà"
- Chỉ giao dịch qua kênh chính thức của game
    `
  }
];

const typeIcons: Record<string, typeof Video> = {
  video: Video,
  guide: BookOpen,
  checklist: CheckSquare,
  infographic: FileText
};

const typeLabels: Record<string, string> = {
  video: "Video",
  guide: "Hướng dẫn",
  checklist: "Checklist",
  infographic: "Infographic"
};

const audienceIcons: Record<string, typeof Users> = {
  elderly: Users,
  business: Briefcase,
  student: GraduationCap,
  all: Filter
};

const audienceLabels: Record<string, string> = {
  elderly: "Người cao tuổi",
  business: "Doanh nghiệp",
  student: "Học sinh",
  all: "Tất cả"
};

export default function Resources() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedAudience, setSelectedAudience] = useState<string>("all");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const filteredResources = resources.filter(r => {
    const typeMatch = selectedType === "all" || r.type === selectedType;
    const audienceMatch = selectedAudience === "all" || r.targetAudience === selectedAudience || r.targetAudience === "all";
    return typeMatch && audienceMatch;
  });

  if (selectedResource) {
    const TypeIcon = typeIcons[selectedResource.type];
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedResource(null)}
          className="gap-2"
          data-testid="button-back"
        >
          Quay lại thư viện
        </Button>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <TypeIcon className="h-3 w-3" />
                {typeLabels[selectedResource.type]}
              </Badge>
              <Badge variant="outline">
                {audienceLabels[selectedResource.targetAudience]}
              </Badge>
            </div>
            <h1 className="font-heading text-3xl font-bold" data-testid="text-resource-title">
              {selectedResource.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              {selectedResource.description}
            </p>
          </div>

          {selectedResource.type === "video" && selectedResource.url && (
            <Card>
              <CardContent className="pt-6">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Video className="h-16 w-16 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Video sẽ được phát ở đây</p>
                    <Button variant="outline" className="gap-2" asChild>
                      <a href={selectedResource.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                        Xem trên YouTube
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedResource.type === "infographic" && (
            <Card>
              <CardContent className="pt-6">
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <FileText className="h-16 w-16 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Infographic sẽ hiển thị ở đây</p>
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Tải xuống PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {selectedResource.content && (
            <Card>
              <CardContent className="pt-6">
                <div 
                  className="prose prose-slate dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed"
                  dangerouslySetInnerHTML={{ 
                    __html: selectedResource.content
                      .replace(/^## (.+)$/gm, '<h2 class="font-heading text-xl font-bold mt-8 mb-4 first:mt-0">$1</h2>')
                      .replace(/^### (.+)$/gm, '<h3 class="font-heading text-lg font-semibold mt-6 mb-3">$1</h3>')
                      .replace(/^\- \[ \] (.+)$/gm, '<div class="flex items-center gap-2 my-2"><input type="checkbox" class="rounded" /><span>$1</span></div>')
                      .replace(/^\- (.+)$/gm, '<li class="ml-4">$1</li>')
                  }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold" data-testid="text-resources-title">
          Thư viện Tài nguyên
        </h1>
        <p className="text-muted-foreground">
          Video hướng dẫn, infographic và checklist bảo mật cho mọi đối tượng.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Loại tài nguyên:</p>
            <Tabs value={selectedType} onValueChange={setSelectedType}>
              <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid="filter-type-all"
                >
                  Tất cả
                </TabsTrigger>
                {Object.entries(typeLabels).map(([key, label]) => {
                  const Icon = typeIcons[key];
                  return (
                    <TabsTrigger 
                      key={key} 
                      value={key}
                      className="gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      data-testid={`filter-type-${key}`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Đối tượng:</p>
            <Tabs value={selectedAudience} onValueChange={setSelectedAudience}>
              <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0">
                <TabsTrigger 
                  value="all"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  data-testid="filter-audience-all"
                >
                  Tất cả
                </TabsTrigger>
                {Object.entries(audienceLabels).filter(([k]) => k !== "all").map(([key, label]) => {
                  const Icon = audienceIcons[key];
                  return (
                    <TabsTrigger 
                      key={key} 
                      value={key}
                      className="gap-1 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                      data-testid={`filter-audience-${key}`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const TypeIcon = typeIcons[resource.type];
          const AudienceIcon = audienceIcons[resource.targetAudience];
          return (
            <Card 
              key={resource.id}
              className="cursor-pointer hover-elevate transition-shadow"
              onClick={() => setSelectedResource(resource)}
              data-testid={`card-resource-${resource.id}`}
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="gap-1">
                    <TypeIcon className="h-3 w-3" />
                    {typeLabels[resource.type]}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <AudienceIcon className="h-3 w-3" />
                    {audienceLabels[resource.targetAudience]}
                  </Badge>
                </div>
                <CardTitle className="font-heading text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-primary text-sm font-medium">
                  Xem chi tiết
                  <ExternalLink className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Không tìm thấy tài nguyên phù hợp</p>
        </div>
      )}
    </div>
  );
}
