import { useState, useCallback } from "react";
import { 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck,
  ShieldAlert,
  Shield,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  CheckCircle2,
  Info
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import type { PasswordStrengthResult } from "@shared/schema";

const checkPasswordStrength = (password: string): PasswordStrengthResult => {
  let score = 0;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  if (password.length === 0) {
    return {
      score: 0,
      level: "very-weak",
      feedback: ["Nhập mật khẩu để kiểm tra"],
      suggestions: [],
      crackTime: "Ngay lập tức",
    };
  }

  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^a-zA-Z0-9]/.test(password)) score += 1;

  const commonPatterns = [
    /^123456/,
    /password/i,
    /qwerty/i,
    /abc123/i,
    /letmein/i,
    /welcome/i,
    /admin/i,
    /login/i,
  ];
  
  if (commonPatterns.some(pattern => pattern.test(password))) {
    score = Math.max(0, score - 3);
    feedback.push("Mật khẩu chứa mẫu phổ biến, dễ đoán");
  }

  if (password.length < 8) {
    feedback.push("Mật khẩu quá ngắn (cần ít nhất 8 ký tự)");
    suggestions.push("Thêm ký tự để mật khẩu dài hơn");
  }
  if (!/[a-z]/.test(password)) {
    feedback.push("Thiếu chữ cái thường");
    suggestions.push("Thêm chữ cái thường (a-z)");
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push("Thiếu chữ cái in hoa");
    suggestions.push("Thêm chữ cái in hoa (A-Z)");
  }
  if (!/[0-9]/.test(password)) {
    feedback.push("Thiếu chữ số");
    suggestions.push("Thêm chữ số (0-9)");
  }
  if (!/[^a-zA-Z0-9]/.test(password)) {
    feedback.push("Thiếu ký tự đặc biệt");
    suggestions.push("Thêm ký tự đặc biệt (!@#$%^&*)");
  }

  if (feedback.length === 0) {
    feedback.push("Mật khẩu mạnh!");
  }

  let level: PasswordStrengthResult["level"];
  let crackTime: string;

  if (score <= 2) {
    level = "very-weak";
    crackTime = "Dưới 1 giây";
  } else if (score <= 3) {
    level = "weak";
    crackTime = "Vài phút";
  } else if (score <= 4) {
    level = "medium";
    crackTime = "Vài giờ";
  } else if (score <= 5) {
    level = "strong";
    crackTime = "Vài tháng";
  } else {
    level = "very-strong";
    crackTime = "Hàng trăm năm";
  }

  return {
    score: Math.min(score, 7),
    level,
    feedback,
    suggestions,
    crackTime,
  };
};

const generateSecurePassword = (length: number = 16): string => {
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  
  const allChars = lowercase + uppercase + numbers + special;
  
  let password = "";
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += special[Math.floor(Math.random() * special.length)];
  
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  return password.split("").sort(() => Math.random() - 0.5).join("");
};

export default function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const result = checkPasswordStrength(password);

  const getStrengthColor = (level: string) => {
    switch (level) {
      case "very-weak": return "bg-destructive";
      case "weak": return "bg-chart-4";
      case "medium": return "bg-chart-4";
      case "strong": return "bg-chart-5";
      case "very-strong": return "bg-chart-5";
      default: return "bg-muted";
    }
  };

  const getStrengthLabel = (level: string) => {
    switch (level) {
      case "very-weak": return "Rất yếu";
      case "weak": return "Yếu";
      case "medium": return "Trung bình";
      case "strong": return "Mạnh";
      case "very-strong": return "Rất mạnh";
      default: return "Chưa xác định";
    }
  };

  const getStrengthIcon = (level: string) => {
    switch (level) {
      case "very-weak":
      case "weak":
        return <ShieldAlert className="h-6 w-6 text-destructive" />;
      case "medium":
        return <Shield className="h-6 w-6 text-chart-4" />;
      case "strong":
      case "very-strong":
        return <ShieldCheck className="h-6 w-6 text-chart-5" />;
      default:
        return <Shield className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const handleGeneratePassword = useCallback(() => {
    const newPassword = generateSecurePassword(16);
    setGeneratedPassword(newPassword);
    setCopied(false);
  }, []);

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
      toast({
        title: "Đã sao chép",
        description: "Mật khẩu đã được sao chép vào clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Lỗi",
        description: "Không thể sao chép mật khẩu",
        variant: "destructive",
      });
    }
  };

  const handleUseGenerated = () => {
    setPassword(generatedPassword);
  };

  const progressValue = (result.score / 7) * 100;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold" data-testid="text-password-title">
          Kiểm tra Độ mạnh Mật khẩu
        </h1>
        <p className="text-muted-foreground">
          Đánh giá và tạo mật khẩu an toàn để bảo vệ tài khoản của bạn.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Password Input */}
        <Card data-testid="card-password-input">
          <CardHeader>
            <CardTitle className="font-heading">Kiểm tra mật khẩu</CardTitle>
            <CardDescription>
              Nhập mật khẩu bạn muốn kiểm tra độ an toàn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu của bạn..."
                className="pl-10 pr-10"
                data-testid="input-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
                data-testid="button-toggle-password"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>

            {/* Strength Meter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Độ mạnh</span>
                <Badge 
                  variant="secondary"
                  className={result.level !== "very-weak" && result.level !== "weak" ? "" : ""}
                >
                  {getStrengthLabel(result.level)}
                </Badge>
              </div>
              <Progress 
                value={progressValue} 
                className={`h-2 ${getStrengthColor(result.level)}`}
              />
            </div>

            {/* Result */}
            {password && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 rounded-lg bg-card border">
                  {getStrengthIcon(result.level)}
                  <div>
                    <p className="font-medium">Thời gian crack ước tính</p>
                    <p className="text-sm text-muted-foreground">{result.crackTime}</p>
                  </div>
                </div>

                {/* Feedback */}
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Đánh giá
                  </h4>
                  <ul className="space-y-1">
                    {result.feedback.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        {result.level === "strong" || result.level === "very-strong" ? (
                          <CheckCircle2 className="h-4 w-4 text-chart-5 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-chart-4 mt-0.5 flex-shrink-0" />
                        )}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggestions */}
                {result.suggestions.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-chart-5" />
                      Gợi ý cải thiện
                    </h4>
                    <ul className="space-y-1">
                      {result.suggestions.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="text-chart-5">+</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Password Generator */}
        <Card data-testid="card-password-generator">
          <CardHeader>
            <CardTitle className="font-heading">Tạo mật khẩu an toàn</CardTitle>
            <CardDescription>
              Tự động tạo mật khẩu mạnh, khó bị hack
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button 
              onClick={handleGeneratePassword}
              className="w-full gap-2"
              data-testid="button-generate"
            >
              <RefreshCw className="h-4 w-4" />
              Tạo mật khẩu mới
            </Button>

            {generatedPassword && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-3 rounded-md bg-background border font-mono text-sm break-all">
                    {generatedPassword}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopyPassword}
                    data-testid="button-copy"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-chart-5" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleUseGenerated}
                  data-testid="button-use-generated"
                >
                  Kiểm tra mật khẩu này
                </Button>
              </div>
            )}

            {/* Password Tips */}
            <div className="space-y-4 pt-4 border-t">
              <h4 className="font-medium">Mẹo tạo mật khẩu an toàn</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-chart-5 mt-0.5 flex-shrink-0" />
                  <span>Sử dụng ít nhất 12 ký tự</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-chart-5 mt-0.5 flex-shrink-0" />
                  <span>Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-chart-5 mt-0.5 flex-shrink-0" />
                  <span>Không dùng thông tin cá nhân (tên, ngày sinh)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-chart-5 mt-0.5 flex-shrink-0" />
                  <span>Sử dụng mật khẩu khác nhau cho mỗi tài khoản</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-4 w-4 text-chart-5 mt-0.5 flex-shrink-0" />
                  <span>Cân nhắc sử dụng trình quản lý mật khẩu</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Common Weak Passwords */}
      <Card data-testid="card-weak-passwords">
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-destructive" />
            Mật khẩu phổ biến bạn KHÔNG nên dùng
          </CardTitle>
          <CardDescription>
            Đây là những mật khẩu bị hack nhiều nhất - hãy tránh sử dụng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {[
              "123456", "password", "123456789", "12345678", "12345",
              "1234567", "qwerty", "abc123", "111111", "123123",
              "admin", "letmein", "welcome", "monkey", "dragon"
            ].map((pwd, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="font-mono text-destructive border-destructive/50"
              >
                {pwd}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
