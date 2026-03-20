'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      className="section-spacing border-y border-[#1A1A1A]"
    >
      <div className="section-shell grid items-center gap-12 md:grid-cols-2">
        <div className="relative h-[430px] overflow-hidden border border-[#1A1A1A]">
          <Image src="/l3chiiir.svg" alt="L3chiiir portrait" fill className="object-cover" />
        </div>
        <div>
          <p className="section-label">About</p>
          <h2 className="heading-font text-5xl md:text-6xl">About L3chiiir</h2>
          <p className="mt-6 leading-relaxed text-[#BFBFBF]">
            L3chiiir creates comedic stories, social sketches, and narrative-driven videos inspired by real life.
          </p>
          <p className="mt-4 leading-relaxed text-[#BFBFBF]">
            The content blends humor, relatable characters, and episodic entertainment in a clean dark presentation.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
