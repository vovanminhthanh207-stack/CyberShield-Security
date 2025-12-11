# Hướng Dẫn Thiết Kế - Nền Tảng An Ninh Mạng Việt Nam

## Design Approach
**Hybrid Professional Security Platform** - Inspired by Microsoft Security, Cloudflare, and modern SaaS dashboards with Vietnamese localization focus. Balances authority/trust with educational accessibility.

## Typography Hierarchy

**Primary Font:** Inter (Google Fonts) - Modern, highly legible for Vietnamese diacritics
**Accent Font:** Space Grotesk (for headings/callouts)

- **H1 (Hero):** 3xl/4xl, font-bold, Space Grotesk
- **H2 (Section Headers):** 2xl/3xl, font-bold, tracking-tight
- **H3 (Subsections):** xl/2xl, font-semibold
- **Body Large:** text-lg, leading-relaxed
- **Body:** text-base, leading-7
- **Small/Meta:** text-sm, text-muted

## Layout System

**Spacing Units:** Consistent use of 4, 6, 8, 12, 16, 24 (p-4, gap-6, py-8, space-y-12, py-16, py-24)
**Container Widths:** max-w-7xl for full sections, max-w-4xl for content areas, max-w-prose for text blocks
**Grid Systems:** 12-column responsive grid, 2-3 column feature grids, dashboard uses 3-4 column stat cards

## Core Sections & Layouts

### 1. Hero Section (80vh)
**Layout:** Split hero - left side content (55%), right side dashboard preview visual (45%)
**Content Left:**
- Badge: "Dự án Cuộc thi An ninh Mạng 2025" with shield icon
- H1: "Bảo vệ cộng đồng Việt Nam khỏi tội phạm mạng"
- Subheading: Large text explaining AI-powered protection
- Two CTAs: Primary "Bắt đầu ngay" + Secondary "Tìm hiểu thêm"
- Trust indicators row: "1000+ người dùng" | "99% phát hiện chính xác" | "AI thông minh"

**Content Right:** Mockup/screenshot of dashboard interface showing real-time threat detection

### 2. Problem Statement Section
**Layout:** Full-width with contained max-w-6xl
**Grid:** 3-column statistics cards showing Vietnamese cybersecurity threats
- Each card: Large number + icon + description
- Example: "67%" | Shield icon | "Tấn công lừa đảo sử dụng AI"

### 3. Core Features Section (Tính năng chính)
**Layout:** Alternating two-column layouts (zigzag pattern)
**Features (4 total):**
1. **AI Phishing Detector** - Icon + title + description + feature image/mockup on right
2. **Password Strength Checker** - Flipped layout (image left, content right)
3. **Security Dashboard** - Icon + title + description + mockup on right
4. **Educational Resources** - Flipped layout

Each includes: Heroicon, Vietnamese title, 2-3 sentence description, "Tìm hiểu thêm →" link

### 4. Target Beneficiaries (Đối tượng hưởng lợi)
**Layout:** 3-column card grid
**Cards:** Người cao tuổi | Doanh nghiệp nhỏ | Học sinh/Sinh viên
Each card: Icon (user groups) + title + bullet list of benefits + subtle border

### 5. How It Works (Cách hoạt động)
**Layout:** Horizontal 4-step timeline/process flow
**Steps:** 1. Nhập dữ liệu → 2. AI phân tích → 3. Phát hiện mối đe dọa → 4. Nhận cảnh báo
Connected with arrows, numbered badges, icons for each step

### 6. Technology Stack (Công nghệ sử dụng)
**Layout:** 2-column grid
**Left column:** List of technologies with badges (React, Node.js, OpenAI, TailwindCSS, etc.)
**Right column:** "Tính khả thi kỹ thuật" section with checkmark list

### 7. Social Impact (Tác động xã hội)
**Layout:** Full-width accent background section
**Grid:** 2x2 metric cards
- Hiệu quả phòng chống tội phạm
- Lợi ích kinh tế
- Phạm vi triển khai
- Khả năng mở rộng

### 8. Interactive Demo/Preview
**Layout:** Centered max-w-5xl
**Content:** Embedded interactive tool preview or video demonstration with Vietnamese narration
Border with subtle shadow, rounded corners

### 9. Development Roadmap (Kế hoạch phát triển)
**Layout:** Vertical timeline (mobile-friendly)
**Phases:** Q1-Q4 2025 milestones with expandable details

### 10. CTA Section
**Layout:** Centered, constrained max-w-3xl
**Content:** 
- H2: "Tham gia bảo vệ cộng đồng ngay hôm nay"
- Supporting text
- Email signup form (inline: input + button)
- Trust badges: GitHub stars, open source, community-driven

### 11. Footer
**Layout:** 4-column grid
- Column 1: Logo + mission statement
- Column 2: Tính năng links
- Column 3: Tài nguyên links
- Column 4: Liên hệ info
Bottom bar: Copyright | Made for Competition 2025 | GitHub link

## Component Library

**Buttons:** Rounded-lg, px-6 py-3, font-semibold with icons
**Cards:** Border, rounded-xl, p-6, hover:shadow-lg transition
**Badges:** Rounded-full, px-3 py-1, text-xs, font-medium
**Icons:** Heroicons (outline for UI, solid for emphasis), size-6 standard
**Form Inputs:** Rounded-lg, border-2, px-4 py-2.5, focus:ring-2
**Stats Display:** Large number (4xl font) + label below + icon
**Dashboard Cards:** White background, shadow-sm, rounded-lg, border, p-6

## Images

**Hero Image (Required):** Dashboard mockup showing threat detection interface with Vietnamese labels - right side of hero split layout
**Feature Mockups (4):** Screenshots of each core feature in action - alternating left/right in zigzag layout
**Icons:** Heroicons throughout - shield, lock, chart, users, bell, academic-cap, briefcase, etc.

## Animation Principles
**Minimal and purposeful:**
- Subtle hover states on cards (shadow transition)
- Smooth scroll reveal for sections (fade-up)
- Button hover: slight scale (scale-105)
- NO complex animations, page transitions, or scroll-triggered effects beyond basic reveals

## Vietnamese Language Considerations
- Ensure proper spacing for Vietnamese diacritics in headings
- Use line-height: 1.75 for body text readability
- Test with long Vietnamese compound words in buttons/navigation
- All UI text, labels, and content in Vietnamese

## Professional Authority Elements
- Security badge icons prominently displayed
- Data/statistics backed by research (cite in small text)
- Professional certification/competition branding visible
- Clean, trustworthy aesthetic - avoid playful/casual design
- Use shield, lock, and verification iconography throughout