# CyberGuard Vietnam - Cybersecurity Education Platform

## Overview

CyberGuard Vietnam is a cybersecurity education and protection platform designed for the Vietnamese community. The platform provides AI-powered phishing detection, password strength checking, security education resources, and interactive quizzes to help users protect themselves from cyber threats.

Key features include:
- AI-powered phishing detection using OpenAI GPT-4o
- Password strength analyzer with Vietnamese feedback
- Interactive cybersecurity quizzes
- Educational content targeting different audiences (elderly, students, professionals)
- Security dashboard with threat statistics and visualizations

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with CSS variables for theming
- **UI Components**: Shadcn/ui component library (Radix UI primitives)
- **Charts**: Recharts for data visualization
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite

The frontend follows a page-based architecture with shared components. Pages include Home, Dashboard, Phishing Detector, Password Checker, Education, Quiz, and Resources.

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful endpoints under `/api/*` prefix
- **AI Integration**: OpenAI API (GPT-4o) for phishing analysis

The server uses a simple modular structure:
- `server/index.ts` - Express app setup and middleware
- `server/routes.ts` - API route definitions
- `server/storage.ts` - Data storage abstraction (currently in-memory)
- `server/static.ts` - Static file serving for production
- `server/vite.ts` - Vite dev server integration

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts`
- **Current Implementation**: In-memory storage (`MemStorage` class) for development
- **Database Ready**: Drizzle configuration prepared for PostgreSQL via `DATABASE_URL`

The schema currently defines users table and TypeScript interfaces for phishing results, password strength, quiz questions, and educational resources.

### Design System
- **Theme**: Light/dark mode with CSS custom properties
- **Fonts**: Inter (body), Space Grotesk (headings)
- **Localization**: Vietnamese language throughout the UI
- **Design Guidelines**: Documented in `design_guidelines.md` following Microsoft Security/Cloudflare-inspired professional aesthetic

## External Dependencies

### AI Services
- **OpenAI API**: Powers the phishing detection feature using GPT-4o model. Requires `OPENAI_API_KEY` environment variable.

### Database
- **PostgreSQL**: Configured via Drizzle ORM. Requires `DATABASE_URL` environment variable when database features are enabled.

### Key NPM Packages
- `@tanstack/react-query` - Server state management
- `drizzle-orm` / `drizzle-kit` - Database ORM and migrations
- `openai` - OpenAI API client
- `zod` - Schema validation (shared between client/server)
- `recharts` - Dashboard charts and visualizations
- `wouter` - Client-side routing
- Radix UI primitives - Accessible UI components

### Build and Development
- Vite for frontend bundling with React plugin
- esbuild for server bundling (production)
- TypeScript for type safety across the stack