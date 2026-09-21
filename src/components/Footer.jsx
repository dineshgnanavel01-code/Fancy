import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence,} from "framer-motion";
import {ArrowUp,Mail, MapPin, Phone, Globe,Send, Crown,} from "lucide-react";

const InstagramIcon = ({ size = 17, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 17, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 17, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `/#${id}`);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spring = {
    stiffness: 500,
    damping: 35,
    mass: 0.25,
  };

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [3.5, -3.5]),
    spring
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-3.5, 3.5]),
    spring
  );

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const quickLinks = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about" },
    { name: "Shop", id: "shop" },
    { name: "New Arrivals", id: "new-arrivals" },
    { name: "Offers", id: "offers" },
  ];

  const categories = [
    { name: "Jewellery", id: "shop" },
    { name: "Handbags", id: "shop" },
    { name: "Watches", id: "shop" },
    { name: "Cosmetics", id: "shop" },
    { name: "Footwear", id: "shop" },
  ];

  const socials = [
    { name: "Instagram", href: "#", icon: InstagramIcon },
    { name: "Facebook", href: "#", icon: FacebookIcon },
    { name: "Twitter", href: "#", icon: TwitterIcon },
  ];

  const handleSubscribe = (event) => {
    event.preventDefault();
    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");

    setTimeout(() => {
      setSubscribed(false);
    }, 3000);
  };

  return (
    <>
      <footer className="relative overflow-hidden bg-[#11110f] px-4 pb-5 pt-10 text-white sm:px-6 lg:px-10 lg:pt-14">
        <div className="pointer-events-none absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-[#a17b38]/10 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-[-180px] right-[-180px] h-[450px] w-[450px] rounded-full bg-[#a17b38]/10 blur-[110px]" />

        <motion.div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d5b777]/5 blur-[100px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.5, 0.25],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative mx-auto max-w-full"
        >
          <div className="pointer-events-none absolute -inset-px rounded-[30px] bg-gradient-to-br from-[#a17b38]/40 via-transparent to-[#d5b777]/20 opacity-70 blur-[1px]" />

          <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.045] shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-xl">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#a17b38] to-transparent" />

            <div className="grid gap-10 border-b border-white/10 p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr] lg:p-12">
              <motion.div
                style={{ transform: "translateZ(25px)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link to="/" className="inline-flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-black text-[#d5b777]">
                    <Crown size={18} strokeWidth={1.5} />
                    <span className="absolute inset-1 rounded-full border border-[#d5b777]/40" />
                  </div>

                  <div>
                    <p className="font-serif text-[15px] font-semibold tracking-[0.22em] text-white">
                      LUXE ORA
                    </p>
                    <span className="block text-[8px] uppercase tracking-[0.35em] text-[#a17b38]">
                      Maison & Lifestyle
                    </span>
                  </div>
                </Link>

                <p className="mt-6 max-w-md text-sm leading-7 text-white/45">
                  Discover thoughtfully curated fashion, jewellery, handbags,
                  watches and lifestyle essentials designed to elevate your
                  everyday elegance.
                </p>

                <div className="mt-7 flex gap-3">
                  {socials.map((social) => {
                    const Icon = social.icon;

                    return (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        aria-label={social.name}
                        whileHover={{
                          y: -6,
                          scale: 1.12,
                          rotateZ: 5,
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 18,
                        }}
                        className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition-colors duration-200 hover:border-[#a17b38] hover:bg-[#a17b38] hover:text-white"
                      >
                        <Icon size={17} />
                        <span className="sr-only">{social.name}</span>
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div
                style={{ transform: "translateZ(35px)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative overflow-hidden rounded-2xl border border-[#a17b38]/20 bg-gradient-to-br from-[#a17b38]/10 to-transparent p-6 sm:p-8"
              >
                <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full border border-[#d5b777]/10" />

                <div className="relative">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d5b777]">
                    LUXE LETTER
                  </p>

                  <h3 className="mt-3 font-serif text-3xl leading-tight text-white sm:text-4xl">
                    Stay in the
                    <br />
                    <span className="italic text-[#d5b777]">know.</span>
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-6 text-white/45">
                    Subscribe for new collections, exclusive offers and
                    carefully selected style inspiration.
                  </p>

                  <form
                    onSubmit={handleSubscribe}
                    className="mt-6 flex flex-col gap-3 sm:flex-row"
                  >
                    <div className="relative flex-1">
                      <Mail
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                      />

                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Your email address"
                        required
                        className="h-12 w-full rounded-full border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-[#a17b38]"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      className="luxe-button flex h-12 items-center justify-center gap-2 rounded-full bg-[#a17b38] px-6 text-sm font-semibold text-white"
                    >
                      {subscribed ? "Subscribed" : "Subscribe"}

                      <motion.span
                        animate={subscribed ? { x: 0 } : { x: [0, 3, 0] }}
                        transition={{
                          duration: 1.4,
                          repeat: subscribed ? 0 : Infinity,
                        }}
                      >
                        <Send size={16} />
                      </motion.span>
                    </motion.button>
                  </form>

                  {subscribed && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 text-xs text-[#d5b777]"
                    >
                      Thank you. Welcome to LUXE ORA.
                    </motion.p>
                  )}
                </div>
              </motion.div>
            </div>

            <div className="grid gap-10 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4 lg:p-12">
              <FooterColumn title="Quick Links">
                {quickLinks.map((link, index) => (
                  <FooterLink
                    key={link.name}
                    onClick={() => handleSectionClick(link.id)}
                    delay={index * 0.04}
                  >
                    {link.name}
                  </FooterLink>
                ))}
              </FooterColumn>

              <FooterColumn title="Categories">
                {categories.map((category, index) => (
                  <FooterLink
                    key={category.name}
                    onClick={() => handleSectionClick(category.id)}
                    delay={index * 0.04}
                  >
                    {category.name}
                  </FooterLink>
                ))}
              </FooterColumn>

              <FooterColumn title="Customer Care">
                <FooterRouterLink to="/contact">Contact Us</FooterRouterLink>
                <FooterRouterLink to="/contact">Shipping Information</FooterRouterLink>
                <FooterRouterLink to="/contact">Returns & Exchanges</FooterRouterLink>
                <FooterRouterLink to="/contact">FAQ</FooterRouterLink>
                <FooterRouterLink to="/contact">Order Tracking</FooterRouterLink>
              </FooterColumn>

              <FooterColumn title="Contact Information">
                <div className="space-y-5">
                  <ContactItem
                    icon={<MapPin size={17} />}
                    text={
                      <>
                        Chennai, Tamil Nadu,
                        <br />
                        India
                      </>
                    }
                  />

                  <ContactItem
                    icon={<Phone size={17} />}
                    text="+91 98765 43210"
                    href="tel:+919876543210"
                  />

                  <ContactItem
                    icon={<Mail size={17} />}
                    text="hello@luxeora.com"
                    href="mailto:hello@luxeora.com"
                  />

                  <ContactItem
                    icon={<Globe size={17} />}
                    text="www.luxeora.com"
                    onClick={() => handleSectionClick("home")}
                  />
                </div>
              </FooterColumn>
            </div>

            <div className="border-t border-white/10 px-6 py-6 sm:px-8 lg:px-12">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-xs text-white/30">
                  © 2026 <span className="text-white/50">LUXE ORA</span>. All
                  rights reserved.
                </p>

                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {["Privacy Policy", "Terms & Conditions", "Shipping Policy"].map(
                    (item) => (
                      <motion.a
                        key={item}
                        href="#"
                        whileHover={{
                          color: "#d5b777",
                          y: -2,
                        }}
                        className="text-xs text-white/30 transition-colors"
                      >
                        {item}
                      </motion.a>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-5 max-w-full text-center"
        >
          <p className="text-[9px] uppercase tracking-[0.35em] text-white/15">
            Crafted for modern elegance
          </p>
        </motion.div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            aria-label="Back to top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#d5b777]/50 bg-[#11110f]/90 text-[#d5b777] shadow-[0_10px_25px_rgba(0,0,0,0.4)] backdrop-blur-md transition-colors hover:bg-[#a17b38] hover:text-white sm:bottom-8 sm:right-8"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

function FooterColumn({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <h4 className="relative inline-block text-xs font-semibold uppercase tracking-[0.2em] text-[#d5b777]">
        {title}
        <span className="absolute -bottom-2 left-0 h-px w-8 bg-[#a17b38]" />
      </h4>

      <div className="mt-7 flex flex-col gap-3">{children}</div>
    </motion.div>
  );
}

function FooterLink({ children, onClick, delay = 0 }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay,
      }}
      whileHover={{
        x: 7,
        color: "#ffffff",
      }}
      className="group flex items-center text-left text-sm text-white/40 transition-colors"
    >
      <span className="mr-2 text-[#a17b38] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        →
      </span>
      {children}
    </motion.button>
  );
}

function FooterRouterLink({ children, to }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{
        x: 7,
        color: "#ffffff",
      }}
    >
      <Link
        to={to}
        className="group flex items-center text-sm text-white/40 transition-colors"
      >
        <span className="mr-2 text-[#a17b38] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          →
        </span>
        {children}
      </Link>
    </motion.div>
  );
}

function ContactItem({ icon, text, href, onClick }) {
  const content = (
    <motion.div
      whileHover={{ x: 5 }}
      transition={{
        type: "spring",
        stiffness: 450,
        damping: 20,
      }}
      className="flex items-start gap-3 text-sm text-white/40 cursor-pointer"
    >
      <span className="mt-0.5 shrink-0 text-[#a17b38]">{icon}</span>
      <span className="leading-6 transition-colors">{text}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="block text-left w-full">
        {content}
      </button>
    );
  }

  return content;
}