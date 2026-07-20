import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  Home,
  UtensilsCrossed,
  ShieldCheck,
} from "lucide-react";

export default function Navbar({ cartCount = 0 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Helper to highlight the active tab matching your color style tokens
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <nav className="flex justify-between items-center px-4 lg:px-20 h-16 w-full max-w-screen-2xl mx-auto">
          {/* Logo Area */}
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-4 hover:opacity-95 transition-opacity"
          >
            <img
              alt="Bite Plus Logo"
              className="h-30 sm:h-[120px] w-auto object-contain"
              src="logo.png"
            />
          </Link>

          {/* Desktop Links (Hidden on mobile panels) */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              className={`text-sm font-bold transition-colors ${isActive("/") ? "text-[#FF5E14]" : "text-gray-600 hover:text-[#FF5E14]"}`}
              to="/"
            >
              Home
            </Link>
            <Link
              className={`text-sm font-bold transition-colors ${isActive("/menu") ? "text-[#FF5E14]" : "text-gray-600 hover:text-[#FF5E14]"}`}
              to="/menu"
            >
              Our Menu
            </Link>

            <Link
              className={`text-sm font-bold transition-colors ${isActive("/menu") ? "text-[#FF5E14]" : "text-gray-600 hover:text-[#FF5E14]"}`}
              to="/admin"
            >
              Admin
            </Link>
          </div>

          {/* Dynamic Action Zone Container */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Shopping Cart Indicator */}
            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all group border border-gray-100"
            >
              <ShoppingCart
                size={18}
                className="text-gray-700 group-hover:text-[#D8232A] transition-colors"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D8232A] text-white text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Quick Order Action Button (Desktop Only) */}
            <Link to="/menu" className="hidden sm:block">
              <button className="bg-gradient-to-r from-[#D8232A] to-[#FF5E14] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-sm hover:opacity-95 active:scale-95 transition-all cursor-pointer">
                Order Now
              </button>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-100 rounded-xl text-gray-700 hover:text-[#D8232A] transition-all cursor-pointer focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 transition-all duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Transparent dark blurred background cover mask */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        />

        {/* Sidebar Slide-out Core Shell Container */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl border-l border-gray-100 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="pt-16 space-y-6">
            {/* Navigation Routes List Container */}
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive("/")
                    ? "bg-red-50 text-[#D8232A]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>

              <Link
                to="/menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive("/menu")
                    ? "bg-red-50 text-[#D8232A]"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <UtensilsCrossed size={18} />
                <span>Our Menu</span>
              </Link>

              <Link
                to="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  isActive("/admin")
                    ? "bg-red-50 text-[#D8232A]"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-700"
                }`}
              >
                <ShieldCheck size={18} />
                <span>Admin dashboard</span>
              </Link>
            </div>
          </div>

          {/* Quick Order CTA fixed to bottom of drawer view */}
          <div className="pt-4 border-t border-gray-100">
            <Link
              to="/menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full block"
            >
              <button className="w-full bg-gradient-to-r from-[#D8232A] to-[#FF5E14] text-white font-black text-center py-3.5 rounded-xl text-xs shadow-md shadow-red-500/10 active:scale-[0.98] transition-all cursor-pointer">
                Order Feast Now 🍔
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
