import { Link } from "wouter";
import { 
  Shield, 
  ShieldCheck, 
  Lock, 
  BarChart3, 
  BookOpen, 
  Users, 
  GraduationCap, 
  Briefcase, 
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  { 
    value: "67%", 
    label: "Tấn công lừa đảo sử dụng AI", 
    icon: AlertTriangle,
    description: "Tăng 1,265% so với năm 2023"
  },
  { 
    value: "75%", 
    label: "Tấn công bắt đầu từ phishing", 
    icon: Shield,
    description: "Mối đe dọa hàng đầu tại Việt Nam"
  },
  { 
    value: "99.9%", 
    label: "Giảm tấn công với MFA", 
    icon: Lock,
    description: "Theo nghiên cứu của Google"
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: "AI Phát hiện Lừa đảo",
    description: "Kiểm tra email, link và tin nhắn nghi ngờ với công nghệ AI tiên tiến. Phát hiện phishing với độ chính xác lên đến 97.5%.",
    href: "/phishing-detector",
  },
  {
    icon: Lock,
    title: "Kiểm tra Mật khẩu",
    description: "Đánh giá độ mạnh mật khẩu và nhận gợi ý tạo mật khẩu an toàn. Bảo vệ tài khoản khỏi bị tấn công.",
    href: "/password-checker",
  },
  {
    icon: BarChart3,
    title: "Dashboard Thống kê",
    description: "Theo dõi xu hướng tội phạm mạng tại Việt Nam với biểu đồ trực quan. Cập nhật cảnh báo bảo mật mới nhất.",
    href: "/dashboard",
  },
  {
    icon: BookOpen,
    title: "Giáo dục An ninh mạng",
    description: "Các bài học tương tác về phishing, malware, bảo mật mật khẩu và an toàn mạng xã hội cho mọi đối tượng.",
    href: "/education",
  },
];

const beneficiaries = [
  {
    icon: Users,
    title: "Người cao tuổi",
    description: "Hướng dẫn đơn giản, dễ hiểu về cách nhận biết và tránh lừa đảo trực tuyến.",
    benefits: ["Nhận biết email lừa đảo", "Bảo vệ thông tin cá nhân", "An toàn khi mua sắm online"],
  },
  {
    icon: Briefcase,
    title: "Doanh nghiệp nhỏ",
    description: "Công cụ bảo mật doanh nghiệp và đào tạo nhân viên về an ninh mạng.",
    benefits: ["Bảo vệ dữ liệu khách hàng", "Đào tạo nhân viên", "Quy trình bảo mật"],
  },
  {
    icon: GraduationCap,
    title: "Học sinh/Sinh viên",
    description: "Kiến thức an ninh mạng cơ bản và nâng cao cho thế hệ trẻ.",
    benefits: ["An toàn mạng xã hội", "Bảo vệ tài khoản game", "Nhận biết tin giả"],
  },
];

const steps = [
  { number: "1", title: "Nhập dữ liệu", description: "Email, link hoặc tin nhắn cần kiểm tra" },
  { number: "2", title: "AI phân tích", description: "Công nghệ NLP phát hiện mẫu lừa đảo" },
  { number: "3", title: "Phát hiện mối đe dọa", description: "Đánh giá mức độ rủi ro chi tiết" },
  { number: "4", title: "Nhận cảnh báo", description: "Khuyến nghị hành động phù hợp" },
];

const technologies = [
  "React", "Node.js", "OpenAI GPT", "TypeScript", "TailwindCSS", "Express.js"
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge variant="secondary" className="gap-2" data-testid="badge-competition">
                <Shield className="h-3 w-3" />
                Dự án Cuộc thi An ninh Mạng 2025
              </Badge>
              
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight" data-testid="text-hero-title">
                Bảo vệ cộng đồng Việt Nam khỏi{" "}
                <span className="text-primary">tội phạm mạng</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl" data-testid="text-hero-description">
                Nền tảng giáo dục và phòng chống tội phạm mạng với AI phát hiện lừa đảo, 
                công cụ bảo mật và kiến thức an ninh mạng toàn diện cho mọi đối tượng.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/phishing-detector">
                  <Button size="lg" className="gap-2" data-testid="button-cta-primary">
                    Bắt đầu ngay
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/education">
                  <Button size="lg" variant="outline" data-testid="button-cta-secondary">
                    Tìm hiểu thêm
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-chart-5" />
                  <span>Miễn phí sử dụng</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-chart-4" />
                  <span>AI thông minh</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-chart-1" />
                  <span>97.5% độ chính xác</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block">
              <Card className="relative overflow-hidden" data-testid="card-dashboard-preview">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-semibold">Dashboard An ninh</span>
                    <Badge variant="outline">Live</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-md bg-background p-4 space-y-1">
                      <p className="text-2xl font-bold text-chart-5">0</p>
                      <p className="text-xs text-muted-foreground">Mối đe dọa phát hiện</p>
                    </div>
                    <div className="rounded-md bg-background p-4 space-y-1">
                      <p className="text-2xl font-bold text-chart-1">97.5%</p>
                      <p className="text-xs text-muted-foreground">Độ chính xác</p>
                    </div>
                  </div>
                  <div className="h-32 rounded-md bg-background flex items-center justify-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground/30" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4" data-testid="text-stats-title">
              Thực trạng An ninh Mạng tại Việt Nam
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tội phạm mạng ngày càng tinh vi với sự hỗ trợ của AI. Bảo vệ bản thân và cộng đồng là trách nhiệm của mỗi người.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center" data-testid={`card-stat-${index}`}>
                <CardContent className="pt-6 space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-4xl md:text-5xl font-bold font-heading text-primary">
                    {stat.value}
                  </div>
                  <div>
                    <p className="font-medium">{stat.label}</p>
                    <p className="text-sm text-muted-foreground">{stat.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4" data-testid="text-features-title">
              Tính năng chính
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bộ công cụ toàn diện giúp bạn bảo vệ bản thân và gia đình khỏi các mối đe dọa trực tuyến.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="h-full hover-elevate cursor-pointer transition-shadow" data-testid={`card-feature-${index}`}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="font-heading">{feature.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                    <div className="mt-4 flex items-center text-primary text-sm font-medium">
                      Tìm hiểu thêm
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficiaries Section */}
      <section className="py-16 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4" data-testid="text-beneficiaries-title">
              Đối tượng hưởng lợi
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              CyberGuard được thiết kế cho mọi đối tượng trong cộng đồng, từ người cao tuổi đến thế hệ trẻ.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {beneficiaries.map((item, index) => (
              <Card key={index} data-testid={`card-beneficiary-${index}`}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {item.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-chart-5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4" data-testid="text-howitworks-title">
              Cách hoạt động
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Quy trình đơn giản 4 bước để phát hiện và ngăn chặn lừa đảo trực tuyến.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center" data-testid={`step-${index}`}>
                <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-heading font-bold text-lg">
                  {step.number}
                </div>
                <h3 className="font-heading font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[60%] w-[80%] h-px bg-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-card border-y">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4" data-testid="text-tech-title">
                Công nghệ sử dụng
              </h2>
              <p className="text-muted-foreground mb-6">
                Được xây dựng với các công nghệ hiện đại và đáng tin cậy nhất trong ngành.
              </p>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading font-semibold mb-4">Tính khả thi kỹ thuật</h3>
              <ul className="space-y-3">
                {[
                  "Sử dụng stack phổ biến (React + Node.js)",
                  "Tích hợp AI đơn giản qua OpenAI API",
                  "Không yêu cầu kiến thức bảo mật chuyên sâu",
                  "Dễ dàng triển khai và mở rộng",
                  "Có thể export và push lên GitHub",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-chart-5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-heading text-2xl md:text-3xl font-bold" data-testid="text-cta-title">
              Tham gia bảo vệ cộng đồng ngay hôm nay
            </h2>
            <p className="text-muted-foreground text-lg">
              Bắt đầu sử dụng công cụ phát hiện lừa đảo và nâng cao kiến thức an ninh mạng của bạn. 
              Hoàn toàn miễn phí và dễ sử dụng.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/phishing-detector">
                <Button size="lg" className="gap-2" data-testid="button-cta-final">
                  <ShieldCheck className="h-5 w-5" />
                  Kiểm tra ngay
                </Button>
              </Link>
              <Link href="/quiz">
                <Button size="lg" variant="outline" data-testid="button-quiz-final">
                  Làm bài kiểm tra
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
