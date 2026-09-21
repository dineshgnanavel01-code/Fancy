import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye,EyeOff,ArrowRight,ArrowLeft,User,Mail,Lock,Sparkles,CheckCircle2,} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // 3D Motion Tilt Values for Image Card
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

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("luxeoraUser", JSON.stringify(form));
    navigate("/profile");
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#faf8f3] px-5 py-10 lg:px-10">
      {/* Background Ambient Blur Orbs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#a17b38]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#d5b777]/15 blur-[120px]" />

      <div className="flex w-full max-w-[1200px] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid w-full overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] backdrop-blur-xl lg:grid-cols-2"
        >
          {/* Form Side */}
          <div className="order-2 flex items-center justify-center px-7 py-12 sm:px-12 lg:order-1 lg:px-16">
            <div className="w-full max-w-md">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black/40 transition hover:text-[#a17b38]"
              >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                Back to Store
              </Link>

              <div className="mt-10">
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#a17b38]">
                  LUXE ORA
                </span>

                <h1 className="mt-2 text-4xl font-light tracking-tight text-[#111110]">
                  Create Account
                </h1>

                <p className="mt-2 text-sm text-black/50">
                  Join LUXE ORA and discover your next favorite luxury piece.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                {/* Full Name Input */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/60">
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                    />
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="w-full rounded-2xl border border-black/10 bg-[#faf8f3] py-3.5 pl-11 pr-4 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-[#a17b38] focus:bg-white focus:ring-2 focus:ring-[#a17b38]/10"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/60">
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                    />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-2xl border border-black/10 bg-[#faf8f3] py-3.5 pl-11 pr-4 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-[#a17b38] focus:bg-white focus:ring-2 focus:ring-[#a17b38]/10"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/60">
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      required
                      minLength={6}
                      className="w-full rounded-2xl border border-black/10 bg-[#faf8f3] py-3.5 pl-11 pr-12 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-[#a17b38] focus:bg-white focus:ring-2 focus:ring-[#a17b38]/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((current) => !current)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 transition hover:text-black"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Perks Checklist */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-black/50">
                    <CheckCircle2 size={14} className="text-[#a17b38]" />
                    <span>Complimentary Express Shipping on First Order</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-black/50">
                    <CheckCircle2 size={14} className="text-[#a17b38]" />
                    <span>Early Access to Private Sales & Limited Releases</span>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  type="submit"
                  className="luxe-button group mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-[#11110f] py-4 text-sm font-medium text-white shadow-xl transition hover:bg-[#a17b38]"
                >
                  Create Account
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>
              </form>

              {/* Footer Link */}
              <p className="mt-8 text-center text-sm text-black/50">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#a17b38] transition hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative order-1 hidden min-h-[680px] overflow-hidden p-6 lg:order-2 lg:block [perspective:1000px]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1000&q=85"
                alt="LUXE ORA collection"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

              <div
                style={{ transform: "translateZ(30px)" }}
                className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md"
              >
                <Sparkles size={14} className="text-[#d5b777]" />
                Join The Circle
              </div>

              <div
                style={{ transform: "translateZ(40px)" }}
                className="absolute bottom-10 left-10 right-10 text-white"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#d5b777]">
                  Discover More
                </p>

                <h2 className="mt-3 font-serif text-5xl font-light leading-tight">
                  Designed for <br />
                  <span className="italic text-[#d5b777]">the extraordinary.</span>
                </h2>

                <p className="mt-4 max-w-sm text-sm text-white/70">
                  Become a member today and enjoy bespoke recommendations, VIP support, and artisan privileges.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}