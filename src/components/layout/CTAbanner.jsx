import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTAbanner({ onNavigate }) {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* The Action Card with the "Vibrant Naija Heat" Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#D8232A] to-[#FF5E14] rounded-3xl p-8 md:p-12 text-center text-white shadow-xl shadow-orange-600/10 group">
          {/* Subtle Decorative Background Circles */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Hungry? We've Got You Covered
            </span>

            <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight">
              Ready to Experience <br className="hidden sm:inline" /> The
              Supreme Taste?
            </h2>

            <p className="text-white/90 text-sm md:text-base mb-8 max-w-md leading-relaxed">
              Skip the long physical kitchen lines. Choose your closest outlet
              and get your meals delivered hot in minutes.
            </p>

            {/* Main Action Button to switch views */}
            <Link to="/menu">
             <button
              
              className="inline-flex cursor-pointer items-center gap-2 bg-white text-[#D8232A] hover:bg-neutral-50 active:scale-95 text-base font-extrabold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group/btn"
            >
              Order Online Now 
              <ArrowRight
                size={18}
                className="text-[#FF5E14] group-hover/btn:translate-x-1 transition-transform"
              />
            </button>
            </Link>
           
          </div>
        </div>
      </div>
    </section>
  );
}
