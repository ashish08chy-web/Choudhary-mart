import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Initial sample catalog for live suggestions if backend is loading/offline
const sampleSuggestions = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    category: "Men",
    price: 799,
    oldPrice: 1299,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Casual Denim Jacket",
    category: "Men",
    price: 1499,
    oldPrice: 2199,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Classic Sneakers",
    category: "Shoes",
    price: 1999,
    oldPrice: 2999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Smart Watch Elite",
    category: "Electronics",
    price: 2499,
    oldPrice: 3999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 5,
    name: "Designer Floral Summer Dress",
    category: "Women",
    price: 1299,
    oldPrice: 1999,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 6,
    name: "Wireless Noise Cancelling Headphones",
    category: "Electronics",
    price: 3499,
    oldPrice: 4999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
  },
];

const trendingTags = ["Cotton T-Shirt", "Smart Watch", "Denim Jacket", "Sneakers", "Headphones"];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "Men", label: "Men's Fashion" },
  { value: "Women", label: "Women's Fashion" },
  { value: "Electronics", label: "Electronics" },
  { value: "Shoes", label: "Footwear" },
  { value: "Watches", label: "Watches" },
  { value: "Beauty", label: "Beauty & Care" },
  { value: "Home", label: "Home & Living" },
  { value: "Sports", label: "Sports" },
];

const priceRanges = [
  { label: "Any Price", min: "", max: "" },
  { label: "Under ₹500", min: "0", max: "500" },
  { label: "₹500 - ₹1,499", min: "500", max: "1499" },
  { label: "₹1,500 - ₹2,999", min: "1500", max: "2999" },
  { label: "₹3,000+", min: "3000", max: "" },
];

export default function NavbarSearch() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [matchedProducts, setMatchedProducts] = useState([]);

  const searchContainerRef = useRef(null);
  const filterDropdownRef = useRef(null);

  // Sync state from URL query if user arrives with search params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("search");
    const cat = params.get("category");
    const min = params.get("minPrice");
    const max = params.get("maxPrice");
    const sort = params.get("sort");

    if (q) setSearchTerm(q);
    if (cat) setSelectedCategory(cat);
    if (min) setMinPrice(min);
    if (max) setMaxPrice(max);
    if (sort) setSortBy(sort);
  }, [location.search]);

  // Click outside listener to close popups
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSuggestionsOpen(false);
      }
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter live suggestions
  useEffect(() => {
    if (!searchTerm.trim()) {
      setMatchedProducts([]);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = sampleSuggestions.filter((item) => {
      const matchName = item.name.toLowerCase().includes(term);
      const matchCat = selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchName && matchCat;
    });

    setMatchedProducts(filtered);
  }, [searchTerm, selectedCategory]);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    setIsSuggestionsOpen(false);
    setIsFilterOpen(false);

    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("search", searchTerm.trim());
    if (selectedCategory && selectedCategory !== "all") params.set("category", selectedCategory);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sortBy && sortBy !== "default") params.set("sort", sortBy);

    navigate(`/productpage?${params.toString()}`);
  };

  const handleSelectProduct = (product) => {
    setIsSuggestionsOpen(false);
    navigate(`/productpage/${product.id}`);
  };

  const handlePricePreset = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
    setSelectedCategory("all");
  };

  // Count active filters for badge indicator
  const activeFiltersCount =
    (minPrice || maxPrice ? 1 : 0) +
    (selectedCategory !== "all" ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0);

  return (
    <div className="relative flex-1 max-w-2xl mx-2 lg:mx-4" ref={searchContainerRef}>
      <form onSubmit={handleSearchSubmit} className="flex items-center w-full">
        <div className="relative flex items-center w-full bg-blue-50 hover:bg-white border border-gray-200 focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 focus-within:bg-white rounded-2xl shadow-xs transition-all duration-200">
          
          {/* Category Dropdown */}
          <div className="relative flex-shrink-0 border-r border-gray-200 hidden sm:block">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-transparent hover:bg-gray-100 text-gray-700 font-semibold text-sm py-3 pl-3 pr-8 rounded-l-2xl focus:outline-none cursor-pointer transition-colors min-w-[110px] max-w-[140px]"
            >
              {categories.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center pr-1 text-gray-400">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Icon */}
          <div className="pl-2.5 text-gray-400 pointer-events-none flex items-center">
            <svg className="w-3 h-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Search Input Field */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsSuggestionsOpen(true);
            }}
            onFocus={() => setIsSuggestionsOpen(true)}
            placeholder="Search products, brands, categories..."
            className="w-full py-3 px-3 bg-transparent text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none"
          />

          {/* Clear Button */}
          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setMatchedProducts([]);
              }}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full cursor-pointer transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}

          {/* Filter Popover Toggle Button */}
          <div className="relative flex-shrink-0" ref={filterDropdownRef}>
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-1 px-2.5 py-1.5 mr-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeFiltersCount > 0 || isFilterOpen
                  ? "bg-orange-100 text-orange-600 ring-1 ring-orange-300"
                  : "text-gray-500 hover:text-orange-600 hover:bg-gray-100"
              }`}
              title="Price & Search Filters"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              <span className="hidden md:inline">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Price & Search Filters Dropdown Modal */}
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-dropdown ring-1 ring-black/5">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h4 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
                    <span>⚡</span> Filter Options
                  </h4>
                  {activeFiltersCount > 0 && (
                    <button
                      type="button"
                      onClick={clearFilters}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 underline cursor-pointer"
                    >
                      Reset All
                    </button>
                  )}
                </div>

                {/* Price Filter Section */}
                <div className="py-3 border-b border-gray-100">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Price Range (₹)
                  </label>

                  {/* Preset Price Pills */}
                  <div className="grid grid-cols-2 gap-1.5 mb-3">
                    {priceRanges.map((range, idx) => {
                      const isSelected = minPrice === range.min && maxPrice === range.max;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handlePricePreset(range.min, range.max)}
                          className={`text-xs py-1.5 px-2 rounded-lg font-medium transition-all text-center cursor-pointer ${
                            isSelected
                              ? "bg-orange-500 text-white shadow-xs"
                              : "bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-orange-600"
                          }`}
                        >
                          {range.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Min / Max Inputs */}
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <span className="text-[10px] text-gray-500 font-medium">Min ₹</span>
                      <input
                        type="number"
                        placeholder="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                    <span className="text-gray-400 mt-3">-</span>
                    <div className="flex-1">
                      <span className="text-[10px] text-gray-500 font-medium">Max ₹</span>
                      <input
                        type="number"
                        placeholder="5000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Sort Option */}
                <div className="py-3 border-b border-gray-100">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Sort Order
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-medium text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-500 cursor-pointer"
                  >
                    <option value="default">⭐ Best Match / Newest</option>
                    <option value="price_asc">💰 Price: Low to High</option>
                    <option value="price_desc">💎 Price: High to Low</option>
                    <option value="name_asc">🔤 Name: A to Z</option>
                  </select>
                </div>

                {/* Apply Button */}
                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={handleSearchSubmit}
                    className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs py-2.5 rounded-xl shadow-md transition-all cursor-pointer text-center"
                  >
                    Apply & Search
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            type="submit"
            aria-label="Search"
            className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white p-3 sm:px-5 sm:py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-sm hover:shadow cursor-pointer mr-1"
          >
            <span className="hidden sm:inline">Search</span>
            <span className="sm:hidden">🔍</span>
          </button>
        </div>
      </form>

      {/* Live Auto-complete & Suggestions Flyout */}
      {isSuggestionsOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-dropdown ring-1 ring-black/5">
          
          {/* Trending suggestions when search is empty or just opened */}
          {matchedProducts.length === 0 && !searchTerm.trim() && (
            <div className="p-4">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>🔥</span> Trending Searches
              </div>
              <div className="flex flex-wrap gap-1.5">
                {trendingTags.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearchTerm(tag);
                      setIsSuggestionsOpen(false);
                      navigate(`/productpage?search=${encodeURIComponent(tag)}`);
                    }}
                    className="text-xs bg-gray-100 hover:bg-orange-50 text-gray-700 hover:text-orange-600 px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span>🔍</span> {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matched live products */}
          {matchedProducts.length > 0 && (
            <div className="p-2">
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 py-1 flex items-center justify-between">
                <span>Matching Products ({matchedProducts.length})</span>
                <span className="text-orange-500">Press Enter for all</span>
              </div>
              <div className="divide-y divide-gray-50">
                {matchedProducts.slice(0, 4).map((prod) => (
                  <div
                    key={prod.id}
                    onClick={() => handleSelectProduct(prod)}
                    className="flex items-center gap-3 p-2 hover:bg-orange-50/60 rounded-xl cursor-pointer transition-colors group"
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-11 h-11 object-cover rounded-lg shadow-xs group-hover:scale-105 transition-transform"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                        {prod.name}
                      </h5>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-black text-gray-900">₹{prod.price}</span>
                        {prod.oldPrice && (
                          <span className="text-[10px] text-gray-400 line-through">₹{prod.oldPrice}</span>
                        )}
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.2 rounded font-semibold">
                          {prod.category}
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all text-xs font-bold">
                      →
                    </span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-gray-100 text-center">
                <button
                  type="button"
                  onClick={handleSearchSubmit}
                  className="text-xs font-bold text-orange-600 hover:text-orange-700 py-1 hover:underline cursor-pointer"
                >
                  View all results for &ldquo;{searchTerm}&rdquo; →
                </button>
              </div>
            </div>
          )}

          {/* No direct product match */}
          {matchedProducts.length === 0 && searchTerm.trim() && (
            <div className="p-4 text-center">
              <p className="text-xs text-gray-500">
                Search for &ldquo;<strong className="text-gray-800">{searchTerm}</strong>&rdquo; across all collections
              </p>
              <button
                type="button"
                onClick={handleSearchSubmit}
                className="mt-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                Show All Results
              </button>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
