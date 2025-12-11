import { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  RotateCcw,
  ChevronRight,
  Medal,
  Target,
  Brain
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import type { QuizQuestion, QuizResult } from "@shared/schema";

const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Bạn nhận được email từ 'nganh4ng-vcb@gmail.com' yêu cầu xác minh tài khoản. Bạn nên làm gì?",
    options: [
      "Nhấp vào link và nhập thông tin theo yêu cầu",
      "Xóa email và liên hệ ngân hàng qua kênh chính thức",
      "Trả lời email hỏi thêm thông tin",
      "Chuyển tiếp email cho bạn bè"
    ],
    correctAnswer: 1,
    explanation: "Email từ ngân hàng chính thức luôn sử dụng tên miền @vietcombank.com.vn. Email từ gmail.com là giả mạo. Hãy xóa và liên hệ ngân hàng qua số hotline chính thức.",
    category: "phishing"
  },
  {
    id: "q2",
    question: "Mật khẩu nào dưới đây là AN TOÀN nhất?",
    options: [
      "123456789",
      "nguyenvana1990",
      "P@ssw0rd",
      "TôiThích#CàPhê2024!"
    ],
    correctAnswer: 3,
    explanation: "Mật khẩu dài, kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt là an toàn nhất. Passphrase (cụm từ) dễ nhớ nhưng rất khó bẻ khóa.",
    category: "password"
  },
  {
    id: "q3",
    question: "Ransomware là gì?",
    options: [
      "Phần mềm chống virus",
      "Mã độc mã hóa dữ liệu và đòi tiền chuộc",
      "Công cụ sao lưu dữ liệu",
      "Phần mềm tăng tốc máy tính"
    ],
    correctAnswer: 1,
    explanation: "Ransomware là loại mã độc nguy hiểm, mã hóa toàn bộ dữ liệu và yêu cầu nạn nhân trả tiền chuộc (thường bằng Bitcoin) để lấy lại dữ liệu.",
    category: "malware"
  },
  {
    id: "q4",
    question: "Bạn bè trên Facebook nhắn tin vay tiền gấp. Bạn nên làm gì?",
    options: [
      "Chuyển tiền ngay vì là bạn thân",
      "Gọi điện trực tiếp để xác nhận danh tính",
      "Hỏi số tài khoản để chuyển",
      "Nhờ người khác chuyển hộ"
    ],
    correctAnswer: 1,
    explanation: "Tài khoản mạng xã hội có thể bị hack. Luôn xác minh danh tính qua cuộc gọi trực tiếp hoặc gặp mặt trước khi chuyển tiền.",
    category: "social"
  },
  {
    id: "q5",
    question: "Xác thực 2 lớp (2FA) là gì?",
    options: [
      "Đăng nhập bằng 2 mật khẩu khác nhau",
      "Sử dụng 2 email để đăng nhập",
      "Xác minh danh tính bằng mật khẩu + mã OTP/thiết bị",
      "Đổi mật khẩu 2 lần một tuần"
    ],
    correctAnswer: 2,
    explanation: "2FA yêu cầu 2 yếu tố xác thực: điều bạn biết (mật khẩu) + điều bạn có (điện thoại nhận OTP) hoặc điều bạn là (vân tay). Giảm 99.9% rủi ro bị hack.",
    category: "password"
  },
  {
    id: "q6",
    question: "Dấu hiệu nào cho thấy máy tính có thể bị nhiễm virus?",
    options: [
      "Máy chạy nhanh hơn bình thường",
      "Máy chậm, xuất hiện quảng cáo lạ, ổ cứng hoạt động liên tục",
      "Pin laptop sạc nhanh hơn",
      "Màn hình sáng hơn"
    ],
    correctAnswer: 1,
    explanation: "Máy chậm, quảng cáo bật lên liên tục, ổ cứng hoạt động không ngừng là dấu hiệu của malware. Nên quét virus ngay và kiểm tra các chương trình đang chạy.",
    category: "malware"
  },
  {
    id: "q7",
    question: "Thông tin nào KHÔNG nên chia sẻ trên mạng xã hội?",
    options: [
      "Ảnh du lịch đã về nhà",
      "Số CCCD và địa chỉ nhà",
      "Sở thích âm nhạc",
      "Tên thú cưng"
    ],
    correctAnswer: 1,
    explanation: "Số CCCD, địa chỉ nhà là thông tin nhạy cảm có thể bị lợi dụng để giả mạo danh tính hoặc theo dõi vị trí. Không bao giờ chia sẻ công khai.",
    category: "social"
  },
  {
    id: "q8",
    question: "Link rút gọn (bit.ly, tinyurl) có nguy hiểm không?",
    options: [
      "Hoàn toàn an toàn vì từ nguồn uy tín",
      "Có thể nguy hiểm vì ẩn địa chỉ thật của website",
      "Chỉ nguy hiểm trên điện thoại",
      "Không có vấn đề gì"
    ],
    correctAnswer: 1,
    explanation: "Link rút gọn ẩn địa chỉ thật, có thể dẫn đến website độc hại. Hãy dùng công cụ kiểm tra link trước khi nhấp, hoặc hover xem preview.",
    category: "phishing"
  },
  {
    id: "q9",
    question: "Phần mềm crack/lậu thường chứa gì?",
    options: [
      "Tính năng bonus miễn phí",
      "Mã độc, virus, trojan ẩn bên trong",
      "Bản cập nhật mới nhất",
      "Hỗ trợ kỹ thuật 24/7"
    ],
    correctAnswer: 1,
    explanation: "Phần mềm crack thường được nhúng mã độc. Khi cài đặt, bạn có thể vô tình cài trojan, keylogger hoặc ransomware. Hãy dùng phần mềm bản quyền hoặc miễn phí chính hãng.",
    category: "malware"
  },
  {
    id: "q10",
    question: "Khi nhận SMS 'Bạn đã trúng 500 triệu từ Viettel', bạn nên?",
    options: [
      "Nhấp link nhận thưởng ngay",
      "Gọi lại số gửi tin nhắn",
      "Xóa tin nhắn, không tương tác",
      "Chia sẻ với bạn bè để cùng nhận"
    ],
    correctAnswer: 2,
    explanation: "Đây là tin nhắn lừa đảo phổ biến. Nhà mạng không bao giờ thông báo trúng thưởng qua SMS. Xóa tin nhắn và chặn số gửi.",
    category: "phishing"
  }
];

export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  const handleStart = () => {
    setStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setAnswers([]);
    setFinished(false);
  };

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    setAnswers([...answers, index]);
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const calculateResult = (): QuizResult => {
    let correct = 0;
    const incorrectAnswers: QuizResult["incorrectAnswers"] = [];

    quizQuestions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        correct++;
      } else {
        incorrectAnswers.push({
          questionId: q.id,
          userAnswer: answers[index],
          correctAnswer: q.correctAnswer
        });
      }
    });

    const percentage = (correct / quizQuestions.length) * 100;
    let level: QuizResult["level"];
    let feedback: string;

    if (percentage >= 90) {
      level = "expert";
      feedback = "Xuất sắc! Bạn có kiến thức an ninh mạng rất tốt. Hãy tiếp tục cập nhật và chia sẻ kiến thức với mọi người!";
    } else if (percentage >= 70) {
      level = "advanced";
      feedback = "Tốt lắm! Bạn nắm vững các kiến thức cơ bản. Hãy tiếp tục học hỏi để hoàn thiện hơn.";
    } else if (percentage >= 50) {
      level = "intermediate";
      feedback = "Khá tốt! Bạn cần bổ sung thêm một số kiến thức về an ninh mạng. Hãy xem lại các bài học.";
    } else {
      level = "beginner";
      feedback = "Bạn cần học thêm về an ninh mạng để bảo vệ bản thân. Hãy bắt đầu với các bài học cơ bản.";
    }

    return {
      score: correct,
      totalQuestions: quizQuestions.length,
      percentage,
      level,
      feedback,
      incorrectAnswers
    };
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "expert": return "text-chart-5 bg-chart-5/10";
      case "advanced": return "text-chart-1 bg-chart-1/10";
      case "intermediate": return "text-chart-4 bg-chart-4/10";
      case "beginner": return "text-destructive bg-destructive/10";
      default: return "";
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case "expert": return "Chuyên gia";
      case "advanced": return "Nâng cao";
      case "intermediate": return "Trung cấp";
      case "beginner": return "Mới bắt đầu";
      default: return "";
    }
  };

  if (!started) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Brain className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-heading text-3xl font-bold" data-testid="text-quiz-title">
              Kiểm tra Kiến thức An ninh Mạng
            </h1>
            <p className="text-muted-foreground text-lg">
              Đánh giá mức độ hiểu biết của bạn về an ninh mạng qua {quizQuestions.length} câu hỏi
            </p>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-lg bg-card border">
                  <p className="text-3xl font-bold font-heading text-primary">{quizQuestions.length}</p>
                  <p className="text-sm text-muted-foreground">Câu hỏi</p>
                </div>
                <div className="p-4 rounded-lg bg-card border">
                  <p className="text-3xl font-bold font-heading text-primary">~10</p>
                  <p className="text-sm text-muted-foreground">Phút hoàn thành</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Chủ đề kiểm tra:</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Phishing/Lừa đảo</Badge>
                  <Badge variant="secondary">Mật khẩu an toàn</Badge>
                  <Badge variant="secondary">Malware/Mã độc</Badge>
                  <Badge variant="secondary">Mạng xã hội</Badge>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full gap-2"
                onClick={handleStart}
                data-testid="button-start-quiz"
              >
                <Target className="h-5 w-5" />
                Bắt đầu kiểm tra
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (finished) {
    const result = calculateResult();
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${getLevelColor(result.level)}`}>
              {result.percentage >= 70 ? (
                <Trophy className="h-10 w-10" />
              ) : (
                <Medal className="h-10 w-10" />
              )}
            </div>
            <h1 className="font-heading text-3xl font-bold" data-testid="text-result-title">
              Kết quả Kiểm tra
            </h1>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="text-center space-y-2">
                <p className="text-5xl font-bold font-heading text-primary">
                  {result.score}/{result.totalQuestions}
                </p>
                <p className="text-lg text-muted-foreground">
                  Đúng {Math.round(result.percentage)}%
                </p>
                <Badge className={getLevelColor(result.level)}>
                  {getLevelLabel(result.level)}
                </Badge>
              </div>

              <Progress value={result.percentage} className="h-3" />

              <p className="text-center text-muted-foreground">
                {result.feedback}
              </p>

              {result.incorrectAnswers.length > 0 && (
                <div className="space-y-3 pt-4 border-t">
                  <h3 className="font-medium">Câu trả lời sai:</h3>
                  {result.incorrectAnswers.map((wrong, index) => {
                    const question = quizQuestions.find(q => q.id === wrong.questionId);
                    if (!question) return null;
                    return (
                      <div key={index} className="p-3 rounded-lg bg-destructive/5 border border-destructive/20 text-sm">
                        <p className="font-medium mb-1">{question.question}</p>
                        <p className="text-destructive">
                          Bạn chọn: {question.options[wrong.userAnswer]}
                        </p>
                        <p className="text-chart-5">
                          Đáp án đúng: {question.options[wrong.correctAnswer]}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2"
                  onClick={handleStart}
                  data-testid="button-retry"
                >
                  <RotateCcw className="h-4 w-4" />
                  Làm lại
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Câu hỏi {currentQuestion + 1}/{quizQuestions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card data-testid={`card-question-${currentQuestion}`}>
          <CardHeader>
            <CardTitle className="font-heading text-xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => {
              let optionClass = "p-4 rounded-lg border cursor-pointer transition-colors";
              
              if (showExplanation) {
                if (index === question.correctAnswer) {
                  optionClass += " bg-chart-5/10 border-chart-5";
                } else if (index === selectedAnswer && index !== question.correctAnswer) {
                  optionClass += " bg-destructive/10 border-destructive";
                }
              } else if (selectedAnswer === index) {
                optionClass += " bg-primary/10 border-primary";
              } else {
                optionClass += " hover:bg-muted";
              }

              return (
                <div
                  key={index}
                  className={optionClass}
                  onClick={() => handleSelectAnswer(index)}
                  data-testid={`option-${index}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      showExplanation && index === question.correctAnswer
                        ? "border-chart-5 bg-chart-5 text-white"
                        : showExplanation && index === selectedAnswer && index !== question.correctAnswer
                        ? "border-destructive bg-destructive text-white"
                        : "border-muted-foreground"
                    }`}>
                      {showExplanation && index === question.correctAnswer && (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                      {showExplanation && index === selectedAnswer && index !== question.correctAnswer && (
                        <XCircle className="h-4 w-4" />
                      )}
                    </div>
                    <span className="flex-1">{option}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {showExplanation && (
          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-chart-5 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Giải thích:</p>
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {showExplanation && (
          <Button 
            className="w-full gap-2"
            onClick={handleNext}
            data-testid="button-next"
          >
            {currentQuestion < quizQuestions.length - 1 ? (
              <>
                Câu tiếp theo
                <ChevronRight className="h-4 w-4" />
              </>
            ) : (
              <>
                Xem kết quả
                <Trophy className="h-4 w-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
