<div align="center">

# pleasehireme

### AI-Powered Job Hunting & Auto-Apply Platform

*Stop applying manually like a peasant.*

[![Rust](https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white)](https://www.rust-lang.org/)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![SurrealDB](https://img.shields.io/badge/SurrealDB-FF00A0?style=for-the-badge&logo=surrealdb&logoColor=white)](https://surrealdb.com/)

</div>

---

## Overview

**pleasehireme** is an all-in-one AI agent for sourcing, matching, and auto-applying to jobs you love. From finding openings to hitting submit, we've got your back.

- **Smart Job Matching** — AI analyzes your resume and matches you with jobs that make sense
- **Auto-Apply** — Set your preferences and we'll apply to jobs while you sleep
- **Multi-Source Scraping** — LinkedIn, Indeed, Seek, YC Jobs, and more
- **Real-Time Alerts** — Never miss an opportunity with instant notifications

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Styling |
| **Framer Motion** | Animations |
| **Clerk** | Authentication |
| **Lucide React** | Icons |

### Backend
| Technology | Purpose |
|------------|---------|
| **Rust** | Systems programming language |
| **Actix Web** | High-performance web framework |
| **SurrealDB** | Multi-model database |
| **Thirtyfour** | Selenium WebDriver for scraping |
| **Shuttle** | Deployment platform |

---

## Project Structure

```
ai-job-webscraper/
├── frontend/                # Next.js application
│   ├── app/
│   │   ├── page.tsx         # Landing page
│   │   ├── dashboard/       # User dashboard
│   │   ├── sign-in/         # Authentication
│   │   └── sign-up/         # Registration
│   ├── components/          # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   └── Footer.tsx
│   └── proxy.ts             # Auth middleware
│
├── backend/                 # Rust API server
│   └── src/
│       ├── main.rs          # Entry point
│       ├── error.rs         # Error handling
│       ├── response.rs      # API responses
│       ├── database/        # SurrealDB integration
│       ├── chrome/          # Web scraping driver
│       └── lib/             # Shared utilities
│
└── docker-compose.yml       # Database services
```

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **Rust** 1.70+
- **Docker** & Docker Compose
- **Chrome/Chromium** (for web scraping)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ai-job-webscraper.git
cd ai-job-webscraper
```

### 2. Start the Database

```bash
docker-compose up -d
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file with your Clerk credentials:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

Start the development server:

```bash
npm run dev
```

### 4. Setup Backend

```bash
cd backend
cargo build
```

Run with Shuttle:

```bash
cargo shuttle run
```

---

## Features

### Landing Page
- Modern dark theme with violet/fuchsia accents
- Animated hero section with live dashboard preview
- Feature showcase with gradient icons
- Pricing comparison cards

### Authentication
- Clerk-powered sign-in/sign-up
- OAuth support (Google, GitHub)
- Protected routes with middleware
- Automatic redirect to dashboard

### Dashboard (Coming Soon)
- Job match tracking
- Application status monitoring
- AI recommendations
- Analytics & insights

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api` | Health check |
| `POST` | `/api/users` | Create user |
| `GET` | `/api/jobs` | List matched jobs |
| `POST` | `/api/apply` | Auto-apply to job |

---

## Environment Variables

### Frontend

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in page path |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up page path |

### Backend

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | SurrealDB connection string |
| `CHROME_DRIVER_URL` | ChromeDriver endpoint |

---

## Development

### Frontend Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Backend Commands

```bash
cargo build              # Build the project
cargo run                # Run locally
cargo shuttle run        # Run with Shuttle
cargo shuttle deploy     # Deploy to Shuttle
```

---

## Deployment

### Frontend (Vercel)

```bash
vercel --prod
```

### Backend (Shuttle)

```bash
cd backend
cargo shuttle deploy
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with mass mass caffeine and mass mass mass desperation by mass mass mass mass job seekers, for mass mass mass mass mass job seekers.**

[Website](https://pleasehireme.app) · [Report Bug](https://github.com/yourusername/ai-job-webscraper/issues) · [Request Feature](https://github.com/yourusername/ai-job-webscraper/issues)

</div>
