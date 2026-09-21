import React, { useEffect, useState } from "react"; 
import { Search, Heart, ShoppingBag, Menu, X, User, Trash2, Minus, Plus, ArrowRight, LogIn, UserPlus, CreditCard, Truck, CheckCircle2, PackageCheck, ShieldCheck, Clock, MapPin, ChevronRight, Sparkles, Crown } from "lucide-react"; 
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

const categoriesList = [
  "Jewellery",
  "Handbags",
  "Watches",
  "Cosmetics",
  "Footwear",
  "Accessories"
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
  onSelectCategory,
}) { 
  const location = useLocation(); 
  const navigate = useNavigate(); 
 
  const [menuOpen, setMenuOpen] = useState(false); 
  const [searchOpen, setSearchOpen] = useState(false); 
  const [cartOpen, setCartOpen] = useState(false); 
  const [wishlistOpen, setWishlistOpen] = useState(false); 
  const [profileOpen, setProfileOpen] = useState(false); 
  const [categoriesOpen, setCategoriesOpen] = useState(false);
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
    setCategoriesOpen(false);
  }; 
 
  const closeAllPanels = () => { 
    setCartOpen(false); 
    setWishlistOpen(false); 
    setProfileOpen(false); 
    setSearchOpen(false); 
    setCategoriesOpen(false);
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
    setCategoriesOpen(false);
 
    setProfileOpen((current) => !current); 
  }; 
 
  const toggleMobileMenu = () => { 
    setMenuOpen((current) => !current); 
    setSearchOpen(false); 
    setCartOpen(false); 
    setWishlistOpen(false); 
    setProfileOpen(false); 
    setCategoriesOpen(false);
  }; 
 
  const toggleSearch = () => { 
    setSearchOpen((current) => !current); 
    setMenuOpen(false); 
    setCartOpen(false); 
    setWishlistOpen(false); 
    setProfileOpen(false); 
    setCategoriesOpen(false);
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
        initial={{ y: -100, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} 
        className="fixed inset-x-0 top-0 z-50 px-1.5 pt-1.5 sm:px-4 sm:pt-3 lg:px-6 xl:px-8" 
      > 
        <div className="mx-auto w-full max-w-full"> 
          <div className="relative overflow-visible rounded-[16px] border border-black/10 bg-[#faf8f3]/95 shadow-[0_15px_50px_rgba(0,0,0,0.08)] backdrop-blur-2xl sm:rounded-[24px]"> 
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
                  whileTap={{ scale: 0.96 }} 
                  className="flex min-w-0 items-center gap-1 sm:gap-2" 
                  style={{ perspective: "800px" }} 
                > 
                  <motion.div 
                    variants={{ 
                      rest: { rotateY: 0, rotateX: 0 }, 
                      hover: { rotateY: 180, rotateX: 8 }, 
                    }} 
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }} 
                    className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-[#d5b777] shadow-lg sm:h-11 sm:w-11" 
                    style={{ transformStyle: "preserve-3d" }} 
                  > 
                    <Crown size={14} strokeWidth={1.5} className="relative z-10 sm:h-[18px] sm:w-[18px]" /> 
                    <span className="absolute inset-1 rounded-full border border-[#d5b777]/40" /> 
                  </motion.div> 
 
                  <div className="min-w-0"> 
                    <motion.p 
                      variants={{ 
                        rest: { letterSpacing: "0.08em" }, 
                        hover: { letterSpacing: "0.16em" }, 
                      }} 
                      transition={{ duration: 0.4 }} 
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
                  const isCategoriesMenu = id === "categories";

                  return ( 
                    <div key={id} className="relative">
                      <motion.div 
                        variants={navItemVariants} 
                        initial="rest" 
                        whileHover="hover" 
                        whileTap={{ scale: 0.98 }} 
                        className="shrink-0" 
                      > 
                        <Link 
                          to={isContactPage ? "/contact" : isCategoriesMenu ? "#" : `/#${id}`} 
                          onClick={(e) => { 
                            if (isCategoriesMenu) {
                              e.preventDefault();
                              setCategoriesOpen((prev) => !prev);
                              setProfileOpen(false);
                              setSearchOpen(false);
                              setCartOpen(false);
                              setWishlistOpen(false);
                              return;
                            }
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
                            initial={{ opacity: 0, scale: 0.6 }} 
                            whileHover={{ opacity: 1, scale: 1 }} 
                            transition={{ duration: 0.25 }} 
                            className="absolute inset-0 -z-0 rounded-full bg-white shadow-sm" 
                          /> 
                          <motion.span 
                            initial={{ width: 0, opacity: 0 }} 
                            whileHover={{ width: "55%", opacity: 1 }} 
                            transition={{ duration: 0.3 }} 
                            className="absolute bottom-1 left-1/2 h-px -translate-x-1/2 bg-[#a17b38]" 
                          /> 
                        </Link> 
                      </motion.div>

                      {isCategoriesMenu && (
                        <AnimatePresence>
                          {categoriesOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: 15, scale: 0.92 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 10, scale: 0.95 }}
                              transition={{ duration: 0.25 }}
                              className="absolute left-1/2 top-12 w-[220px] -translate-x-1/2 origin-top overflow-hidden rounded-2xl border border-black/10 bg-[#faf8f3] p-2 shadow-[0_25px_70px_rgba(0,0,0,0.15)]"
                            >
                              <div className="space-y-1">
                                {categoriesList.map((category) => (
                                  <button
                                    key={category}
                                    type="button"
                                    onClick={() => {
                                      setCategoriesOpen(false);
                                      if (onSelectCategory) {
                                        onSelectCategory(category);
                                      }
                                      scrollToSection("shop");
                                    }}
                                    className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-medium transition hover:bg-white hover:text-[#a17b38]"
                                  >
                                    <span>{category}</span>
                                    <ChevronRight size={13} className="text-black/30" />
                                  </button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div> 
                  ); 
                })} 
              </nav> 
 
              <div className="ml-auto flex shrink-0 items-center gap-0"> 
                <motion.button 
                  type="button" 
                  aria-label="Search" 
                  aria-expanded={searchOpen} 
                  whileHover={{ scale: 1.08, rotateY: 10, rotateX: -6 }} 
                  whileTap={{ scale: 0.86 }} 
                  transition={{ type: "spring", stiffness: 400, damping: 18 }} 
                  onClick={toggleSearch} 
                  className="group relative rounded-full p-1.5 min-[360px]:p-2 sm:p-2.5" 
                  style={{ perspective: "600px" }} 
                > 
                  <span className="absolute inset-0 scale-0 rounded-full bg-[#a17b38]/10 transition-transform duration-300 group-hover:scale-100" /> 
                  <Search size={15} className="relative z-10 min-[360px]:h-4 min-[360px]:w-4 sm:h-[18px] sm:w-[18px]" /> 
                </motion.button> 
 
                <div className="relative hidden sm:block"> 
                  <motion.button 
                    type="button" 
                    aria-label="Profile" 
                    aria-expanded={profileOpen} 
                    whileHover={{ scale: 1.08, rotateY: -10, rotateX: -6 }} 
                    whileTap={{ scale: 0.86 }} 
                    onClick={openProfile} 
                    className="group relative rounded-full p-2.5" 
                    style={{ perspective: "600px" }} 
                  > 
                    <span className="absolute inset-0 scale-0 rounded-full bg-[#a17b38]/10 transition-transform duration-300 group-hover:scale-100" /> 
                    <User size={18} className="relative z-10" /> 
                  </motion.button> 
 
                  <AnimatePresence> 
                    {profileOpen && ( 
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.92, rotateX: -8 }} 
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }} 
                        exit={{ opacity: 0, y: 10, scale: 0.95 }} 
                        transition={{ duration: 0.3 }} 
                        className="absolute right-0 top-14 w-[270px] origin-top-right overflow-hidden rounded-2xl border border-black/10 bg-[#faf8f3] p-2 shadow-[0_25px_70px_rgba(0,0,0,0.15)]" 
                      > 
                        <div className="rounded-xl bg-white px-4 py-4"> 
                          <div className="flex items-center gap-3"> 
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-[#d5b777]"> 
                              <User size={17} /> 
                            </div> 
                            <div className="min-w-0"> 
                              <p className="text-sm font-semibold">Welcome to LUXE ORA</p> 
                              <p className="mt-1 text-[10px] text-black/40">Your luxury account</p> 
                            </div> 
                          </div> 
                        </div> 
 
                        {activeOrder && ( 
                          <motion.button 
                            type="button" 
                            whileHover={{ x: 3 }} 
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
                          <LogIn size={17} /> Login 
                        </Link> 
                        <Link 
                          to="/signup" 
                          onClick={() => setProfileOpen(false)} 
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-white" 
                        > 
                          <UserPlus size={17} /> Create Account 
                        </Link> 
                        <Link 
                          to="/profile" 
                          onClick={() => setProfileOpen(false)} 
                          className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition hover:bg-white" 
                        > 
                          <User size={17} /> My Profile 
                        </Link> 
                      </motion.div> 
                    )} 
                  </AnimatePresence> 
                </div> 
 
                <motion.button 
                  type="button" 
                  aria-label="Wishlist" 
                  aria-expanded={wishlistOpen} 
                  whileHover={{ scale: 1.08, rotateY: 12, rotateZ: -3 }} 
                  whileTap={{ scale: 0.82 }} 
                  transition={{ type: "spring", stiffness: 400, damping: 17 }} 
                  onClick={openWishlist} 
                  className="group relative rounded-full p-1.5 min-[360px]:p-2 sm:p-2.5" 
                  style={{ perspective: "600px" }} 
                > 
                  <span className="absolute inset-0 scale-0 rounded-full bg-[#a17b38]/10 transition-transform duration-300 group-hover:scale-100" /> 
                  <Heart size={15} className="relative z-10 transition group-hover:fill-[#a17b38] group-hover:text-[#a17b38] min-[360px]:h-4 min-[360px]:w-4 sm:h-[18px] sm:w-[18px]" /> 
                  {wishlistCount > 0 && ( 
                    <motion.span 
                      key={wishlistCount} 
                      initial={{ scale: 0 }} 
                      animate={{ scale: 1 }} 
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
                  whileHover={{ scale: 1.08, rotateY: -12, rotateX: -5 }} 
                  whileTap={{ scale: 0.82 }} 
                  transition={{ type: "spring", stiffness: 400, damping: 17 }} 
                  onClick={openCart} 
                  className="group relative rounded-full p-1.5 min-[360px]:p-2 sm:p-2.5" 
                  style={{ perspective: "600px" }} 
                > 
                  <span className="absolute inset-0 scale-0 rounded-full bg-[#a17b38]/10 transition-transform duration-300 group-hover:scale-100" /> 
                  <ShoppingBag size={15} className="relative z-10 min-[360px]:h-4 min-[360px]:w-4 sm:h-[18px] sm:w-[18px]" /> 
                  {cartCount > 0 && ( 
                    <motion.span 
                      key={cartCount} 
                      initial={{ scale: 0.4 }} 
                      animate={{ scale: 1 }} 
                      className="absolute -right-0.5 -top-0.5 z-20 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-[#a17b38] px-1 text-[8px] font-semibold text-white shadow-md sm:right-0 sm:top-0 sm:h-4 sm:min-w-4 sm:text-[9px]" 
                    > 
                      {cartCount} 
                    </motion.span> 
                  )} 
                </motion.button> 
 
                <motion.button 
                  type="button" 
                  aria-label={menuOpen ? "Close menu" : "Open menu"} 
                  aria-expanded={menuOpen} 
                  aria-controls="mobile-navigation" 
                  whileHover={{ scale: 1.06 }} 
                  whileTap={{ scale: 0.88 }} 
                  onClick={toggleMobileMenu} 
                  className="ml-0.5 rounded-full border border-black/10 bg-white p-1.5 min-[360px]:p-2 sm:ml-1 sm:p-2.5 xl:hidden" 
                > 
                  <AnimatePresence mode="wait" initial={false}> 
                    <motion.span 
                      key={menuOpen ? "close" : "menu"} 
                      initial={{ opacity: 0, rotate: -90, scale: 0.6 }} 
                      animate={{ opacity: 1, rotate: 0, scale: 1 }} 
                      exit={{ opacity: 0, rotate: 90, scale: 0.6 }} 
                      transition={{ duration: 0.2 }} 
                      className="block" 
                    > 
                      {menuOpen ? <X size={17} className="sm:h-[18px] sm:w-[18px]" /> : <Menu size={17} className="sm:h-[18px] sm:w-[18px]" />} 
                    </motion.span> 
                  </AnimatePresence> 
                </motion.button> 
              </div> 
            </div> 
 
            <AnimatePresence> 
              {searchOpen && ( 
                <motion.div 
                  initial={{ opacity: 0, height: 0, y: -10 }} 
                  animate={{ opacity: 1, height: "auto", y: 0 }} 
                  exit={{ opacity: 0, height: 0, y: -10 }} 
                  className="overflow-hidden border-t border-black/5" 
                > 
                  <div className="px-2.5 py-2.5 sm:px-5 sm:py-4 lg:px-6"> 
                    <motion.div 
                      initial={{ scale: 0.96 }} 
                      animate={{ scale: 1 }} 
                      className="mx-auto flex max-w-full items-center gap-2.5 rounded-full border border-black/10 bg-white px-3.5 py-2.5 shadow-sm sm:gap-3 sm:px-5 sm:py-3.5" 
                    > 
                      <Search size={17} className="shrink-0 text-[#a17b38]" /> 
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
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  exit={{ opacity: 0, height: 0 }} 
                  transition={{ duration: 0.3 }} 
                  className="overflow-hidden border-t border-black/5 xl:hidden" 
                > 
                  <nav className="max-h-[calc(100vh-70px)] overflow-y-auto overscroll-contain px-3 pb-4 pt-1 sm:max-h-[calc(100vh-90px)] sm:px-5"> 
                    {links.map(([label, id], index) => { 
                      const isContactPage = id === "contact"; 
                      const isCategoriesMenu = id === "categories";

                      return ( 
                        <div key={id}>
                          <motion.div 
                            initial={{ opacity: 0, x: -15 }} 
                            animate={{ opacity: 1, x: 0 }} 
                            transition={{ delay: index * 0.04 }} 
                          > 
                            <Link 
                              to={isContactPage ? "/contact" : isCategoriesMenu ? "#" : `/#${id}`} 
                              onClick={(e) => { 
                                if (isCategoriesMenu) {
                                  e.preventDefault();
                                  setCategoriesOpen((prev) => !prev);
                                  return;
                                }
                                closeNavigationPanels(); 
                                setMenuOpen(false); 
                                if (!isContactPage) { 
                                  scrollToSection(id); 
                                } 
                              }} 
                              className="group flex w-full items-center justify-between border-b border-black/5 py-3.5 text-left text-sm font-medium sm:py-4" 
                            > 
                              <span className="transition group-hover:text-[#a17b38]"> {label} </span> 
                              <ChevronRight size={16} className="text-black/30 transition group-hover:translate-x-1 group-hover:text-[#a17b38]" /> 
                            </Link> 
                          </motion.div>

                          {isCategoriesMenu && categoriesOpen && (
                            <div className="my-2 space-y-1 pl-4">
                              {categoriesList.map((category) => (
                                <button
                                  key={category}
                                  type="button"
                                  onClick={() => {
                                    setMenuOpen(false);
                                    setCategoriesOpen(false);
                                    if (onSelectCategory) {
                                      onSelectCategory(category);
                                    }
                                    scrollToSection("shop");
                                  }}
                                  className="flex w-full items-center justify-between rounded-xl py-2 text-left text-xs font-medium text-black/70 hover:text-[#a17b38]"
                                >
                                  <span>{category}</span>
                                  <ChevronRight size={13} className="text-black/30" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ); 
                    })} 
 
                    <div className="grid grid-cols-1 gap-2 pt-4 min-[380px]:grid-cols-2"> 
                      <Link 
                        to="/login" 
                        onClick={closeNavigationPanels} 
                        className="flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white py-3 text-xs font-medium transition hover:border-[#a17b38]" 
                      > 
                        <LogIn size={15} /> Login 
                      </Link> 
                      <Link 
                        to="/signup" 
                        onClick={closeNavigationPanels} 
                        className="flex items-center justify-center gap-2 rounded-full bg-black py-3 text-xs font-medium text-white transition hover:bg-[#a17b38]" 
                      > 
                        <UserPlus size={15} /> Create Account 
                      </Link> 
                    </div> 
                  </nav> 
                </motion.div> 
              )} 
            </AnimatePresence> 
          </div> 
        </div> 
      </motion.header> 

    </> 
  );
}