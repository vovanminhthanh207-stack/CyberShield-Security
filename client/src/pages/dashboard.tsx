import { 
  Shield, 
  AlertTriangle, 
  Bug, 
  Database, 
  TrendingUp, 
  TrendingDown,
  Bell,
  CheckCircle2,
  Clock,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from "recharts";

const monthlyTrend = [
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
];

const threatsByCategory = [
  { name: "Phishing Email", value: 42, color: "hsl(var(--chart-1))" },
  { name: "Malware", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Scam/Lừa đảo", value: 18, color: "hsl(var(--chart-3))" },
  { name: "Ransomware", value: 10, color: "hsl(var(--chart-4))" },
  { name: "Khác", value: 5, color: "hsl(var(--chart-5))" },
];

const recentAlerts = [
  {
    id: "1",
    title: "Chiến dịch phishing mạo danh ngân hàng",
    description: "Phát hiện chiến dịch lừa đảo quy mô lớn mạo danh các ngân hàng lớn tại Việt Nam.",
    severity: "critical" as const,
    date: "2 giờ trước",
    source: "VNCERT",
  },
  {
    id: "2", 
    title: "Mã độc lây lan qua file Office",
    description: "Cảnh báo về mã độc mới lây lan qua các file Word và Excel đính kèm email.",
    severity: "warning" as const,
    date: "5 giờ trước",
    source: "BKAV",
  },
  {
    id: "3",
    title: "Cập nhật bảo mật Windows quan trọng",
    description: "Microsoft phát hành bản vá lỗ hổng bảo mật nghiêm trọng cho Windows.",
    severity: "info" as const,
    date: "1 ngày trước",
    source: "Microsoft",
  },
];

const statCards = [
  {
    title: "Tổng mối đe dọa",
    value: "12,456",
    change: "+15.3%",
    trend: "up",
    icon: Shield,
    description: "Phát hiện trong tháng này",
  },
  {
    title: "Tấn công Phishing",
    value: "3,678",
    change: "+23.1%",
    trend: "up",
    icon: AlertTriangle,
    description: "Tăng so với tháng trước",
  },
  {
    title: "Malware phát hiện",
    value: "2,134",
    change: "+8.7%",
    trend: "up",
    icon: Bug,
    description: "Mã độc mới",
  },
  {
    title: "Rò rỉ dữ liệu",
    value: "89",
    change: "-5.2%",
    trend: "down",
    icon: Database,
    description: "Giảm so với tháng trước",
  },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="font-heading text-3xl font-bold" data-testid="text-dashboard-title">
          Dashboard An ninh Mạng
        </h1>
        <p className="text-muted-foreground">
          Theo dõi xu hướng tội phạm mạng và cảnh báo bảo mật tại Việt Nam
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} data-testid={`card-stat-${index}`}>
            <CardHeader className="flex flex-row items-center justify-between gap-4 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-heading">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-4 w-4 text-destructive" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-chart-5" />
                )}
                <span className={`text-xs ${stat.trend === "up" ? "text-destructive" : "text-chart-5"}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-muted-foreground ml-1">{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <Card className="lg:col-span-2" data-testid="card-trend-chart">
          <CardHeader>
            <CardTitle className="font-heading">Xu hướng tấn công theo tháng</CardTitle>
            <CardDescription>Số lượng tấn công được phát hiện tại Việt Nam năm 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="phishing" 
                    name="Phishing"
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="malware" 
                    name="Malware"
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="scam" 
                    name="Lừa đảo"
                    stroke="hsl(var(--chart-3))" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card data-testid="card-pie-chart">
          <CardHeader>
            <CardTitle className="font-heading">Phân loại mối đe dọa</CardTitle>
            <CardDescription>Tỷ lệ các loại tấn công</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={threatsByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                    labelLine={false}
                  >
                    {threatsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px"
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {threatsByCategory.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card data-testid="card-alerts">
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="font-heading flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Cảnh báo bảo mật mới nhất
            </CardTitle>
            <CardDescription>Các mối đe dọa và khuyến nghị từ các nguồn tin cậy</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Xem tất cả
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className="flex items-start gap-4 p-4 rounded-md bg-background border"
                data-testid={`alert-${alert.id}`}
              >
                <div className={`mt-0.5 p-1.5 rounded-full ${
                  alert.severity === "critical" 
                    ? "bg-destructive/10" 
                    : alert.severity === "warning"
                    ? "bg-chart-4/10"
                    : "bg-chart-1/10"
                }`}>
                  {alert.severity === "critical" ? (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  ) : alert.severity === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-chart-4" />
                  ) : (
                    <CheckCircle2 className="h-4 w-4 text-chart-1" />
                  )}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-medium">{alert.title}</h4>
                    <Badge 
                      variant={alert.severity === "critical" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {alert.severity === "critical" ? "Nghiêm trọng" : alert.severity === "warning" ? "Cảnh báo" : "Thông tin"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <ExternalLink className="h-3 w-3" />
                      {alert.source}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regional Stats */}
      <Card data-testid="card-regional-stats">
        <CardHeader>
          <CardTitle className="font-heading">Tấn công theo khu vực</CardTitle>
          <CardDescription>Top 5 tỉnh thành có nhiều tấn công nhất</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={[
                  { region: "TP.HCM", attacks: 4523 },
                  { region: "Hà Nội", attacks: 3890 },
                  { region: "Đà Nẵng", attacks: 1234 },
                  { region: "Cần Thơ", attacks: 890 },
                  { region: "Hải Phòng", attacks: 756 },
                ]}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-xs" />
                <YAxis dataKey="region" type="category" className="text-xs" width={80} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Bar dataKey="attacks" name="Số vụ tấn công" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
