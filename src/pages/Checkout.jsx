import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  MapPin,
  Phone,
  FileText,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  MessageSquare,
} from "lucide-react";

export default function Checkout({
  cart = [],
  onUpdateQty = () => {},
  selectedLocation = "Ogbomoso",
  onOrderPlaced = () => {},
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    specialInstructions: "",
  });

  const [isSummaryOpen, setIsSummaryOpen] = useState(true);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const orderId = `BP-${Math.floor(1000 + Math.random() * 9000)}`
  
  const totalAmount = subtotal;

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty!");
    if (!formData.fullName || !formData.phone) {
      return alert("Please fill in all required delivery details.");
    }

    // Format the items text block
    const itemsText = cart
      .map(
        (item) =>
          `• ${item.quantity}x ${item.name} (₦${(item.price * item.quantity).toLocaleString()})`,
      )
      .join("\n");

    // Construct clean plain-text receipt template
    const textMessage =
      `*NEW BITE PLUS ORDER* \n` +
      `----------------------------------\n` +
      `*Order ID* ${orderId}`+
      ` *Branch:* ${selectedLocation}\n\n` +
      ` *Customer Details:*\n` +
      `• Name: ${formData.fullName}\n` +
      `• Phone: ${formData.phone}\n` +
      `*Order Summary:*\n` +
      `${itemsText}\n\n` +
      `----------------------------------\n` +
      `• Subtotal: ₦${subtotal.toLocaleString()}\n` +
      ` *Total Bill:* ₦${totalAmount.toLocaleString()}\n` +
      `----------------------------------\n`;

    
    const newOrderRecord = {
      id: `${orderId}`, 
      fullName: formData.fullName,
      phone: formData.phone,
      branch: selectedLocation || "Ogbomoso",
      itemsText: cart
        .map(
          (item) =>
            `${item.quantity}x ${item.name} — ₦${(item.price * item.quantity).toLocaleString()}`,
        )
        .join("\n"),
      subtotal: subtotal,
      totalAmount: totalAmount,
      status: "Pending",
      timestamp: "Just now",
    };

    try {
      const currentActiveHistory = JSON.parse(
        localStorage.getItem("biteplus_orders") || "[]",
      );
      currentActiveHistory.unshift(newOrderRecord);
      localStorage.setItem(
        "biteplus_orders",
        JSON.stringify(currentActiveHistory),
      );
    } catch (error) {
      console.error("Failed to sync order log to LocalStorage:", error);
    }
   
    const whatsappNumber = "2349019116721";
    const encodedUri = encodeURIComponent(textMessage);

    window.open(`https://wa.me/${whatsappNumber}?text=${encodedUri}`, "_blank");

    onOrderPlaced();

    setFormData({
      fullName: "",
      phone: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#1E1E1E] antialiased pt-16">
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 px-4 py-3.5 shadow-sm flex items-center justify-between">
        <Link
          to="/menu"
          className="flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-[#D8232A] transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Back to Menu</span>
        </Link>
        <span className="text-lg font-black text-[#D8232A] tracking-tight">
          Cart
        </span>
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-700">
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="md:hidden mb-4">
          <button
            onClick={() => setIsSummaryOpen(!isSummaryOpen)}
            className="w-full bg-white border border-gray-100 rounded-2xl p-4 shadow-sm flex items-center justify-between cursor-pointer"
          >
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                Order Summary
              </p>
              <p className="text-xl font-black text-[#D8232A]">
                ₦{totalAmount.toLocaleString()} Total
              </p>
            </div>
            {isSummaryOpen ? (
              <ChevronUp size={20} className="text-gray-400" />
            ) : (
              <ChevronDown size={20} className="text-gray-400" />
            )}
          </button>

          {isSummaryOpen && (
            <div className="bg-white border-x border-b border-gray-100 rounded-b-2xl p-4 shadow-inner -mt-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-50 pb-3 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h5 className="font-bold text-sm text-gray-800">
                        {item.name}
                      </h5>
                      <p className="text-xs text-gray-400">
                        ₦{item.price.toLocaleString()} each
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center bg-white border border-gray-100 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="p-1 text-gray-500 hover:text-[#D8232A] cursor-pointer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-xs font-black text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="p-1 text-gray-500 hover:text-[#FF5E14] cursor-pointer"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-100 text-xs space-y-1.5 text-gray-500">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="hidden md:block md:col-span-5 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-black tracking-tight mb-6 text-gray-800">
              Your Tasty Order
            </h3>

            {cart.length === 0 ? (
              <p className="text-gray-400 text-sm py-8 text-center">
                Your cart is empty. Add yummy treats from the menu!
              </p>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-[#F9F9F9]/60 border border-gray-100 p-3 rounded-2xl"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shadow-inner"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-sm text-gray-800 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center bg-white border border-gray-100 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="p-1 text-gray-500 hover:text-[#D8232A] cursor-pointer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-2 text-xs font-black text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="p-1 text-gray-500 hover:text-[#FF5E14] cursor-pointer"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <span className="font-black text-sm text-[#D8232A] whitespace-nowrap">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}

                <div className="pt-6 border-t border-dashed border-gray-200 space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800">
                      ₦{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-gray-100 text-[#1E1E1E]">
                    <span className="text-base font-black">Total Amount</span>
                    <span className="text-xl font-black text-[#D8232A]">
                      ₦{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="md:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-2xl font-black tracking-tight text-gray-800">
               Customer Details
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                Fill in your info to complete your order.
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-4 top-3.5 text-gray-400"
                  />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Tunde Oladele"
                    className="w-full pl-11 pr-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5E14] focus:bg-white text-sm font-medium transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={16}
                    className="absolute left-4 top-3.5 text-gray-400"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0801 234 5678"
                    className="w-full pl-11 pr-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5E14] focus:bg-white text-sm font-medium transition-all"
                  />
                </div>
              </div>

              

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className="w-full bg-[#128C7E] hover:bg-[#075E54] disabled:bg-gray-300 text-white font-black py-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <MessageSquare size={18} fill="currentColor" />
                  Place Order via WhatsApp
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-2.5">
                  You will be redirected to WhatsApp to confirm and make your payment.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
