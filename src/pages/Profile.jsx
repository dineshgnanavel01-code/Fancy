import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {User,Package,Heart, MapPin, LogOut, ArrowRight, ShoppingBag, Sparkles, ShieldCheck, ChevronRight, Clock,} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 400, damping: 25 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("luxeoraUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("luxeoraUser");
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#faf8f3] px-5">
        <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#a17b38]/10 blur-[120px]" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md rounded-[2.5rem] border border-white/60 bg-white/80 p-10 text-center shadow-2xl backdrop-blur-xl"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#a17b38]/10 text-[#a17b38]">
            <User size={38} strokeWidth={1.5} />
          </div>

          <span className="mt-6 block text-[11px] font-bold uppercase tracking-[0.3em] text-[#a17b38]">
            LUXE ORA
          </span>

          <h1 className="mt-2 text-3xl font-light tracking-tight text-[#11110f]">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm leading-6 text-black/50">
            Sign in to access your curated dashboard, orders, and exclusive rewards.
          </p>

          <motion.div
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="mt-8"
          >
            <Link
              to="/login"
              className="luxe-button group inline-flex items-center gap-3 rounded-full bg-[#11110f] px-8 py-4 text-sm font-medium text-white shadow-xl transition hover:bg-[#a17b38]"
            >
              Sign In
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </main>
    );
  }

  const firstLetter = user.name?.charAt(0)?.toUpperCase() || "L";

  const actionCards = [
    {
      to: "/cart",
      icon: ShoppingBag,
      title: "Shopping Bag",
      desc: "Review your selected luxury items and proceed to checkout.",
      badge: "Active Cart",
    },
    {
      to: "#orders",
      icon: Package,
      title: "My Orders",
      desc: "Track active shipments, view receipts, and past purchases.",
      badge: "2 Processing",
    },
    {
      to: "#wishlist",
      icon: Heart,
      title: "Wishlist",
      desc: "Curated collection of your favourite saved items.",
      badge: "5 Items",
    },
    {
      to: "#addresses",
      icon: MapPin,
      title: "Addresses",
      desc: "Manage delivery addresses and billing details.",
      badge: "1 Primary",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#faf8f3] px-5 pb-20 pt-32 lg:px-10">
      {/* Background Ambient Blur Orbs */}
      <div className="pointer-events-none absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-[#a17b38]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-[500px] w-[500px] rounded-full bg-[#d5b777]/15 blur-[140px]" />

      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#a17b38]/30 bg-[#a17b38]/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#8a682e]">
              <Sparkles size={12} className="text-[#a17b38]" />
              VIP Gold Tier
            </div>

            <h1 className="mt-4 text-4xl font-light tracking-tight text-[#11110f] sm:text-6xl">
              Hello, <span className="font-serif italic text-[#a17b38]">{user.name}</span>
            </h1>

            <p className="mt-2 text-sm text-black/50">
              Manage your LUXE ORA account preferences, saved items, and orders.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-6 rounded-2xl border border-white/60 bg-white/60 p-4 backdrop-blur-md shadow-sm">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-black/40">Member Since</p>
              <p className="text-sm font-semibold text-[#11110f]">2026</p>
            </div>
            <div className="h-8 w-[1px] bg-black/10" />
            <div>
              <p className="text-[10px] uppercase tracking-wider text-black/40">Rewards Points</p>
              <p className="text-sm font-semibold text-[#a17b38]">1,450 pts</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {/* User Profile Card with 3D Interaction */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/80 bg-white/80 p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] backdrop-blur-xl lg:col-span-1 [perspective:1000px]"
          >
            {/* Top Accent Gradient */}
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#a17b38]/15 to-transparent" />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Avatar Circle */}
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-white bg-[#11110f] text-3xl font-light text-white shadow-xl ring-4 ring-[#a17b38]/20">
                {firstLetter}
                <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
              </div>

              <h2 className="mt-5 text-2xl font-light text-[#11110f]">
                {user.name}
              </h2>

              <p className="mt-1 text-xs text-black/50">
                {user.email}
              </p>

              {/* Security Status Tag */}
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-black/5 px-3 py-1 text-[11px] font-medium text-black/60">
                <ShieldCheck size={14} className="text-emerald-600" />
                Verified Account
              </div>

              <div className="mt-8 w-full border-t border-black/10 pt-6">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50/50 py-3.5 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white shadow-sm"
                >
                  <LogOut size={16} className="transition-transform group-hover:-translate-x-1" />
                  Sign Out
                </button>
              </div>
            </div>
          </motion.div>

          {/* Account Options Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            {actionCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className="group relative flex flex-col justify-between rounded-[2rem] border border-white/80 bg-white/80 p-7 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:border-[#a17b38]/40 hover:shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#faf8f3] text-[#11110f] transition-colors group-hover:bg-[#a17b38] group-hover:text-white">
                        <Icon size={22} strokeWidth={1.5} />
                      </div>

                      <span className="rounded-full bg-[#a17b38]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#8a682e]">
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-medium text-[#11110f]">
                      {card.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-black/50">
                      {card.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#a17b38]">
                      Explore Option
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/5 text-black/60 transition-transform group-hover:translate-x-1 group-hover:bg-[#a17b38] group-hover:text-white">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}