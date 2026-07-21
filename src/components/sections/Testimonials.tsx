'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useSiteContent } from '@/hooks/useSiteContent';
import Image from 'next/image';

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { testimonials } = useSiteContent();
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="testimonials" ref={ref} className="py-28 bg-zinc-900" aria-label="Testimonials">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-bold text-primary-400 uppercase tracking-[0.2em] mb-4">
            {testimonials.label}
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white leading-tight">
            {testimonials.heading}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.items.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col bg-zinc-950 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors"
            >
              {/* Screenshot thumbnail */}
              {t.screenshot && (
                <button
                  onClick={() => setLightbox(t.screenshot!)}
                  className="mb-4 rounded-xl overflow-hidden border border-zinc-700 hover:border-primary-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  aria-label={`View screenshot for ${t.name}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.screenshot}
                    alt={`Reader screenshot from ${t.name}`}
                    className="w-full h-36 object-cover object-top"
                  />
                </button>
              )}

              <p className="text-zinc-300 leading-relaxed text-sm flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="mt-5 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-primary-400 text-xs font-medium mt-0.5">{t.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot preview"
          >
            <motion.div
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.92 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightbox}
                alt="Reader screenshot"
                className="w-full rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-zinc-800 border border-zinc-600 text-zinc-300 hover:text-white flex items-center justify-center text-lg font-bold"
                aria-label="Close preview"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
