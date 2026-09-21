import React from "react";
import { motion, useMotionValue, useSpring, useTransform,} from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

function LookbookImage({
  src,
  alt,
  className = "",
  label,
  number,
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = {
    stiffness: 500,
    damping: 30,
    mass: 0.2,
  };

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    springConfig
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    springConfig
  );

  const imageX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-7, 7]),
    springConfig
  );

  const imageY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-7, 7]),
    springConfig
  );

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{
        opacity: 0,
        y: 45,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative [perspective:1000px] ${className}`}
    >
      <div className="relative h-full overflow-hidden rounded-[24px] bg-black shadow-[0_25px_60px_rgba(0,0,0,0.14)]">
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          style={{
            x: imageX,
            y: imageY,
            scale: 1.05,
          }}
          whileHover={{
            scale: 1.12,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="h-full w-full object-cover"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/5 opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

        <motion.div
          initial={{
            x: "-120%",
            opacity: 0,
          }}
          whileHover={{
            x: "120%",
            opacity: 1,
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent"
        />

        <div className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/20 text-[10px] font-semibold tracking-widest text-white backdrop-blur-md">
          {number}
        </div>

        <motion.div
          initial={{
            y: 15,
            opacity: 0.7,
          }}
          whileHover={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.35,
          }}
          className="absolute bottom-5 left-5 right-5"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70">
            LUXE ORA
          </p>

          <p className="mt-1 font-serif text-xl text-white">
            {label}
          </p>
        </motion.div>

        {/* Floating corner */}
        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0,
          }}
          whileHover={{
            scale: 1,
            opacity: 1,
            rotate: 8,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 18,
          }}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md"
        >
          <Sparkles size={16} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Lookbook() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#ebe5d9] px-5 py-20 sm:py-24 lg:px-10 lg:py-32" >

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#a17b38]/10 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-[#a17b38]/10 blur-[110px]" />

      <div className="mx-auto grid max-w-full items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
       

        <motion.div
          initial={{
            opacity: 0,
            x: -60,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative z-10"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
            }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[#a17b38]" />

            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a17b38]">
              LUXE ORA Lookbook
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 text-5xl font-light leading-[0.95] tracking-[-0.03em] text-[#171717] sm:text-6xl lg:text-7xl"
          >
            Designed for
            <span className="block font-serif italic text-[#8c6b32]">
              unforgettable
            </span>
            moments.
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.25,
            }}
            className="mt-7 max-w-lg text-sm leading-7 text-black/55 sm:text-base"
          >
            From understated elegance to bold statement pieces,
            discover collections designed to complement your
            individual style and turn everyday moments into
            something unforgettable.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.35,
            }}
            className="mt-9 grid max-w-md grid-cols-3 border-y border-black/10 py-5"
          >
            <div>
              <p className="font-serif text-2xl text-[#171717]">
                08+
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-black/40">
                Collections
              </p>
            </div>

            <div className="border-l border-black/10 pl-4">
              <p className="font-serif text-2xl text-[#171717]">
                25K+
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-black/40">
                Customers
              </p>
            </div>

            <div className="border-l border-black/10 pl-4">
              <p className="font-serif text-2xl text-[#171717]">
                4.9
              </p>

              <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-black/40">
                Rating
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.a
            href="#shop"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.45,
            }}
            whileHover={{
              x: 5,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="group mt-9 inline-flex items-center gap-3 border-b border-black pb-2 text-sm font-medium text-[#171717]"
          >
            <span>Explore Lookbook</span>

            <motion.span
              whileHover={{
                x: 6,
              }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 20,
              }}
            >
              <ArrowRight size={17} />
            </motion.span>
          </motion.a>

          {/* Floating decorative circle */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 4, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-10 right-0 hidden h-20 w-20 rounded-full border border-[#a17b38]/30 lg:block"
          >
            <div className="absolute inset-2 rounded-full border border-[#a17b38]/20" />
          </motion.div>
        </motion.div>

        {/* ==================================================
            RIGHT IMAGE GALLERY
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: 50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative grid grid-cols-2 gap-4 sm:gap-5"
        >
          {/* Image 01 */}
          <LookbookImage
            src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=85"
            alt="Luxury fashion look"
            label="Modern Muse"
            number="01"
            className="mt-10 aspect-[3/4]"
          />

          {/* Image 02 */}
          <LookbookImage
            src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=85"
            alt="Luxury fashion collection"
            label="Quiet Luxury"
            number="02"
            className="aspect-[3/4]"
          />

          {/* Center floating badge */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
              rotate: -15,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.45,
              type: "spring",
              stiffness: 180,
              damping: 15,
            }}
            animate={{
              y: [0, -7, 0],
            }}
            className="absolute left-1/2 top-1/2 z-20 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-[#171717]/90 text-center shadow-2xl backdrop-blur-md sm:h-24 sm:w-24"
          >
            <div>
              <Sparkles
                size={15}
                className="mx-auto mb-1 text-[#d5b777]"
              />

              <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white">
                LUXE
              </p>

              <p className="font-serif text-xs italic text-[#d5b777]">
                Edition
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}