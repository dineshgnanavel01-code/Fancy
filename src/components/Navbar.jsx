import React, { useEffect, useState } from "react";
import { Search, Heart, ShoppingBag, Menu, X, User, Trash2, Minus, Plus, ArrowRight, LogIn, UserPlus, CreditCard, Truck, CheckCircle2, PackageCheck, ShieldCheck,Clock,MapPin,ChevronRight,Sparkles, Crown,} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

const links = [
  ["Home", "home"],
  ["Shop", "shop"],
  ["Categories", "categories"],
  ["New Arrivals", "new-arrivals"],
  ["Offers", "offers"],
  ["About", "about"],
  ["Contact", "contact"],
];

const navItemVariants = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -2,
    scale: 1.03,
  },
};

export default function Navbar({
  wishlistCount = 0,
  cart = [],
  cartCount = 0,
  onRemoveFromCart,
  onUpdateQuantity,
  onClearCart,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("shipping");
  const [activeOrder, setActiveOrder] = useState(null);
  const [trackingOpen, setTrackingOpen] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    address: "742 Evergreen Terrace",
    city: "Mumbai",
    pincode: "400001",
    phone: "+91 98765 43210",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const shipping = subtotal >= 5000 ? 0 : 199;
  const total = subtotal + shipping;

  const closeNavigationPanels = () => {
    setMenuOpen(false);
    setSearchOpen(false);
    setProfileOpen(false);
    setCartOpen(false);
    setWishlistOpen(false);
  };

  const closeAllPanels = () => {
    setCartOpen(false);
    setWishlistOpen(false);
    setProfileOpen(false);
    setSearchOpen(false);
  };

  const scrollToSection = (id) => {
    closeNavigationPanels();

    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      window.history.replaceState(null, "", `/#${id}`);
    }
  };

  useEffect(() => {
    if (location.pathname === "/" && location.hash) {
      const id = location.hash.substring(1);

      const timer = setTimeout(() => {
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const openCart = () => {
    closeAllPanels();
    setMenuOpen(false);
    setCartOpen(true);
  };

  const openWishlist = () => {
    closeAllPanels();
    setMenuOpen(false);
    setWishlistOpen(true);
  };

  const openProfile = () => {
    setMenuOpen(false);
    setCartOpen(false);
    setWishlistOpen(false);
    setSearchOpen(false);

    setProfileOpen((current) => !current);
  };

  const toggleMobileMenu = () => {
    setMenuOpen((current) => !current);

    setSearchOpen(false);
    setCartOpen(false);
    setWishlistOpen(false);
    setProfileOpen(false);
  };

  const toggleSearch = () => {
    setSearchOpen((current) => !current);

    setMenuOpen(false);
    setCartOpen(false);
    setWishlistOpen(false);
    setProfileOpen(false);
  };

  const handleStartCheckout = () => {
    setCartOpen(false);
    setCheckoutStep("shipping");
    setCheckoutOpen(true);
  };

  const handlePlaceOrder = () => {
    const newOrder = {
      orderId: `LX-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      subtotal,
      shipping,
      total,
      shippingInfo,
      paymentMethod,
      status: "Processing",
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      estimatedDelivery: "3-5 Business Days",
    };

    setActiveOrder(newOrder);
    setCheckoutOpen(false);

    if (onClearCart) {
      onClearCart();
    }

    setTrackingOpen(true);
  };

  return (
    <>
      <motion.header
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed inset-x-0 top-0 z-50 px-1.5 pt-1.5 sm:px-4 sm:pt-3 lg:px-6 xl:px-8"
      >
        <div className="mx-auto w-full max-w-full">
          <div className="relative overflow-visible rounded-[16px] border border-black/10 bg-[#faf8f3]/95 shadow-[0_15px_50px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:rounded-[24px]">
            {/* GOLD TOP LINE */}
            <div className="pointer-events-none absolute left-[8%] right-[8%] top-0 h-px bg-gradient-to-r from-transparent via-[#b28a43] to-transparent opacity-80" />

            <div className="flex min-h-[58px] w-full items-center gap-0 px-1.5 sm:min-h-[72px] sm:gap-2 sm:px-5 lg:min-h-[78px] lg:gap-4 lg:px-7">
              <Link
                to="/"
                onClick={closeNavigationPanels}
                aria-label="LUXE ORA Home"
                className="font-serif text-[15px] font-semibold tracking-[0.22em] text-white"
              >
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  whileTap={{
                    scale: 0.96,
                  }}
                  className="flex min-w-0 items-center gap-1 sm:gap-2"
                  style={{
                    perspective: "800px",
                  }}
                >
                  <motion.div
                    variants={{
                      rest: {
                        rotateY: 0,
                        rotateX: 0,
                      },
                      hover: {
                        rotateY: 180,
                        rotateX: 8,
                      },
                    }}
                    transition={{
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-[#d5b777] shadow-lg sm:h-11 sm:w-11"
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Crown
                      size={14}
                      strokeWidth={1.5}
                      className="relative z-10 sm:h-[18px] sm:w-[18px]"
                    />

                    <span className="absolute inset-1 rounded-full border border-[#d5b777]/40" />
                  </motion.div>

                  <div className="min-w-0">
                    <motion.p
                      variants={{
                        rest: {
                          letterSpacing: "0.08em",
                        },
                        hover: {
                          letterSpacing: "0.16em",
                        },
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className="truncate text-[9px] font-semibold leading-none text-black min-[360px]:text-[10px] sm:text-[14px] lg:text-[15px]"
                    >
                      LUXE ORA
                    </motion.p>

                    <span className="mt-1 block truncate text-[4px] uppercase tracking-[0.12em] text-[#a17b38] min-[360px]:text-[5px] sm:text-[7px] sm:tracking-[0.28em] lg:text-[8px] lg:tracking-[0.35em]">
                      Maison & Lifestyle
                    </span>
                  </div>
                </motion.div>
              </Link>

              <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex 2xl:gap-1">
                {links.map(([label, id]) => {
                  const isContactPage = id === "contact";

                  return (
                    <motion.div
                      key={id}
                      variants={navItemVariants}
                      initial="rest"
                      whileHover="hover"
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="shrink-0"
                    >
                      <Link
                        to={isContactPage ? "/contact" : `/#${id}`}
                        onClick={() => {
                          closeNavigationPanels();
                          if (!isContactPage) {
                            scrollToSection(id);
                          }
                        }}
                        className="group relative flex shrink-0 items-center justify-center rounded-full px-2.5 py-2 text-[12px] font-medium text-black/65 transition-colors duration-300 hover:text-black 2xl:px-3 2xl:text-[13px]"
                      >
                        <span className="relative z-10 whitespace-nowrap">
                          {label}
                        </span>

                        <motion.span
                          initial={{
                            opacity: 0,
                            scale: 0.6,
                          }}
                          whileHover={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                          className="absolute inset-0 -z-0 rounded-full bg-white shadow-sm"
                        />

                        <motion.span
                          initial={{
                            width: 0,
                            opacity: 0,
                          }}
                          whileHover={{
                            width: "55%",
                            opacity: 1,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                          className="absolute bottom-1 left-1/2 h-px -translate-x-1/2 bg-[#a17b38]"
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="ml-auto flex shrink-0 items-center gap-0">
                {/* SEARCH */}
                <motion.button
                  type="button"
                  aria-label="Search"
                  aria-expanded={searchOpen}
                  whileHover={{
                    scale: 1.08,
                    rotateY: 10,
                    rotateX: -6,
                  }}
                  whileTap={{
                    scale: 0.86,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 18,
                  }}
                  onClick={toggleSearch}
                  className="group relative rounded-full p-1.5 min-[360px]:p-2 sm:p-2.5"
                  style={{
                    perspective: "600px",
                  }}
                >
                  <span className="absolute inset-0 scale-0 rounded-full bg-[#a17b38]/10 transition-transform duration-300 group-hover:scale-100" />

                  <Search
                    size={15}
                    className="relative z-10 min-[360px]:h-4 min-[360px]:w-4 sm:h-[18px] sm:w-[18px]"
                  />
                </motion.button>

                {/* PROFILE */}
                <div className="relative hidden sm:block">
                  <motion.button
                    type="button"
                    aria-label="Profile"
                    aria-expanded={profileOpen}
                    whileHover={{
                      scale: 1.08,
                      rotateY: -10,
                      rotateX: -6,
                    }}
                    whileTap={{
                      scale: 0.86,
                    }}
                    onClick={openProfile}
                    className="group relative rounded-full p-2.5"
                    style={{
                      perspective: "600px",
                    }}
                  >
                    <span className="absolute inset-0 scale-0 rounded-full bg-[#a17b38]/10 transition-transform duration-300 group-hover:scale-100" />

                    <User size={18} className="relative z-10" />
                  </motion.button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 15,
                          scale: 0.92,
                          rotateX: -8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          rotateX: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: 10,
                          scale: 0.95,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        className="absolute right-0 top-14 w-[270px] origin-top-right overflow-hidden rounded-2xl border border-black/10 bg-[#faf8f3] p-2 shadow-[0_25px_70px_rgba(0,0,0,0.15)]"
                      >
                        <div className="rounded-xl bg-white px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-[#d5b777]">
                              <User size={17} />
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm font-semibold">
                                Welcome to LUXE ORA
                              </p>

                              <p className="mt-1 text-[10px] text-black/40">
                                Your luxury account
                              </p>
                            </div>
                          </div>
                        </div>

                        {activeOrder && (
                          <motion.button
                            type="button"
                            whileHover={{
                              x: 3,
                            }}
                            onClick={() => {
                              setProfileOpen(false);
                              setTrackingOpen(true);
                            }}
                            className="mt-2 flex w-full items-center gap-3 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium text-[#9b7738]"
                          >
                            <Truck size={17} />
                            Track Active Order
                          </motion.button>
                        )}

                        <Link
                          to="/login"
                          onClick={() => setProfileOpen(false)}
                          className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-white"
                        >
                          <LogIn size={17} />
                          Login
                        </Link>

                        <Link
                          to="/signup"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-white"
                        >
                          <UserPlus size={17} />
                          Create Account
                        </Link>

                        <Link
                          to="/profile"
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-white"
                        >
                          <User size={17} />
                          My Profile
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* WISHLIST */}
                <motion.button
                  type="button"
                  aria-label="Wishlist"
                  aria-expanded={wishlistOpen}
                  whileHover={{
                    scale: 1.08,
                    rotateY: 12,
                    rotateZ: -3,
                  }}
                  whileTap={{
                    scale: 0.82,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                  onClick={openWishlist}
                  className="group relative rounded-full p-1.5 min-[360px]:p-2 sm:p-2.5"
                  style={{
                    perspective: "600px",
                  }}
                >
                  <span className="absolute inset-0 scale-0 rounded-full bg-[#a17b38]/10 transition-transform duration-300 group-hover:scale-100" />

                  <Heart
                    size={15}
                    className="relative z-10 transition group-hover:fill-[#a17b38] group-hover:text-[#a17b38] min-[360px]:h-4 min-[360px]:w-4 sm:h-[18px] sm:w-[18px]"
                  />

                  {wishlistCount > 0 && (
                    <motion.span
                      key={wishlistCount}
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      className="absolute -right-0.5 -top-0.5 z-20 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-black px-1 text-[8px] font-semibold text-white sm:right-0 sm:top-0 sm:h-4 sm:min-w-4 sm:text-[9px]"
                    >
                      {wishlistCount}
                    </motion.span>
                  )}
                </motion.button>

                {/* CART */}
                <motion.button
                  type="button"
                  aria-label="Shopping cart"
                  aria-expanded={cartOpen}
                  whileHover={{
                    scale: 1.08,
                    rotateY: -12,
                    rotateX: -5,
                  }}
                  whileTap={{
                    scale: 0.82,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                  onClick={openCart}
                  className="group relative rounded-full p-1.5 min-[360px]:p-2 sm:p-2.5"
                  style={{
                    perspective: "600px",
                  }}
                >
                  <span className="absolute inset-0 scale-0 rounded-full bg-[#a17b38]/10 transition-transform duration-300 group-hover:scale-100" />

                  <ShoppingBag
                    size={15}
                    className="relative z-10 min-[360px]:h-4 min-[360px]:w-4 sm:h-[18px] sm:w-[18px]"
                  />

                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{
                        scale: 0.4,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      className="absolute -right-0.5 -top-0.5 z-20 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#a17b38] px-1 text-[8px] font-semibold text-white shadow-md sm:right-0 sm:top-0 sm:h-4 sm:min-w-4 sm:text-[9px]"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </motion.button>

                {/* MOBILE MENU */}
                <motion.button
                  type="button"
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-navigation"
                  whileHover={{
                    scale: 1.06,
                  }}
                  whileTap={{
                    scale: 0.88,
                  }}
                  onClick={toggleMobileMenu}
                  className="ml-0.5 rounded-full border border-black/10 bg-white p-1.5 min-[360px]:p-2 sm:ml-1 sm:p-2.5 xl:hidden"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={menuOpen ? "close" : "menu"}
                      initial={{
                        opacity: 0,
                        rotate: -90,
                        scale: 0.6,
                      }}
                      animate={{
                        opacity: 1,
                        rotate: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        rotate: 90,
                        scale: 0.6,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="block"
                    >
                      {menuOpen ? (
                        <X
                          size={17}
                          className="sm:h-[18px] sm:w-[18px]"
                        />
                      ) : (
                        <Menu
                          size={17}
                          className="sm:h-[18px] sm:w-[18px]"
                        />
                      )}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    height: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    y: -10,
                  }}
                  className="overflow-hidden border-t border-black/5"
                >
                  <div className="px-2.5 py-2.5 sm:px-5 sm:py-4 lg:px-6">
                    <motion.div
                      initial={{
                        scale: 0.96,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      className="mx-auto flex max-w-full items-center gap-2.5 rounded-full border border-black/10 bg-white px-3.5 py-2.5 shadow-sm sm:gap-3 sm:px-5 sm:py-3.5"
                    >
                      <Search
                        size={17}
                        className="shrink-0 text-[#a17b38]"
                      />

                      <input
                        autoFocus
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        type="text"
                        placeholder="Search luxury products..."
                        className="min-w-0 w-full bg-transparent text-xs outline-none sm:text-sm"
                      />

                      {search && (
                        <button
                          type="button"
                          aria-label="Clear search"
                          onClick={() => setSearch("")}
                          className="shrink-0 rounded-full p-1 text-black/40 transition hover:bg-black/5 hover:text-black"
                        >
                          <X size={15} />
                        </button>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  id="mobile-navigation"
                  initial={{
                    opacity: 0,
                    height: 0,
                  }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="overflow-hidden border-t border-black/5 xl:hidden"
                >
                  <nav className="max-h-[calc(100vh-70px)] overflow-y-auto overscroll-contain px-3 pb-4 pt-1 sm:max-h-[calc(100vh-90px)] sm:px-5">
                    {links.map(([label, id], index) => {
                      const isContactPage = id === "contact";

                      return (
                        <motion.div
                          key={id}
                          initial={{
                            opacity: 0,
                            x: -15,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: index * 0.04,
                          }}
                        >
                          <Link
                            to={isContactPage ? "/contact" : `/#${id}`}
                            onClick={() => {
                              closeNavigationPanels();
                              setMenuOpen(false);
                              if (!isContactPage) {
                                scrollToSection(id);
                              }
                            }}
                            className="group flex w-full items-center justify-between border-b border-black/5 py-3.5 text-left text-sm font-medium sm:py-4"
                          >
                            <span className="transition group-hover:text-[#a17b38]">
                              {label}
                            </span>

                            <ChevronRight
                              size={16}
                              className="text-black/30 transition group-hover:translate-x-1 group-hover:text-[#a17b38]"
                            />
                          </Link>
                        </motion.div>
                      );
                    })}

                    <div className="grid grid-cols-1 gap-2 pt-4 min-[380px]:grid-cols-2">
                      <Link
                        to="/login"
                        onClick={closeNavigationPanels}
                        className="flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white py-3 text-xs font-medium transition hover:border-[#a17b38]"
                      >
                        <LogIn size={15} />
                        Login
                      </Link>

                      <Link
                        to="/signup"
                        onClick={closeNavigationPanels}
                        className="flex items-center justify-center gap-2 rounded-full bg-black py-3 text-xs font-medium text-white transition hover:bg-[#a17b38]"
                      >
                        <UserPlus size={15} />
                        Create Account
                      </Link>
                    </div>
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setCartOpen(false)}
              className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-sm"
            />

            <motion.aside
              initial={{
                x: "100%",
                rotateY: -8,
              }}
              animate={{
                x: 0,
                rotateY: 0,
              }}
              exit={{
                x: "100%",
                rotateY: -8,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
              }}
              className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-[#faf8f3] shadow-2xl"
              style={{
                transformPerspective: 1200,
              }}
            >
              <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-4 py-4 sm:px-6 sm:py-5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={18} />

                    <h2 className="text-lg font-medium sm:text-xl">
                      Shopping Bag
                    </h2>
                  </div>

                  <p className="mt-1 text-xs text-black/40">
                    {cartCount} {cartCount === 1 ? "item" : "items"}
                  </p>
                </div>

                <motion.button
                  whileHover={{
                    rotate: 90,
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.85,
                  }}
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="shrink-0 rounded-full p-2 transition hover:bg-black/5"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-3.5 py-4 sm:px-6 sm:py-5">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center px-3 text-center">
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        rotateY: [0, 8, 0],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                      }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-black/5"
                    >
                      <ShoppingBag
                        size={30}
                        className="text-black/40"
                      />
                    </motion.div>

                    <h3 className="mt-5 text-lg font-medium">
                      Your bag is empty
                    </h3>

                    <p className="mt-2 max-w-xs text-sm leading-6 text-black/40">
                      Add something beautiful to your shopping bag and it will
                      appear here.
                    </p>

                    <motion.button
                      whileHover={{
                        scale: 1.04,
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      type="button"
                      onClick={() => {
                        setCartOpen(false);
                        scrollToSection("shop");
                      }}
                      className="mt-6 flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white"
                    >
                      Start Shopping
                      <ArrowRight size={16} />
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <AnimatePresence mode="popLayout">
                      {cart.map((item) => {
                        const quantity = item.quantity || 1;

                        return (
                          <motion.div
                            key={item.id}
                            layout
                            initial={{
                              opacity: 0,
                              x: 30,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            exit={{
                              opacity: 0,
                              x: 60,
                              scale: 0.9,
                            }}
                            className="flex gap-2.5 border-b border-black/5 pb-5 min-[380px]:gap-3 sm:gap-4"
                          >
                            <motion.img
                              whileHover={{
                                scale: 1.05,
                              }}
                              src={item.image}
                              alt={item.name}
                              className="h-20 w-16 shrink-0 rounded-xl object-cover sm:h-24 sm:w-20"
                            />

                            <div className="min-w-0 flex-1">
                              <div className="flex justify-between gap-2">
                                <div className="min-w-0">
                                  <p className="text-[10px] text-black/40 sm:text-xs">
                                    {item.category}
                                  </p>

                                  <h3 className="mt-1 truncate text-xs font-medium sm:text-sm">
                                    {item.name}
                                  </h3>
                                </div>

                                <motion.button
                                  whileHover={{
                                    scale: 1.15,
                                    rotate: 5,
                                  }}
                                  whileTap={{
                                    scale: 0.8,
                                  }}
                                  type="button"
                                  onClick={() =>
                                    onRemoveFromCart?.(item.id)
                                  }
                                  className="shrink-0 text-black/30 transition hover:text-red-500"
                                >
                                  <Trash2 size={15} />
                                </motion.button>
                              </div>

                              <div className="mt-3 flex items-center justify-between gap-2 min-[380px]:mt-4">
                                <div className="flex shrink-0 items-center rounded-full border border-black/10 bg-white">
                                  <motion.button
                                    whileTap={{
                                      scale: 0.8,
                                    }}
                                    type="button"
                                    onClick={() =>
                                      onUpdateQuantity?.(
                                        item.id,
                                        quantity - 1
                                      )
                                    }
                                    className="p-1.5 min-[380px]:p-2"
                                  >
                                    <Minus size={12} />
                                  </motion.button>

                                  <span className="w-6 text-center text-xs">
                                    {quantity}
                                  </span>

                                  <motion.button
                                    whileTap={{
                                      scale: 0.8,
                                    }}
                                    type="button"
                                    onClick={() =>
                                      onUpdateQuantity?.(
                                        item.id,
                                        quantity + 1
                                      )
                                    }
                                    className="p-1.5 min-[380px]:p-2"
                                  >
                                    <Plus size={12} />
                                  </motion.button>
                                </div>

                                <span className="text-xs font-medium min-[380px]:text-sm">
                                  ₹
                                  {(
                                    item.price * quantity
                                  ).toLocaleString("en-IN")}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="shrink-0 border-t border-black/10 bg-white px-4 py-4 sm:px-6 sm:py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-black/50">
                      Subtotal
                    </span>

                    <span className="text-lg font-medium">
                      ₹{subtotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="mt-2 flex justify-between text-xs text-black/35">
                    <span>Shipping</span>

                    <span>
                      {shipping === 0 ? "FREE" : `₹${shipping}`}
                    </span>
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    type="button"
                    onClick={handleStartCheckout}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#a17b38] py-4 text-sm font-medium text-white shadow-lg shadow-[#a17b38]/20 transition hover:bg-black"
                  >
                    Proceed to Checkout
                    <ArrowRight size={17} />
                  </motion.button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {wishlistOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setWishlistOpen(false)}
              className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-sm"
            />

            <motion.aside
              initial={{
                x: "100%",
                rotateY: -8,
              }}
              animate={{
                x: 0,
                rotateY: 0,
              }}
              exit={{
                x: "100%",
                rotateY: -8,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 28,
              }}
              className="fixed right-0 top-0 z-[70] h-full w-full max-w-md bg-[#faf8f3] shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-black/10 px-4 py-4 sm:px-6 sm:py-5">
                <div>
                  <div className="flex items-center gap-2">
                    <Heart size={18} />

                    <h2 className="text-lg font-medium sm:text-xl">
                      Wishlist
                    </h2>
                  </div>

                  <p className="mt-1 text-xs text-black/40">
                    {wishlistCount} saved{" "}
                    {wishlistCount === 1 ? "item" : "items"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setWishlistOpen(false)}
                  className="rounded-full p-2 transition hover:bg-black/5"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex h-[calc(100%-81px)] flex-col items-center justify-center px-6 text-center">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotateZ: [-3, 3, -3],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                  }}
                >
                  <Heart
                    size={46}
                    strokeWidth={1.2}
                    className="text-[#a17b38]"
                  />
                </motion.div>

                {wishlistCount > 0 ? (
                  <>
                    <h3 className="mt-5 text-lg font-medium">
                      Your saved pieces
                    </h3>

                    <p className="mt-2 text-sm text-black/40">
                      Your wishlist contains {wishlistCount}{" "}
                      {wishlistCount === 1 ? "item" : "items"}.
                    </p>

                    <motion.button
                      whileHover={{
                        scale: 1.04,
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.96,
                      }}
                      type="button"
                      onClick={() => {
                        setWishlistOpen(false);
                        scrollToSection("shop");
                      }}
                      className="mt-6 rounded-full bg-black px-6 py-3 text-sm text-white"
                    >
                      Continue Shopping
                    </motion.button>
                  </>
                ) : (
                  <>
                    <h3 className="mt-5 text-lg font-medium">
                      Your wishlist is empty
                    </h3>

                    <p className="mt-2 max-w-xs text-sm leading-6 text-black/40">
                      Save your favourite LUXE ORA pieces here for later.
                    </p>
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {checkoutOpen && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setCheckoutOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
                y: 30,
                rotateX: -5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.92,
                y: 20,
              }}
              transition={{
                duration: 0.4,
              }}
              className="relative z-[90] max-h-[96vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-[#faf8f3] p-3.5 shadow-2xl sm:max-h-[90vh] sm:rounded-3xl sm:p-8"
              style={{
                perspective: "1000px",
              }}
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Sparkles
                      size={18}
                      className="shrink-0 text-[#a17b38]"
                    />

                    <h2 className="text-xl font-semibold sm:text-2xl">
                      Checkout
                    </h2>
                  </div>

                  <p className="mt-1 text-xs text-black/40">
                    Complete your LUXE ORA order
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCheckoutOpen(false)}
                  className="shrink-0 rounded-full p-2 hover:bg-black/5"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] min-[380px]:gap-2 min-[380px]:text-xs sm:gap-4 sm:text-sm">
                <span
                  className={`flex items-center gap-1 font-medium min-[380px]:gap-1.5 sm:gap-2 ${
                    checkoutStep === "shipping"
                      ? "text-[#a17b38]"
                      : "text-black/40"
                  }`}
                >
                  <MapPin size={14} />
                  1. Shipping
                </span>

                <ChevronRight
                  size={14}
                  className="text-black/20"
                />

                <span
                  className={`flex items-center gap-1 font-medium min-[380px]:gap-1.5 sm:gap-2 ${
                    checkoutStep === "payment"
                      ? "text-[#a17b38]"
                      : "text-black/40"
                  }`}
                >
                  <CreditCard size={14} />
                  2. Payment
                </span>
              </div>

              {checkoutStep === "shipping" ? (
                <div className="mt-5 space-y-3.5 sm:mt-6 sm:space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-black/50">
                    Shipping Details
                  </h3>

                  <div>
                    <label className="block text-xs font-medium text-black/60">
                      Full Name
                    </label>

                    <input
                      type="text"
                      value={shippingInfo.name}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          name: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-black/10 bg-white p-3 text-sm outline-none transition focus:border-[#a17b38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-black/60">
                      Email Address
                    </label>

                    <input
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          email: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-black/10 bg-white p-3 text-sm outline-none transition focus:border-[#a17b38]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-black/60">
                      Shipping Address
                    </label>

                    <input
                      type="text"
                      value={shippingInfo.address}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          address: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-black/10 bg-white p-3 text-sm outline-none transition focus:border-[#a17b38]"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
                    <div>
                      <label className="block text-xs font-medium text-black/60">
                        City
                      </label>

                      <input
                        type="text"
                        value={shippingInfo.city}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            city: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-black/10 bg-white p-3 text-sm outline-none focus:border-[#a17b38]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-black/60">
                        Pincode
                      </label>

                      <input
                        type="text"
                        value={shippingInfo.pincode}
                        onChange={(e) =>
                          setShippingInfo({
                            ...shippingInfo,
                            pincode: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-xl border border-black/10 bg-white p-3 text-sm outline-none focus:border-[#a17b38]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-black/60">
                      Phone
                    </label>

                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          phone: e.target.value,
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-black/10 bg-white p-3 text-sm outline-none focus:border-[#a17b38]"
                    />
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      y: -2,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    type="button"
                    onClick={() => setCheckoutStep("payment")}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-black py-3.5 text-sm font-medium text-white transition hover:bg-[#a17b38]"
                  >
                    Continue to Payment
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              ) : (
                <div className="mt-5 space-y-3.5 sm:mt-6 sm:space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-black/50">
                    Select Payment Method
                  </h3>

                  <label
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3.5 transition sm:p-4 ${
                      paymentMethod === "card"
                        ? "border-[#a17b38] bg-amber-50/50"
                        : "border-black/10 bg-white"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <CreditCard
                        size={20}
                        className="shrink-0 text-[#a17b38]"
                      />

                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          Credit / Debit Card
                        </p>

                        <p className="text-xs text-black/40">
                          Visa, MasterCard, Amex
                        </p>
                      </div>
                    </div>

                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                  </label>

                  <label
                    className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3.5 transition sm:p-4 ${
                      paymentMethod === "upi"
                        ? "border-[#a17b38] bg-amber-50/50"
                        : "border-black/10 bg-white"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <ShieldCheck
                        size={20}
                        className="shrink-0 text-[#a17b38]"
                      />

                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          UPI / GPay / PhonePe
                        </p>

                        <p className="text-xs text-black/40">
                          Fast & Secure Digital Payments
                        </p>
                      </div>
                    </div>

                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === "upi"}
                      onChange={() => setPaymentMethod("upi")}
                    />
                  </label>

                  <div className="mt-4 rounded-2xl bg-white p-4 sm:p-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-black/50">
                        Subtotal
                      </span>

                      <span>
                        ₹{subtotal.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-black/50">
                        Shipping
                      </span>

                      <span>
                        {shipping === 0 ? "FREE" : `₹${shipping}`}
                      </span>
                    </div>

                    <div className="mt-3 border-t border-black/5 pt-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Total</span>

                        <span className="font-semibold">
                          ₹{total.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 sm:gap-3">
                    <motion.button
                      whileTap={{
                        scale: 0.97,
                      }}
                      type="button"
                      onClick={() => setCheckoutStep("shipping")}
                      className="w-1/3 rounded-full border border-black/10 py-3.5 text-sm font-medium transition hover:bg-black/5"
                    >
                      Back
                    </motion.button>

                    <motion.button
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      type="button"
                      onClick={handlePlaceOrder}
                      className="w-2/3 rounded-full bg-[#a17b38] py-3.5 text-sm font-medium text-white shadow-lg shadow-[#a17b38]/20 transition hover:bg-black"
                    >
                      Pay & Place Order
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {trackingOpen && activeOrder && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-2 sm:p-4">
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setTrackingOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
                y: 30,
                rotateX: -5,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
                rotateX: 0,
              }}
              exit={{
                scale: 0.92,
                opacity: 0,
              }}
              className="relative z-[90] max-h-[96vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-[#faf8f3] p-3.5 shadow-2xl sm:max-h-[90vh] sm:rounded-3xl sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <Truck
                      size={18}
                      className="shrink-0 text-[#a17b38]"
                    />

                    <h2 className="text-lg font-semibold sm:text-xl">
                      Live Order Tracking
                    </h2>
                  </div>

                  <p className="mt-1 text-xs text-black/50">
                    Order ID:{" "}
                    <span className="font-medium text-black">
                      {activeOrder.orderId}
                    </span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setTrackingOpen(false)}
                  className="shrink-0 rounded-full p-2 hover:bg-black/5"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="my-7 px-0 sm:my-8 sm:px-2">
                <div className="relative flex items-start justify-between">
                  <div className="absolute left-0 right-0 top-5 h-1 bg-black/10" />

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: "33%",
                    }}
                    transition={{
                      duration: 1,
                      delay: 0.3,
                    }}
                    className="absolute left-0 top-5 h-1 bg-[#a17b38]"
                  />

                  {[
                    {
                      icon: CheckCircle2,
                      label: "Confirmed",
                      active: true,
                    },
                    {
                      icon: PackageCheck,
                      label: "Processing",
                      active: true,
                    },
                    {
                      icon: Truck,
                      label: "In Transit",
                      active: false,
                    },
                    {
                      icon: Clock,
                      label: "Delivered",
                      active: false,
                    },
                  ].map((step, index) => {
                    const Icon = step.icon;

                    return (
                      <motion.div
                        key={step.label}
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: index * 0.15,
                        }}
                        className="relative z-10 flex w-1/4 flex-col items-center text-center"
                      >
                        <motion.div
                          animate={
                            step.active
                              ? {
                                  scale: [1, 1.08, 1],
                                }
                              : {}
                          }
                          transition={{
                            repeat: Infinity,
                            duration: 2,
                          }}
                          className={`flex h-8 w-8 items-center justify-center rounded-full shadow-md min-[380px]:h-9 min-[380px]:w-9 sm:h-10 sm:w-10 ${
                            step.active
                              ? "bg-[#a17b38] text-white"
                              : "bg-gray-200 text-black/40"
                          }`}
                        >
                          <Icon size={14} />
                        </motion.div>

                        <span
                          className={`mt-2 text-[8px] font-medium min-[380px]:text-[9px] sm:text-xs ${
                            step.active
                              ? "text-[#a17b38]"
                              : "text-black/40"
                          }`}
                        >
                          {step.label}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 rounded-2xl border border-black/5 bg-white p-3.5 text-sm sm:p-5">
                <div className="flex flex-col gap-1 border-b border-black/5 pb-3 sm:flex-row sm:justify-between">
                  <span className="text-black/50">
                    Estimated Delivery
                  </span>

                  <span className="font-semibold text-[#a17b38]">
                    {activeOrder.estimatedDelivery}
                  </span>
                </div>

                <div className="flex flex-col gap-1 border-b border-black/5 pb-3 sm:flex-row sm:justify-between">
                  <span className="text-black/50">
                    Shipping To
                  </span>

                  <span className="max-w-full text-left font-medium sm:max-w-[60%] sm:text-right">
                    {activeOrder.shippingInfo.name}
                    <br />
                    {activeOrder.shippingInfo.address},{" "}
                    {activeOrder.shippingInfo.city}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-black/50">
                    Total Paid
                  </span>

                  <span className="font-semibold">
                    ₹{activeOrder.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                type="button"
                onClick={() => setTrackingOpen(false)}
                className="mt-6 w-full rounded-full bg-black py-3.5 text-sm font-medium text-white transition hover:bg-[#a17b38]"
              >
                Close Tracking
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}