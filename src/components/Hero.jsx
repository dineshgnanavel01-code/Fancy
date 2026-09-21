import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, ShoppingBag, Eye, Star } from "lucide-react";

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 25 };
const heroSlides = [ { id: 1, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=90", label: "Featured Spotlight", title: "The Velvet & Gold Capsule", description: "Timeless silhouettes with a modern luxury edge.", }, { id: 2, image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1400&q=90", label: "New Collection", title: "Modern Muse Collection", description: "Elegant tailoring designed for unforgettable moments.", }, { id: 3, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1400&q=90", label: "Editor's Choice", title: "The Golden Hour Edit", description: "Refined essentials for effortless everyday luxury.", }, { id: 4, image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1400&q=90", label: "Limited Edition", title: "After Dark Atelier", description: "Statement fashion crafted for the modern icon.", }, ];
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [12, -12]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-12, 12]),
    springConfig
  );

  const glareX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [0, 100]),
    springConfig
  );
  const glareY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [0, 100]),
    springConfig
  );

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const currentMouseX = e.clientX - rect.left;
    const currentMouseY = e.clientY - rect.top;

    mouseX.set(currentMouseX / width - 0.5);
    mouseY.set(currentMouseY / height - 0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="home" className="relative overflow-hidden bg-[#faf9f7] pt-20">
      <div className="pointer-events-none absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-[#a17b38]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 top-10 h-[500px] w-[500px] rounded-full bg-[#d5b777]/15 blur-[140px]" />

      <div className="mx-auto grid min-h-[780px] max-w-[2500px] items-center gap-12 px-5 py-12 lg:grid-cols-2 lg:px-10">
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="z-10"
        >
          {/* Badge with 3D Hover Elevate */}
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="mb-6 inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-[#a17b38]/30 bg-[#a17b38]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#8a682e] shadow-sm backdrop-blur-md hover:bg-[#a17b38]/15 hover:shadow-md"
          >
            <Sparkles size={14} className="animate-pulse text-[#a17b38]" />
            Autumn / Winter '26 Edition
          </motion.div>

          <h1 className="max-w-full text-5xl font-light leading-[0.95] tracking-tight text-[#111110] sm:text-7xl lg:text-[5.25rem]">
            Redefine <br />
            <span className="font-serif italic text-[#a17b38]">
              Signature
            </span>{" "}
            Style.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-black/60 sm:text-lg">
            Experience bespoke luxury crafted for the modern icon. Unveiling 
            haute couture apparel, fine jewellery, and hand-finished leather essentials.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              href="#shop"
              className="luxe-button group flex items-center gap-3 rounded-full bg-[#11110f] px-8 py-4 text-sm font-medium tracking-wide text-white shadow-xl transition hover:bg-[#a17b38]"
            >
              <ShoppingBag size={17} />
              Shop Now
              <ArrowRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              href="#categories"
              className="group flex items-center gap-2 rounded-full border border-black/15 bg-white/50 px-8 py-4 text-sm font-medium text-black backdrop-blur-sm transition hover:border-black hover:bg-black hover:text-white"
            >
              <Eye size={17} className="text-black/50 transition-colors group-hover:text-white" />
              Lookbook 2026
            </motion.a>
          </div>

          {/* Social Proof / Metrics */}
          <div className="mt-14 grid max-w-lg grid-cols-3 border-t border-black/10 pt-8">
            <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
              <strong className="font-serif text-3xl font-normal text-[#11110f]">15K+</strong>
              <p className="mt-1 text-xs uppercase tracking-wider text-black/45">Exclusives Delivered</p>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
              <strong className="font-serif text-3xl font-normal text-[#11110f]">98%</strong>
              <p className="mt-1 text-xs uppercase tracking-wider text-black/45">Satisfaction</p>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
              <div className="flex items-center gap-1">
                <strong className="font-serif text-3xl font-normal text-[#11110f]">4.9</strong>
                <Star size={16} className="fill-[#a17b38] text-[#a17b38]" />
              </div>
              <p className="mt-1 text-xs uppercase tracking-wider text-black/45">Top Rated Studio</p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative [perspective:1200px]"
        >
          {/* Decorative Glowing Backdrop */}
          <div className="absolute -right-8 -top-8 h-72 w-72 rounded-full bg-[#d5b777]/20 blur-3xl" />

          {/* Floating Top-Right Mini Badge */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-2 top-10 z-30 hidden rounded-2xl border border-white/40 bg-white/80 p-4 shadow-xl backdrop-blur-md sm:flex sm:items-center sm:gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a17b38]/10 text-[#a17b38]">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-black/40">Limited Edition</p>
              <p className="text-sm font-medium text-black">Only 50 Crafted</p>
            </div>
          </motion.div>

          {/* Main 3D Card */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            animate={{
              scale: isHovered ? 1.02 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="relative cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/20 shadow-2xl backdrop-blur-sm"
          >
            {/* Dynamic Light Overlay */}
            <motion.div
              style={{
                background: isHovered
                  ? `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 65%)`
                  : "none",
              }}
              className="pointer-events-none absolute inset-0 z-20 rounded-[2.5rem] transition-opacity duration-300"
            />

            {/* Default Primary Fashion Image */}
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85"
              alt="LUXE ORA primary collection"
              className={`h-[620px] w-full object-cover transition-all duration-700 ease-out ${
                isHovered ? "opacity-0 scale-105" : "opacity-100 scale-100"
              }`}
            />

            {/* Hover Alternate High-Fashion Image */}
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1200&q=85"
              alt="LUXE ORA hover look"
              className={`absolute inset-0 h-[620px] w-full object-cover transition-all duration-700 ease-out ${
                isHovered ? "opacity-100 scale-110" : "opacity-0 scale-100"
              }`}
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* 3D Floating Glass Banner */}
            <motion.div
              style={{
                translateZ: 50, // High 3D elevation depth
              }}
              className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/30 bg-black/40 p-6 text-white shadow-2xl backdrop-blur-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#d5b777]">
                    {isHovered ? "Hover View Active" : "Featured Spotlight"}
                  </p>
                  <h3 className="mt-1 font-serif text-2xl font-light text-white">
                    The Velvet & Gold Capsule
                  </h3>
                </div>

                <motion.span
                  whileHover={{ scale: 1.15, rotate: 45 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#a17b38] text-white shadow-lg transition-colors hover:bg-white hover:text-black"
                >
                  <ArrowRight size={20} />
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}