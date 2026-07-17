export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-32 lg:pb-16 mt-16">
      <div className="container mx-auto px-6 lg:px-20 max-w-screen-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Brand Pitch */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-start">
            <img
              alt="Bite Plus Footer"
              className="h-12 w-auto mb-6 invert brightness-0"
              src="https://lh3.googleusercontent.com/aida/AP1WRLuc7ZnL6zv6ZqTw8WNYNlQsj36s6fnmWhLUc4C7wdvjGffkgLZrLKlEu0tUkzKPmw7svad7pumooI7CkJJ5wW--G8vELmqGNnmVZRvBbSr_Yj3ZuU7UjC63g_kNsWgewjk7jsAuXVOObaGhRO2FixSGQmpysGiQIsFb7xBr01bf9KiP4onueBcpZzBCHIzXzPh11M4N6KFBXehu9MSqz8ndiPGJN1q-iJRWZdx7T5x9DIC9aaRKW1QlZRU"
            />
            <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
              Bite Plus is Nigeria's premium quick-service restaurant, dedicated
              to delivering the supreme taste across Oyo and Osun states.
              Quality, speed, and flavor in every bite.
            </p>

            {/* Social Icons (Twitter/X and Email inline SVGs) */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 transition-colors cursor-pointer group"
                aria-label="Twitter"
              >
                <svg
                  className="w-4 h-4 fill-current text-gray-400 group-hover:text-white"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 transition-colors cursor-pointer group"
                aria-label="Email"
              >
                <svg
                  className="w-4 h-4 fill-none stroke-current stroke-2 text-gray-400 group-hover:text-white"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="text-sm font-bold tracking-wider text-orange-500 uppercase mb-6">
              Quick Links
            </h5>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a className="hover:text-orange-500 transition-colors" href="#">
                  Track Your Order
                </a>
              </li>
              <li>
                <a className="hover:text-orange-500 transition-colors" href="#">
                  Bulk Orders
                </a>
              </li>
              <li>
                <a className="hover:text-orange-500 transition-colors" href="#">
                  Our Menu
                </a>
              </li>
              <li>
                <a className="hover:text-orange-500 transition-colors" href="#">
                  Career Opportunities
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h5 className="text-sm font-bold tracking-wider text-orange-500 uppercase mb-6">
              Help & Support
            </h5>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <a className="hover:text-orange-500 transition-colors" href="#">
                  Contact Support
                </a>
              </li>
              <li>
                <a className="hover:text-orange-500 transition-colors" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-orange-500 transition-colors" href="#">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="hover:text-orange-500 transition-colors" href="#">
                  Location Finder
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Metadata Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© 2026 Bite Plus. All rights reserved. ...the supreme taste</p>
          <div className="flex gap-6">
            <span>Designed for Excellence</span>
            <span>Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
