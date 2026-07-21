import type { NavLink, Testimonial, FAQItem } from '@/types';

export const NAV_LINKS: NavLink[] = [
  { label: 'Books', href: '#books' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Marcus T.',
    quote:
      "I tried everything — apps, forums, cold showers. Nothing clicked until I read this. The CBT framework in the complete guide finally made me understand *why* I kept relapsing. 90 days clean.",
    result: '90-day streak',
    rating: 5,
  },
  {
    id: 2,
    name: 'Anonymous',
    quote:
      "The free starter guide alone was more useful than anything I found online. I downloaded it expecting nothing. I finished it in one sitting and started the 7-day plan that night.",
    result: 'Started free, bought the full guide',
    rating: 5,
    anonymous: true,
  },
  {
    id: 3,
    name: 'Jordan R.',
    quote:
      "The workbook is the piece I was missing. Having daily prompts kept me honest with myself. I stopped white-knuckling it and actually started understanding my triggers.",
    result: 'Completed 30-day workbook',
    rating: 5,
  },
  {
    id: 4,
    name: 'David K.',
    quote:
      "I was skeptical a book could help. But the relapse prevention blueprint alone was worth the price. It gave me a concrete plan for my hardest moments instead of just hoping for willpower.",
    result: 'Reduced relapses by 80%',
    rating: 5,
  },
  {
    id: 5,
    name: 'Anonymous',
    quote:
      "What hit me hardest was the chapter on shame. Nobody talks about that part. This book does — with honesty and zero judgment. It felt like someone finally understood.",
    result: '6 months of progress',
    rating: 5,
    anonymous: true,
  },
];

export const BOOKS = [
  {
    id: 1,
    title: 'The First 7 Days',
    subtitle: 'Free Starter Guide',
    tagline: "What to do in the first week. No fluff — just the actions that actually create momentum when nothing else has worked.",
    readTime: '~45 min read',
    format: 'PDF',
    featured: true,
    gumroadUrl: 'https://addiction-to-freedom.gumroad.com/l/first-7-days',
  },
];

export const STATS = [
  { value: '10,000+', label: 'readers helped' },
  { value: '4.9/5', label: 'average rating' },
  { value: '95%', label: 'report real progress' },
  { value: 'Free', label: 'starter guide' },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Is the starter guide really free?',
    answer:
      '"Breaking Free: The Starter Guide" is 100% free — no payment, no email required. Click the download button and you get the PDF instantly via Gumroad.',
  },
  {
    question: 'What format are the books delivered in?',
    answer:
      'The free guide and workbook are PDF. The Complete Recovery Guide comes as both PDF and ePub — readable on any phone, tablet, Kindle, or computer.',
  },
  {
    question: 'How does purchase and delivery work?',
    answer:
      "All books are sold through Gumroad — a trusted, secure platform for digital products. After purchase you'll get an instant download link by email. No account required.",
  },
  {
    question: 'Is my purchase private?',
    answer:
      'Yes. Gumroad uses standard secure checkout. Your name will appear on the receipt but your recovery journey stays completely private — nothing is shared.',
  },
  {
    question: 'Do I need to buy all three books?',
    answer:
      "No. Start with the free guide. If you want the full system, the Complete Recovery Guide has everything you need. The Workbook is an optional companion for people who want structured daily practice.",
  },
];

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/addiction_to_freedomm',
};

export const CRISIS_RESOURCES = [
  { name: 'SAMHSA Helpline', contact: '1-800-662-4357' },
  { name: 'Crisis Text Line', contact: 'Text HOME to 741741' },
  { name: 'National Lifeline', contact: 'Call or text 988' },
];
