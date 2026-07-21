import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { BOOKS } from '@/utils/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const BooksPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Books — AddictionToFreedom</title>
        <meta
          name="description"
          content="Recovery books to help you understand and break compulsive habits. Download instantly via Gumroad."
        />
      </Head>

      <main className="min-h-screen bg-zinc-950 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">

          {/* Back link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors text-sm"
            >
              <ArrowLeft size={14} />
              Back
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <h1
              className="font-heading font-bold text-white leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              All books.
            </h1>
            <p className="text-zinc-500 text-base mt-3">
              Tap any book to open it on Gumroad and download instantly.
            </p>
          </motion.div>

          {/* Book cards */}
          <div className="space-y-5">
            {BOOKS.map((book, i) => (
              <motion.a
                key={book.id}
                href={book.gumroadUrl}
                target="_blank"
                rel="noopener noreferrer"
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="group flex flex-col bg-zinc-900 border border-primary-600/30 rounded-3xl overflow-hidden hover:border-primary-500/60 hover:shadow-2xl hover:shadow-primary-600/10 transition-all duration-300 cursor-pointer"
                aria-label={`Open ${book.title} on Gumroad`}
              >
                <div className="h-[3px] w-full bg-gradient-to-r from-primary-700 via-primary-500 to-primary-700" />

                <div className="p-8 sm:p-10">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-[0.2em] mb-5 block">
                    {book.subtitle}
                  </span>

                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="font-heading font-bold text-white text-2xl sm:text-3xl leading-tight mb-4">
                        {book.title}
                      </h2>
                      <p className="text-zinc-400 text-base leading-relaxed">
                        {book.tagline}
                      </p>
                    </div>

                    <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary-600/15 border border-primary-600/20 flex items-center justify-center group-hover:bg-primary-600/25 transition-colors">
                      <ArrowUpRight
                        size={20}
                        className="text-primary-400 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Bottom note */}
          <motion.p
            custom={BOOKS.length + 1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-center text-xs text-zinc-700 mt-10"
          >
            All books delivered instantly via Gumroad.
          </motion.p>

        </div>
      </main>
    </>
  );
};

export default BooksPage;
