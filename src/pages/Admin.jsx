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
  Layers,
  Search,
  Filter,
} from "lucide-react";

const baselineMockOrders = [
  
];

const BRANCHES = [
  "All",
  "Ogbomoso",
  "Ibadan (Bodija)",
  "Osogbo (Olaiya)",
];
const STATUSES = ["All Stages", "Pending", "Cooking", "Completed"];

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [activeBranchFilter, setActiveBranchFilter] = useState("All");
  const [activeStatusFilter, setActiveStatusFilter] = useState("All Stages");
  const [searchQuery, setSearchQuery] = useState("");

  // 📥 AUTOMATED FEED SYNC: Reads real-time data from the customer app's engine
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

  const handleUpdateStatus = (orderId, nextStatus) => {
    const updated = orders.map((order) =>
      order.id === orderId ? { ...order, status: nextStatus } : order,
    );
    setOrders(updated);
    localStorage.setItem("biteplus_orders", JSON.stringify(updated));
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

  // 🎛️ COMPREHENSIVE FILTER ENGINE (Branch + Status Status + Text Query matching)
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

  // Computational Live Calculations based on the dynamic filtered array
  const totalRevenue = filteredOrders
    .filter((o) => o.status === "Completed")
    .reduce((sum, o) => sum + o.totalAmount, 0);
  const activeOrdersCount = filteredOrders.filter(
    (o) => o.status === "Pending" || o.status === "Cooking",
  ).length;
  const completedCount = filteredOrders.filter(
    (o) => o.status === "Completed",
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
      {/* 🚀 STICKY ALIGNED NAVIGATION HEADER */}
      <header className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-gray-500 hover:text-[#D8232A]"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-black tracking-tight text-[#1E1E1E]">
                ADMIN
              </h1>
              
            </div>
          </div>
        </div>

        <button
          onClick={handleResetMetrics}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 font-bold border border-gray-200 bg-gray-50 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
        >
          <RotateCcw size={12} />
          Reset Metrics
        </button>
      </header>

      {/* 🔍 LIVE CONTROLLER PIPELINE SUB-BAR */}
      <div className="fixed top-[69px] left-0 w-full bg-white border-b border-gray-200/80 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* Real-time Input Search Area */}
          <div className="relative w-full md:max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-3 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by Customer Name or Order ID (e.g. BP-9081)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#D8232A] focus:bg-white text-xs font-semibold transition-all"
            />
          </div>

          {/* Status Lifecycle Navigation Switches */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto justify-start md:justify-end">
            <Filter size={14} className="text-gray-400 hidden lg:inline mr-1" />
            {STATUSES.map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap border ${
                  activeStatusFilter === status
                    ? "bg-gray-900 border-gray-900 text-white shadow-sm"
                    : "bg-white border-gray-200 text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        {/* 💊 THE SWITCH BRANCH SELECTION FILTER */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
          {BRANCHES.map((branch) => (
            <button
              key={branch}
              onClick={() => setActiveBranchFilter(branch)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeBranchFilter === branch
                  ? "bg-[#D8232A] text-white shadow-md shadow-red-600/10"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {branch === "All" ? "📍 All Hubs" : branch}
            </button>
          ))}
        </div>

        {/* 🏢 GRID LAYOUT MODULE */}
        <div className="grid grid-cols-1 gap-6 mt-6 items-start">
          <div className="space-y-6">
            {/* BRAND METRICS MODULE CARD BOARD */}
            <div className="grid grid-cols-2 lg:grid-cols-4 bg-white border border-gray-100 rounded-2xl p-1 divide-y lg:divide-y-0 lg:divide-x divide-gray-100 shadow-sm">
              <div className="p-5">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                  Gross Revenue
                </p>
                <p className="font-sans text-xl font-black mt-1 text-[#1E1E1E]">
                  ₦{totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="p-5">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                  In Kitchen
                </p>
                <p className="font-sans text-xl font-black mt-1 text-[#FF5E14]">
                  {activeOrdersCount} Active
                </p>
              </div>
              <div className="p-5">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                  Delivered
                </p>
                <p className="font-sans text-xl font-black mt-1 text-emerald-600">
                  {completedCount} Cooked
                </p>
              </div>
              <div className="p-5">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                  Avg Ticket Size
                </p>
                <p className="font-sans text-xl font-black mt-1 text-gray-700">
                  ₦{avgOrderValue.toLocaleString()}
                </p>
              </div>
            </div>

            {/* DYNAMIC PIPELINE CARDS STREAM */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold text-gray-400">
                  {filteredOrders.length} Calculated Items
                </span>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="border border-gray-200 border-dashed rounded-2xl bg-white py-16 text-center shadow-sm">
                  <p className="text-sm font-medium text-gray-400">
                    No matching orders found matching your search parameters.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white border border-gray-100 hover:shadow-md rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between transition-all group animate-fade-in"
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
                                : order.status === "Cooking"
                                  ? "bg-blue-50 text-blue-600 border border-blue-100"
                                  : "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            }`}
                          >
                            ● {order.status}
                          </span>
                        </div>

                        {/* Customer Meta Row Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 font-medium">
                          <div className="flex items-center gap-1.5">
                            <User size={13} className="text-gray-400" />{" "}
                            {order.fullName}
                          </div>
                          <div className="flex items-center gap-1.5 font-mono">
                            <Phone size={13} className="text-gray-400" />{" "}
                            {order.phone}
                          </div>
                          <div className="flex items-center gap-1.5 sm:col-span-2 truncate">
                            <MapPin size={13} className="text-gray-400" />{" "}
                            <span className="font-mono text-[11px] text-gray-400 mr-1">
                              [{order.branch.split(" ")[0]}]
                            </span>{" "}
                            {order.address}
                          </div>
                        </div>

                        {/* Order receipts display box lists */}
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-xs text-gray-700 whitespace-pre-line leading-relaxed font-semibold">
                          {order.itemsText}
                        </div>

                        {order.specialInstructions && (
                          <div className="text-[11px] text-red-600 bg-red-50/50 border border-red-100 p-2 rounded-lg font-medium">
                            📝 Note: {order.specialInstructions}
                          </div>
                        )}
                      </div>

                      {/* Explicit interactive side state toggles */}
                      <div className="flex flex-row md:flex-col items-end gap-3 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-gray-50 justify-between">
                        <div className="text-right md:mb-1">
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                            Total Revenue
                          </p>
                          <p className="text-base font-black text-[#D8232A]">
                            ₦{order.totalAmount.toLocaleString()}
                          </p>
                        </div>

                        <div className="w-full md:w-auto">
                          {order.status === "Pending" && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(order.id, "Cooking")
                              }
                              className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-[#D8232A] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                            >
                              <ChefHat size={13} />
                              Approve order
                            </button>
                          )}
                          {order.status === "Cooking" && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(order.id, "Completed")
                              }
                              className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 bg-[#D8232A] hover:bg-[#b01d22] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer"
                            >
                              <Check size={13} />
                              Finalize Order
                            </button>
                          )}
                          {order.status === "Completed" && (
                            <span className="text-xs font-bold text-gray-400 flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 shadow-inner">
                              Delivered ✓
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
      </div>
    </div>
  );
}
