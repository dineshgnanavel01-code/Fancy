import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft,Check,  CheckCircle2, Clock3, MapPin, Package, Sparkles, Truck, ShieldCheck, ChevronRight,} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    id: "confirmed",
    title: "Order Confirmed",
    description: "Your order has been successfully verified & placed.",
    icon: CheckCircle2,
  },
  {
    id: "processing",
    title: "Preparing Order",
    description: "Our artisans are carefully preparing your luxury items.",
    icon: Package,
  },
  {
    id: "shipped",
    title: "Order Shipped",
    description: "Your package has departed from our fulfillment hub.",
    icon: Truck,
  },
  {
    id: "out-for-delivery",
    title: "Out for Delivery",
    description: "Your courier is on the way to your delivery address.",
    icon: MapPin,
  },
  {
    id: "delivered",
    title: "Delivered",
    description: "Your order has arrived safely at your destination.",
    icon: Check,
  },
];

export default function OrderTracking() {
  const [order, setOrder] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const savedOrder = localStorage.getItem("luxeoraOrder");
    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch (e) {
        console.error("Failed to parse saved order", e);
      }
    }
  }, []);

  useEffect(() => {
    if (!order) return;

    const timer = setInterval(() => {
      setCurrentStep((current) => {
        if (current >= steps.length - 1) {
          clearInterval(timer);
          return current;
        }
        return current + 1;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [order]);

  // Fallback state if no active order is found
  if (!order) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#faf8f3] px-5 pb-20 pt-32">
        <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#a17b38]/10 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#d5b777]/15 blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-xl rounded-[2.5rem] border border-white/80 bg-white/70 p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)] backdrop-blur-2xl sm:p-14"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#a17b38]/20 to-[#a17b38]/5 text-[#a17b38] shadow-inner">
            <Truck size={38} />
          </div>

          <h1 className="mt-6 font-serif text-3xl font-light tracking-tight text-[#11110f] sm:text-4xl">
            No Active Order Found
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-black/50">
            It looks like you haven't placed an order yet or your session expired. Explore our curated collections to start shopping.
          </p>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-8 inline-block">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-full bg-[#11110f] px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-2xl transition-colors hover:bg-[#a17b38]"
            >
              <Sparkles size={16} />
              Explore Collections
            </Link>
          </motion.div>
        </motion.div>
      </main>
    );
  }

  const progress = (currentStep / (steps.length - 1)) * 100;
  const ActiveIcon = steps[currentStep].icon;
  const orderId = order.id || "N/A";
  const items = order.items || [];
  const total = order.total || 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#faf8f3] px-5 pb-20 pt-28 sm:px-8 lg:px-10">
      {/* Dynamic Background Glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#a17b38]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#d5b777]/15 blur-[120px]" />

      <div className="mx-auto max-w-full">
        {/* Navigation Link */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-black/40 transition hover:text-[#a17b38]"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Store
        </Link>

        {/* Page Header */}
        <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#a17b38]">
              Real-Time Logistics
            </span>
            <h1 className="mt-1 font-serif text-4xl font-light tracking-tight text-[#11110f] sm:text-5xl">
              Track Your Order
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="rounded-full border border-black/10 bg-white/70 px-3.5 py-1.5 font-mono font-medium text-black/80 shadow-sm backdrop-blur-md">
              Ref: #{orderId}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#a17b38]/10 px-3.5 py-1.5 font-medium text-[#8a682e]">
              <ShieldCheck size={14} /> Verified Premium Delivery
            </span>
          </div>
        </div>

        {/* Live Status Glass Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mt-8 overflow-hidden rounded-[2.5rem] border border-white/90 bg-white/80 p-6 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] backdrop-blur-2xl sm:p-10"
        >
          {/* Subtle Ambient Light inside Card */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#a17b38]/10 blur-2xl" />

          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#a17b38]/20 bg-[#a17b38]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-[#a17b38]">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a17b38] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#a17b38]" />
                </span>
                Live Status
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="mt-3 text-2xl font-light tracking-tight text-[#11110f] sm:text-3xl">
                    {steps[currentStep].title}
                  </h2>
                  <p className="mt-1 max-w-md text-sm text-black/60 leading-relaxed">
                    {steps[currentStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dynamic Icon Badge */}
            <motion.div
              key={currentStep}
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#11110f] text-white shadow-2xl shadow-black/20"
            >
              <ActiveIcon size={32} className="text-[#d5b777]" />
            </motion.div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="relative mt-12 px-2">
            <div className="h-2 w-full rounded-full bg-black/5" />

            {/* Progress Line */}
            <motion.div
              className="absolute left-2 top-0 h-2 rounded-full bg-gradient-to-r from-[#11110f] via-[#a17b38] to-[#d5b777] shadow-[0_0_12px_rgba(161,123,56,0.4)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Step Checkpoints */}
            <div className="absolute -top-3 left-0 flex w-full justify-between">
              {steps.map((step, index) => {
                const isPassed = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                  <motion.div
                    key={step.id}
                    animate={{
                      scale: isCurrent ? 1.25 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`relative flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                      isCurrent
                        ? "bg-[#11110f] text-white shadow-xl ring-4 ring-[#a17b38]/30"
                        : isPassed
                        ? "bg-[#11110f] text-white shadow-md"
                        : "border border-black/10 bg-white text-black/30"
                    }`}
                  >
                    {isPassed ? (
                      <Check size={14} className="text-[#d5b777]" />
                    ) : (
                      <span className="text-[11px] font-medium">{index + 1}</span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Responsive Step Titles */}
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-5 sm:gap-4">
            {steps.map((step, index) => {
              const isActive = index <= currentStep;
              const isCurrent = index === currentStep;
              return (
                <div
                  key={step.id}
                  className={`rounded-2xl p-2.5 text-center transition-all duration-300 ${
                    isCurrent
                      ? "bg-[#a17b38]/10 text-[#a17b38] font-bold"
                      : isActive
                      ? "text-black/80 font-medium"
                      : "text-black/30 font-normal"
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-wider">
                    {step.title}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Details Cards Section */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Delivery Details Card */}
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-[2.5rem] border border-white/80 bg-white/70 p-7 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.03)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-4 border-b border-black/5 pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a17b38]/10 text-[#a17b38]">
                <Truck size={22} />
              </div>
              <div>
                <h2 className="font-medium text-[#11110f]">Delivery Details</h2>
                <p className="text-xs text-black/40">Shipment & Carrier Info</p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-black/50">Courier Partner</span>
                <span className="font-medium text-black">LUXE Express Private</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-black/50">Tracking Code</span>
                <span className="rounded-md bg-[#a17b38]/10 px-2.5 py-1 font-mono text-xs font-semibold text-[#a17b38]">
                  LX-{orderId.toString().slice(-8).toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-black/50">Estimated Arrival</span>
                <span className="font-medium text-black">2–4 Business Days</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="rounded-[2.5rem] border border-white/80 bg-white/70 p-7 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.03)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-4 border-b border-black/5 pb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#a17b38]/10 text-[#a17b38]">
                <Clock3 size={22} />
              </div>
              <div>
                <h2 className="font-medium text-[#11110f]">Order Summary</h2>
                <p className="text-xs text-black/40">
                  {items.length} {items.length === 1 ? "item" : "items"} included
                </p>
              </div>
            </div>

            <div className="mt-6 max-h-36 space-y-3 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div key={item.id || idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="truncate font-medium text-black/80">{item.name}</span>
                    <span className="shrink-0 rounded-full bg-black/5 px-2 py-0.5 text-[10px] font-semibold text-black/60">
                      ×{item.quantity || 1}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-medium text-black">
                    ₹{((item.price || 0) * (item.quantity || 1)).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-black/50">
                Grand Total
              </span>
              <span className="font-serif text-2xl font-normal text-[#11110f]">
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-between rounded-2xl border border-[#a17b38]/20 bg-[#a17b38]/10 p-4 text-xs font-medium text-[#8a682e] backdrop-blur-md">
          <div className="flex items-center gap-3">
            <MapPin size={18} className="shrink-0 text-[#a17b38]" />
            <span>
              Automated tracking active. Status updates in real-time.
            </span>
          </div>
          <ChevronRight size={16} className="hidden opacity-60 sm:block" />
        </div>
      </div>
    </main>
  );
}