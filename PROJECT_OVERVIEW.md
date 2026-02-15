# Project Overview: ruthwikdovala.com

This repository contains a personal portfolio website built as a **React + TypeScript single-page application** using **Vite** and **Tailwind CSS**.

## 1) Tech stack

- **Framework/runtime:** React 18
- **Language:** TypeScript
- **Bundler/dev server:** Vite 5
- **Routing:** React Router (`createBrowserRouter`)
- **Styling:** Tailwind CSS + CSS custom properties for theme tokens
- **Animation/icons:** Framer Motion, Lucide React
- **Deployment hints:** Custom domain (`public/CNAME`) and SPA fallback page (`public/404.html`) suggest static hosting (e.g., GitHub Pages)

## 2) How the app is structured

- Entry point is `src/main.tsx`.
- Router mounts a shared layout component `src/pages/App.tsx`.
- Route pages:
  - `/` → `Home`
  - `/projects` → `Projects`
  - `/skills` → `Skills`
  - `/contact` → `Contact`

The `App` layout provides:
- Sticky top navigation (desktop + mobile drawer)
- Theme toggle (light/dark) with persistence in `localStorage`
- Footer

## 3) Page responsibilities

- **Home**: Hero intro with profile photo and motion-based entry animations.
- **Projects**: Typed data array rendered into cards with tags and bullet outcomes; publication items include external IEEE links.
- **Skills**: Category-based skill cards with icon chips (Devicon CDN) and emoji fallbacks.
- **Contact**: Email-first contact section and a form that generates a prefilled `mailto:` link (no backend/API form submission).

## 4) Styling and theming model

- Global design tokens are defined in `src/styles/globals.css` using CSS variables for:
  - background / foreground
  - muted text
  - card / border
  - primary accent colors
- Dark mode is class-based (`:root.dark`) and enabled via Tailwind `darkMode: 'class'`.
- Reusable utility classes (`.container`, `.btn`, `.chip`, `.card`) centralize repeated UI patterns.

## 5) Build & scripts

From `package.json`:
- `npm run dev` → local development server
- `npm run build` → type-check/build + production bundle
- `npm run preview` → preview production build
- `npm run lint` → ESLint
- `npm run typecheck` → TypeScript checks

## 6) Assets and public files

- `public/profile.jpg` and `public/RuthwikDovala.pdf` are consumed directly from static paths.
- `public/logo.svg` used as favicon.
- `public/robots.txt` includes an allow-all rule and a sitemap URL.
- `public/404.html` performs SPA route redirect behavior for static hosting edge cases.

## 7) Practical notes and constraints

- Contact form is intentionally client-only (`mailto:`), so no server-side validation/storage exists.
- Skill icons depend on external CDN URLs; broken/missing icons degrade gracefully.
- No explicit automated test suite is configured yet (build/type checks are primary validation).

## 8) Suggested next improvements

1. Add route-level SEO metadata (`react-helmet-async` or Vite SSR strategy).
2. Add lightweight analytics (privacy-conscious).
3. Add optional backend endpoint for contact submissions (while retaining `mailto` fallback).
4. Add unit/component tests (e.g., Vitest + React Testing Library).
5. Improve the SPA fallback redirect to preserve intended deep links more robustly.
