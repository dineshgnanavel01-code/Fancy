import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, Sparkles, Diamond, ShieldCheck } from "lucide-react";

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [closing, setClosing] = useState(false);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);

  const luxuryPhrases = [
    "Refining Curated Collections",
    "Crafting Bespoke Elegance",
    "Unveiling Luxury & Style",
    "Welcome to LUXE ORA",
  ];

  useEffect(() => {
    let value = 0;

    const timer = setInterval(() => {
      value += Math.floor(Math.random() * 4) + 3;

      if (value >= 100) {
        value = 100;
        clearInterval(timer);

        setTimeout(() => {
          setClosing(true);
          setTimeout(() => {
            onComplete?.();
          }, 1100);
        }, 600);
      }

      setProgress(value);
    }, 70);

    const phraseInterval = setInterval(() => {
      setActivePhraseIndex((prev) => (prev + 1) % luxuryPhrases.length);
    }, 1200);

    return () => {
      clearInterval(timer);
      clearInterval(phraseInterval);
    };
  }, [onComplete]);

  const floatingCards = [
    { label: "Haute Couture", icon: Crown, top: "18%", left: "12%", delay: 0 },
    { label: "Bespoke Jewelry", icon: Diamond, top: "68%", left: "8%", delay: 1.2 },
    { label: "Verified Craft", icon: ShieldCheck, top: "22%", right: "10%", delay: 0.6 },
    { label: "Exquisite Living", icon: Sparkles, top: "72%", right: "12%", delay: 1.8 },
  ];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex flex-col justify-between overflow-hidden bg-[#0a0a09] font-sans text-white select-none"
      style={{ perspective: "1800px" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#181510_0%,#0a0a09_100%)]" />

      {/* Pulsing Light Orbs */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d5b777]/10 blur-[140px]"
        animate={{
          scale: [1, 1.35, 1],
          opacity: [0.3, 0.65, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute top-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-[#a17b38]/15 blur-[120px]"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      {floatingCards.map((card, idx) => {
        const CardIcon = card.icon;
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{
              opacity: [0.2, 0.7, 0.2],
              y: [0, -18, 0],
            }}
            transition={{
              duration: 5,
              delay: card.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              top: card.top,
              left: card.left,
              right: card.right,
            }}
            className="absolute hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-2.5 backdrop-blur-md lg:flex"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#a17b38]/20 text-[#d5b777]">
              <CardIcon size={14} />
            </div>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/70">
              {card.label}
            </span>
          </motion.div>
        );
      })}
      <header className="relative z-10 flex items-center justify-between px-8 pt-8 sm:px-12 sm:pt-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2"
        >
          <Crown size={18} className="text-[#d5b777]" />
          <span className="font-serif text-sm font-semibold tracking-[0.25em] text-white">
            LUXE ORA
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[9px] font-medium uppercase tracking-[0.35em] text-[#d5b777]/80"
        >
          EST. 2026 • MAISON
        </motion.div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4">
        <div
          className="relative flex flex-col items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Outer Orbit Rings */}
          <motion.div
            animate={{ rotateZ: 360, rotateX: [0, 25, 0] }}
            transition={{
              rotateZ: { duration: 14, repeat: Infinity, ease: "linear" },
              rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute h-[320px] w-[320px] rounded-full border border-[#d5b777]/20 sm:h-[400px] sm:w-[400px]"
          >
            <span className="absolute left-1/2 top-[-5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#d5b777] shadow-[0_0_15px_#d5b777]" />
          </motion.div>

          <motion.div
            animate={{ rotateZ: -360, rotateY: [0, -30, 0] }}
            transition={{
              rotateZ: { duration: 18, repeat: Infinity, ease: "linear" },
              rotateY: { duration: 7, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute h-[260px] w-[260px] rounded-full border border-dashed border-[#a17b38]/30 sm:h-[330px] sm:w-[330px]"
          >
            <span className="absolute bottom-0 right-1/2 h-2 w-2 translate-x-1/2 rounded-full bg-[#a17b38] shadow-[0_0_12px_#a17b38]" />
          </motion.div>

          {/* Central Monogram Emblem */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, rotateY: 15 }}
            className="group relative flex h-36 w-36 items-center justify-center rounded-full border border-[#d5b777]/40 bg-gradient-to-b from-[#1c1913] to-[#0a0a09] shadow-[0_0_80px_rgba(161,123,56,0.25)] sm:h-44 sm:w-44"
          >
            {/* Inner Rotating Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-transparent border-t-[#d5b777]"
            />

            {/* Glowing Backdrop */}
            <div className="absolute inset-0 rounded-full bg-[#d5b777]/10 blur-xl transition duration-500 group-hover:bg-[#d5b777]/20" />

            <div className="relative z-10 text-center">
              <span className="font-serif text-5xl font-extralight tracking-widest text-[#d5b777] sm:text-6xl">
                LO
              </span>
              <div className="mx-auto mt-1 h-0.5 w-6 bg-[#a17b38]" />
            </div>
          </motion.div>

          {/* Brand Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-10 font-serif text-3xl font-medium tracking-[0.35em] text-white sm:text-4xl"
          >
            LUXE ORA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-2 text-[10px] font-semibold uppercase tracking-[0.45em] text-[#a17b38]"
          >
            Haute Couture & Fine Lifestyle
          </motion.p>
        </div>
      </main>

      <footer className="relative z-10 flex flex-col items-center pb-12 px-6">
        <div className="w-full max-w-md">
          <div className="relative h-6 overflow-hidden text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={activePhraseIndex}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#d5b777]"
              >
                {luxuryPhrases[activePhraseIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="relative mt-3 h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#8b692f] via-[#d5b777] to-[#ffffff]"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />

            <motion.div
              className="absolute top-0 h-full w-24 bg-white/60 blur-sm"
              animate={{ left: ["-30%", "130%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/40">
            <span>Loading Experience</span>
            <span className="font-mono text-[#d5b777]">{progress}%</span>
          </div>
        </div>
      </footer>

    
      {closing && (
        <>
          {/* Layer 1: Dark Bronze */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="absolute inset-0 z-30 origin-bottom bg-[#2b2214]"
          />

          {/* Layer 2: Signature Gold */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.77, 0, 0.175, 1],
            }}
            className="absolute inset-0 z-40 origin-bottom bg-[#d5b777]"
          />

          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.77, 0, 0.175, 1],
            }}
            className="absolute inset-0 z-50 origin-bottom bg-[#faf8f3]"
          />
        </>
      )}
    </motion.div>
  );
}