import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, ArrowLeft, Lock, Mail, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem(
      "luxeoraUser",
      JSON.stringify({
        email,
        name: email.split("@")[0],
      })
    );

    navigate("/profile");
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#faf8f3] px-5 py-10 lg:px-10">
      <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-[#a17b38]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-[#d5b777]/15 blur-[120px]" />

      <div className="flex w-full max-w-[1200px] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid w-full overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/80 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] backdrop-blur-xl lg:grid-cols-2"
        >
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative hidden min-h-[680px] overflow-hidden p-6 lg:block [perspective:1000px]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=85"
                alt="LUXE ORA fashion"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

              <div 
                style={{ transform: "translateZ(30px)" }}
                className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md"
              >
                <Sparkles size={14} className="text-[#d5b777]" />
                Exclusive Portal
              </div>

              <div 
                style={{ transform: "translateZ(40px)" }}
                className="absolute bottom-10 left-10 right-10 text-white"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-[#d5b777]">
                  Welcome Back
                </p>

                <h2 className="mt-3 font-serif text-5xl font-light leading-tight">
                  Your style, <br />
                  <span className="italic text-[#d5b777]">your story.</span>
                </h2>

                <p className="mt-4 max-w-sm text-sm text-white/70">
                  Access your curated wishlist, tracked orders, and personalized couture recommendations.
                </p>
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center px-7 py-12 sm:px-12 lg:px-16">
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
                  Sign In
                </h1>

                <p className="mt-2 text-sm text-black/50">
                  Enter your credentials to manage your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-2xl border border-black/10 bg-[#faf8f3] py-3.5 pl-11 pr-4 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-[#a17b38] focus:bg-white focus:ring-2 focus:ring-[#a17b38]/10"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-black/60">
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-medium text-[#a17b38] transition hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="relative">
                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30"
                    />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Enter your password"
                      required
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

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  type="submit"
                  className="luxe-button group flex w-full items-center justify-center gap-3 rounded-full bg-[#11110f] py-4 text-sm font-medium text-white shadow-xl transition hover:bg-[#a17b38]"
                >
                  Sign In
                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>
              </form>

              <p className="mt-8 text-center text-sm text-black/50">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-[#a17b38] transition hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}