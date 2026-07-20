import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import "./index.css";
import Landing from "./pages/Landing";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import ScrollToTop from "./components/ScrollToTop";
// import AdminPage from "./pages/AdminPage"; // Ready whenever you drop it in

export default function App() {
  // 1. PERSISTENT LOCATION STATE (Lazy initialized from localStorage)
  const [selectedLocation, setSelectedLocation] = useState(() => {
    try {
      const savedLocation = localStorage.getItem("biteplus_location");
      return savedLocation ? savedLocation : ""; // Default to empty string if not found
    } catch (error) {
      console.error("Error reading localStorage location data:", error);
      return "";
    }
  });

  // 2. PERSISTENT CART STATE
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("biteplus_cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error reading localStorage cart data:", error);
      return [];
    }
  });

  // 3. STORAGE SYNCHRONIZER EFFECTS
  // Sync location changes
  useEffect(() => {
    localStorage.setItem("biteplus_location", selectedLocation);
  }, [selectedLocation]);

  // Sync cart changes
  useEffect(() => {
    localStorage.setItem("biteplus_cart", JSON.stringify(cart));
  }, [cart]);

  // ... (Keep the rest of your handlers and return statement exactly the same)

  // 4. GLOBAL CART LOGIC MUTATORS
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQty = (itemId, direction) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) => {
          if (cartItem.id === itemId) {
            const newQty = cartItem.quantity + direction;
            return newQty > 0 ? { ...cartItem, quantity: newQty } : null;
          }
          return cartItem;
        })
        .filter(Boolean),
    );
  };

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("biteplus_cart");
  };

  // Calculate live global item count to pass to your Navbar bubble badge
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#1E1E1E] font-sans antialiased">
      {/* Pass the dynamic item count directly to your existing Navbar */}
      <ScrollToTop />
      <Navbar cartCount={totalCartItems} />

      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Pass state and methods down as explicit props to Menu */}
        <Route
          path="/menu"
          element={
            <Menu
              cart={cart}
              onAddToCart={handleAddToCart}
              onUpdateQty={handleUpdateQty}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          }
        />

        {/* Pass cart details and dispatch logic to Checkout */}
        <Route
          path="/cart"
          element={
            <Checkout
              cart={cart}
              onUpdateQty={handleUpdateQty}
              selectedLocation={selectedLocation}
              onOrderPlaced={handleClearCart}
            />
          }
        />

        <Route path="/admin" element={<Admin />} />

        {/* <Route path="/admin" element={<AdminPage />} /> */}
      </Routes>
    </div>
  );
}
