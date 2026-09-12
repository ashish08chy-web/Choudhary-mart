import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const categoriesData = [
  {
    id: "deals",
    name: "Top Deals",
    icon: "🔥",
    badge: "HOT",
    badgeColor: "bg-red-500 text-white animate-pulse",
    path: "/productpage",
    featured: {
      title: "Flash Sale 50% Off",
      desc: "Limited time deals on trending items",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&q=80",
    },
    subcategories: [
      { name: "Deal of the Day", path: "/productpage" },
      { name: "Under ₹499", path: "/productpage" },
      { name: "Clearance Sale", path: "/productpage" },
      { name: "Best Sellers", path: "/productpage" },
    ],
  },
  {
    id: "men",
    name: "Men's Fashion",
    icon: "👔",
    badge: "NEW",
    badgeColor: "bg-blue-600 text-white",
    path: "/categories",
    featured: {
      title: "Men's Summer Styles",
      desc: "Premium shirts, tees & denim",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80",
    },
    subcategories: [
      { name: "T-Shirts & Polos", path: "/productpage" },
      { name: "Casual & Formal Shirts", path: "/productpage" },
      { name: "Jeans & Trousers", path: "/productpage" },
      { name: "Jackets & Hoodies", path: "/productpage" },
      { name: "Ethnic Wear", path: "/productpage" },
    ],
  },
  {
    id: "women",
    name: "Women's Fashion",
    icon: "👗",
    badge: "TRENDING",
    badgeColor: "bg-pink-500 text-white",
    path: "/categories",
    featured: {
      title: "Chic & Elegant",
      desc: "Latest dresses, tops & ethnic wear",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
    },
    subcategories: [
      { name: "Dresses & Gowns", path: "/productpage" },
      { name: "Tops & Kurtis", path: "/productpage" },
      { name: "Sarees & Lehengas", path: "/productpage" },
      { name: "Western Wear", path: "/productpage" },
      { name: "Handbags & Clutches", path: "/productpage" },
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    icon: "💻",
    badge: "SAVE 40%",
    badgeColor: "bg-emerald-600 text-white",
    path: "/categories",
    featured: {
      title: "Smart Gadgets Hub",
      desc: "Top laptops, audio & accessories",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=400&q=80",
    },
    subcategories: [
      { name: "Smartphones & Tablets", path: "/productpage" },
      { name: "Laptops & Accessories", path: "/productpage" },
      { name: "Headphones & Earbuds", path: "/productpage" },
      { name: "Smart Watches", path: "/productpage" },
      { name: "Power Banks & Cables", path: "/productpage" },
    ],
  },
  {
    id: "shoes",
    name: "Footwear",
    icon: "👟",
    path: "/categories",
    featured: {
      title: "Step Up in Style",
      desc: "Sneakers, formal & sports shoes",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
    },
    subcategories: [
      { name: "Sneakers", path: "/productpage" },
      { name: "Running & Sports Shoes", path: "/productpage" },
      { name: "Formal Shoes", path: "/productpage" },
      { name: "Sandals & Slippers", path: "/productpage" },
    ],
  },
  {
    id: "watches",
    name: "Watches & Jewelry",
    icon: "⌚",
    path: "/categories",
    featured: {
      title: "Timeless Elegance",
      desc: "Luxury & analog watches",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
    },
    subcategories: [
      { name: "Analog Watches", path: "/productpage" },
      { name: "Digital & Chrono", path: "/productpage" },
      { name: "Bracelets & Chains", path: "/productpage" },
      { name: "Sunglasses", path: "/productpage" },
    ],
  },
  {
    id: "beauty",
    name: "Beauty & Care",
    icon: "✨",
    path: "/categories",
    featured: {
      title: "Glow & Glamour",
      desc: "Skincare, cosmetics & fragrances",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80",
    },
    subcategories: [
      { name: "Skincare & Lotions", path: "/productpage" },
      { name: "Makeup & Lipsticks", path: "/productpage" },
      { name: "Perfumes & Deodorants", path: "/productpage" },
      { name: "Hair Care & Grooming", path: "/productpage" },
    ],
  },
  {
    id: "home",
    name: "Home & Living",
    icon: "🏠",
    path: "/categories",
    featured: {
      title: "Cozy Home Essentials",
      desc: "Decor, bedding & kitchenware",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80",
    },
    subcategories: [
      { name: "Home Decor", path: "/productpage" },
      { name: "Kitchen Appliances", path: "/productpage" },
      { name: "Bedsheets & Curtains", path: "/productpage" },
      { name: "Lamps & Lighting", path: "/productpage" },
    ],
  },
  {
    id: "sports",
    name: "Sports & Fitness",
    icon: "⚽",
    path: "/categories",
    featured: {
      title: "Active Lifestyle",
      desc: "Gym equipment & activewear",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80",
    },
    subcategories: [
      { name: "Gym & Workout Gear", path: "/productpage" },
      { name: "Cricket & Football", path: "/productpage" },
      { name: "Yoga Mats & Bands", path: "/productpage" },
      { name: "Protein & Shakers", path: "/productpage" },
    ],
  },
];

export default function CategoryNav() {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [allCategoriesOpen, setAllCategoriesOpen] = useState(false);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative bg-white/95 backdrop-blur-md border-b border-blue-100/80 shadow-xs z-30 select-none">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 relative">
        <div className="flex items-center justify-between gap-1 py-1.5">
          
          {/* "All Categories" Mega Menu Trigger */}
          <div className="relative flex-shrink-0">
            <button
              onClick={() => setAllCategoriesOpen(!allCategoriesOpen)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                allCategoriesOpen
                  ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                  : "bg-gray-100 hover:bg-orange-50 text-gray-800 hover:text-orange-600"
              }`}
            >
              <span className="flex flex-col gap-0.5 justify-center">
                <span className={`block h-0.5 w-3.5 rounded-full transition-all ${allCategoriesOpen ? 'bg-white rotate-45 translate-y-1' : 'bg-current'}`}></span>
                <span className={`block h-0.5 w-3.5 rounded-full transition-all ${allCategoriesOpen ? 'opacity-0' : 'bg-current'}`}></span>
                <span className={`block h-0.5 w-3.5 rounded-full transition-all ${allCategoriesOpen ? 'bg-white -rotate-45 -translate-y-1' : 'bg-current'}`}></span>
              </span>
              <span className="hidden xs:inline tracking-tight">All Categories</span>
              <span className="xs:hidden">All</span>
            </button>
          </div>

          <div className="h-5 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

          {/* Left Arrow Button for Scroll */}
          <button
            onClick={() => handleScroll("left")}
            aria-label="Scroll left"
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-white/90 hover:bg-orange-50 text-gray-600 hover:text-orange-600 border border-gray-200 shadow-sm transition-all cursor-pointer flex-shrink-0 hover:scale-105 active:scale-95"
          >
            ‹
          </button>

          {/* Scrollable Category Items Container */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1 flex-1 mask-radial"
          >
            {categoriesData.map((cat) => (
              <div
                key={cat.id}
                className="relative group flex-shrink-0"
                onMouseEnter={() => setActiveDropdown(cat.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {/* Category Button Link */}
                <Link
                  to={cat.path}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeDropdown === cat.id
                      ? "bg-orange-50 text-orange-600 shadow-xs ring-1 ring-orange-200"
                      : "text-gray-700 hover:text-orange-600 hover:bg-gray-50/80"
                  }`}
                >
                  <span className="text-base group-hover:scale-115 transition-transform duration-200 inline-block">
                    {cat.icon}
                  </span>
                  <span className="whitespace-nowrap">{cat.name}</span>

                  {cat.badge && (
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase tracking-wider ${cat.badgeColor}`}
                    >
                      {cat.badge}
                    </span>
                  )}
                  
                  {cat.subcategories && (
                    <svg
                      className={`w-3 h-3 text-gray-400 group-hover:text-orange-500 transition-transform duration-200 ${
                        activeDropdown === cat.id ? "rotate-180 text-orange-500" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* Animated Dropdown Mega-Menu */}
                {activeDropdown === cat.id && cat.subcategories && (
                  <div
                    className="absolute left-0 top-full pt-2 w-72 sm:w-80 animate-dropdown z-50 pointer-events-auto"
                    onMouseEnter={() => setActiveDropdown(cat.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-4 ring-1 ring-black/5 overflow-hidden">
                      
                      {/* Featured Promo Box */}
                      {cat.featured && (
                        <div
                          onClick={() => navigate(cat.path)}
                          className="relative rounded-xl overflow-hidden mb-3.5 group/feat cursor-pointer border border-orange-100 bg-orange-50/40 p-2.5 flex items-center gap-3 hover:bg-orange-50 transition-colors"
                        >
                          <img
                            src={cat.featured.image}
                            alt={cat.featured.title}
                            className="w-14 h-14 rounded-lg object-cover group-hover/feat:scale-105 transition-transform duration-300 shadow-sm flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <span className="text-[10px] font-extrabold uppercase text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full inline-block mb-0.5">
                              Featured
                            </span>
                            <h4 className="text-xs font-bold text-gray-900 truncate">
                              {cat.featured.title}
                            </h4>
                            <p className="text-[11px] text-gray-500 truncate">
                              {cat.featured.desc}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Subcategories Header */}
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-1.5 flex justify-between items-center">
                        <span>Categories</span>
                        <span className="text-orange-500 hover:underline cursor-pointer text-[10px]" onClick={() => navigate(cat.path)}>
                          View All →
                        </span>
                      </div>

                      {/* Subcategories Links */}
                      <div className="flex flex-col gap-0.5">
                        {cat.subcategories.map((sub, idx) => (
                          <Link
                            key={idx}
                            to={sub.path}
                            className="flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-semibold text-gray-700 hover:text-orange-600 hover:bg-orange-50/60 transition-all duration-150 group/sub"
                          >
                            <span>{sub.name}</span>
                            <span className="text-gray-300 group-hover/sub:text-orange-500 group-hover/sub:translate-x-1 transition-all">
                              ›
                            </span>
                          </Link>
                        ))}
                      </div>

                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Arrow Button for Scroll */}
          <button
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-white/90 hover:bg-orange-50 text-gray-600 hover:text-orange-600 border border-gray-200 shadow-sm transition-all cursor-pointer flex-shrink-0 hover:scale-105 active:scale-95"
          >
            ›
          </button>

          {/* Direct link to all categories page */}
          <div className="flex-shrink-0 pl-1">
            <Link
              to="/categories"
              className="text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-1 py-1.5 px-2 rounded-lg hover:bg-orange-50/50 transition-colors"
            >
              <span className="hidden sm:inline">Explore All</span>
              <span>→</span>
            </Link>
          </div>

        </div>
      </div>

      {/* "All Categories" Mega Drawer Modal with Animated Overlay */}
      {allCategoriesOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 transition-opacity"
            onClick={() => setAllCategoriesOpen(false)}
          />
          <div className="absolute left-0 right-0 top-full bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-2xl z-50 animate-dropdown max-h-[75vh] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-lg font-black text-gray-900">All Store Categories</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Explore our complete collection across all departments</p>
                </div>
                <button
                  onClick={() => setAllCategoriesOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Grid of all departments */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {categoriesData.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-orange-200 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-2 bg-white rounded-xl shadow-xs group-hover:scale-110 transition-transform">
                          {cat.icon}
                        </span>
                        <div>
                          <h4 className="font-bold text-sm text-gray-900 group-hover:text-orange-600 transition-colors">
                            {cat.name}
                          </h4>
                          {cat.badge && (
                            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${cat.badgeColor}`}>
                              {cat.badge}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {cat.subcategories && (
                      <ul className="space-y-1.5 pl-1">
                        {cat.subcategories.slice(0, 4).map((sub, i) => (
                          <li key={i}>
                            <Link
                              to={sub.path}
                              onClick={() => setAllCategoriesOpen(false)}
                              className="text-xs text-gray-600 hover:text-orange-600 hover:translate-x-1 transition-all inline-block"
                            >
                              • {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      to={cat.path}
                      onClick={() => setAllCategoriesOpen(false)}
                      className="mt-3.5 inline-flex items-center gap-1 text-xs font-bold text-orange-600 hover:text-orange-700"
                    >
                      <span>Explore</span>
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  </div>
                ))}
              </div>

              {/* View Complete Categories Hub Banner */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent p-4 rounded-2xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Looking for special discounts and curated catalogs?</p>
                    <p className="text-xs text-gray-500">Visit our comprehensive Categories hub page with high-res galleries.</p>
                  </div>
                </div>
                <Link
                  to="/categories"
                  onClick={() => setAllCategoriesOpen(false)}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 whitespace-nowrap cursor-pointer"
                >
                  Go to Categories Page →
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
