export default function Hero() {
  return (
    <section className="relative overflow-hidden lg:min-h-[85vh] flex items-center py-16 lg:py-24 bg-gray-50">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 max-w-screen-2xl">
        {/* Left Content Column */}
        <div className="order-2 lg:order-1 flex flex-col items-start animate-in fade-in slide-in-from-left-8 duration-700">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold tracking-wide uppercase mb-6">
            🔥 Oyo & Osun's Number One
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6 tracking-tight leading-none">
            Fresh. Fast. Delicious. <br />
            <span className="text-orange-600">The Supreme Taste</span> <br />
            of Oyo & Osun!
          </h1>

          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
            Experience the authentic Nigerian flavors crafted for the modern
            lifestyle. With over 19 locations across Oyo and Osun, we bring
            premium dining and lightning-fast delivery to your doorstep.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="bg-orange-600 text-white font-bold text-sm px-8 py-4 rounded-lg shadow-lg hover:shadow-orange-200 hover:translate-y-[-2px] active:scale-95 transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              Order Online
            </button>
            <button className="border-2 border-orange-600 text-orange-600 font-bold text-sm px-8 py-4 rounded-lg hover:bg-orange-50 active:scale-95 transition-all flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 fill-none stroke-current stroke-2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Find Nearest Outlet
            </button>
          </div>
        </div>

        {/* Right Image & Badge Column */}
        <div className="order-1 lg:order-2 relative group w-full max-w-lg lg:max-w-none mx-auto">
          {/* Soft backlighting glow */}
          <div className="absolute -inset-4 bg-orange-500/10 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity"></div>

          {/* Main Image Wrapper */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl transform lg:rotate-3 group-hover:rotate-0 transition-transform duration-500 aspect-square">
            <img
              className="w-full h-full object-cover"
              alt="A steaming plate of authentic Nigerian Jollof rice, golden-brown crispy fried chicken, and fresh dodo, styled in a dark luxury restaurant aesthetic."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvAaX9SxCeGGsTrHdfjcIXPAPRJiLvN97qWu1_bPaOhJonsNIHEh6hTWmiU1YxTVZERlmHkiT3PBF3_0pYdJL_nn6Wnw6K23KJRqkoMyqQ7ZUQhbt9omR-RvxV3C-IZRkPGO3-OgYj_BW7RrTHBtU314MoQ8npcfqevXa2SKVcIzT32eyNB9a5my-4K2ceoEiLptxhw4M9Viue_8uxLRaR1ZxebqdwllPUZxgrRaYKOxne7VM9WijtpaN6PnKhAbp9Yo_woewztik"
            />
          </div>

          {/* Floating Rating Badge */}
          <div className="absolute bottom-6 -left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce duration-[3000ms]">
            <div className="bg-orange-100 p-2.5 rounded-lg text-orange-600">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-sm text-gray-900">4.9/5 Rating</p>
              <p className="text-xs text-gray-500 font-medium">
                100k+ Happy Bites
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
