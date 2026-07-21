import type { SiteContent } from '@/types/admin';

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    headline1: "You've tried to stop.",
    headline2: "It didn't stick.",
    headline3: "Here's why — and how to fix it.",
    subtext:
      'Most people fail because they fight the urge without understanding it. These books give you the system that actually works.',
    ctaPrimary: 'See the books',
    ctaSecondary: 'Why most attempts fail',
    instagramHandle: '@addiction_to_freedomm',
    instagramUrl: 'https://www.instagram.com/addiction_to_freedomm',
  },
  problem: {
    heading: 'Why most attempts fail.',
    subheading: 'If you have tried before and it did not stick — this is why.',
    ctaText: 'See what actually works',
    points: [
      {
        heading: 'You keep restarting. Not because you are weak.',
        body: "You restart because nobody taught you what is actually driving it. The urge is not the problem — it is a symptom. Fighting it directly never works.",
      },
      {
        heading: 'Every failed attempt makes the shame worse.',
        body: "And shame is fuel. The more you hate yourself for relapsing, the more you need an escape. That escape is the same habit you are trying to quit.",
      },
      {
        heading: 'Motivation runs out. A system does not.',
        body: "You need something that works on your worst days — when motivation is zero and the urge is loudest. That is what these books are built for.",
      },
    ],
  },
  books: {
    heading: 'The book.',
    subheading: 'Tap to see all books and download instantly.',
    books: [
      {
        id: 1,
        title: 'The First 7 Days',
        subtitle: 'Free Starter Guide',
        tagline:
          "What to do in the first week. No fluff — just the actions that actually create momentum when nothing else has worked.",
        gumroadUrl: 'https://addiction-to-freedom.gumroad.com/l/first-7-days',
        badge: 'Free',
      },
    ],
  },
  testimonials: {
    label: 'Real readers',
    heading: 'What people are saying.',
    items: [
      {
        id: 1,
        name: 'Marcus T.',
        quote:
          "I tried everything — apps, forums, cold showers. Nothing clicked until I read this. The CBT framework in the complete guide finally made me understand *why* I kept relapsing. 90 days clean.",
        result: '90-day streak',
      },
      {
        id: 2,
        name: 'Anonymous',
        quote:
          "The free starter guide alone was more useful than anything I found online. I downloaded it expecting nothing. I finished it in one sitting and started the 7-day plan that night.",
        result: 'Started free, bought the full guide',
        anonymous: true,
      },
      {
        id: 3,
        name: 'Jordan R.',
        quote:
          "The workbook is the piece I was missing. Having daily prompts kept me honest with myself. I stopped white-knuckling it and actually started understanding my triggers.",
        result: 'Completed 30-day workbook',
      },
      {
        id: 4,
        name: 'David K.',
        quote:
          "I was skeptical a book could help. But the relapse prevention blueprint alone was worth the price. It gave me a concrete plan for my hardest moments instead of just hoping for willpower.",
        result: 'Reduced relapses by 80%',
      },
      {
        id: 5,
        name: 'Anonymous',
        quote:
          "What hit me hardest was the chapter on shame. Nobody talks about that part. This book does — with honesty and zero judgment. It felt like someone finally understood.",
        result: '6 months of progress',
        anonymous: true,
      },
    ],
  },
  faq: {
    label: 'Common questions',
    heading: 'Frequently asked questions',
    items: [
      {
        id: 'faq-1',
        question: 'Is the starter guide really free?',
        answer:
          '"Breaking Free: The Starter Guide" is 100% free — no payment, no email required. Click the download button and you get the PDF instantly via Gumroad.',
      },
      {
        id: 'faq-2',
        question: 'What format are the books delivered in?',
        answer:
          'The free guide and workbook are PDF. The Complete Recovery Guide comes as both PDF and ePub — readable on any phone, tablet, Kindle, or computer.',
      },
      {
        id: 'faq-3',
        question: 'How does purchase and delivery work?',
        answer:
          "All books are sold through Gumroad — a trusted, secure platform for digital products. After purchase you'll get an instant download link by email. No account required.",
      },
      {
        id: 'faq-4',
        question: 'Is my purchase private?',
        answer:
          'Yes. Gumroad uses standard secure checkout. Your name will appear on the receipt but your recovery journey stays completely private — nothing is shared.',
      },
      {
        id: 'faq-5',
        question: 'Do I need to buy all three books?',
        answer:
          "No. Start with the free guide. If you want the full system, the Complete Recovery Guide has everything you need. The Workbook is an optional companion for people who want structured daily practice.",
      },
    ],
  },
};
