import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Men's Fashion",
    department: "fashion",
    tag: "Trending",
    products: "120+ Products",
    count: 120,
    isPopular: true,
    description: "Shirts, T-Shirts, Denim Jeans, Jackets & Ethnic wear for men",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Women's Fashion",
    department: "fashion",
    tag: "Popular",
    products: "150+ Products",
    count: 150,
    isPopular: true,
    description: "Dresses, Tops, Sarees, Western wear, Lehengas & Handbags",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Electronics & Gadgets",
    department: "electronics",
    tag: "Hot Deals",
    products: "200+ Products",
    count: 200,
    isPopular: true,
    description: "Smartphones, Laptops, Headphones, Smart Watches & Audio",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Shoes & Footwear",
    department: "footwear",
    tag: "New Arrivals",
    products: "90+ Products",
    count: 90,
    isPopular: false,
    description: "Casual Sneakers, Sports Running shoes, Formal shoes & Boots",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Watches & Accessories",
    department: "electronics",
    tag: "Luxury",
    products: "70+ Products",
    count: 70,
    isPopular: false,
    description: "Analog, Digital & Chronograph watches, Sunglasses & Jewelry",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Beauty & Personal Care",
    department: "lifestyle",
    tag: "Bestseller",
    products: "100+ Products",
    count: 100,
    isPopular: true,
    description: "Skincare, Makeup, Perfumes, Deodorants & Grooming essentials",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Home & Living",
    department: "lifestyle",
    tag: "Featured",
    products: "180+ Products",
    count: 180,
    isPopular: false,
    description: "Home Decor, Kitchenware, Bedsheets, Lamps & Cozy furniture",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Sports & Fitness",
    department: "sports",
    tag: "Activewear",
    products: "80+ Products",
    count: 80,
    isPopular: false,
    description: "Gym gear, Cricket, Football, Yoga mats, Dumbbells & Shakers",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
  },
];

const filterOptions = [
  { id: "all", label: "All Categories", icon: "✨" },
  { id: "fashion", label: "Fashion & Apparel", icon: "👗" },
  { id: "electronics", label: "Electronics & Gadgets", icon: "💻" },
  { id: "footwear", label: "Footwear", icon: "👟" },
  { id: "lifestyle", label: "Beauty & Home", icon: "🏠" },
  { id: "sports", label: "Sports & Fitness", icon: "⚽" },
  { id: "popular", label: "🔥 Trending Only", icon: "🔥" },
];

function Categories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  // Filter and search logic
  const filteredCategories = useMemo(() => {
    let result = categories.filter((cat) => {
      const matchesSearch =
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.tag.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedFilter === "all") return true;
      if (selectedFilter === "popular") return cat.isPopular;
      return cat.department === selectedFilter;
    });

    // Sorting
    if (sortBy === "products-desc") {
      result.sort((a, b) => b.count - a.count);
    } else if (sortBy === "products-asc") {
      result.sort((a, b) => a.count - b.count);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [searchQuery, selectedFilter, sortBy]);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedFilter("all");
    setSortBy("recommended");
  };

  return (
    <div className="min-h-screen bg-[#f0f4f9] flex flex-col selection:bg-orange-500 selection:text-white">
      
      {/* Header Navigation Bar */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-blue-100/70 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-sm transition cursor-pointer group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 bg-blue-50/80 px-3 py-1.5 rounded-full border border-blue-100">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{categories.length} Total Departments</span>
          </div>
        </div>
      </div>

      {/* Hero / Page Title Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 text-center">
        <span className="inline-block bg-orange-100/80 text-orange-600 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-2 border border-orange-200/60 shadow-xs">
          Explore Our Store
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
          Shop by Category
        </h1>

        <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-sm sm:text-base">
          Discover high-quality products across fashion, electronics, lifestyle and sports collections.
        </p>
      </section>

      {/* Modern Search & Filter Toolbar Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm border border-blue-100/70 space-y-4">
          
          {/* Top Bar: Search Input & Sort Dropdown */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            
            {/* Search Bar with Search Icon & Clear Button */}
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories (e.g. Men, Shoes, Electronics, Beauty)..."
                className="w-full pl-11 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 focus:bg-white transition-all shadow-xs"
              />

              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <span className="w-5 h-5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-xs font-bold">
                    ✕
                  </span>
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end md:self-auto">
              <span className="text-xs font-semibold text-gray-500 whitespace-nowrap hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl pl-3 pr-8 py-3 text-xs font-semibold text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-colors"
                >
                  <option value="recommended">⭐ Recommended</option>
                  <option value="popular">🔥 Most Popular</option>
                  <option value="items-high">📦 Most Products</option>
                  <option value="name-asc">🔤 Alphabetical (A-Z)</option>
                  <option value="name-desc">🔤 Alphabetical (Z-A)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-500">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Filter Chips / Categories Pills */}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap mr-1 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter:
              </span>

              {filterOptions.map((filter) => {
                const isActive = selectedFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedFilter(filter.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-orange-500 text-white shadow-sm shadow-orange-500/30 scale-102 ring-2 ring-orange-400/40"
                        : "bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-orange-600 border border-transparent hover:border-orange-200"
                    }`}
                  >
                    <span>{filter.icon}</span>
                    <span>{filter.label}</span>
                  </button>
                );
              })}

              {(searchQuery || selectedFilter !== "all" || sortBy !== "recommended") && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-red-500 hover:text-red-700 underline px-2 py-1 cursor-pointer whitespace-nowrap transition-colors"
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between text-xs font-medium text-gray-500 pt-1">
            <span>
              Showing <strong className="text-gray-900 font-bold">{filteredCategories.length}</strong> of {categories.length} categories
            </span>
            {searchQuery && (
              <span className="text-orange-600 font-medium">
                Searching for: &ldquo;{searchQuery}&rdquo;
              </span>
            )}
          </div>

        </div>
      </section>

      {/* Categories Grid or Empty State */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex-1 w-full">
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCategories.map((category) => (
              <Link
                to="/productpage"
                key={category.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-blue-100/70 hover:border-blue-300 flex flex-col cursor-pointer hover:-translate-y-1"
              >
                {/* Image Container with Tag Badge */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-blue-50/40">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-85 transition-opacity" />

                  {/* Top Tag */}
                  {category.tag && (
                    <span className="absolute top-3 left-3 text-[10px] font-extrabold uppercase tracking-wider text-white bg-orange-500/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-sm">
                      {category.tag}
                    </span>
                  )}

                  {/* Products Count Badge */}
                  <span className="absolute bottom-3 left-3 text-xs font-bold text-white bg-black/50 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                    {category.products}
                  </span>
                </div>

                {/* Card Details */}
                <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                      {category.name}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-50 flex items-center justify-between text-orange-500 font-bold text-xs">
                    <span>Explore Products</span>
                    <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State when no results match search or filter */
          <div className="bg-white rounded-3xl p-12 text-center border border-blue-100/70 shadow-xs max-w-lg mx-auto my-8">
            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto text-2xl mb-4 shadow-inner">
              🔍
            </div>
            <h3 className="text-xl font-bold text-gray-900">No categories found</h3>
            <p className="text-gray-500 text-sm mt-1.5 max-w-sm mx-auto">
              We couldn&apos;t find any categories matching &ldquo;{searchQuery}&rdquo;. Try another keyword or reset filters.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </section>

      {/* Bottom Promo Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden border border-blue-900/40">
          <span className="text-orange-400 font-bold text-xs uppercase tracking-wider bg-orange-500/20 px-3.5 py-1.5 rounded-full border border-orange-500/30">
            Special Deals
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mt-4">
            Find Your Favorite Products Today
          </h2>

          <p className="text-gray-300 mt-3 max-w-xl mx-auto text-sm sm:text-base">
            Explore curated categories and enjoy exclusive discounts on trending collections.
          </p>

          <Link
            to="/productpage"
            className="inline-block mt-7 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-all duration-200 cursor-pointer"
          >
            Start Shopping Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-auto border-t border-gray-800 text-xs">
        <p>© 2026 Choudhary Mart. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Categories;