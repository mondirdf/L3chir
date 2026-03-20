'use client';

import { Instagram, Youtube } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

type YouTubeData = {
  subscriberCount: string;
  latestVideo: {
    title: string;
    thumbnail: string;
    url: string;
  };
};

type YouTubeApiPayload = {
  subscribers: string;
  latestVideoId: string;
  latestVideoThumbnail: string;
  latestVideoUrl: string;
  latestVideoTitle: string;
};

type SocialLink = {
  label: string;
  href: string;
  icon: 'youtube' | 'instagram' | 'tiktok';
  featured?: boolean;
};

const fallbackVideoUrl = 'https://m.youtube.com/watch?v=eJ2fj8YBSnU';
const fallbackVideoId = 'eJ2fj8YBSnU';

const defaultData: YouTubeData = {
  subscriberCount: '10K+',
  latestVideo: {
    title: 'Watch the latest story from L3chiiir',
    thumbnail: `https://i.ytimg.com/vi/${fallbackVideoId}/hqdefault.jpg`,
    url: fallbackVideoUrl
  }
};

const socialLinks: SocialLink[] = [
  {
    label: 'Watch on YouTube',
    href: 'https://youtube.com/@l3chiiir-j1r?si=GsErOCI5SHAR9wqz',
    icon: 'youtube'
  },
  {
    label: 'Watch the Series 🎬',
    href: fallbackVideoUrl,
    icon: 'youtube',
    featured: true
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/l3chiiiir?igsh=MTRoMTFuNnRieDd4bQ==',
    icon: 'instagram'
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@l3chiiir?_r=1&_t=ZS-94nRWhDifzM',
    icon: 'tiktok'
  }
];

const whatIDoContent = [
  {
    icon: '😂',
    title: 'Comedy Content',
    description: 'Short comedic sketches and relatable social situations.'
  },
  {
    icon: '📖',
    title: 'Storytelling',
    description: 'Narrative-driven videos inspired by real-life stories.'
  },
  {
    icon: '🎬',
    title: 'Entertainment Series',
    description: 'Episodic content with recurring characters and themes.'
  }
];

const contentStyleItems = ['Social Comedy', 'Algerian Culture Stories', 'Sketch Characters', 'Daily Life Humor'];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 }
};

function PlatformIcon({ icon }: { icon: SocialLink['icon'] }) {
  if (icon === 'youtube') return <Youtube className="h-5 w-5" aria-hidden="true" />;
  if (icon === 'instagram') return <Instagram className="h-5 w-5" aria-hidden="true" />;

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.231h-3.4v13.715a2.9 2.9 0 1 1-2.9-2.9c.233 0 .46.028.678.08V9.89a6.35 6.35 0 1 0 6.222 6.35V9.228a8.165 8.165 0 0 0 4.784 1.525V7.4a4.83 4.83 0 0 1-1.614-.714Z" />
    </svg>
  );
}

export default function Home() {
  const [youtubeData, setYoutubeData] = useState(defaultData);
  const [thumbnailSrc, setThumbnailSrc] = useState(defaultData.latestVideo.thumbnail);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });

  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 19) % 100}%`,
        delay: `${(i % 7) * 0.6}s`,
        duration: `${7 + (i % 5)}s`
      })),
    []
  );

  useEffect(() => {
    const loadYouTubeData = async () => {
      try {
        const response = await fetch('/api/youtube');
        if (!response.ok) return;
        const payload = (await response.json()) as YouTubeApiPayload;
        setYoutubeData((current) => ({
          ...current,
          subscriberCount: payload.subscribers?.trim() || defaultData.subscriberCount,
          latestVideo: {
            title: payload.latestVideoTitle?.trim() || defaultData.latestVideo.title,
            thumbnail: payload.latestVideoThumbnail?.trim() || defaultData.latestVideo.thumbnail,
            url: payload.latestVideoUrl?.trim() || defaultData.latestVideo.url
          }
        }));
      } catch {
        // fallback remains visible
      }
    };

    const onMove = (event: MouseEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', onMove);
    void loadYouTubeData();

    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const trimmedThumbnail = youtubeData.latestVideo.thumbnail?.trim();
    setThumbnailSrc(trimmedThumbnail || defaultData.latestVideo.thumbnail);
  }, [youtubeData.latestVideo.thumbnail]);

  return (
    <main className="relative z-10 mx-auto min-h-screen w-full max-w-[1100px] overflow-hidden px-5 pb-16 pt-8 sm:px-6 lg:pt-[60px]">
      <div
        className="pointer-events-none fixed z-0 h-44 w-44 rounded-full bg-[rgba(249,115,22,0.22)] blur-3xl transition-transform duration-300"
        style={{ transform: `translate(${cursor.x - 88}px, ${cursor.y - 88}px)` }}
      />

      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {particles.map((particle) => (
          <span
            key={particle.id}
            className="absolute block h-1.5 w-1.5 rounded-full bg-[rgba(251,146,60,0.34)]"
            style={{
              left: particle.left,
              bottom: '-10%',
              animation: `floatParticle ${particle.duration} linear infinite`,
              animationDelay: particle.delay
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes floatParticle {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          15% { opacity: 0.65; }
          100% { transform: translateY(-120vh) scale(1.1); opacity: 0; }
        }
      `}</style>

      <div className="flex flex-col gap-8 lg:gap-10">
        <motion.section
          className="glass-card floating px-6 py-8 text-center lg:mx-auto lg:w-full lg:max-w-[440px]"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto h-[118px] w-[118px] rounded-full border border-white/20 p-[6px] [animation:ringPulse_3s_ease-in-out_infinite]">
            <div className="relative h-full w-full rounded-full border border-[rgba(255,255,255,0.15)] p-[4px] shadow-[0_0_28px_rgba(249,115,22,0.28)]">
              <Image
                src="/l3chiiir.svg"
                alt="L3chiiir profile"
                fill
                sizes="108px"
                className="rounded-full object-cover"
              />
            </div>
          </div>
          <h1 className="heading-font mt-5 text-5xl uppercase leading-none">L3chiiir</h1>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-[#D7C0B4]">Comedian &amp; Storytelling Creator</p>
          <p className="mt-4 text-sm leading-relaxed text-[#E6D4C9]">
            Creating comedic stories, social sketches, and entertaining content inspired by real life.
          </p>
          <div className="mx-auto mt-5 w-fit rounded-full border border-[rgba(251,146,60,0.32)] bg-[rgba(249,115,22,0.10)] px-4 py-2 text-sm shadow-[0_0_24px_rgba(249,115,22,0.14)]">
            Subscribers: <span className="font-semibold">{youtubeData.subscriberCount}</span>
          </div>
        </motion.section>

        <motion.section
          className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.99 }}
              className={`glass-card group relative flex h-[60px] items-center justify-center overflow-hidden text-sm font-medium ${
                link.featured
                  ? 'border-[rgba(251,146,60,0.55)] bg-[linear-gradient(135deg,rgba(249,115,22,0.24),rgba(239,68,68,0.12))] shadow-[0_12px_30px_rgba(249,115,22,0.18)]'
                  : ''
              }`}
            >
              <span className="absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition duration-700 group-hover:left-[120%] group-hover:opacity-100" />
              <span className="relative z-10 flex items-center gap-2.5">
                <PlatformIcon icon={link.icon} />
                <span>{link.label}</span>
              </span>
            </motion.a>
          ))}
        </motion.section>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="heading-font mb-4 text-3xl uppercase">Latest Video</h2>
            <motion.a
              href={youtubeData.latestVideo.url || defaultData.latestVideo.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass-card soft-glow block overflow-hidden"
            >
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <img
                  src={thumbnailSrc}
                  alt="Latest L3chiiir video"
                  className="h-full w-full object-cover"
                  onError={() => {
                    if (thumbnailSrc !== defaultData.latestVideo.thumbnail) {
                      setThumbnailSrc(defaultData.latestVideo.thumbnail);
                    }
                  }}
                />
              </div>
              <div className="border-t border-white/15 p-4">
                <p className="text-sm text-[#E2CCC0]">{youtubeData.latestVideo.title}</p>
              </div>
            </motion.a>
          </motion.section>

          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <h2 className="heading-font mb-4 text-3xl uppercase">What I Do</h2>
            <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:gap-6">
              {whatIDoContent.map((item) => (
                <motion.article
                  key={item.title}
                  whileHover={{
                    scale: 1.03,
                    boxShadow:
                      '0 0 0 1px rgba(251,146,60,0.28), 0 18px 38px rgba(0,0,0,0.55), 0 0 34px rgba(249,115,22,0.22)'
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="glass-card group relative overflow-hidden p-5"
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.22),transparent_58%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="text-3xl" aria-hidden="true">
                      {item.icon}
                    </div>
                    <h3 className="heading-font mt-4 text-2xl uppercase leading-none">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#D8C5BA]">{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      <motion.section
        className="glass-card soft-glow mt-6 px-6 py-10 text-center lg:mt-8"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
      >
        <p className="heading-font text-3xl uppercase leading-tight">Content Style</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {contentStyleItems.map((item) => (
            <span
              key={item}
              className="rounded-full border border-[rgba(251,146,60,0.3)] bg-[rgba(249,115,22,0.10)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#FFE7D7]"
            >
              {item}
            </span>
          ))}
        </div>
        <p className="mt-8 heading-font text-3xl uppercase leading-tight">Join the community on YouTube.</p>
        <motion.a
          href="https://youtube.com/@l3chiiir-j1r?si=GsErOCI5SHAR9wqz"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6 inline-flex h-[56px] items-center justify-center rounded-2xl border border-[rgba(251,146,60,0.7)] bg-[linear-gradient(135deg,#ea580c,#dc2626)] px-8 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_30px_rgba(234,88,12,0.42)]"
        >
          Subscribe
        </motion.a>
      </motion.section>

      <footer className="pb-2 pt-8 text-center text-xs text-[#D9C7BD]">
        made by{' '}
        <a
          href="https://df-code.vercel.app/"
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-white underline decoration-orange-400/80 underline-offset-4"
        >
          df
        </a>
      </footer>
    </main>
  );
}
