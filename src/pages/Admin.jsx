import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  ArrowLeft,
  User,
  RotateCcw,
  ChefHat,
  Check,
  Search,
  Filter,
  BellRing,
  CreditCard,
} from "lucide-react";

const baselineMockOrders = [
  {
    id: "BP-4321",
    fullName: "Solomon Temilade",
    phone: "2349019116721",
    branch: "Ogbomoso",
    itemsText:
      "2x Bite Plus Jollof Feast — ₦7,600\n1x Classic Fried Rice Premium — ₦3,900",
    subtotal: 11500,
    totalAmount: 11500,
    status: "Pending", // Starts at Pending to test the verification flow
    timestamp: "10 mins ago",
    specialInstructions: "Extra pepper on the chicken please.",
  },
];

const BRANCHES = ["All", "Ogbomoso", "Ibadan (Bodija)", "Osogbo (Olaiya)"];

// 📊 UPDATED PIPELINE STAGES INLCUDING "PAID"
const STATUSES = [
  "All Stages",
  "Pending",
  "Paid",
  "Cooking",
  "Ready",
  "Completed",
];

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [activeBranchFilter, setActiveBranchFilter] = useState("All");
  const [activeStatusFilter, setActiveStatusFilter] = useState("All Stages");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedOrders = localStorage.getItem("biteplus_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      localStorage.setItem(
        "biteplus_orders",
        JSON.stringify(baselineMockOrders),
      );
      setOrders(baselineMockOrders);
    }
  }, []);

  const handleUpdateStatus = (orderId, nextStatus, orderData = null) => {
    const updated = orders.map((order) =>
      order.id === orderId ? { ...order, status: nextStatus } : order,
    );
    setOrders(updated);
    localStorage.setItem("biteplus_orders", JSON.stringify(updated));

    let finalPhone = "";
    if (orderData && orderData.phone) {
      const cleanPhone = orderData.phone.replace(/\D/g, "");
      finalPhone = cleanPhone.startsWith("234")
        ? cleanPhone
        : `234${cleanPhone.replace(/^0/, "")}`;
    }

    // 📢 TRIGGER 1: Order is ready at the counter
    if (nextStatus === "Ready" && orderData) {
      const readyMessage =
        `*BITE PLUS ORDER READY* 🍔\n` +
        `----------------------------------\n` +
        `Hello *${orderData.fullName}*,\n\n` +
        `Your order is hot and ready for pickup at the *${orderData.branch}* counter! 🎉\n\n` +
        `🔑 *Your Order ID:* ${orderData.id}\n\n` +
        `Please present this Order ID to the staff at the counter to collect your meal. Thank you!`;

      window.open(
        `https://wa.me/${finalPhone}?text=${encodeURIComponent(readyMessage)}`,
        "_blank",
      );
    }

    // 🤝 TRIGGER 2: Order has been collected (Thank You Note)
    if (nextStatus === "Completed" && orderData) {
      const thankYouMessage =
        `*BITE PLUS ORDER PICKED UP* ✅\n` +
        `----------------------------------\n` +
        `Hello *${orderData.fullName}*,\n\n` +
        `This confirms that your order *${orderData.id}* has been successfully picked up from our *${orderData.branch}* hub! 🎉\n\n` +
        `Thank you for eating with Bite Plus! We hope you love your meal. Have an amazing day! ✨`;

      window.open(
        `https://wa.me/${finalPhone}?text=${encodeURIComponent(thankYouMessage)}`,
        "_blank",
      );
    }
  };

  const handleResetMetrics = () => {
    if (window.confirm("Reset dashboard logs back to baseline demo records?")) {
      localStorage.setItem(
        "biteplus_orders",
        JSON.stringify(baselineMockOrders),
      );
      setOrders(baselineMockOrders);
      setSearchQuery("");
      setActiveBranchFilter("All");
      setActiveStatusFilter("All Stages");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesBranch =
      activeBranchFilter === "All" || order.branch === activeBranchFilter;
    const matchesStatus =
      activeStatusFilter === "All Stages" ||
      order.status === activeStatusFilter;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      order.id.toLowerCase().includes(query) ||
      order.fullName.toLowerCase().includes(query);

    return matchesBranch && matchesStatus && matchesSearch;
  });

  // Updated metrics computations
  const totalRevenue = filteredOrders
    .filter((o) => o.status === "Completed")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const activeOrdersCount = filteredOrders.filter(
    (o) =>
      o.status === "Pending" || o.status === "Paid" || o.status === "Cooking",
  ).length;
  const readyAtCounterCount = filteredOrders.filter(
    (o) => o.status === "Ready",
  ).length;
  const avgOrderValue =
    filteredOrders.length > 0
      ? Math.round(
          filteredOrders.reduce((sum, o) => sum + o.totalAmount, 0) /
            filteredOrders.length,
        )
      : 0;

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#1E1E1E] antialiased pt-40 pb-16">
      {/* HEADER BAR */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/menu"
            className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-gray-500 hover:text-[#D8232A]"
          >
            <ArrowLeft size={16} />
          </Link>
          <h1 className="text-sm font-black tracking-tight text-[#1E1E1E]">
            KITCHEN ADMINISTRATIVE HUB
          </h1>
        </div>
        <button
          onClick={handleResetMetrics}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 font-bold border border-gray-200 bg-gray-50 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
        >
          <RotateCcw size={12} />
          Reset Metrics
        </button>
      </header>

      {/* PIPELINE CONTROLS */}
      <div className="fixed top-[69px] left-0 w-full bg-white border-b border-gray-200/80 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by Customer Name or Order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D8232A] focus:bg-white text-xs font-semibold transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
            <Filter size={14} className="text-gray-400 hidden lg:inline mr-1" />
            {STATUSES.map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                  activeStatusFilter === status
                    ? "bg-gray-900 border-gray-900 text-white shadow-sm"
                    : "bg-white border-gray-200 text-gray-500 hover:text-gray-800"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {/* HUB FILTERS */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
          {BRANCHES.map((branch) => (
            <button
              key={branch}
              onClick={() => setActiveBranchFilter(branch)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeBranchFilter === branch
                  ? "bg-[#D8232A] text-white shadow-md shadow-red-600/10"
                  : "bg-white border border-gray-200 text-gray-600"
              }`}
            >
              {branch === "All" ? "📍 All Hubs" : branch}
            </button>
          ))}
        </div>

        {/* METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-white border border-gray-100 rounded-2xl p-1 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 shadow-sm mt-6">
          <div className="p-5">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
              Gross Revenue
            </p>
            <p className="text-xl font-black mt-1 text-[#1E1E1E]">
              ₦{totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="p-5">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
              Active Queue
            </p>
            <p className="text-xl font-black mt-1 text-[#FF5E14]">
              {activeOrdersCount} Tickets
            </p>
          </div>
          <div className="p-5">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
              At Counter
            </p>
            <p className="text-xl font-black mt-1 text-blue-600">
              {readyAtCounterCount} Waiting
            </p>
          </div>
          <div className="p-5">
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
              Avg Ticket Size
            </p>
            <p className="text-xl font-black mt-1 text-gray-700">
              ₦{avgOrderValue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* FEED STREAM */}
        <div className="mt-6">
          {filteredOrders.length === 0 ? (
            <div className="border border-gray-200 border-dashed rounded-2xl bg-white py-16 text-center shadow-sm">
              <p className="text-sm font-medium text-gray-400">
                No matching orders found.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-gray-100 hover:shadow-md rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition-all"
                >
                  <div className="space-y-3 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-black text-gray-800 bg-gray-50 px-2.5 py-0.5 rounded border border-gray-100">
                        {order.id}
                      </span>
                      <span className="text-gray-400 text-[11px] font-medium">
                        {order.timestamp}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          order.status === "Pending"
                            ? "bg-amber-50 text-amber-600 border border-amber-100"
                            : order.status === "Paid"
                              ? "bg-purple-50 text-purple-600 border border-purple-100"
                              : order.status === "Cooking"
                                ? "bg-orange-50 text-orange-600 border border-orange-100"
                                : order.status === "Ready"
                                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                                  : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                        }`}
                      >
                        ●{" "}
                        {order.status === "Ready"
                          ? "Ready at Counter"
                          : order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 font-medium">
                      <div className="flex items-center gap-1.5">
                        <User size={13} className="text-gray-400" />{" "}
                        {order.fullName}
                      </div>
                      <div className="flex items-center gap-1.5 font-mono">
                        <Phone size={13} className="text-gray-400" />{" "}
                        {order.phone}
                      </div>
                      <div className="flex items-center gap-1.5 sm:col-span-2">
                        <MapPin size={13} className="text-gray-400" />
                        <span className="bg-gray-100 text-gray-700 font-bold px-1.5 py-0.5 rounded text-[10px]">
                          {order.branch} Hub
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs text-gray-700 whitespace-pre-line font-semibold">
                      {order.itemsText}
                    </div>
                  </div>

                  {/* STEPPER FLOW CONTROLS */}
                  <div className="flex flex-row md:flex-col items-end gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-gray-50 justify-between">
                    <div className="text-right">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                        Order Total
                      </p>
                      <p className="text-base font-black text-[#D8232A]">
                        ₦{order.totalAmount.toLocaleString()}
                      </p>
                    </div>

                    <div className="w-full md:w-auto">
                      {order.status === "Pending" && (
                        <button
                          onClick={() => handleUpdateStatus(order.id, "Paid")}
                          className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                          <CreditCard size={13} />
                          Confirm Payment
                        </button>
                      )}

                      {order.status === "Paid" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(order.id, "Cooking")
                          }
                          className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-[#D8232A] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                          <ChefHat size={13} />
                          Send to Kitchen
                        </button>
                      )}

                      {order.status === "Cooking" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(order.id, "Ready", order)
                          }
                          className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                          <BellRing size={13} />
                          Mark Ready (Notify ID)
                        </button>
                      )}

                      {order.status === "Ready" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(order.id, "Completed", order)
                          }
                          className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                        >
                          <Check size={13} />
                          Confirm Collection
                        </button>
                      )}

                      {order.status === "Completed" && (
                        <span className="text-xs font-bold text-gray-400 flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 shadow-inner">
                          Picked Up ✓
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
