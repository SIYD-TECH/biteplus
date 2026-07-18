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
} from "lucide-react";

// Baseline mock dataset to seed the UI cleanly if local history is fresh
const defaultMockOrders = [
  {
    id: "BP-9081",
    fullName: "Adebayo Rasaq",
    phone: "08145678901",
    address: "New Hostel, Block C, Room 12",
    branch: "Ogbomoso (UnderG)",
    itemsText:
      "2x Bite Plus Jollof Feast — ₦7,600\n1x Chilled Coca-Cola (Pet) — ₦600",
    subtotal: 8200,
    deliveryFee: 700,
    totalAmount: 8900,
    specialInstructions: "Please add extra pepper to the chicken.",
    status: "Pending",
    timestamp: "Just now",
  },
  {
    id: "BP-9079",
    fullName: "Tolani Alao",
    phone: "09023456781",
    address: "UnderG Highway Gate, Green House",
    branch: "Ogbomoso (UnderG)",
    itemsText:
      "1x Fried Rice & Turkey Combo — ₦4,500\n1x Iced Zobo Refresh — ₦800",
    subtotal: 5300,
    deliveryFee: 700,
    totalAmount: 6000,
    specialInstructions: "",
    status: "Cooking",
    timestamp: "12 mins ago",
  },
  {
    id: "BP-9075",
    fullName: "Femi Adesina",
    phone: "07011223344",
    address: "Bodija Estate, No 14 Crescent",
    branch: "Ibadan (Bodija)",
    itemsText:
      "1x Mega Student Box Combo — ₦5,500\n1x Extra Fried Plantain (Dodo) — ₦600",
    subtotal: 6100,
    deliveryFee: 700,
    totalAmount: 6800,
    specialInstructions: "Leave with security if I don't pick.",
    status: "Completed",
    timestamp: "1 hour ago",
  },
];

const STATUS_DOT = {
  Pending: "bg-amber-500",
  Cooking: "bg-blue-600",
  Completed: "bg-emerald-600",
};

const BRANCHES = [
  "All",
  "Ogbomoso (UnderG)",
  "Ibadan (Bodija)",
  "Osogbo (Olaiya)",
];

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [activeBranchFilter, setActiveBranchFilter] = useState("All");

  useEffect(() => {
    const savedOrders = localStorage.getItem("biteplus_orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      localStorage.setItem(
        "biteplus_orders",
        JSON.stringify(defaultMockOrders),
      );
      setOrders(defaultMockOrders);
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
    if (window.confirm("Reset dashboard logs back to clean baseline data?")) {
      localStorage.setItem(
        "biteplus_orders",
        JSON.stringify(defaultMockOrders),
      );
      setOrders(defaultMockOrders);
    }
  };

  const filteredOrders =
    activeBranchFilter === "All"
      ? orders
      : orders.filter((o) => o.branch === activeBranchFilter);

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
    <div className="min-h-screen bg-[#FAFAF7] text-[#18181B] antialiased pt-16 pb-16">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FAFAF7]/95 backdrop-blur border-b border-[#E4E4E2] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="p-1.5 -ml-1.5 text-[#8A8A85] hover:text-[#18181B] transition-colors"
          >
            <ArrowLeft size={18} strokeWidth={2} />
          </Link>
          <div>
            <h1 className="text-[15px] font-semibold tracking-tight leading-none">
              Bite Plus{" "}
              <span className="text-[#8A8A85] font-normal">
                — Kitchen Admin
              </span>
            </h1>
          </div>
        </div>

        <button
          onClick={handleResetMetrics}
          className="flex items-center gap-1.5 text-xs text-[#8A8A85] hover:text-[#18181B] font-medium transition-colors cursor-pointer"
        >
          <RotateCcw size={13} strokeWidth={2} />
          Reset demo data
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 mt-8">
        {/* Branch tabs */}
        <div className="flex items-center gap-6 border-b border-[#E4E4E2]">
          {BRANCHES.map((branch) => (
            <button
              key={branch}
              onClick={() => setActiveBranchFilter(branch)}
              className={`relative pb-3 text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeBranchFilter === branch
                  ? "text-[#18181B]"
                  : "text-[#8A8A85] hover:text-[#18181B]"
              }`}
            >
              {branch}
              {activeBranchFilter === branch && (
                <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#B20017]" />
              )}
            </button>
          ))}
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border border-[#E4E4E2] rounded-md mt-6 divide-y lg:divide-y-0 lg:divide-x divide-[#E4E4E2]">
          <div className="px-5 py-4">
            <p className="text-[11px] text-[#8A8A85] font-medium uppercase tracking-wide">
              Gross revenue
            </p>
            <p className="font-mono tabular-nums text-xl font-medium mt-1">
              ₦{totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[11px] text-[#8A8A85] font-medium uppercase tracking-wide">
              Active in kitchen
            </p>
            <p className="font-mono tabular-nums text-xl font-medium mt-1">
              {activeOrdersCount}
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[11px] text-[#8A8A85] font-medium uppercase tracking-wide">
              Delivered
            </p>
            <p className="font-mono tabular-nums text-xl font-medium mt-1">
              {completedCount}
            </p>
          </div>
          <div className="px-5 py-4">
            <p className="text-[11px] text-[#8A8A85] font-medium uppercase tracking-wide">
              Avg. ticket
            </p>
            <p className="font-mono tabular-nums text-xl font-medium mt-1">
              ₦{avgOrderValue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Orders table */}
        <div className="mt-10">
          <h2 className="text-sm font-semibold tracking-tight mb-3">Orders</h2>

          {filteredOrders.length === 0 ? (
            <div className="border border-[#E4E4E2] rounded-md py-16 text-center">
              <p className="text-sm text-[#8A8A85]">
                No orders for this branch right now.
              </p>
            </div>
          ) : (
            <div className="border border-[#E4E4E2] rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead>
                    <tr className="border-b border-[#E4E4E2]">
                      <th className="px-5 py-2.5 text-[11px] font-medium text-[#8A8A85] uppercase tracking-wide">
                        Order
                      </th>
                      <th className="px-5 py-2.5 text-[11px] font-medium text-[#8A8A85] uppercase tracking-wide">
                        Customer
                      </th>
                      <th className="px-5 py-2.5 text-[11px] font-medium text-[#8A8A85] uppercase tracking-wide">
                        Branch
                      </th>
                      <th className="px-5 py-2.5 text-[11px] font-medium text-[#8A8A85] uppercase tracking-wide">
                        Items
                      </th>
                      <th className="px-5 py-2.5 text-[11px] font-medium text-[#8A8A85] uppercase tracking-wide text-right">
                        Total
                      </th>
                      <th className="px-5 py-2.5 text-[11px] font-medium text-[#8A8A85] uppercase tracking-wide">
                        Status
                      </th>
                      <th className="px-5 py-2.5 text-[11px] font-medium text-[#8A8A85] uppercase tracking-wide text-right">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E4E4E2]">
                    {filteredOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="align-top hover:bg-black/[0.015] transition-colors"
                      >
                        {/* Order ID */}
                        <td className="px-5 py-4">
                          <p className="font-mono text-[13px] tracking-tight">
                            {order.id}
                          </p>
                          <p className="text-[11px] text-[#8A8A85] mt-1">
                            {order.timestamp}
                          </p>
                        </td>

                        {/* Customer */}
                        <td className="px-5 py-4 min-w-[190px]">
                          <div className="flex items-center gap-1.5 text-[13px] font-medium">
                            <User
                              size={12}
                              className="text-[#8A8A85] shrink-0"
                            />
                            {order.fullName}
                          </div>
                          <div className="flex items-center gap-1.5 text-[12px] text-[#8A8A85] mt-1 font-mono tabular-nums">
                            <Phone
                              size={12}
                              className="text-[#8A8A85] shrink-0"
                            />
                            {order.phone}
                          </div>
                          <div className="flex items-center gap-1.5 text-[12px] text-[#8A8A85] mt-1">
                            <MapPin
                              size={12}
                              className="text-[#8A8A85] shrink-0"
                            />
                            <span className="truncate max-w-[170px]">
                              {order.address}
                            </span>
                          </div>
                        </td>

                        {/* Branch */}
                        <td className="px-5 py-4">
                          <span className="text-[13px] text-[#3F3F3D] whitespace-nowrap">
                            {order.branch}
                          </span>
                        </td>

                        {/* Items */}
                        <td className="px-5 py-4 min-w-[210px]">
                          <div className="border-l-2 border-[#E4E4E2] pl-3 text-[12.5px] text-[#3F3F3D] whitespace-pre-line leading-relaxed">
                            {order.itemsText}
                          </div>
                          {order.specialInstructions && (
                            <p className="mt-2 text-[11.5px] text-[#8A8A85] italic">
                              Note — {order.specialInstructions}
                            </p>
                          )}
                        </td>

                        {/* Total */}
                        <td className="px-5 py-4 text-right">
                          <p className="font-mono tabular-nums text-[13.5px] font-medium whitespace-nowrap">
                            ₦{order.totalAmount.toLocaleString()}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <span className="flex items-center gap-1.5 text-[12.5px] text-[#3F3F3D] whitespace-nowrap">
                            <span
                              className={`w-[6px] h-[6px] rounded-full ${STATUS_DOT[order.status]}`}
                            />
                            {order.status}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4 text-right">
                          {order.status === "Pending" && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(order.id, "Cooking")
                              }
                              className="inline-flex items-center gap-1.5 bg-[#18181B] hover:bg-black text-white text-[12px] font-medium px-3 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap"
                            >
                              <ChefHat size={13} />
                              Accept
                            </button>
                          )}
                          {order.status === "Cooking" && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(order.id, "Completed")
                              }
                              className="inline-flex items-center gap-1.5 bg-[#B20017] hover:bg-[#930012] text-white text-[12px] font-medium px-3 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap"
                            >
                              <Check size={13} />
                              Deliver
                            </button>
                          )}
                          {order.status === "Completed" && (
                            <span className="text-[12px] text-[#8A8A85] whitespace-nowrap">
                              Done
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
