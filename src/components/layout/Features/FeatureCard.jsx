export default function FeatureCard({ icon: Icon, iconBg, iconColor, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
      <div
        className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center ${iconColor} mb-4 group-hover:scale-110 transition-transform`}
      >
        {/* Render the Lucide icon component dynamically */}
        <Icon size={28} strokeWidth={1.75} />
      </div>
      <h3 className="text-xl font-bold text-[#1E1E1E] mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
