import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight,CheckCircle2,CreditCard, Lock,Smartphone,Wallet, ShieldCheck,Sparkles,Check,X,} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Payment({ cart = [], onOrderPlaced }) {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upi: "",
  });

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.price * (item.quantity || 1),
        0
      ),
    [cart]
  );

  const shipping = subtotal >= 5000 || subtotal === 0 ? 0 : 199;
  const total = subtotal + shipping;

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handlePayment = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      navigate("/cart");
      return;
    }

    setProcessing(true);

    setTimeout(() => {
      const orderId = `LO-${Date.now().toString().slice(-8)}`;

      const order = {
        id: orderId,
        items: cart,
        subtotal,
        shipping,
        total,
        paymentMethod,
        status: "confirmed",
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem("luxeoraOrder", JSON.stringify(order));

      onOrderPlaced?.(order);

      setProcessing(false);
      navigate("/tracking");
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#faf8f3] px-5 pb-20 pt-32">
        <div className="pointer-events-none absolute -left-20 top-20 h-96 w-96 rounded-full bg-[#a17b38]/10 blur-[120px]" />
        <div className="mx-auto max-w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2.5rem] border border-white/60 bg-white/80 p-12 shadow-xl backdrop-blur-xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#a17b38]">
              LUXE ORA CHECKOUT
            </p>
            <h1 className="mt-3 font-serif text-4xl font-light text-[#11110f]">
              Your Bag is Empty
            </h1>

            <p className="mt-4 text-sm text-black/50">
              Add handcrafted pieces to your shopping bag before proceeding to checkout.
            </p>

            <Link
              to="/"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-[#11110f] px-8 py-4 text-sm font-medium text-white shadow-xl transition hover:bg-[#a17b38]"
            >
              Continue Shopping
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#faf8f3] px-4 pb-20 pt-28 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-[#a17b38]/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-[500px] w-[500px] rounded-full bg-[#d5b777]/15 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-full">
        <Link
          to="/cart"
          className="group mb-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black/40 transition hover:text-[#a17b38]"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Shopping Bag
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <section>
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#a17b38]">
                <Sparkles size={14} className="text-[#a17b38]" />
                Encrypted Checkout
              </span>

              <h1 className="mt-2 font-serif text-4xl font-light tracking-tight text-[#11110f] sm:text-5xl">
                Payment Details
              </h1>

              <p className="mt-2 text-sm text-black/50">
                Complete your purchase securely using 256-bit encryption.
              </p>
            </div>

            <form onSubmit={handlePayment}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/80 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:p-8"
              >
                <div className="flex items-center gap-4 border-b border-black/10 pb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#11110f] text-[#d5b777] shadow-md">
                    <ShieldCheck size={22} />
                  </div>

                  <div>
                    <h2 className="font-serif text-lg font-medium text-[#11110f]">
                      Choose Payment Method
                    </h2>
                    <p className="mt-0.5 text-xs text-black/40">
                      Select your preferred gateway option below.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <PaymentOption
                    active={paymentMethod === "card"}
                    onClick={() => setPaymentMethod("card")}
                    icon={<CreditCard size={20} />}
                    title="Card"
                    description="Credit / Debit"
                  />

                  <PaymentOption
                    active={paymentMethod === "upi"}
                    onClick={() => setPaymentMethod("upi")}
                    icon={<Smartphone size={20} />}
                    title="UPI"
                    description="Google Pay / PhonePe"
                  />

                  <PaymentOption
                    active={paymentMethod === "wallet"}
                    onClick={() => setPaymentMethod("wallet")}
                    icon={<Wallet size={20} />}
                    title="Wallet"
                    description="Digital Wallet"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {paymentMethod === "card" && (
                    <motion.div
                      key="card-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 space-y-5"
                    >
                      <Input
                        label="Name on Card"
                        placeholder="e.g. Eleanor Vance"
                        value={form.cardName}
                        onChange={(value) => updateForm("cardName", value)}
                        required
                      />

                      <Input
                        label="Card Number"
                        placeholder="4532 •••• •••• 8892"
                        value={form.cardNumber}
                        onChange={(value) => updateForm("cardNumber", value)}
                        required
                        maxLength={19}
                      />

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Input
                          label="Expiry Date"
                          placeholder="MM / YY"
                          value={form.expiry}
                          onChange={(value) => updateForm("expiry", value)}
                          required
                        />

                        <Input
                          label="CVV Code"
                          placeholder="•••"
                          type="password"
                          value={form.cvv}
                          onChange={(value) => updateForm("cvv", value)}
                          required
                          maxLength={4}
                        />
                      </div>
                    </motion.div>
                  )}

                  {paymentMethod === "upi" && (
                    <motion.div
                      key="upi-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 space-y-3"
                    >
                      <Input
                        label="Virtual Payment Address (UPI ID)"
                        placeholder="yourname@upi"
                        value={form.upi}
                        onChange={(value) => updateForm("upi", value)}
                        required
                      />

                      <p className="pl-1 text-xs text-black/40">
                        Popular handles: <span className="font-medium text-black/60">@oksbi</span>, <span className="font-medium text-black/60">@okaxis</span>, <span className="font-medium text-black/60">@ybl</span>
                      </p>
                    </motion.div>
                  )}

                  {paymentMethod === "wallet" && (
                    <motion.div
                      key="wallet-form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-8 rounded-2xl border border-black/5 bg-[#faf8f3] p-6 text-sm text-black/60"
                    >
                      <p className="font-medium text-[#11110f]">Digital Wallet Authorization</p>
                      <p className="mt-1 text-xs text-black/50">
                        You will be securely redirected to select your preferred wallet (Paytm, PhonePe, Apple Pay) on submission.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl border border-black/5 bg-[#faf8f3] py-3.5 text-xs font-medium text-black/60">
                  <Lock size={14} className="text-[#a17b38]" />
                  <span>Protected by 256-bit SSL Banking Protocol</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  type="submit"
                  disabled={processing}
                  className="luxe-button group mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-[#11110f] py-4 text-sm font-medium text-white shadow-xl transition hover:bg-[#a17b38] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {processing ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Authorizing Payment...
                    </span>
                  ) : (
                    <>
                      <span>Complete Purchase • ₹{total.toLocaleString("en-IN")}</span>
                      <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>
              </motion.div>
            </form>
          </section>

          <aside className="h-fit rounded-[2.5rem] border border-white/60 bg-white/80 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] backdrop-blur-xl lg:sticky lg:top-28">
            <h2 className="font-serif text-2xl font-light text-[#11110f]">Order Summary</h2>
            <p className="mt-1 text-xs text-black/40">{cart.length} item(s) in your bag</p>

            <div className="mt-6 max-h-[300px] space-y-4 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3.5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-14 rounded-2xl border border-black/5 object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#11110f]">
                      {item.name}
                    </p>

                    <p className="mt-0.5 text-xs text-black/40">
                      Qty: {item.quantity || 1}
                    </p>
                  </div>

                  <span className="text-sm font-medium text-[#11110f]">
                    ₹{(item.price * (item.quantity || 1)).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 border-t border-black/10 pt-5 text-sm">
              <div className="flex justify-between text-black/60">
                <span>Subtotal</span>
                <span className="font-medium text-[#11110f]">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between text-black/60">
                <span>Express Shipping</span>
                <span className="font-medium text-[#11110f]">
                  {shipping === 0 ? (
                    <span className="text-[#a17b38]">COMPLIMENTARY</span>
                  ) : (
                    `₹${shipping.toLocaleString("en-IN")}`
                  )}
                </span>
              </div>

              <div className="flex justify-between border-t border-black/10 pt-4 text-base font-medium text-[#11110f]">
                <span>Total Amount</span>
                <span className="font-serif text-xl font-normal text-[#a17b38]">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-2xl bg-[#a17b38]/10 p-3.5 text-xs text-[#8a682e]">
              <CheckCircle2 size={16} className="shrink-0 text-[#a17b38]" />
              <span>Free returns within 30 days of delivery</span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function PaymentOption({ active, onClick, icon, title, description }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition-all duration-300 ${
        active
          ? "border-[#11110f] bg-[#11110f] text-white shadow-lg ring-2 ring-[#a17b38]/40"
          : "border-black/10 bg-[#faf8f3] text-black hover:border-black/30 hover:bg-white"
      }`}
    >
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#d5b777] text-[#11110f]"
          >
            <Check size={12} strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
            active
              ? "bg-[#d5b777]/20 text-[#d5b777]"
              : "bg-white text-black/60 shadow-sm group-hover:text-[#a17b38]"
          }`}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium tracking-wide">{title}</p>
          <p
            className={`mt-0.5 text-[11px] truncate transition-colors ${
              active ? "text-white/60" : "text-black/40"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
    </motion.button>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  maxLength,
}) {
  return (
    <label className="group block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/60 transition-colors group-focus-within:text-[#a17b38]">
        {label}
      </span>

      <div className="relative flex items-center">
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          required={required}
          maxLength={maxLength}
          className="w-full rounded-2xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 pr-10 text-sm text-black outline-none transition-all duration-200 placeholder:text-black/30 focus:border-[#a17b38] focus:bg-white focus:shadow-md focus:ring-4 focus:ring-[#a17b38]/10"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/10 text-black/50 transition hover:bg-black/20 hover:text-black"
          >
            <X size={12} />
          </button>
        )}
      </div>
    </label>
  );
}