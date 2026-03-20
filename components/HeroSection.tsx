'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=2100&q=80')"
        }}
      />
      <div className="cinematic-overlay absolute inset-0" />

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: 'easeOut' }}
        className="section-shell relative z-10 text-center"
      >
        <p className="section-label">L3chiiir • Creator World</p>
        <h1 className="heading-font text-7xl leading-[0.9] sm:text-8xl md:text-9xl">L3chiiir</h1>

        <p className="mt-5 text-sm uppercase tracking-[0.3em] text-[#BFBFBF] md:text-base">
          Comedian &amp; Storytelling Creator
        </p>

        <p className="mx-auto mt-6 max-w-3xl text-sm uppercase tracking-[0.3em] text-[#D8B4A0] md:text-base">
          Social Comedy • Algerian Culture Stories • Daily Life Humor
        </p>

        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-[#F2D5C6] md:text-base">
          Creating comedic stories, social sketches, and entertaining content inspired by real life.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#videos"
            className="border border-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-white hover:text-black"
          >
            Watch Videos
          </a>
          <a
            href="#content-style"
            className="border border-[#3A1C12] bg-white/5 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:border-white hover:bg-white hover:text-black"
          >
            Explore Style
          </a>
        </div>
      </motion.div>
    </section>
  );
}
