import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./components/FeaturedProducts";
import NewArrivals from "./components/NewArrivals";
import SpecialOffers from "./components/SpecialOffers";
import Lookbook from "./components/Lookbook";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import OrderTracking from "./pages/OrderTracking";
import Contact from "./pages/Contact";

import SplashScreen from "./components/SplashScreen";

function Home({ addToCart, toggleWishlist }) {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts
        onAddToCart={addToCart}
        onWishlist={toggleWishlist}
      />
      <NewArrivals />
      <SpecialOffers />
      <Lookbook />
      <Testimonials />
      <Newsletter />
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: (item.quantity || 1) + 1,
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleOrderPlaced = () => {
    setCart([]);
  };

  const cartCount = cart.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <>
      {showSplash && (
        <SplashScreen
          onComplete={() => {
            setShowSplash(false);
          }}/>
      )}

      <BrowserRouter>
        <div className="min-h-screen overflow-x-hidden bg-[#faf8f3] text-[#171717]">
          <Navbar
            wishlistCount={wishlist.length}
            cart={cart}
            cartCount={cartCount}
            onRemoveFromCart={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onClearCart={handleOrderPlaced}
          />

          <Routes>
            <Route
              path="/"
              element={
                <main>
                  <Home
                    addToCart={addToCart}
                    toggleWishlist={toggleWishlist}
                  />
                </main>
              }
            />

            <Route
              path="/contact" element={<Contact />} />

            <Route
              path="/login" element={<Login />} />

            <Route
              path="/signup" element={<Signup />} />

            <Route
              path="/profile"element={<Profile />}/>

            <Route
              path="/cart" element={
                <Cart
                  cart={cart}
                  onRemoveFromCart={removeFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              } />

            <Route
              path="/payment"
              element={
                <Payment
                  cart={cart}
                  onOrderPlaced={handleOrderPlaced}
                />
              }
            />

            <Route
              path="/tracking"
              element={<OrderTracking />}
            />
          </Routes>

          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;