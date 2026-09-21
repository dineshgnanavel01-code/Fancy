import React, { useEffect, useState } from "react";
import { motion,useMotionValue,useSpring,useTransform,} from "framer-motion";
import { ArrowRight, Clock3, Sparkles, Tag, Zap,} from "lucide-react";

export default function SpecialOffers() {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = {
    stiffness: 500,
    damping: 28,
    mass: 0.25,
  };

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [7, -7]),
    springConfig
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    springConfig
  );

  const imageX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-18, 18]),
    springConfig
  );

  const imageY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-12, 12]),
    springConfig
  );

  const imageScale = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [1.04, 1.1]),
    springConfig
  );

  const lightX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [15, 85]),
    springConfig
  );

  const lightY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [15, 85]),
    springConfig
  );

  const badgeX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-12, 12]),
    springConfig
  );

  const badgeY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-12, 12]),
    springConfig
  );
  const [timeLeft, setTimeLeft] = useState({
    days: "08",
    hours: "17",
    minutes: "42",
    seconds: "09",
  });

  useEffect(() => {
    const targetTime =
      Date.now() +
      8 * 24 * 60 * 60 * 1000 +
      17 * 60 * 60 * 1000 +
      42 * 60 * 1000;

    const interval = setInterval(() => {
      const difference = targetTime - Date.now();

      if (difference <= 0) {
        clearInterval(interval);

        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });

        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) /
          (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) /
          (1000 * 60)
      );

      const seconds = Math.floor(
        (difference % (1000 * 60)) / 1000
      );

      const format = (value) =>
        value < 10 ? `0${value}` : `${value}`;

      setTimeLeft({
        days: format(days),
        hours: format(hours),
        minutes: format(minutes),
        seconds: format(seconds),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  

  const handleMouseMove = (event) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const timeBlocks = [
    [timeLeft.days, "Days"],
    [timeLeft.hours, "Hours"],
    [timeLeft.minutes, "Min"],
    [timeLeft.seconds, "Sec"],
  ];

  return (
    <section
      id="offers"
      className="relative overflow-hidden bg-[#faf8f3] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      {/* BACKGROUND DECORATION */}

      <div className="pointer-events-none absolute left-[-120px] top-20 h-72 w-72 rounded-full bg-[#d5b777]/10 blur-[100px]" />

      <div className="pointer-events-none absolute bottom-0 right-[-100px] h-80 w-80 rounded-full bg-[#8c6b32]/10 blur-[120px]" />

      <div className="mx-auto max-w-full [perspective:1400px]">
        {/* MAIN 3D CARD */}

        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          animate={{
            scale: isHovered ? 1.012 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-[#151513] text-white shadow-[0_30px_100px_rgba(0,0,0,0.18)] sm:rounded-[2.5rem]"
        >
          {/* GOLD GLOW FOLLOWING CURSOR */}

          <motion.div
            style={{
              left: lightX,
              top: lightY,
            }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute z-30 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d5b777]/15 blur-[80px]"
          />

          {/* TOP GOLD LINE */}

          <motion.div
            animate={{
              x: isHovered ? ["-100%", "100%"] : "-100%",
            }}
            transition={{
              duration: 1.1,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute left-0 top-0 z-40 h-px w-full bg-gradient-to-r from-transparent via-[#d5b777] to-transparent"
          />

          {/* CONTENT */}

          <div className="relative grid lg:grid-cols-[1.05fr_0.95fr]">
            {/* LEFT SIDE */}

            <div
              className="relative z-20 flex flex-col justify-center overflow-hidden p-7 sm:p-10 md:p-14 lg:p-16 xl:p-20"
              style={{ transform: "translateZ(35px)" }}
            >
              {/* Decorative circles */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full border border-[#d5b777]/10"
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full border border-dashed border-[#d5b777]/10"
              />

              {/* OFFER LABEL */}

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d5b777]/30 bg-[#d5b777]/10">
                  <Zap
                    size={15}
                    className="text-[#d5b777]"
                  />
                </div>

                <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d5b777]">
                  Exclusive Offer
                </span>
              </motion.div>

              {/* HEADING */}

              <motion.h2
                initial={{
                  opacity: 0,
                  y: 35,
                  rotateX: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                }}
                className="mt-7 max-w-full text-4xl font-light leading-[1.05] sm:text-5xl md:text-6xl xl:text-7xl"
              >
                Luxury
                <span className="block font-serif italic text-[#d5b777]">
                  redefined.
                </span>
              </motion.h2>

              <motion.p
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.25,
                }}
                className="mt-6 max-w-full text-sm leading-7 text-white/50 sm:text-base"
              >
                Discover timeless pieces crafted to elevate
                your everyday style. Enjoy up to{" "}
                <span className="font-medium text-[#d5b777]">
                  40% off
                </span>{" "}
                selected LUXE ORA collections.
              </motion.p>

              {/* COUNTDOWN */}

              <div className="mt-9">
                <div className="mb-3 flex items-center gap-2">
                  <Clock3
                    size={14}
                    className="text-[#d5b777]"
                  />

                  <span className="text-[9px] uppercase tracking-[0.25em] text-white/35">
                    Offer ends in
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {timeBlocks.map(([value, label], index) => (
                    <motion.div
                      key={label}
                      initial={{
                        opacity: 0,
                        y: 20,
                        rotateX: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                        rotateX: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: 0.3 + index * 0.08,
                      }}
                      whileHover={{
                        y: -7,
                        scale: 1.07,
                        rotateX: -5,
                        rotateY: 5,
                      }}
                      className="group/time"
                    >
                      <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_12px_30px_rgba(0,0,0,0.2)] backdrop-blur-xl sm:h-[70px] sm:w-[70px]">
                        <motion.div
                          animate={{
                            y: ["100%", "-100%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: index * 0.2,
                          }}
                          className="absolute h-1/2 w-full bg-gradient-to-b from-transparent via-[#d5b777]/10 to-transparent"
                        />

                        <motion.span
                          key={value}
                          initial={{
                            opacity: 0,
                            y: -8,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="relative z-10 text-lg font-semibold text-white sm:text-xl"
                        >
                          {value}
                        </motion.span>
                      </div>

                      <p className="mt-2 text-center text-[8px] uppercase tracking-[0.2em] text-white/30">
                        {label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}

              <motion.a
                href="#shop"
                whileHover={{
                  scale: 1.04,
                  y: -4,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="luxe-button mt-9 inline-flex w-fit items-center gap-4 rounded-full bg-[#d5b777] px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#171717] shadow-[0_15px_40px_rgba(213,183,119,0.2)]"
              >
                <span>Shop the Offer</span>

                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10">
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </motion.a>

              {/* SMALL INFO */}

              <div className="mt-7 flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-white/25">
                <Tag size={12} />
                <span>Limited quantities available</span>
              </div>
            </div>

            {/* RIGHT IMAGE */}

            <div
              className="relative min-h-[430px] overflow-hidden lg:min-h-[650px]"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* IMAGE */}

              <motion.div
                style={{
                  x: imageX,
                  y: imageY,
                  scale: imageScale,
                }}
                className="absolute inset-[-25px]"
              >
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=90"
                  alt="LUXE ORA special offer"
                  className="h-full w-full object-cover"
                />
              </motion.div>


              <div className="absolute inset-0 bg-gradient-to-r from-[#151513] via-transparent to-transparent lg:from-[#151513]/70 lg:via-transparent" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />


              <motion.div
                animate={{
                  x: isHovered
                    ? ["-120%", "120%"]
                    : "-120%",
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                }}
                className="absolute inset-y-0 z-10 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-xl"
              />


              <motion.div
                style={{
                  x: badgeX,
                  y: badgeY,
                  translateZ: 70,
                }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-5 top-5 z-20 sm:right-8 sm:top-8"
              >
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/20 bg-black/45 shadow-2xl backdrop-blur-xl sm:h-36 sm:w-36">

                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-2 rounded-full border border-dashed border-[#d5b777]/60"
                  />

                  <div className="text-center">
                    <Sparkles
                      size={14}
                      className="mx-auto mb-1 text-[#d5b777]"
                    />

                    <p className="text-2xl font-semibold text-white sm:text-3xl">
                      40%
                    </p>

                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/50">
                      OFF
                    </p>
                  </div>
                </div>
              </motion.div>


              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
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
                  delay: 0.5,
                }}
                style={{
                  translateZ: 50,
                }}
                className="absolute bottom-5 left-5 right-5 z-20 sm:bottom-8 sm:left-8 sm:right-8"
              >
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-black/35 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.25em] text-[#d5b777]">
                      LUXE ORA
                    </p>

                    <p className="mt-1 text-xs text-white/70">
                      Signature Collection
                    </p>
                  </div>

                  <div className="hidden h-8 w-px bg-white/10 sm:block" />

                  <div className="text-right">
                    <p className="text-[8px] uppercase tracking-[0.2em] text-white/30">
                      Selected Styles
                    </p>

                    <p className="mt-1 text-sm font-medium text-white">
                      Up to 40% Off
                    </p>
                  </div>
                </div>
              </motion.div>


              {[...Array(7)].map((_, index) => (
                <motion.span
                  key={index}
                  animate={{
                    y: [0, -18, 0],
                    opacity: [0.15, 0.7, 0.15],
                    scale: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 2.5 + index * 0.35,
                    repeat: Infinity,
                    delay: index * 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute z-20 h-1 w-1 rounded-full bg-[#d5b777]"
                  style={{
                    left: `${12 + index * 12}%`,
                    top: `${20 + ((index * 13) % 60)}%`,
                  }}
                />
              ))}
            </div>
          </div>


          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="pointer-events-none absolute bottom-0 left-0 h-px w-1/2 bg-gradient-to-r from-transparent via-[#d5b777]/60 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}