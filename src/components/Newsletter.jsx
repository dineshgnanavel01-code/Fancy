
import { useState } from "react";
import { motion } from "framer-motion";
import {  ArrowRight,Check,Mail,Sparkles,} from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-[#171717] px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#a17b38]/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#d5b777]/10 blur-3xl" />

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute right-[8%] top-[15%] h-32 w-32 rounded-full border border-[#d5b777]/10"
        />

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-[10%] left-[8%] h-20 w-20 rounded-full border border-[#a17b38]/10"
        />
      </div>

      <div className="relative mx-auto max-w-full">
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] px-5 py-12 text-center shadow-[0_30px_100px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:px-10 sm:py-16 lg:px-20 lg:py-20"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
              rotate: -10,
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
              delay: 0.1,
            }}
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#d5b777]/30 bg-[#d5b777]/10 text-[#d5b777]"
          >
            <Sparkles size={22} strokeWidth={1.5} />
          </motion.div>

          <motion.p
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
              delay: 0.15,
            }}
            className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#d5b777] sm:text-xs"
          >
            Stay In The Know
          </motion.p>

          <motion.h2
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
              delay: 0.2,
            }}
            className="mx-auto mt-4 max-w-full font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Join the{" "}
            <span className="italic text-[#d5b777]">
              LUXE ORA
            </span>{" "}
            world.
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
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
              delay: 0.3,
            }}
            className="mx-auto mt-5 max-w-full text-sm leading-7 text-white/55 sm:text-base"
          >
            Subscribe for exclusive collections, private offers,
            new arrivals, styling inspiration and everything
            beautiful from LUXE ORA.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
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
              duration: 0.6,
              delay: 0.4,
            }}
            className="mx-auto mt-9 flex max-w-full flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Mail
                size={18}
                strokeWidth={1.6}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a17b38]"
              />

              <input
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setSubscribed(false);
                }}
                placeholder="Enter your email address"
                required
                className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.07] pl-12 pr-4 text-sm text-white outline-none placeholder:text-white/30 transition focus:border-[#d5b777]/50 focus:bg-white/10"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{
                y: -2,
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="luxe-button flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#d5b777] px-7 text-sm font-semibold text-[#171717] shadow-[0_12px_35px_rgba(213,183,119,0.18)]"
            >
              {subscribed ? (
                <>
                  <Check size={18} />
                  Subscribed
                </>
              ) : (
                <>
                  Subscribe
                  <ArrowRight size={17} />
                </>
              )}
            </motion.button>
          </motion.form>

          {subscribed && (
            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-[#d5b777]/20 bg-[#d5b777]/10 px-4 py-2 text-xs text-[#d5b777]"
            >
              <Check size={14} />
              Welcome to the LUXE ORA world.
            </motion.div>
          )}

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.5,
            }}
            className="mt-5 text-[11px] leading-5 text-white/30"
          >
            By subscribing, you agree to receive occasional
            updates from LUXE ORA. You can unsubscribe anytime.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}