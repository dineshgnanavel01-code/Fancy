import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const categories = [
  {
    name: "Jewellery",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Handbags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Watches",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Cosmetics",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Footwear",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=800&q=80",
  },
];

function CategoryCard({ category, index }) {
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 450, damping: 25 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [15, -15]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-15, 15]),
    springConfig
  );

  const glareX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [0, 100]),
    springConfig
  );
  const glareY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [0, 100]),
    springConfig
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const currentMouseX = e.clientX - rect.left;
    const currentMouseY = e.clientY - rect.top;

    mouseX.set(currentMouseX / width - 0.5);
    mouseY.set(currentMouseY / height - 0.5);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="[perspective:1000px]"
    >
      <motion.a
        href="#shop"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="group relative block overflow-hidden rounded-2xl shadow-md transition-shadow duration-300 hover:shadow-2xl"
      >
        <motion.div
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 65%)`
              : "none",
          }}
          className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        />

        <img
          src={category.image}
          alt={category.name}
          className="h-64 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <motion.div
          style={{ transform: "translateZ(30px)" }}
          className="absolute bottom-0 left-0 p-5 text-white"
        >
          <h3 className="text-lg font-medium tracking-wide">
            {category.name}
          </h3>

          <span className="mt-1 flex items-center gap-1 text-xs text-white/80 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:text-[#d7bf87]">
            Explore →
          </span>
        </motion.div>
      </motion.a>
    </motion.div>
  );
}

export default function Categories() {
  return (
    <section id="categories" className="bg-white px-5 py-24 lg:px-10">
      <div className="mx-auto max-w-full">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a17b38]">
            Curated For You
          </p>

          <h2 className="mt-3 text-4xl font-light sm:text-5xl">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.name}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}