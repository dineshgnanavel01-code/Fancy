import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, Sparkles, CheckCircle } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 5000);
  };

  return (
    <main className="min-h-screen bg-[#faf8f3] pb-20 pt-28 sm:pt-32">
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="pointer-events-none absolute left-[-100px] top-10 h-64 w-64 rounded-full bg-[#d5b777]/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-[-100px] h-72 w-72 rounded-full bg-[#a17b38]/15 blur-3xl" />

        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#d5b777]/40 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-[#8b692f] shadow-sm">
              <Sparkles size={14} />
              Get In Touch
            </div>

            <h1 className="font-serif text-3xl font-medium tracking-tight text-black sm:text-4xl md:text-5xl lg:text-6xl">
              Let’s Talk About{" "}
              <span className="inline-block text-[#a17b38]">LUXE ORA</span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-black/60 sm:text-base">
              Have a question about our collections, orders, delivery, or
              custom styling options? Our concierge team is here to assist you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between rounded-3xl bg-black p-6 text-white shadow-xl sm:p-8 md:p-10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#d5b777]">
                Contact Information
              </p>

              <h2 className="mt-3 font-serif text-2xl font-medium sm:text-3xl md:text-4xl">
                We’d love to hear from you.
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-white/60">
                Reach out to our customer care team and we’ll get back to you as soon as possible.
              </p>

              <div className="mt-8 space-y-6 sm:mt-10 sm:space-y-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#d5b777]">
                    <Mail size={19} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                      Email
                    </p>
                    <a
                      href="mailto:hello@luxeora.com"
                      className="mt-1 block text-sm font-medium text-white/95 transition hover:text-[#d5b777]"
                    >
                      hello@luxeora.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#d5b777]">
                    <Phone size={19} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                      Phone
                    </p>
                    <a
                      href="tel:+919876543210"
                      className="mt-1 block text-sm font-medium text-white/95 transition hover:text-[#d5b777]"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#d5b777]">
                    <MapPin size={19} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                      Address
                    </p>
                    <p className="mt-1 text-sm font-medium leading-relaxed text-white/95">
                      LUXE ORA Studio
                      <br />
                      Chennai, Tamil Nadu
                      <br />
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-[#d5b777]">
                    <Clock size={19} />
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
                      Working Hours
                    </p>
                    <p className="mt-1 text-sm font-medium text-white/95">
                      Mon – Sat · 10:00 AM – 7:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-6 sm:mt-12">
              <p className="text-xs text-white/40">
                Response time: Within 24 business hours.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between rounded-3xl border border-black/5 bg-white p-6 shadow-xl sm:p-8 md:p-10"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#a17b38]">
                Send A Message
              </p>

              <h2 className="mt-3 font-serif text-2xl font-medium text-black sm:text-3xl md:text-4xl">
                How can we help?
              </h2>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/60"
                    >
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 text-sm text-black outline-none transition focus:border-[#a17b38] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/60"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 text-sm text-black outline-none transition focus:border-[#a17b38] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/60"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Inquiry about orders, custom styling..."
                    className="w-full rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 text-sm text-black outline-none transition focus:border-[#a17b38] focus:bg-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-black/60"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className="w-full resize-none rounded-xl border border-black/10 bg-[#faf8f3] px-4 py-3.5 text-sm text-black outline-none transition focus:border-[#a17b38] focus:bg-white"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 text-sm font-semibold text-white transition duration-200 hover:bg-[#a17b38]"
                >
                  {submitted ? (
                    <>
                      <CheckCircle size={18} className="text-[#d5b777]" />
                      Message Sent Successfully
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

        </div>
      </section>
    </main>
  );
}

export default Contact;