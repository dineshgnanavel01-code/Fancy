import { useEffect, useState } from "react";
import { ChevronLeft,ChevronRight, Star, Quote, Sparkles,} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Ananya Sharma",
    role: "Verified Customer",
    text: "Everything from the packaging to the product felt incredibly premium. LUXE ORA has become my favourite fashion destination.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Meera Kapoor",
    role: "Verified Customer",
    text: "Beautiful designs, fast delivery and excellent quality. The handbag I ordered looks even better in person.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "Riya Mehta",
    role: "Verified Customer",
    text: "A gorgeous shopping experience. The jewellery collection is elegant and perfect for special occasions.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 45,
    rotateX: 12,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const previous = () => {
    setDirection(-1);

    setCurrent(
      (current - 1 + testimonials.length) %
        testimonials.length
    );
  };

  const next = () => {
    setDirection(1);

    setCurrent(
      (current + 1) % testimonials.length
    );
  };

  const item = testimonials[current];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);

      setCurrent((value) => {
        return (value + 1) % testimonials.length;
      });
    }, 6500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#faf8f3] px-5 py-24 lg:px-10 lg:py-32"
    >
      <motion.div
        className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#d5b777]/10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-[#a17b38]/10 blur-3xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 20, 0],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      
      <motion.div
        className="pointer-events-none absolute left-[12%] top-[25%] text-[#a17b38]/30"
        animate={{
          y: [0, -12, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles size={22} />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute right-[12%] top-[35%] text-[#a17b38]/30"
        animate={{
          y: [0, 14, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles size={18} />
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: true,
          amount: 0.15,
        }}
        className="relative z-10 mx-auto max-w-full text-center"
        style={{
          perspective: 1200,
        }}
      >
        <motion.div variants={itemVariants}>
          <motion.p
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a17b38]"
            whileInView={{
              letterSpacing: ["0.15em", "0.3em"],
            }}
            transition={{ duration: 0.8 }}
          >
            Client Stories
          </motion.p>

          <h2 className="mt-3 text-4xl font-light tracking-tight text-[#171717] sm:text-5xl lg:text-6xl">
            Loved by{" "}
            <span className="font-serif italic">
              thousands
            </span>
          </h2>

          <motion.div
            className="mx-auto mt-6 h-px bg-[#a17b38]"
            initial={{
              width: 0,
              opacity: 0,
            }}
            whileInView={{
              width: 70,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.8,
              delay: 0.3,
            }}
          />

          <p className="mx-auto mt-6 max-w-full text-sm leading-7 text-black/50 sm:text-base">
            Discover what our customers have to say about
            their LUXE ORA experience.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative mx-auto mt-14 max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-black/[0.06] bg-white/70 px-5 py-12 shadow-[0_25px_80px_rgba(0,0,0,0.07)] backdrop-blur-xl sm:px-10 sm:py-14 lg:px-16">
    
            <motion.div
              className="absolute left-5 top-5 text-[#a17b38]/10 sm:left-8 sm:top-8"
              animate={{
                rotate: [-5, 5, -5],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Quote size={70} />
            </motion.div>

        
            <motion.div
              className="pointer-events-none absolute left-1/2 top-0 h-32 w-64 -translate-x-1/2 rounded-full bg-[#d5b777]/10 blur-3xl"
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <AnimatePresence
              mode="wait"
              custom={direction}
            >
              <motion.div
                key={current}
                custom={direction}
                initial={{
                  opacity: 0,
                  x: direction * 45,
                  rotateY: direction * 10,
                  scale: 0.96,
                  filter: "blur(6px)",
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  x: direction * -45,
                  rotateY: direction * -10,
                  scale: 0.96,
                  filter: "blur(6px)",
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  perspective: 1200,
                }}
              >
                
                <motion.div
                  className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28"
                  whileHover={{
                    scale: 1.08,
                    rotateY: 8,
                    rotateX: -5,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 350,
                    damping: 18,
                  }}
                >
                 
                  <motion.div
                    className="absolute -inset-2 rounded-full border border-dashed border-[#a17b38]/30"
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  
                  <div className="absolute -inset-1 rounded-full border border-[#d5b777]/50" />

                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="relative h-full w-full rounded-full object-cover shadow-xl"
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                  />

                  <motion.div
                    className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#a17b38] text-[10px] text-white shadow-lg"
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    transition={{
                      delay: 0.25,
                      type: "spring",
                      stiffness: 400,
                    }}
                  >
                    ✓
                  </motion.div>
                </motion.div>

                <motion.div
                  className="mt-6 flex justify-center gap-1"
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.15,
                  }}
                >
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <motion.div
                        key={star}
                        initial={{
                          scale: 0,
                          rotate: -30,
                        }}
                        animate={{
                          scale: 1,
                          rotate: 0,
                        }}
                        transition={{
                          delay:
                            0.18 + star * 0.05,
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        }}
                        whileHover={{
                          scale: 1.3,
                          rotate: 8,
                        }}
                      >
                        <Star
                          size={16}
                          fill="currentColor"
                          className="text-[#b28a42]"
                        />
                      </motion.div>
                    )
                  )}
                </motion.div>

                <p className="mx-auto mt-7 max-w-2xl font-serif text-xl italic leading-relaxed text-[#252525] sm:text-2xl lg:text-3xl">
                  “{item.text}”
                </p>

              
                <motion.p
                  className="mt-7 text-sm font-semibold tracking-wide"
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.2,
                  }}
                >
                  {item.name}
                </motion.p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#a17b38]">
                  {item.role}
                </p>
              </motion.div>
            </AnimatePresence>

            <motion.div
              className="mx-auto mt-10 h-px bg-gradient-to-r from-transparent via-[#a17b38]/40 to-transparent"
              initial={{
                width: 0,
              }}
              whileInView={{
                width: "70%",
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1,
              }}
            />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-9 flex items-center justify-center gap-4"
        >
          <motion.button
            type="button"
            onClick={previous}
            aria-label="Previous testimonial"
            whileHover={{
              scale: 1.08,
              x: -2,
            }}
            whileTap={{
              scale: 0.92,
            }}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
          >
            <ChevronLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
          </motion.button>

          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                type="button"
                aria-label={`Go to testimonial ${
                  index + 1
                }`}
                onClick={() => {
                  setDirection(
                    index > current ? 1 : -1
                  );
                  setCurrent(index);
                }}
                whileHover={{
                  scale: 1.25,
                }}
                whileTap={{
                  scale: 0.85,
                }}
                className="relative flex h-7 w-7 items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    index === current
                      ? "h-2 w-7 bg-[#a17b38]"
                      : "h-2 w-2 bg-black/15 hover:bg-black/40"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          <motion.button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            whileHover={{
              scale: 1.08,
              x: 2,
            }}
            whileTap={{
              scale: 0.92,
            }}
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-white shadow-sm transition-colors duration-300 hover:border-black hover:bg-black hover:text-white"
          >
            <ChevronRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </motion.button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-center"
        >
          <div>
            <p className="text-2xl font-light">
              10K+
            </p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-black/40">
              Happy Customers
            </p>
          </div>

          <div className="h-8 w-px bg-black/10" />

          <div>
            <p className="text-2xl font-light">
              4.9/5
            </p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-black/40">
              Average Rating
            </p>
          </div>

          <div className="h-8 w-px bg-black/10" />

          <div>
            <p className="text-2xl font-light">
              98%
            </p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-black/40">
              Recommend Us
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}