import { ChevronDown } from "lucide-react";

export default function FAQItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left font-semibold text-[#1E1E1E] hover:text-[#D8232A] transition-colors group"
      >
        <span className="text-base md:text-lg pr-4">{question}</span>
        <ChevronDown
          size={20}
          className={`text-gray-400 group-hover:text-[#D8232A] transition-transform duration-300 ${isOpen ? "rotate-180 text-[#FF5E14]" : ""}`}
        />
      </button>

      {/* Smooth height transitions */}
      <div
        className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-5"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-gray-600 text-sm md:text-base leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}