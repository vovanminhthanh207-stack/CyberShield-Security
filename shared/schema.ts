import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Phishing Detection Result
export const phishingAnalysisSchema = z.object({
  content: z.string().min(1, "Vui lòng nhập nội dung cần kiểm tra"),
  contentType: z.enum(["email", "link", "message"]),
});

export type PhishingAnalysis = z.infer<typeof phishingAnalysisSchema>;

export interface PhishingResult {
  isPhishing: boolean;
  riskLevel: "low" | "medium" | "high" | "critical";
  confidence: number;
  analysis: string;
  indicators: string[];
  recommendations: string[];
}

// Password Strength
export interface PasswordStrengthResult {
  score: number;
  level: "very-weak" | "weak" | "medium" | "strong" | "very-strong";
  feedback: string[];
  suggestions: string[];
  crackTime: string;
}

// Quiz
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: "phishing" | "malware" | "password" | "social" | "general";
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  feedback: string;
  incorrectAnswers: {
    questionId: string;
    userAnswer: number;
    correctAnswer: number;
  }[];
}

// Security Alert
export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  severity: "info" | "warning" | "critical";
  date: string;
  source: string;
  recommendations: string[];
}

// Threat Statistics
export interface ThreatStatistics {
  totalThreats: number;
  phishingAttacks: number;
  malwareDetected: number;
  dataBreaches: number;
  monthlyTrend: {
    month: string;
    phishing: number;
    malware: number;
    scam: number;
  }[];
  threatsByCategory: {
    category: string;
    count: number;
    percentage: number;
  }[];
}

// Educational Lesson
export interface Lesson {
  id: string;
  title: string;
  description: string;
  category: "phishing" | "malware" | "password" | "social";
  duration: string;
  level: "beginner" | "intermediate" | "advanced";
  content: string;
  keyPoints: string[];
}

// Resource
export interface Resource {
  id: string;
  title: string;
  description: string;
  type: "video" | "infographic" | "checklist" | "guide";
  targetAudience: "elderly" | "business" | "student" | "all";
  url?: string;
  content?: string;
}
