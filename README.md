# BhumKiran Portfolio

A modern personal portfolio built with Next.js, React, Tailwind CSS, and Contentful. This project showcases the developer's hero introduction, services, portfolio projects, resume section, contact form, and an interactive developer playground.

## Overview

Key features:

- Dynamic content sourced from Contentful for hero, features, portfolio, and resume sections
- Mobile-friendly layout with responsive navigation
- Contact page with form submission, email notifications, and auto-reply via Nodemailer
- Project detail modal with PDF support and external links
- Interactive developer tools page with mini-app experiences
- Blog listing page with clickable story cards

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Contentful
- Nodemailer
- Framer Motion
- Lucide React icons
- Sonner toast notifications
- Google Generative AI dependencies available

## Project Structure

- `app/` - application routes and page entrypoints
- `components/` - reusable UI components (Hero, Features, Navbar, Footer, Resume, Portfolio, etc.)
- `modal/` - project details modal component
- `lib/` - Contentful client configuration
- `service/` - helper service for fetching Contentful data
- `app/api/contact/route.ts` - contact API route to send emails
- `public/` - static assets and images

## Available Pages

- `/` - main portfolio landing page
- `/contact` - contact chat and inquiry interface
- `/blog` - blog listing page
- `/fun` - developer playground with mini tools and interactive widgets

## Installation

```bash
cd bhumkiran
pnpm install
```

> You can also use `npm install` or `yarn install` if you prefer.

## Running Locally

```bash
pnpm dev
```

Open `http://localhost:3000` in your browser.

## Build

```bash
pnpm run build
```

## Environment Variables

Create a `.env` file or provide these variables in your environment:

```bash
NEXT_PUBLIC_CONTENTFUL_SPACE_ID=your_space_id
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN=your_access_token
NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT=master
EMAIL=your_email@example.com
PASSWORD=your_email_password
```

## Contact API

The contact form sends inquiry emails using `nodemailer` through `app/api/contact/route.ts`. It also sends an auto-reply email to the submitting user.

## Contentful Integration

The site uses the Contentful client defined in `lib/contentful.ts` and fetches portfolio content in `service/Contentful.ts`.

Contentful fields power:

- hero section
- features/services section
- portfolio projects
- resume data

## Notes

- The contact page includes a chat-like interface and several quick message templates.
- The `/fun` page includes interactive components such as a terminal, memory game, code playground, and easter egg panel.
- The blog page currently uses static card data and routes to corresponding blog detail pages.

## Scripts

- `pnpm dev` - start the development server
- `pnpm build` - create a production build
- `pnpm start` - run the production server
- `pnpm lint` - run ESLint

## Deployment

This project is ready for deployment on any platform that supports Next.js. Vercel is recommended for the easiest setup.

## Docker

This project includes a `Dockerfile` and `docker-compose.yml` for efficient local container builds and deployment.

### Local container workflow

```bash
cd bhumkiran
pnpm install
# Copy .env.example to .env and fill in your real values
cp .env.example .env
# Edit .env with your Contentful keys and email credentials
docker compose build
docker compose up -d
```

Then open `http://localhost:3000`.

**Note:** The Docker build requires valid Contentful credentials in `.env` to fetch portfolio data during the Next.js build process. Without real values, the build will fail with "Expected parameter accessToken".

### Vercel deployment with Docker

1. Push this repository to GitHub, GitLab, or another supported Git provider.
2. In Vercel, create a new project and import the repo.
3. Select the Docker deployment option or use the `Dockerfile` deployment preset.
4. Add these environment variables in Vercel:
   - `CONTENTFUL_SPACE_ID`
   - `CONTENTFUL_ACCESS_TOKEN`
   - `CONTENTFUL_ENVIRONMENT`
   - `EMAIL`
   - `PASSWORD`
5. Deploy. Vercel will build the Docker image and run the container.

## License

This repository is currently configured as a private personal portfolio project.
