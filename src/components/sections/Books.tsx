'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useSiteContent } from '@/hooks/useSiteContent';

export default function Books() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { books } = useSiteContent();
  const book = books.books[0];

  if (!book) return null;

  return (
    <section id="books" ref={ref} className="py-24 bg-zinc-950" aria-label="Book">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2
            className="font-heading font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}
          >
            {books.heading}
          </h2>
          <p className="text-zinc-500 text-base mt-2">{books.subheading}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="flex flex-col bg-zinc-900 border border-primary-600/30 rounded-3xl overflow-hidden"
        >
          <div className="h-[3px] w-full bg-gradient-to-r from-primary-700 via-primary-500 to-primary-700" />

          <div className="p-8 sm:p-12">
            <span className="text-xs font-bold text-primary-400 uppercase tracking-[0.2em] mb-6 block">
              {book.badge}
            </span>

            <h3
              className="font-heading font-bold text-white leading-tight mb-2"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              {book.title}
            </h3>
            <p className="text-zinc-500 text-sm uppercase tracking-wider font-semibold mb-8">
              {book.subtitle}
            </p>

            <p className="text-zinc-300 text-lg leading-relaxed mb-10">
              {book.tagline}
            </p>

            <div className="flex justify-end pt-8 border-t border-zinc-800/80">
              <a
                href={book.gumroadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-500 text-white text-sm font-bold transition-colors"
              >
                Get it
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
