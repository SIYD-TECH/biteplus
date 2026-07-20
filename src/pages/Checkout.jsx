import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Phone,
  Plus,
  Minus,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Building,
  Copy,
  CheckCircle2,
} from "lucide-react";

// Dynamic branch routing mapping for localized account handling
const BRANCH_BANK_DETAILS = {
  Ogbomoso: {
    bankName: "GTBank",
    accountName: "Bite Plus - Ogbomoso",
    accountNumber: "0123456789",
  },
  Ibadan: {
    bankName: "Access Bank",
    accountName: "Bite Plus - Ibadan HQ",
    accountNumber: "9876543210",
  },
  Osogbo: {
    bankName: "Zenith Bank",
    accountName: "Bite Plus - Osogbo",
    accountNumber: "5544332211",
  },
};

export default function Checkout({
  cart = [],
  onUpdateQty = () => {},
  selectedLocation,
  onOrderPlaced = () => {},
}) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
  });

  const [isSummaryOpen, setIsSummaryOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  // Fallback cleanly if location string variation doesn't match keys exactly
  //  BULLETPROOF FIX

  console.log(selectedLocation);
  const currentBranchKey =
    selectedLocation && BRANCH_BANK_DETAILS[selectedLocation]
      ? selectedLocation
      : "Ibadan";

  const branchBank = BRANCH_BANK_DETAILS[currentBranchKey];

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const orderId = `BP-${Math.floor(1000 + Math.random() * 9000)}`;
  const totalAmount = subtotal;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyAccount = async () => {
    try {
      await navigator.clipboard.writeText(branchBank.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy account number:", err);
    }
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty!");
    if (!formData.fullName || !formData.phone) {
      return alert("Please fill in all required delivery details.");
    }

    const itemsText = cart
      .map(
        (item) =>
          `• ${item.quantity}x ${item.name} (₦${(item.price * item.quantity).toLocaleString()})`,
      )
      .join("\n");

    const textMessage =
      `*NEW BITE PLUS ORDER*\n` +
      `----------------------------------\n` +
      `*Order ID:* ${orderId}\n` +
      `*Branch:* ${selectedLocation}\n\n` +
      `*Customer Details:*\n` +
      `• Name: ${formData.fullName}\n` +
      `• Phone: ${formData.phone}\n\n` +
      `*Order Summary:*\n` +
      `${itemsText}\n\n` +
      `----------------------------------\n` +
      `• Subtotal: ₦${subtotal.toLocaleString()}\n` +
      `*Total Bill:* ₦${totalAmount.toLocaleString()}\n` +
      `----------------------------------\n` +
      `*Payment Status:* Receipt Attached via Transfer to ${branchBank.bankName}\n`;

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

    // 🚀 STAGE THE URL AND OPEN MODAL (Do NOT trigger window.open here)
    setWhatsappUrl(`https://wa.me/${whatsappNumber}?text=${encodedUri}`);
    setShowConfirmationModal(true);
  };

  const handleFinalRedirect = () => {
    window.open(whatsappUrl, "_blank");
    setShowConfirmationModal(false);
    onOrderPlaced(); // Clears global cart state
    setFormData({ fullName: "", phone: "" });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#1E1E1E] antialiased pt-16">
      <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-100 px-4 py-3.5 shadow-sm flex items-center justify-between">
        <Link
          to="/menu"
          className="flex items-center gap-1.5 text-sm font-bold text-gray-600 hover:text-[#D8232A] transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Back to Menu</span>
        </Link>
        <span className="text-lg font-black text-[#D8232A] tracking-tight">
          Checkout
        </span>
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-700">
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 md:p-8 mt-4">
        {/* Mobile View Summary Toggle */}
        <div className="md:hidden mb-4">
          <button
            type="button"
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
                  <div className="flex items-center bg-white border border-gray-100 rounded-lg p-0.5">
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, -1)}
                      className="p-1 text-gray-500 hover:text-[#D8232A] cursor-pointer"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-2 text-xs font-black text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQty(item.id, 1)}
                      className="p-1 text-gray-500 hover:text-[#FF5E14] cursor-pointer"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              ))}
              <div className="pt-3 border-t border-gray-100 text-xs text-gray-500 flex justify-between">
                <span>Subtotal</span>
                <span>₦{subtotal.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Desktop Left Column Panel */}
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
                      <div className="flex items-center bg-white border border-gray-100 rounded-lg p-0.5 mt-2 w-max">
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="p-1 text-gray-500 hover:text-[#D8232A] cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-black text-gray-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQty(item.id, 1)}
                          className="p-1 text-gray-500 hover:text-[#FF5E14] cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
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

          {/* Right Column: Information Forms & Dynamic Banking Widget */}
          <div className="md:col-span-7 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h3 className="text-2xl font-black tracking-tight text-gray-800">
                Customer Details
              </h3>
              <p className="text-gray-400 text-xs mt-1">
                Fill in your info and complete your payment below.
              </p>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-6">
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
                    className="w-full pl-11 pr-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:outline-none focus:border-[#D8232A] focus:bg-white text-sm font-medium transition-all"
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
                    className="w-full pl-11 pr-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:outline-none focus:border-[#D8232A] focus:bg-white text-sm font-medium transition-all"
                  />
                </div>
              </div>

              {/* Dynamic Bank Account Reveal Panel Component */}
              <div className="border border-gray-100 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Building size={18} className="text-[#D8232A]" />
                    <h4 className="text-sm font-black text-gray-800">
                      Instant Bank Transfer
                    </h4>
                  </div>
                  <span className="bg-[#D8232A]/10 text-[#D8232A] px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {selectedLocation}
                  </span>
                </div>

                {/* High-visibility alert to guide the customer workflow */}
                <div className="bg-amber-50/60 border border-amber-100 rounded-xl p-3 flex gap-2.5 items-start">
                  <span className="text-amber-600 text-xs font-black mt-0.5">
                    ⚠️
                  </span>
                  <p className="text-xs text-amber-800 font-medium leading-relaxed">
                    <strong>Important:</strong> Please make your bank transfer
                    to the details below <strong>before</strong> clicking the
                    WhatsApp checkout button.
                  </p>
                </div>

                {/* Dynamic Bank Details Display Box */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm relative overflow-hidden group">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Bank Name
                      </span>
                      <span className="text-sm font-black text-gray-800">
                        {branchBank.bankName}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-b border-gray-50 pb-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                        Account Name
                      </span>
                      <span className="text-sm font-extrabold text-gray-700">
                        {branchBank.accountName}
                      </span>
                    </div>

                    <div className="flex justify-between items-center pt-1">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                          Account Number
                        </span>
                        <span className="text-lg font-black tracking-widest text-[#D8232A]">
                          {branchBank.accountNumber}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                          copied
                            ? "bg-green-500 text-white"
                            : "bg-gray-50 text-gray-600 hover:bg-[#D8232A] hover:text-white border border-gray-100"
                        }`}
                        title="Copy account number"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 size={14} />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={cart.length === 0}
                  className="w-full bg-[#128C7E] hover:bg-[#075E54] disabled:bg-gray-300 text-white font-black py-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <MessageSquare size={18} fill="currentColor" />
                  Place Order via WhatsApp
                </button>
                <p className="text-center text-[10px] text-gray-400 mt-2.5">
                  The system will automatically wrap your order ticket and
                  direct you to WhatsApp to attach your payment screenshot.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Premium Step-by-Step Order Confirmation Modal Overlay */}
      {showConfirmationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-gray-100 transform scale-100 transition-all space-y-6">
            {/* Header section */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto text-green-500">
                <CheckCircle2 size={36} className="animate-pulse" />
              </div>
              <h3 className="text-xl font-black text-gray-800 tracking-tight pt-2">
                One Final Step!{" "}
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Please follow these 3 simple steps to confirm your order.
              </p>
            </div>

            {/* Simplified Plain-English Instructions */}
            <div className="bg-[#F9F9F9] border border-gray-100 rounded-2xl p-4 space-y-4">
              {/* Step 1 */}
              <div className="flex gap-3 items-start">
                <span className="w-5 h-5 rounded-full bg-[#D8232A] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <h4 className="text-xs font-black text-gray-800">
                    Make the payment
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Make sure you have transferred exactly{" "}
                    <strong className="text-[#D8232A]">
                      ₦{totalAmount.toLocaleString()}
                    </strong>{" "}
                    to the branch account details shown on the checkout page.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-3 items-start border-t border-gray-100 pt-3">
                <span className="w-5 h-5 rounded-full bg-[#D8232A] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <h4 className="text-xs font-black text-gray-800">
                    Go to WhatsApp
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Click the green button below to open WhatsApp. Your full
                    order details will be automatically filled into the chat box
                    for you.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-3 items-start border-t border-gray-100 pt-3">
                <span className="w-5 h-5 rounded-full bg-[#D8232A] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <h4 className="text-xs font-black text-gray-800">
                    Send text & receipt screenshot
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    Send the pre-filled text message, then attach the screenshot
                    of your bank transfer receipt so the kitchen line can verify
                    it immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Controls */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleFinalRedirect}
                className="w-full bg-[#128C7E] hover:bg-[#075E54] text-white font-black py-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.99] cursor-pointer text-sm"
              >
                <MessageSquare size={16} fill="currentColor" />
                Proceed to WhatsApp
              </button>

              <button
                type="button"
                onClick={() => setShowConfirmationModal(false)}
                className="w-full bg-white hover:bg-gray-50 text-gray-400 font-bold py-2.5 rounded-xl text-xs transition-colors cursor-pointer text-center"
              >
                Review order details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
