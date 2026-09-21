import { useEffect, useState } from "react";
import { Minus, Plus, Trash2,ArrowLeft,ArrowRight, ShoppingBag, Sparkles,} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

function Card3DWrapper({ children, className = "" }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`perspective-1000 transition-shadow duration-500 hover:shadow-2xl hover:shadow-[#a17b38]/15 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Cart({
  cart = [],
  onRemoveFromCart,
  onUpdateQuantity,
}) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 199;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fbf9f5] px-5 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center" >
          <motion.div
            animate={{
              y: [0, -12, 0],
              rotateZ: [0, -3, 3, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-3xl bg-white shadow-xl shadow-[#a17b38]/10 ring-1 ring-black/5"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#a17b38]/10 to-transparent" />
            <ShoppingBag size={42} strokeWidth={1.1} className="text-[#a17b38]" />
          </motion.div>

          <h1 className="mt-8 font-serif text-3xl font-normal text-[#11110f] sm:text-4xl">
            Your shopping bag is empty
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/50">
            Discover bespoke luxury and handcrafted style from our newest arrival collection.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#11110f] px-8 py-4 text-xs uppercase tracking-[0.2em] text-white shadow-lg shadow-black/10 transition hover:bg-[#a17b38]"
            >
              Continue Shopping
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#fbf9f5] px-5 pb-20 pt-32 lg:px-10">
      <div className="mx-auto max-w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-black/45 transition hover:text-[#a17b38]"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>

          <h1 className="mt-4 font-serif text-4xl font-light text-[#11110f] sm:text-5xl">
            Shopping Bag
          </h1>

          <p className="mt-2 text-sm text-black/45">
            Review your selected luxury pieces before final reservation.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-5">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => {
                const quantity = item.quantity || 1;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -100, scale: 0.9 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Card3DWrapper className="rounded-3xl border border-black/5 bg-white p-5 sm:p-6">
                      <div
                        style={{ transform: "translateZ(30px)" }}
                        className="flex gap-4 sm:gap-6"
                      >
                        <motion.div
                          whileHover={{ scale: 1.05, rotateZ: -1 }}
                          className="relative h-32 w-24 shrink-0 overflow-hidden rounded-2xl shadow-md sm:h-36 sm:w-28"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </motion.div>

                        <div className="min-w-0 flex-1">
                          <div className="flex justify-between gap-4">
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.2em] text-[#a17b38]">
                                {item.category}
                              </p>

                              <h2 className="mt-1 text-base font-medium text-[#11110f] sm:text-lg">
                                {item.name}
                              </h2>
                            </div>

                            <motion.button
                              whileHover={{ scale: 1.15, rotate: 10 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() => onRemoveFromCart?.(item.id)}
                              className="shrink-0 text-black/30 transition hover:text-red-500"
                              aria-label={`Remove ${item.name}`}
                            >
                              <Trash2 size={18} />
                            </motion.button>
                          </div>

                          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center rounded-full border border-black/10 bg-[#faf8f3] p-1">
                              <motion.button
                                whileTap={{ scale: 0.8 }}
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity?.(item.id, quantity - 1)
                                }
                                className="rounded-full p-2 text-black/60 hover:bg-white hover:text-black hover:shadow-sm"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={12} />
                              </motion.button>

                              <span className="w-8 text-center text-xs font-semibold">
                                {quantity}
                              </span>

                              <motion.button
                                whileTap={{ scale: 0.8 }}
                                type="button"
                                onClick={() =>
                                  onUpdateQuantity?.(item.id, quantity + 1)
                                }
                                className="rounded-full p-2 text-black/60 hover:bg-white hover:text-black hover:shadow-sm"
                                aria-label="Increase quantity"
                              >
                                <Plus size={12} />
                              </motion.button>
                            </div>

                            <div className="text-right">
                              <p className="font-serif text-lg font-medium text-[#11110f]">
                                ₹{(item.price * quantity).toLocaleString("en-IN")}
                              </p>

                              <p className="mt-0.5 text-[10px] tracking-wide text-black/35">
                                ₹{item.price.toLocaleString("en-IN")} each
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card3DWrapper>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          <div>
            <Card3DWrapper className="sticky top-28 rounded-3xl border border-black/5 bg-white p-7">
              <div style={{ transform: "translateZ(25px)" }}>
                <div className="flex items-center justify-between">
                  <h2 className="font-serif text-xl font-normal text-[#11110f]">
                    Order Summary
                  </h2>
                  <Sparkles size={18} className="text-[#a17b38]" />
                </div>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-black/45">Subtotal</span>
                    <span className="font-medium">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-black/45">Shipping</span>
                    <span className="font-medium text-[#a17b38]">
                      {shipping === 0
                        ? "Complimentary"
                        : `₹${shipping.toLocaleString("en-IN")}`}
                    </span>
                  </div>

                  <div className="border-t border-black/10 pt-4">
                    <div className="flex justify-between items-baseline">
                      <span className="font-medium text-[#11110f]">
                        Total Due
                      </span>

                      <span className="font-serif text-2xl font-medium text-[#11110f]">
                        ₹{total.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02, translateZ: "40px" }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-8"
                >
                  <Link
                    to="/payment"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#11110f] py-4 text-xs uppercase tracking-[0.2em] font-medium text-white shadow-xl shadow-black/10 transition hover:bg-[#a17b38]"
                  >
                    Proceed to Payment
                    <ArrowRight size={16} />
                  </Link>
                </motion.div>

                <p className="mt-4 text-center text-[10px] uppercase tracking-wider text-black/35">
                  Complimentary shipping on orders above ₹5,000
                </p>
              </div>
            </Card3DWrapper>
          </div>
        </div>
      </div>
    </main>
  );
}