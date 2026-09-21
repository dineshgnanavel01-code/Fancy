import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";

import { products } from "../data/Products";

const categories = [
  "All",
  "Jewellery",
  "Handbags",
  "Watches",
  "Cosmetics",
  "Footwear",
  "Accessories",
];

export default function FeaturedProducts({ onAddToCart, onWishlist }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);
  const [addedId, setAddedId] = useState(null);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products;
    }

    return products.filter(
      (product) => product.category === selectedCategory
    );
  }, [selectedCategory]);

  const toggleWishlist = (id) => {
    setWishlist((current) => {
      const isAlreadyLiked = current.includes(id);

      const updatedWishlist = isAlreadyLiked
        ? current.filter((itemId) => itemId !== id)
        : [...current, id];

      onWishlist?.(id, !isAlreadyLiked);

      return updatedWishlist;
    });
  };

  const handleAddToCart = (product) => {
    onAddToCart?.(product);
    setAddedId(product.id);

    setTimeout(() => {
      setAddedId(null);
    }, 1000);
  };

  return (
    <section
      id="shop"
      className="bg-[#f4f0e8] px-5 py-20 sm:px-8 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-[1800px]">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#a17b38]">
            The Collection
          </p>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">
            Featured Pieces
          </h2>

          <div className="luxe-divider mx-auto mt-5" />
        </motion.div>

        {/* Category Filter */}
        <div className="mt-10 flex gap-2 overflow-x-auto pb-3 scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              whileTap={{ scale: 0.94 }}
              whileHover={{ y: -2 }}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-xs transition ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-white text-black/60 hover:bg-black hover:text-white"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Product Grid */}
        <motion.div
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              const liked = wishlist.includes(product.id);
              const added = addedId === product.id;

              const discount = product.oldPrice
                ? Math.round(
                    ((product.oldPrice - product.price) /
                      product.oldPrice) *
                      100
                  )
                : 0;

              return (
                <motion.article
                  layout
                  key={product.id}
                  initial={{
                    opacity: 0,
                    y: 40,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.04,
                  }}
                  whileHover={{
                    y: -8,
                    rotateX: 1,
                    rotateY: -1,
                  }}
                  className="product-card group flex flex-col justify-between overflow-hidden rounded-3xl bg-white shadow-sm"
                >

                  {/* =========================
                      IMAGE SECTION
                  ========================== */}
                  <div className="relative flex h-[360px] w-full items-center justify-center overflow-hidden bg-[#f8f6f1] sm:h-[400px]">

                    {/* Product Image */}
                    <motion.img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain p-3 sm:p-4"
                      whileHover={{
                        scale: 1.06,
                      }}
                      transition={{
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                    />

                    {/* Soft Image Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.04] via-transparent to-white/10" />

                    {/* New Badge */}
                    {product.newArrival && (
                      <motion.span
                        initial={{
                          opacity: 0,
                          x: -10,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider shadow-sm"
                      >
                        New
                      </motion.span>
                    )}

                    {/* Discount Badge */}
                    {discount > 0 && (
                      <span className="absolute bottom-4 left-4 rounded-full bg-black px-3 py-1.5 text-[10px] text-white shadow-sm">
                        -{discount}%
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <motion.button
                      type="button"
                      whileHover={{
                        scale: 1.12,
                      }}
                      whileTap={{
                        scale: 0.8,
                      }}
                      onClick={() => toggleWishlist(product.id)}
                      className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur transition ${
                        liked
                          ? "text-red-500"
                          : "text-black/60 hover:text-black"
                      }`}
                      aria-label={
                        liked
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      <motion.div
                        animate={
                          liked
                            ? {
                                scale: [1, 1.35, 1],
                              }
                            : {
                                scale: 1,
                              }
                        }
                        transition={{
                          duration: 0.35,
                        }}
                      >
                        <Heart
                          size={17}
                          fill={
                            liked ? "currentColor" : "none"
                          }
                        />
                      </motion.div>
                    </motion.button>

                    {/* Hover Bottom Gradient */}
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* =========================
                      PRODUCT CONTENT
                  ========================== */}
                  <div className="flex flex-1 flex-col justify-between p-5">

                    <div>
                      {/* Category */}
                      <p className="text-[11px] uppercase tracking-wider text-black/40">
                        {product.category}
                      </p>

                      {/* Product Name */}
                      <h3 className="mt-2 text-base font-medium text-zinc-900">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star
                            size={13}
                            fill="currentColor"
                            className="text-[#a17b38]"
                          />

                          <span className="text-xs font-semibold">
                            {product.rating}
                          </span>
                        </div>

                        <span className="text-xs text-black/35">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Price */}
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-lg font-medium text-zinc-900">
                          ₹
                          {product.price.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        {product.oldPrice && (
                          <span className="text-xs text-black/35 line-through">
                            ₹
                            {product.oldPrice.toLocaleString(
                              "en-IN"
                            )}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Add To Cart Button */}
                    <motion.button
                      type="button"
                      whileHover={{
                        scale: 1.02,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      className={`luxe-button mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-medium transition ${
                        added
                          ? "bg-[#a17b38] text-white"
                          : "bg-black text-white hover:bg-[#a17b38]"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        {added ? (
                          <motion.span
                            key="added"
                            initial={{
                              opacity: 0,
                              scale: 0.8,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.8,
                            }}
                            className="flex items-center gap-2"
                          >
                            <Check size={16} />
                            Added
                          </motion.span>
                        ) : (
                          <motion.span
                            key="add"
                            initial={{
                              opacity: 0,
                            }}
                            animate={{
                              opacity: 1,
                            }}
                            exit={{
                              opacity: 0,
                            }}
                            className="flex items-center gap-2"
                          >
                            <ShoppingBag size={16} />
                            Add to Cart
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="py-20 text-center"
          >
            <p className="font-serif text-2xl text-black/70">
              No pieces found
            </p>

            <p className="mt-2 text-sm text-black/40">
              Try selecting another category.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}