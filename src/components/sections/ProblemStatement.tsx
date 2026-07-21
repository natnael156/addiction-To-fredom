'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { scrollToSection } from '@/utils/helpers';
import { useSiteContent } from '@/hooks/useSiteContent';

export default function ProblemStatement() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { problem } = useSiteContent();

  return (
    <section
      ref={ref}
      id="problem"
      className="py-24 bg-zinc-900 relative overflow-hidden"
      aria-label="Why most attempts fail"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/4 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <h2
            className="font-heading font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)' }}
          >
            {problem.heading}
          </h2>
          <p className="text-zinc-500 text-base mt-3">{problem.subheading}</p>
        </motion.div>

        <div>
          {problem.points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.14 }}
              className="py-7 border-b border-zinc-800/50 last:border-0"
            >
              <h3 className="font-heading font-bold text-white text-lg mb-2 leading-snug">
                {p.heading}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{p.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-10"
        >
          <button
            onClick={() => scrollToSection('books')}
            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-semibold text-sm transition-colors group"
          >
            {problem.ctaText}
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
