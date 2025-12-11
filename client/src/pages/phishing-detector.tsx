import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  ShieldX,
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  Mail,
  Link as LinkIcon,
  MessageSquare,
  Copy,
  RotateCcw
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { phishingAnalysisSchema, type PhishingAnalysis, type PhishingResult } from "@shared/schema";

const exampleContent = {
  email: `Kính gửi Quý khách hàng,

Chúng tôi phát hiện hoạt động bất thường trên tài khoản ngân hàng của bạn. 
Vui lòng xác minh thông tin ngay bằng cách nhấp vào liên kết dưới đây:

https://nganhang-xacminh.com/verify?id=12345

Nếu không xác minh trong 24 giờ, tài khoản của bạn sẽ bị khóa vĩnh viễn.

Trân trọng,
Ngân hàng ABC`,
  link: "https://facebook-login.suspicious-site.com/verify?token=abc123",
  message: `[SMS] Bạn đã trúng thưởng 500 triệu đồng từ Viettel. Nhấp link để nhận thưởng: http://bit.ly/nhan-thuong-vt`,
};

export default function PhishingDetector() {
  const [result, setResult] = useState<PhishingResult | null>(null);
  const [contentType, setContentType] = useState<"email" | "link" | "message">("email");
  const { toast } = useToast();

  const form = useForm<PhishingAnalysis>({
    resolver: zodResolver(phishingAnalysisSchema),
    defaultValues: {
      content: "",
      contentType: "email",
    },
  });

  const analysisMutation = useMutation({
    mutationFn: async (data: PhishingAnalysis) => {
      const response = await apiRequest("POST", "/api/analyze-phishing", data);
      return response as PhishingResult;
    },
    onSuccess: (data) => {
      setResult(data);
    },
    onError: (error: Error) => {
      toast({
        title: "Lỗi phân tích",
        description: error.message || "Không thể phân tích nội dung. Vui lòng thử lại.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PhishingAnalysis) => {
    data.contentType = contentType;
    analysisMutation.mutate(data);
  };

  const handleLoadExample = () => {
    form.setValue("content", exampleContent[contentType]);
  };

  const handleReset = () => {
    form.reset();
    setResult(null);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical": return "text-destructive bg-destructive/10";
      case "high": return "text-destructive bg-destructive/10";
      case "medium": return "text-chart-4 bg-chart-4/10";
      case "low": return "text-chart-5 bg-chart-5/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case "critical": return <ShieldX className="h-6 w-6" />;
      case "high": return <ShieldAlert className="h-6 w-6" />;
      case "medium": return <Shield className="h-6 w-6" />;
      case "low": return <ShieldCheck className="h-6 w-6" />;
      default: return <Shield className="h-6 w-6" />;
    }
  };

  const getRiskLabel = (level: string) => {
    switch (level) {
      case "critical": return "Cực kỳ nguy hiểm";
      case "high": return "Nguy hiểm cao";
      case "medium": return "Rủi ro trung bình";
      case "low": return "An toàn";
      default: return "Không xác định";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold" data-testid="text-phishing-title">
          Phát hiện Lừa đảo với AI
        </h1>
        <p className="text-muted-foreground">
          Kiểm tra email, link hoặc tin nhắn nghi ngờ với công nghệ AI tiên tiến. 
          Phát hiện phishing với độ chính xác lên đến 97.5%.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card data-testid="card-input">
          <CardHeader>
            <CardTitle className="font-heading">Nội dung cần kiểm tra</CardTitle>
            <CardDescription>
              Dán nội dung email, link hoặc tin nhắn bạn muốn kiểm tra
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <Tabs value={contentType} onValueChange={(v) => setContentType(v as typeof contentType)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="email" className="gap-2" data-testid="tab-email">
                      <Mail className="h-4 w-4" />
                      Email
                    </TabsTrigger>
                    <TabsTrigger value="link" className="gap-2" data-testid="tab-link">
                      <LinkIcon className="h-4 w-4" />
                      Link
                    </TabsTrigger>
                    <TabsTrigger value="message" className="gap-2" data-testid="tab-message">
                      <MessageSquare className="h-4 w-4" />
                      Tin nhắn
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {contentType === "email" && "Nội dung email"}
                        {contentType === "link" && "Đường dẫn URL"}
                        {contentType === "message" && "Nội dung tin nhắn"}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder={
                            contentType === "email" 
                              ? "Dán nội dung email cần kiểm tra vào đây..." 
                              : contentType === "link"
                              ? "Nhập đường dẫn URL cần kiểm tra..."
                              : "Dán nội dung tin nhắn SMS/Zalo/Messenger..."
                          }
                          className="min-h-[200px] resize-none"
                          data-testid="textarea-content"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-wrap gap-3">
                  <Button 
                    type="submit" 
                    disabled={analysisMutation.isPending}
                    className="gap-2"
                    data-testid="button-analyze"
                  >
                    {analysisMutation.isPending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Đang phân tích...
                      </>
                    ) : (
                      <>
                        <Shield className="h-4 w-4" />
                        Kiểm tra ngay
                      </>
                    )}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={handleLoadExample}
                    className="gap-2"
                    data-testid="button-example"
                  >
                    <Copy className="h-4 w-4" />
                    Dùng ví dụ
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={handleReset}
                    className="gap-2"
                    data-testid="button-reset"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Làm mới
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Result Section */}
        <Card data-testid="card-result">
          <CardHeader>
            <CardTitle className="font-heading">Kết quả phân tích</CardTitle>
            <CardDescription>
              Đánh giá mức độ rủi ro và khuyến nghị
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analysisMutation.isPending ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">AI đang phân tích nội dung...</p>
              </div>
            ) : result ? (
              <div className="space-y-6">
                {/* Risk Level */}
                <div className={`flex items-center gap-4 p-4 rounded-lg ${getRiskColor(result.riskLevel)}`}>
                  {getRiskIcon(result.riskLevel)}
                  <div>
                    <p className="font-heading font-semibold text-lg">
                      {getRiskLabel(result.riskLevel)}
                    </p>
                    <p className="text-sm opacity-80">
                      Độ tin cậy: {Math.round(result.confidence * 100)}%
                    </p>
                  </div>
                </div>

                {/* Analysis */}
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Phân tích chi tiết
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {result.analysis}
                  </p>
                </div>

                {/* Indicators */}
                {result.indicators.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-chart-4" />
                      Dấu hiệu đáng ngờ
                    </h4>
                    <ul className="space-y-2">
                      {result.indicators.map((indicator, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertTriangle className="h-4 w-4 text-chart-4 mt-0.5 flex-shrink-0" />
                          <span>{indicator}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-chart-5" />
                    Khuyến nghị
                  </h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-chart-5 mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <Shield className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">Chưa có nội dung để phân tích</p>
                  <p className="text-sm text-muted-foreground">
                    Dán nội dung email, link hoặc tin nhắn vào bên trái để bắt đầu
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tips Section */}
      <Card data-testid="card-tips">
        <CardHeader>
          <CardTitle className="font-heading">Mẹo nhận biết lừa đảo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Email lừa đảo</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Địa chỉ gửi không phải tên miền chính thức</li>
                <li>Yêu cầu hành động khẩn cấp</li>
                <li>Có lỗi chính tả, ngữ pháp</li>
                <li>Đường link đáng ngờ</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Link nguy hiểm</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Tên miền giống nhưng khác chính thức</li>
                <li>Sử dụng rút gọn link (bit.ly...)</li>
                <li>Không có HTTPS</li>
                <li>Chứa ký tự lạ trong URL</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h4 className="font-medium">Tin nhắn giả mạo</h4>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Thông báo trúng thưởng bất ngờ</li>
                <li>Yêu cầu cung cấp thông tin cá nhân</li>
                <li>Đe dọa khóa tài khoản</li>
                <li>Gửi từ số điện thoại lạ</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
