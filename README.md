# BhumKiran Portfolio

A personal portfolio for Bhum Bikram Silwal built with Next.js, React, TypeScript, Tailwind CSS, and Contentful. It includes a dynamic homepage, portfolio project modals, resume content, a blog section, a chat-style contact experience, and an interactive developer tools page.

## Features

- Contentful-powered hero, services/features, projects, resume, and blog content
- Responsive portfolio homepage with animated role text and social links
- Project cards with detail modal support
- Blog listing and dynamic blog detail routes
- Chat-style contact page with quick replies, contact form submission, and email auto-reply
- AI-assisted visitor replies through Groq's OpenAI-compatible chat API
- `/fun` page with a code playground, terminal, memory game, and hidden terminal panel
- Standalone Next.js output for Docker-friendly deployment

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Contentful
- Nodemailer
- Groq API
- Framer Motion
- Lucide React
- React Icons
- Sonner

## Project Structure

```text
bhumkiran/
  app/                  Next.js App Router pages and API routes
  app/api/ai/           Groq-powered chat reply endpoint
  app/api/contact/      Contact form email endpoint
  app/api/contentful/   Contentful fetch endpoint
  components/           Shared UI and page sections
  components/tools/     Interactive tools for the /fun page
  lib/                  Contentful client setup
  modal/                Project detail modal
  public/               Static assets
  service/              Client-side data fetch helpers
```

## Pages

- `/` - portfolio homepage
- `/contact` - chat-style contact and inquiry page
- `/blog` - blog listing page
- `/blog/[id]` - blog detail page
- `/fun` - developer tools playground

## Getting Started

Install dependencies from the app directory:

```bash
cd bhumkiran
pnpm install
```

Create `bhumkiran/.env.local`:

```bash
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
CONTENTFUL_ENVIRONMENT=master

EMAIL=your_gmail_address
PASSWORD=your_gmail_app_password

GROQ_API_KEY=your_groq_api_key
```

Start the development server:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Scripts

```bash
pnpm dev      # Start the local development server
pnpm build    # Create a production build
pnpm start    # Run the production server
pnpm lint     # Run ESLint
```

## Environment Variables

| Variable | Required | Used for |
| --- | --- | --- |
| `CONTENTFUL_SPACE_ID` | Yes | Contentful space connection |
| `CONTENTFUL_ACCESS_TOKEN` | Yes | Contentful delivery API access |
| `CONTENTFUL_ENVIRONMENT` | No | Contentful environment, defaults to `master` |
| `EMAIL` | Yes | Gmail account used by Nodemailer |
| `PASSWORD` | Yes | Gmail app password used by Nodemailer |
| `GROQ_API_KEY` | Yes for AI chat | Visitor chat replies through `/api/ai` |

## Contentful

The Contentful client lives in `lib/contentful.ts`, and `/api/contentful` fetches the first `myPortfolio` entry. The frontend reads that data through `service/Contentful.ts`.

Current Contentful-backed sections include:

- hero
- features/services
- portfolio projects
- resume
- blog cards and blog details

## Email And AI

The contact form posts to `/api/contact`, which sends the inquiry to the configured `EMAIL` address and sends an auto-reply to the visitor.

The chat experience can also post to `/api/ai`, which calls Groq's OpenAI-compatible API using the `llama-3.1-8b-instant` model.

## Docker

Build and run locally with Docker Compose:

```bash
cd bhumkiran
docker compose build
docker compose up -d
```

By default the app is available at `http://localhost:3000`. You can override the host port with `WEB_PORT` in `.env.local`.

## Deployment

This app can be deployed anywhere that supports Next.js standalone output or Docker containers. Vercel is the simplest option for a Next.js deployment.

For production, configure the same environment variables listed above in your hosting provider.

## License

Private personal portfolio project.
