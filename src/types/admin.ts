export interface HeroContent {
  headline1: string;
  headline2: string;
  headline3: string;
  subtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
  instagramHandle: string;
  instagramUrl: string;
}

export interface ProblemStatementContent {
  heading: string;
  subheading: string;
  points: { heading: string; body: string }[];
  ctaText: string;
}

export interface BookContent {
  id: number;
  title: string;
  subtitle: string;
  tagline: string;
  gumroadUrl: string;
  badge: string;
}

export interface BooksSection {
  heading: string;
  subheading: string;
  books: BookContent[];
}

export interface TestimonialContent {
  id: number;
  name: string;
  quote: string;
  result: string;
  screenshot?: string; // base64 data URL or URL
  anonymous?: boolean;
}

export interface TestimonialsSection {
  label: string;
  heading: string;
  items: TestimonialContent[];
}

export interface FAQItemContent {
  id: string;
  question: string;
  answer: string;
}

export interface FAQSection {
  label: string;
  heading: string;
  items: FAQItemContent[];
}

export interface SiteContent {
  hero: HeroContent;
  problem: ProblemStatementContent;
  books: BooksSection;
  testimonials: TestimonialsSection;
  faq: FAQSection;
}
