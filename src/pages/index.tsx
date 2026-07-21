import type { NextPage } from 'next';
import Head from 'next/head';
import Hero from '@/components/sections/Hero';
import ProblemStatement from '@/components/sections/ProblemStatement';
import Books from '@/components/sections/Books';
import Testimonials from '@/components/sections/Testimonials';
import FAQ from '@/components/sections/FAQ';

const SITE_NAME = 'AddictionToFreedom';
const DESCRIPTION =
  'Recovery books for compulsive habits. Download the free starter guide instantly — no signup, no subscription.';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://addictiontofreedom.com';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>{SITE_NAME} — You have tried to stop. This time is different.</title>
        <meta name="description" content={DESCRIPTION} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={`${SITE_NAME} — Recovery books that actually help.`} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${SITE_NAME} — Recovery books that actually help.`} />
        <meta name="twitter:description" content={DESCRIPTION} />
      </Head>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50 font-medium"
      >
        Skip to main content
      </a>

      <main id="main-content">
        <Hero />
        <ProblemStatement />
        <Books />
        <Testimonials />
        <FAQ />
      </main>
    </>
  );
};

export default Home;
