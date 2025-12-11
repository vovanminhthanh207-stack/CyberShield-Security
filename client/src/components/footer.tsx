import { Link } from "wouter";
import { Shield, Github, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-bold">CyberGuard</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bảo vệ cộng đồng Việt Nam khỏi tội phạm mạng với công nghệ AI tiên tiến và giáo dục an ninh mạng toàn diện.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Tính năng</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/phishing-detector" className="hover:text-foreground transition-colors" data-testid="link-footer-phishing">
                  Phát hiện lừa đảo
                </Link>
              </li>
              <li>
                <Link href="/password-checker" className="hover:text-foreground transition-colors" data-testid="link-footer-password">
                  Kiểm tra mật khẩu
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors" data-testid="link-footer-dashboard">
                  Dashboard bảo mật
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-foreground transition-colors" data-testid="link-footer-quiz">
                  Kiểm tra kiến thức
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Tài nguyên</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/education" className="hover:text-foreground transition-colors" data-testid="link-footer-education">
                  Bài học an ninh mạng
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-foreground transition-colors" data-testid="link-footer-resources">
                  Thư viện tài nguyên
                </Link>
              </li>
              <li>
                <Link href="/resources?audience=elderly" className="hover:text-foreground transition-colors">
                  Hướng dẫn cho người cao tuổi
                </Link>
              </li>
              <li>
                <Link href="/resources?audience=business" className="hover:text-foreground transition-colors">
                  Doanh nghiệp nhỏ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>support@cyberguard.vn</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>1900 xxxx xx</span>
              </li>
              <li className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <a href="#" className="hover:text-foreground transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>2025 CyberGuard Vietnam. Dự án Cuộc thi An ninh Mạng.</p>
          <div className="flex items-center gap-4">
            <span>Made with care for Vietnamese community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
