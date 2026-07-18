import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function Navbar({ cartCount = 0 }) {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <nav className="flex justify-between items-center px-6 lg:px-20 h-16 w-full max-w-screen-2xl mx-auto">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-4 hover:opacity-95 transition-opacity"
        >
          <img
            alt="Bite Plus Logo"
            className="h-10 w-auto object-contain"
            src="logo.png"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            className="text-sm font-bold text-[#FF5E14] transition-colors"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-[#FF5E14] transition-colors"
            to="/menu"
          >
            Our Menu
          </Link>
        </div>

        {/* Dynamic Action Zone: Link to Checkout view with item counter */}
        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group border border-gray-100"
          >
            <ShoppingCart
              size={20}
              className="text-gray-700 group-hover:text-[#D8232A] transition-colors"
            />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#D8232A] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Quick Order button remains visible for quick desktop click actions */}
          <Link to="/menu" className="hidden sm:block">
            <button className="bg-gradient-to-r from-[#D8232A] to-[#FF5E14] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-sm hover:opacity-95 active:scale-95 transition-all">
              Order Now 🍔
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
