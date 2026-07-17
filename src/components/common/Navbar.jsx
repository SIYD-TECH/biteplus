import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <nav className="flex justify-between items-center px-6 lg:px-20 h-16 w-full max-w-screen-2xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <img alt="Bite Plus Logo" className="h-50 w-auto" src="logo.png" />
        </div>

        {/* Desktop Links - Swapped gap-xl for gap-8 */}
        <div className="hidden lg:flex items-center gap-8">
          <a
            className="text-sm font-bold text-orange-600" /* Swapped font-label-md / text-primary */
            href="#"
          >
            Home
          </a>
          <Link
            className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
            to="/menu"
          >
            Our Menu
          </Link>
        </div>

        {/* CTA - Swapped gap-md for gap-4 and px-lg for px-6 */}
        <Link to="/menu">
          <div className="flex items-center gap-4">
            <button className="bg-orange-600 text-white font-medium text-sm px-6 py-3 rounded-lg shadow-md hover:opacity-90 active:scale-95 transition-all">
              Order Online Now 🍔
            </button>
          </div>
        </Link>
      </nav>
    </header>
  );
}
