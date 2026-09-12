import { useState, useEffect, useMemo } from "react";
import {
  useParams,
  Link,
  useSearchParams,
  useNavigate,
} from "react-router-dom";

const initialCatalog = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    category: "Men",
    price: 799,
    originalPrice: 1299,
    stock: 25,
    rating: 4.8,
    reviews: 142,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    description:
      "Breathable 100% organic cotton tee with modern tailored fit and ultra soft texture.",
  },
  {
    id: "2",
    name: "Casual Denim Jacket",
    category: "Men",
    price: 1499,
    originalPrice: 2199,
    stock: 18,
    rating: 4.9,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    description:
      "Classic rugged denim jacket featuring durable bronze buttons and comfort stretch.",
  },
  {
    id: "3",
    name: "Classic Sneakers",
    category: "Shoes",
    price: 1999,
    originalPrice: 2999,
    stock: 12,
    rating: 4.7,
    reviews: 210,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    description:
      "High-cushioning lightweight everyday lifestyle sneakers with anti-slip rubber sole.",
  },
  {
    id: "4",
    name: "Smart Watch Elite",
    category: "Electronics",
    price: 2499,
    originalPrice: 3999,
    stock: 30,
    rating: 4.9,
    reviews: 320,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    description:
      "Full touch HD display with heart rate tracker, Bluetooth calling and 7-day battery life.",
  },
  {
    id: "5",
    name: "Designer Floral Summer Dress",
    category: "Women",
    price: 1299,
    originalPrice: 1999,
    stock: 15,
    rating: 4.6,
    reviews: 75,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    description:
      "Elegant floral print midi dress tailored for summer parties and casual outdoor outings.",
  },
  {
    id: "6",
    name: "Wireless Noise Cancelling Headphones",
    category: "Electronics",
    price: 3499,
    originalPrice: 4999,
    stock: 20,
    rating: 4.8,
    reviews: 190,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    description:
      "Over-ear active noise cancelling headphones with deep bass and 40h playtime.",
  },
  {
    id: "7",
    name: "Luxury Chronograph Watch",
    category: "Watches",
    price: 2899,
    originalPrice: 4499,
    stock: 8,
    rating: 4.9,
    reviews: 64,
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
    description:
      "Stainless steel water-resistant chronograph watch with sapphire crystal dial.",
  },
  {
    id: "8",
    name: "Vitamin C Radiance Glow Serum",
    category: "Beauty",
    price: 699,
    originalPrice: 1199,
    stock: 45,
    rating: 4.7,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
    description:
      "Pure Vitamin C face serum for dark spots reduction and glowing skin tone.",
  },
];

export default function ProductPage({ addToCart }) {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search parameters from URL
  const searchQuery = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "all";
  const minPriceParam = searchParams.get("minPrice") || "";
  const maxPriceParam = searchParams.get("maxPrice") || "";
  const sortParam = searchParams.get("sort") || "default";

  // State for single product view
  const [product, setProduct] = useState(null);
  const [selectedImg, setSelectedImg] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("M");

  // State for product list view
  const [productsList, setProductsList] = useState(initialCatalog);
  const [loading, setLoading] = useState(false);

  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
  const [minPrice, setMinPrice] = useState(minPriceParam);
  const [maxPrice, setMaxPrice] = useState(maxPriceParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Sync state when URL params change
  useEffect(() => {
    setSelectedCategory(categoryFilter);
    setMinPrice(minPriceParam);
    setMaxPrice(maxPriceParam);
    setSortBy(sortParam);
  }, [categoryFilter, minPriceParam, maxPriceParam, sortParam]);

  // Fetch single product or list from backend
  useEffect(() => {
    if (id) {
      const fetchSingleProduct = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/products/${id}`);
          const data = await res.json();
          if (data.success && data.product) {
            setProduct(data.product);
            setSelectedImg(data.product.image);
            return;
          }
        } catch (err) {
          console.log("Backend offline, using fallback:", err);
        }
        // Fallback from catalog
        const found = initialCatalog.find((p) => p.id === id);
        if (found) {
          setProduct(found);
          setSelectedImg(found.image);
        } else {
          setProduct(initialCatalog[0]);
          setSelectedImg(initialCatalog[0].image);
        }
      };
      fetchSingleProduct();
    } else {
      // Fetch all products with filter query
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const query = searchParams.toString();
          const res = await fetch(
            `http://localhost:5000/api/products?${query}`,
          );
          const data = await res.json();
          if (data.success && data.products && data.products.length > 0) {
            setProductsList(data.products);
          } else {
            setProductsList(initialCatalog);
          }
        } catch (err) {
          console.log("Using initial catalog:", err);
          setProductsList(initialCatalog);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [id, searchParams]);

  // Filtered and sorted products for list view
  const filteredProducts = useMemo(() => {
    let list = [...productsList];

    // Filter by search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q)),
      );
    }

    // Filter by Category
    if (selectedCategory && selectedCategory !== "all") {
      list = list.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    // Filter by Price
    if (minPrice) {
      list = list.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
      list = list.filter((p) => p.price <= Number(maxPrice));
    }

    // Sort
    if (sortBy === "price_asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name_asc") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [productsList, searchQuery, selectedCategory, minPrice, maxPrice, sortBy]);

  // Apply filters to URL
  const applyFilters = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategory && selectedCategory !== "all")
      params.set("category", selectedCategory);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (sortBy && sortBy !== "default") params.set("sort", sortBy);
    setSearchParams(params);
  };

  const resetAllFilters = () => {
    setSelectedCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
    setSearchParams({});
  };

  // -------------------------------------------------------------
  // 1. SINGLE PRODUCT DETAIL VIEW (when :id is present)
  // -------------------------------------------------------------
  if (id) {
    if (!product) {
      return (
        <div className="min-h-screen flex items-center justify-center text-gray-500 font-semibold">
          Loading product details...
        </div>
      );
    }

    const currentProduct = {
      ...product,
      image: selectedImg || product.image,
      quantity,
      size,
    };

    return (
      <div className="min-h-screen bg-[#f0f4f9] py-8 sm:py-12 px-4 selection:bg-orange-500 selection:text-white">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-orange-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/productpage"
              className="hover:text-orange-600 transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-900 truncate">
              {product.name}
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-blue-100/70 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left - Images */}
            <div>
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-blue-50/40 shadow-xs">
                <img
                  src={selectedImg || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  {product.category || "Featured"}
                </span>
              </div>

              <div className="flex gap-3 mt-4">
                {[product.image].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    onClick={() => setSelectedImg(img)}
                    className="w-20 h-20 object-cover rounded-xl cursor-pointer border-2 border-orange-500 shadow-xs"
                  />
                ))}
              </div>
            </div>

            {/* Right - Details */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-bold">★★★★★</span>
                  <span className="text-xs font-semibold text-gray-500">
                    ({product.rating || "4.8"} / 5 from {product.reviews || 95}{" "}
                    reviews)
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 leading-tight">
                  {product.name}
                </h1>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description ||
                    "Premium quality merchandise built for durability and unmatched comfort."}
                </p>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl sm:text-4xl font-black text-gray-900">
                    ₹{product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="line-through text-gray-400 text-lg">
                        ₹{product.originalPrice}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100,
                        )}
                        % OFF
                      </span>
                    </>
                  )}
                </div>

                <div className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  <span>
                    In Stock ({product.stock || 50} units ready for immediate
                    shipping)
                  </span>
                </div>

                {/* Size Selector */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Select Size
                  </label>
                  <div className="flex gap-2">
                    {["S", "M", "L", "XL"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setSize(s)}
                        className={`w-11 h-11 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                          size === s
                            ? "bg-gray-900 text-white shadow-md scale-105"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-black text-lg transition-colors cursor-pointer flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="font-bold text-base w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-black text-lg transition-colors cursor-pointer flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => addToCart(currentProduct)}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 active:scale-95 text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-lg shadow-orange-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>🛒</span>
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => {
                    addToCart(currentProduct);
                    navigate("/cart");
                  }}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 active:scale-95 text-white py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>⚡</span>
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. PRODUCTS CATALOG & SEARCH RESULTS VIEW (when no :id)
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#f0f4f9] flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Search Header Banner */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-blue-100/70 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1">
              <Link to="/" className="hover:text-orange-600">
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-bold">Products Catalog</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
              {searchQuery
                ? `Search Results for "${searchQuery}"`
                : "Explore All Products"}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-gray-600 bg-blue-50/80 border border-blue-100 px-3.5 py-1.5 rounded-full">
              {filteredProducts.length} Products Found
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Layout with Sidebar & Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Filter Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-blue-100/70 space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
                  <span>⚙️</span> Filters
                </h3>
                <button
                  onClick={resetAllFilters}
                  className="text-xs font-semibold text-red-500 hover:text-red-700 underline cursor-pointer"
                >
                  Reset All
                </button>
              </div>

              {/* Department / Category Filter */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  <option value="Men">Men&apos;s Fashion</option>
                  <option value="Women">Women&apos;s Fashion</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Shoes">Footwear</option>
                  <option value="Watches">Watches</option>
                  <option value="Beauty">Beauty & Care</option>
                  <option value="Home">Home & Living</option>
                  <option value="Sports">Sports</option>
                </select>
              </div>

              {/* Price Filter */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
                  Price Range (₹)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-orange-500"
                  />
                  <span className="text-gray-400 text-xs font-bold">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* In Stock Toggle */}
              <div className="pt-2 border-t border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 text-orange-500 rounded border-gray-300 focus:ring-orange-400 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-gray-700">
                    In Stock Only
                  </span>
                </label>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2.5">
                  Sort Order
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 cursor-pointer"
                >
                  <option value="default">⭐ Recommended</option>
                  <option value="price_asc">💰 Price: Low to High</option>
                  <option value="price_desc">💎 Price: High to Low</option>
                  <option value="name_asc">🔤 Name: A to Z</option>
                </select>
              </div>

              {/* Apply Button */}
              <button
                onClick={applyFilters}
                className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>

          {/* Right Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="py-20 text-center text-gray-500 font-medium">
                Loading products...
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <div
                    key={p.id}
                    className="group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-blue-100/70 flex flex-col justify-between"
                  >
                    <div>
                      {/* Product Image Link */}
                      <Link
                        to={`/productpage/${p.id}`}
                        className="block relative aspect-square w-full overflow-hidden bg-blue-50/40"
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                          {p.category || "Hot"}
                        </span>
                      </Link>

                      {/* Info */}
                      <div className="p-5 pb-2">
                        <div className="text-yellow-400 text-xs font-bold mb-1">
                          ★★★★★{" "}
                          <span className="text-gray-400 font-normal">
                            ({p.rating || "4.8"})
                          </span>
                        </div>
                        <Link to={`/productpage/${p.id}`}>
                          <h3 className="font-bold text-gray-900 text-base group-hover:text-orange-500 transition-colors line-clamp-1">
                            {p.name}
                          </h3>
                        </Link>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {p.description ||
                            "Premium build and designed for peak durability."}
                        </p>
                      </div>
                    </div>

                    {/* Price and Cart */}
                    <div className="p-5 pt-2">
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="font-black text-xl text-gray-900">
                          ₹{p.price}
                        </span>
                        {p.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{p.originalPrice}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(p)}
                        className="w-full bg-gray-900 hover:bg-orange-500 active:scale-95 text-white py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>🛒</span>
                        <span>Add to Cart</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-3xl p-12 text-center border border-blue-100/70 shadow-xs">
                <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto text-2xl mb-4">
                  🔍
                </div>
                <h3 className="text-lg font-bold text-gray-900">
                  No products match your filters
                </h3>
                <p className="text-gray-500 text-xs mt-1 max-w-sm mx-auto">
                  Try adjusting the price range, choosing a different category,
                  or resetting all filters.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="mt-5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6 mt-auto border-t border-gray-800 text-xs">
        <p>© 2026 Choudhary Mart. All rights reserved.</p>
      </footer>
    </div>
  );
}
