import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, MapPin, ArrowLeft, Plus, Minus } from "lucide-react";

const branches = ["Ogbomoso", "Ibadan", "Osogbo"];
const categories = ["All", "Meals", "Sides", "Drinks"];

const LOCATION_STORAGE_KEY = "biteplus_selected_location";

export default function Menu({
  selectedLocation = "",
  setSelectedLocation = () => {},
  cart = [],
  onAddToCart = () => {},
  onUpdateQty = () => {},
}) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");

  
  const [tempLocation, setTempLocation] = useState(
    () =>
      selectedLocation ||
      localStorage.getItem(LOCATION_STORAGE_KEY) ||
      branches[0],
  );
  const [showLocationModal, setShowLocationModal] = useState(() => {
    const saved =
      selectedLocation || localStorage.getItem(LOCATION_STORAGE_KEY);
    return !saved;
  });

 
  useEffect(() => {
    const saved = localStorage.getItem(LOCATION_STORAGE_KEY);
    if (saved && !selectedLocation) {
      setSelectedLocation(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirmLocation = () => {
    setSelectedLocation(tempLocation);
    localStorage.setItem(LOCATION_STORAGE_KEY, tempLocation);
    setShowLocationModal(false);
  };

  const menuItems = [
    // 🍛 RICE SELECTION (4 Types)
    {
      id: 1,
      name: "Bite Plus Jollof Feast",
      price: 3800,
      category: "Meals",
      description:
        "Smoky party Jollof rice, served with a large piece of spiced peppered chicken, fried plantain, and coleslaw.",
      image:
        "jollof.avif",
    },
    {
      id: 2,
      name: "Classic Fried Rice Premium",
      price: 3900,
      category: "Meals",
      description:
        "Wok-fried rice loaded with sweet corn, liver bits, and fresh vegetables, served with peppered fish.",
      image:
        "fried rice.jpg",
    },
    {
      id: 3,
      name: "Native Concoction Rice",
      price: 3500,
      category: "Meals",
      description:
        "Traditional local rice cooked with palm oil, locust beans (iru), dried fish, and shredded ponmo.",
      image: "native.jpg",
    },
    {
      id: 4,
      name: "White Rice & Golden Stew",
      price: 3200,
      category: "Meals",
      description:
        "Fluffy parboiled white rice paired with a rich, deep-fried tomato and bell pepper base stew and beef.",
      image:
        "white.jpg",
    },

    // 🍗 COMBOS
    {
      id: 5,
      name: "Fried Rice & Turkey Combo",
      price: 4500,
      category: "Meals",
      description:
        "A premium combination of veggie fried rice paired with a massive piece of seasoned grilled turkey.",
      image:
        "fried combo.jpg",
    },
    // {
    //   id: 6,
    //   name: "Mega Student Box Combo",
    //   price: 5500,
    //   category: "Meals",
    //   description:
    //     "Jollof rice, 1 piece of crunchy chicken, 1 beef sausage, plantain, and a free 50cl chilled drink.",
    //   image:
    //     "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600",
    // },

    // 🍟 SIDES & EXTRAS
    {
      id: 7,
      name: "Crunchy Chicken & Chips",
      price: 3200,
      category: "Sides",
      description:
        "2 pieces of crispy golden fried chicken served with a generous portion of salted French fries.",
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=600",
    },
    {
      id: 8,
      name: "Bite Plus Double Shawarma",
      price: 2500,
      category: "Sides",
      description:
        "Warm toasted flatbread wrapped with double grilled chicken, sausage, and shredded cabbage in cream sauce.",
      image:
        "sharwama.jpg",
    },
    {
      id: 9,
      name: "Extra Fried Plantain (Dodo)",
      price: 600,
      category: "Sides",
      description:
        "A portion of sweet, perfectly riped and golden-fried diced plantains.",
      image:
        "plantian.jpg",
    },
    {
      id: 10,
      name: "Peppered Gizzard Extra",
      price: 1500,
      category: "Sides",
      description:
        "Chewy, well-seasoned chicken gizzards tossed in a fiery hot habanero and onion sauce mixture.",
      image: "gizdodo.jpg",
    },

    // 🥤 DRINKS SELECTION
    {
      id: 11,
      name: "Chilled Coca-Cola (Pet)",
      price: 600,
      category: "Drinks",
      description: "50cl ice-cold pet bottle Coca-Cola.",
      image:
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600",
    },
    {
      id: 12,
      name: "Iced Zobo Refresh",
      price: 800,
      category: "Drinks",
      description:
        "House-brewed hibiscus flower extract enriched with natural ginger, pineapple peels, and sweet cloves.",
      image:
        "https://images.unsplash.com/photo-1497534446932-c925b458314e?w=600",
    },
    {
      id: 13,
      name: "Chilled Fruit Juice",
      price: 1200,
      category: "Drinks",
      description:
        "1 Litre pack of refreshing, ice-cold mixed fruit juice blend.",
      image:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600",
    },
  ];

  const filteredItems =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F9F9F9] pt-16 pb-24">
      {showLocationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-100 text-center">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-[#FF5E14] flex items-center justify-center mx-auto mb-4">
              <MapPin size={28} />
            </div>
            <h3 className="text-xl font-black text-[#1E1E1E]">
              Welcome to Bite Plus!
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              Please select your closest outlet to view the correct menu and
              handle local delivery.
            </p>

            <select
              value={tempLocation}
              onChange={(e) => setTempLocation(e.target.value)}
              className="w-full mt-6 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF5E14] font-semibold text-gray-700"
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>

            <button
              onClick={handleConfirmLocation}
              className="w-full mt-6 bg-gradient-to-r from-[#D8232A] to-[#FF5E14] text-white font-extrabold py-3.5 rounded-xl shadow-md hover:opacity-95 active:scale-[0.99] transition-all cursor-pointer"
            >
              Confirm Location
            </button>
          </div>
        </div>
      )}

      {/* 🗺️ SUB-HEADER CONTROL ACTIONS */}
      <div
        onClick={() => setShowLocationModal(true)}
        className="bg-white border-b border-gray-100 sticky top-16 z-30 py-5 px-4 flex items-center justify-between shadow-sm"
      >
        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full text-xs font-bold text-gray-700 transition-all cursor-pointer">
          <MapPin size={14} className="text-[#FF5E14]" />
          {selectedLocation || "Select Location"}
        </button>
      </div>

      {/* 💊 CATEGORY SWIPE BAR */}
      <div className="bg-white border-b border-gray-100 sticky top-[117px] z-30 py-3 px-4 overflow-x-auto no-scrollbar flex gap-2.5 shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-[#D8232A] text-white shadow-md shadow-red-600/10"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🍔 DYNAMIC PRODUCT GRID */}
      <main className="max-w-6xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredItems.map((item) => {
            const cartItem = cart.find((i) => i.id === item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-row sm:flex-col h-36 sm:h-auto group hover:shadow-md transition-shadow"
              >
                <div className="w-32 sm:w-full h-full sm:h-48 flex-shrink-0 overflow-hidden relative bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="hidden sm:inline-block absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#1E1E1E] font-black text-sm px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                    ₦{item.price.toLocaleString()}
                  </span>
                </div>

                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between min-w-0">
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-extrabold text-sm sm:text-base text-[#1E1E1E] tracking-tight truncate sm:whitespace-normal">
                        {item.name}
                      </h4>
                      <span className="sm:hidden font-black text-sm text-[#D8232A] whitespace-nowrap">
                        ₦{item.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-400 text-[11px] sm:text-xs mt-1 sm:mt-1.5 leading-snug sm:leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-2 sm:mt-5 pt-2 sm:pt-4 border-t border-gray-50">
                    {cartItem ? (
                      <div className="flex items-center justify-between bg-gray-50 rounded-xl p-0.5 sm:p-1 border border-gray-100 max-w-[140px] sm:max-w-none">
                        <button
                          onClick={() => onUpdateQty(item.id, -1)}
                          className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-[#D8232A] cursor-pointer"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-black text-xs sm:text-sm text-[#1E1E1E]">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onAddToCart(item)}
                          className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-600 hover:text-[#FF5E14] cursor-pointer"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onAddToCart(item)}
                        className="w-full bg-gray-900 hover:bg-[#D8232A] text-white font-bold text-[11px] sm:text-xs py-2 sm:py-3 rounded-xl transition-colors shadow-sm cursor-pointer"
                      >
                        Add to Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {totalCartItems > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-xl px-4 animate-bounce-once">
          <Link
            to="/cart"
            className="w-full bg-[#D8232A] hover:bg-[#b51c22] text-white font-black py-4 px-6 rounded-2xl shadow-xl flex items-center justify-between transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-2.5">
              <span className="bg-white/20 px-2 py-0.5 rounded-lg text-xs font-black">
                {totalCartItems}
              </span>
              <span className="text-sm font-bold tracking-tight">
                View Order Cart
              </span>
            </div>
            <span className="text-sm font-black">
              Checkout →
            </span>
          </Link>
        </div>
      )}

      {/* 🚀 PERSISTENT MOBILE FLOATING BOTTOM ACTION LINK */}
      {totalCartItems > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-40 max-w-md mx-auto sm:hidden">
          <Link
            to="/cart"
            className="w-full bg-gradient-to-r from-[#D8232A] to-[#FF5E14] text-white p-4 rounded-xl font-extrabold flex items-center justify-between shadow-lg shadow-orange-600/20 active:scale-[0.98] transition-transform"
          >
            <span className="text-xs tracking-wide uppercase bg-white/20 px-2.5 py-1 rounded-md">
              {totalCartItems} {totalCartItems === 1 ? "Item" : "Items"}
            </span>
            <span className="text-sm">View Your Order</span>
            <ShoppingCart size={18} />
          </Link>
        </div>
      )}
    </div>
  );
}
