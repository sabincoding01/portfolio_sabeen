# Sabin Timalsina — Premium Portfolio Platform

A production-ready personal brand website combining portfolio showcase, learning hub, content management, GitHub integration, and AI assistant.

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS 4** + Shadcn-style UI components
- **Framer Motion** animations
- **Firebase** (Auth, Firestore, Storage)
- **React Hook Form** + **Zod**
- **Recharts** analytics
- **GitHub API** integration

## Features

- 16 public pages (Home, About, Skills, Projects, Certificates, Achievements, Tutorials, Blog, GitHub Hub, Testimonials, Gallery, Services, Contact)
- **Chat With Sabin** — portfolio-aware AI assistant
- Protected **Admin Dashboard** with full CRUD
- Dark/light mode, glassmorphism, responsive design
- SEO metadata, Open Graph, JSON-LD structured data
- Rate limiting & input sanitization on API routes

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in Firebase and optional GitHub/OpenAI keys.

### 3. Firebase setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Authentication** → Email/Password
3. Create an admin user with your email
4. Enable **Firestore** and **Storage**
5. Deploy security rules from `docs/FIRESTORE_SCHEMA.md`
6. Add web app config to `.env.local`

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

- Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

### Demo mode

Without Firebase configured, the site runs with **seed data** from `src/data/seed.ts`. Admin CRUD requires Firebase.

## Project Structure

```
src/
├── app/              # App Router pages & API routes
├── components/       # UI, layout, feature components
├── data/             # Seed/fallback data
├── hooks/            # Custom React hooks
├── lib/              # Firebase, data layer, utils
└── types/            # TypeScript interfaces
docs/
└── FIRESTORE_SCHEMA.md
```

## Deployment (Vercel)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables from `.env.example`
4. Deploy

```bash
npm run build
```

## Customization

- Update `src/lib/constants.ts` for contact info and social links
- Replace hero image in `HeroSection` component
- Add CV PDF to `public/cv/sabin-timalsina-cv.pdf`
- Seed Firestore or use Admin panel to manage content

## License

Private — © Sabin Timalsina
