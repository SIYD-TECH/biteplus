// Import the corresponding Lucide icons
import { Zap, Utensils, MessageSquare } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Zap, // Pass the component directly, not a string
    iconBg: "bg-[#D8232A]/10",
    iconColor: "text-[#D8232A]",
    title: "Lightning Fast Delivery",
    description:
      "Hunger doesn't wait, and neither do we. Our dispatch team is optimized for the speed of the city.",
  },
  {
    icon: Utensils,
    iconBg: "bg-[#FF5E14]/10",
    iconColor: "text-[#FF5E14]",
    title: "Always Fresh & Hot",
    description:
      "From our kitchen to your table, we maintain the highest standards of food temperature and hygiene.",
  },
  {
    icon: MessageSquare,
    iconBg: "bg-[#25D366]/10",
    iconColor: "text-[#25D366]",
    title: "Zero Hassle",
    description:
      "Prefer texting? Order directly through WhatsApp with our automated smart assistant for instant checkout.",
  },
];


export default function Features() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
