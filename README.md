# AddictionToFreedom

A compassionate, evidence-based recovery coaching platform helping individuals overcome compulsive habits through personalized plans, daily accountability, and community support.

## Tech Stack

- **Next.js 14** (Pages Router, TypeScript)
- **Tailwind CSS 3** — custom recovery-themed design system
- **Framer Motion** — smooth animations and transitions
- **React Hook Form + Zod** — validated contact forms
- **Lucide React** — icons

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/addiction-to-freedom.git
cd addiction-to-freedom

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

See `.env.example` for all required variables:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` | GA4 measurement ID |
| `SENDGRID_API_KEY` | SendGrid API key for contact emails |
| `CONTACT_EMAIL` | Email address to receive contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | Production site URL for SEO/OG tags |

## Project Structure

```
src/
├── components/
│   ├── layout/      # Header, Footer
│   ├── sections/    # Hero, Features, HowItWorks, Testimonials, Pricing, FAQ, CTA
│   ├── ui/          # Button, Card, Badge, Modal
│   └── common/      # ContactForm
├── pages/           # Next.js pages + API routes
├── styles/          # globals.css
├── utils/           # constants, helpers, validators
├── hooks/           # useScroll
└── types/           # TypeScript interfaces
```

## Deployment

Deploy to Vercel in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/addiction-to-freedom)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

## Crisis Resources

If you or someone you know is in crisis:

- **SAMHSA National Helpline**: 1-800-662-4357
- **Crisis Text Line**: Text HOME to 741741
- **National Suicide Prevention Lifeline**: 988

## License

MIT — see [LICENSE](LICENSE)
