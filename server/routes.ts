import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";
import { phishingAnalysisSchema } from "@shared/schema";
import { z } from "zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Phishing Detection API using OpenAI
  app.post("/api/analyze-phishing", async (req, res) => {
    try {
      const validatedData = phishingAnalysisSchema.parse(req.body);
      const { content, contentType } = validatedData;

      const systemPrompt = `Bạn là chuyên gia an ninh mạng với nhiều năm kinh nghiệm phát hiện lừa đảo (phishing). 
Nhiệm vụ của bạn là phân tích nội dung được cung cấp và đánh giá mức độ nguy hiểm.

Hãy phân tích ${contentType === "email" ? "email" : contentType === "link" ? "đường link" : "tin nhắn"} sau và trả về kết quả dưới dạng JSON với các trường:
- isPhishing: boolean (true nếu là lừa đảo)
- riskLevel: "low" | "medium" | "high" | "critical"
- confidence: number từ 0 đến 1 (độ tin cậy của phân tích)
- analysis: string (phân tích chi tiết bằng tiếng Việt)
- indicators: string[] (danh sách các dấu hiệu đáng ngờ bằng tiếng Việt)
- recommendations: string[] (danh sách khuyến nghị hành động bằng tiếng Việt)

Các tiêu chí đánh giá:
1. Kiểm tra địa chỉ gửi/domain có chính thức không
2. Phát hiện ngôn ngữ tạo cảm giác khẩn cấp
3. Kiểm tra lỗi chính tả, ngữ pháp
4. Phát hiện yêu cầu thông tin nhạy cảm
5. Đánh giá tính hợp lệ của URL/link
6. Kiểm tra các mẫu phishing phổ biến tại Việt Nam

Trả lời bằng JSON thuần túy, không có markdown.`;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Phân tích nội dung sau:\n\n${content}` }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1024,
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      
      // Ensure all required fields exist
      const phishingResult = {
        isPhishing: result.isPhishing ?? false,
        riskLevel: result.riskLevel ?? "low",
        confidence: Math.max(0, Math.min(1, result.confidence ?? 0.5)),
        analysis: result.analysis ?? "Không thể phân tích nội dung.",
        indicators: Array.isArray(result.indicators) ? result.indicators : [],
        recommendations: Array.isArray(result.recommendations) ? result.recommendations : [
          "Luôn cẩn thận với các tin nhắn/email không mong đợi",
          "Không nhấp vào link đáng ngờ",
          "Liên hệ trực tiếp với tổ chức qua kênh chính thức"
        ],
      };

      res.json(phishingResult);
    } catch (error) {
      console.error("Phishing analysis error:", error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Dữ liệu không hợp lệ",
          errors: error.errors 
        });
      }
      
      // Fallback response when OpenAI fails
      res.status(500).json({ 
        message: "Không thể phân tích. Vui lòng thử lại sau.",
        isPhishing: false,
        riskLevel: "medium",
        confidence: 0,
        analysis: "Không thể kết nối đến dịch vụ AI. Vui lòng thử lại sau.",
        indicators: [],
        recommendations: [
          "Luôn cẩn thận với các tin nhắn/email không mong đợi",
          "Không nhấp vào link đáng ngờ",
          "Liên hệ trực tiếp với tổ chức qua kênh chính thức"
        ]
      });
    }
  });

  // Get threat statistics
  app.get("/api/threat-statistics", async (_req, res) => {
    // Static data for demonstration - in production would come from database
    const stats = {
      totalThreats: 12456,
      phishingAttacks: 3678,
      malwareDetected: 2134,
      dataBreaches: 89,
      monthlyTrend: [
        { month: "T1", phishing: 1245, malware: 890, scam: 567 },
        { month: "T2", phishing: 1456, malware: 920, scam: 623 },
        { month: "T3", phishing: 1678, malware: 1050, scam: 712 },
        { month: "T4", phishing: 1890, malware: 1120, scam: 845 },
        { month: "T5", phishing: 2100, malware: 1340, scam: 923 },
        { month: "T6", phishing: 2345, malware: 1456, scam: 1045 },
        { month: "T7", phishing: 2567, malware: 1523, scam: 1123 },
        { month: "T8", phishing: 2789, malware: 1678, scam: 1234 },
        { month: "T9", phishing: 3012, malware: 1789, scam: 1345 },
        { month: "T10", phishing: 3234, malware: 1890, scam: 1456 },
        { month: "T11", phishing: 3456, malware: 2012, scam: 1567 },
        { month: "T12", phishing: 3678, malware: 2134, scam: 1678 },
      ],
      threatsByCategory: [
        { category: "Phishing Email", count: 4523, percentage: 42 },
        { category: "Malware", count: 2689, percentage: 25 },
        { category: "Scam/Lừa đảo", count: 1934, percentage: 18 },
        { category: "Ransomware", count: 1076, percentage: 10 },
        { category: "Khác", count: 538, percentage: 5 },
      ],
    };
    res.json(stats);
  });

  // Get security alerts
  app.get("/api/security-alerts", async (_req, res) => {
    const alerts = [
      {
        id: "1",
        title: "Chiến dịch phishing mạo danh ngân hàng",
        description: "Phát hiện chiến dịch lừa đảo quy mô lớn mạo danh các ngân hàng lớn tại Việt Nam.",
        severity: "critical",
        date: "2 giờ trước",
        source: "VNCERT",
        recommendations: [
          "Không nhấp vào link trong email từ ngân hàng",
          "Liên hệ trực tiếp với ngân hàng qua hotline chính thức",
          "Kiểm tra địa chỉ email gửi"
        ]
      },
      {
        id: "2",
        title: "Mã độc lây lan qua file Office",
        description: "Cảnh báo về mã độc mới lây lan qua các file Word và Excel đính kèm email.",
        severity: "warning",
        date: "5 giờ trước",
        source: "BKAV",
        recommendations: [
          "Không mở file đính kèm từ nguồn không rõ",
          "Cập nhật phần mềm diệt virus",
          "Tắt macro trong Microsoft Office"
        ]
      },
      {
        id: "3",
        title: "Cập nhật bảo mật Windows quan trọng",
        description: "Microsoft phát hành bản vá lỗ hổng bảo mật nghiêm trọng cho Windows.",
        severity: "info",
        date: "1 ngày trước",
        source: "Microsoft",
        recommendations: [
          "Cập nhật Windows ngay lập tức",
          "Bật tự động cập nhật",
          "Khởi động lại máy sau khi cập nhật"
        ]
      },
      {
        id: "4",
        title: "Lừa đảo qua Zalo tăng mạnh",
        description: "Số vụ lừa đảo qua tin nhắn Zalo tăng 150% trong tháng qua, đặc biệt nhắm vào người cao tuổi.",
        severity: "warning",
        date: "2 ngày trước",
        source: "Bộ Công an",
        recommendations: [
          "Xác minh danh tính người gửi qua cuộc gọi trực tiếp",
          "Không chuyển tiền cho người lạ",
          "Cảnh báo người thân về hình thức lừa đảo này"
        ]
      }
    ];
    res.json(alerts);
  });

  return httpServer;
}
