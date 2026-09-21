import { motion } from "framer-motion";
import { products } from "../data/Products";

export default function NewArrivals() {
  const newProducts = products.filter(
    (product) => product.newArrival
  );

  return (
    <section
      id="new-arrivals"
      className="bg-white px-5 py-24 lg:px-10"
    >
      <div className="mx-auto max-w-full">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#a17b38]">
          Just In
        </p>

        <h2 className="mt-3 text-4xl font-light sm:text-5xl">
          New Arrivals
        </h2>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {newProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-wider">
                New
              </span>

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-28 text-white">
                <h3 className="text-xl">
                  {product.name}
                </h3>

                <p className="mt-1 text-sm text-white/70">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}