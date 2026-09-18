import { Link } from "react-router-dom";
import DiwaliSlider from "../DiwaliSlider";

const products = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 799,
    oldPrice: 1299,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Casual Denim Jacket",
    price: 1499,
    oldPrice: 2199,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Classic Sneakers",
    price: 1999,
    oldPrice: 2999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 2499,
    oldPrice: 3999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
];

const categories = [
  {
    name: "Men",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Women",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Shoes",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
  },
];

function Home({ addToCart }) {
  return (
    <div className="min-h-screen bg-[#f0f4f9] flex flex-col selection:bg-orange-500 selection:text-white">
      <DiwaliSlider />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-100/50 via-sky-50/30 to-transparent py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div className="space-y-6 text-center md:text-left">
            <span className="inline-block bg-orange-100/80 border border-orange-200/60 text-orange-600 font-semibold px-4 py-1.5 rounded-full text-sm shadow-xs">
              ✨ Welcome to Choudhary Mart
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 leading-tight tracking-tight">
              Shop Smart.
              <br />
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                Live Better.
              </span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-lg mx-auto md:mx-0">
              Discover high quality products at affordable prices. Explore
              latest fashion, electronics, accessories and more.
            </p>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
              <Link
                to="/productpage"
                className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-orange-500/25 transition-all duration-200 cursor-pointer"
              >
                Shop Now →
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center justify-center bg-white hover:bg-blue-50/50 active:scale-95 text-gray-800 border border-blue-100 px-7 py-3.5 rounded-xl font-semibold shadow-xs hover:shadow transition-all duration-200 cursor-pointer"
              >
                Browse Categories
              </Link>
            </div>
          </div>

          <div className="relative group">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5">
              <img
                src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1200&q=80"
                alt="Online Shopping"
                className="w-full h-80 sm:h-[420px] md:h-[460px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 border border-blue-100/80">
              <span className="text-3xl">🔥</span>
              <div>
                <p className="text-xs text-gray-500 font-medium">Flash Sale</p>
                <p className="text-sm font-bold text-gray-900">Up to 50% Off</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
              Explore
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              Shop by Category
            </h2>
          </div>

          <Link
            to="/categories"
            className="text-orange-500 hover:text-orange-600 font-semibold text-sm sm:text-base flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
          {categories.map((category) => (
            <Link
              to="/categories"
              key={category.name}
              className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-blue-100/70 hover:border-blue-200 cursor-pointer flex flex-col"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-blue-50/40">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="text-center font-bold text-gray-800 text-base sm:text-lg py-4 group-hover:text-orange-500 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-orange-500 font-semibold text-sm uppercase tracking-wider">
              Our Collection
            </p>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              Popular Products
            </h2>
          </div>

          <Link
            to="/productpage"
            className="text-orange-500 hover:text-orange-600 font-semibold text-sm sm:text-base flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border border-blue-100/70 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative aspect-square w-full overflow-hidden bg-blue-50/40">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Sale
                </span>
              </div>

              {/* Details */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="text-yellow-400 text-sm tracking-tight font-bold">
                    ★★★★★{" "}
                    <span className="text-gray-400 text-xs font-normal">
                      (4.9)
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 text-lg mt-1 line-clamp-1">
                    {product.name}
                  </h3>

                  <div className="flex gap-2.5 items-baseline mt-2">
                    <span className="font-extrabold text-2xl text-gray-900">
                      ₹{product.price}
                    </span>

                    <span className="text-gray-400 line-through text-sm">
                      ₹{product.oldPrice}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-5 bg-gray-900 hover:bg-orange-500 active:scale-95 text-white py-3 rounded-xl font-semibold shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>🛒</span>
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offer Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 text-white rounded-3xl px-6 sm:px-12 py-12 md:py-16 text-center shadow-xl relative overflow-hidden border border-blue-900/40">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block bg-orange-500/20 text-orange-400 border border-orange-500/30 font-semibold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-4">
              ⚡ Limited Time Offer
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mt-2 leading-tight">
              Get up to <span className="text-orange-400">50% OFF</span>
            </h2>

            <p className="text-gray-300 mt-4 text-base sm:text-lg">
              Grab your favorite products today before the offer ends!
            </p>

            <Link
              to="/productpage"
              className="inline-block mt-8 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-9 py-4 rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-all duration-200 cursor-pointer"
            >
              Shop Deals Now
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-b from-white to-blue-50/50 py-16 border-t border-blue-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-gray-900 mb-12">
            Why Choose Choudhary Mart?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white border border-blue-100/70 hover:bg-blue-50/80 hover:border-blue-200 shadow-xs hover:shadow transition-all">
              <div className="text-5xl">🚚</div>

              <h3 className="font-bold text-xl text-gray-900 mt-4">
                Fast Delivery
              </h3>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                Get your orders delivered safely and quickly right to your
                doorstep.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white border border-blue-100/70 hover:bg-blue-50/80 hover:border-blue-200 shadow-xs hover:shadow transition-all">
              <div className="text-5xl">💳</div>

              <h3 className="font-bold text-xl text-gray-900 mt-4">
                Secure Payment
              </h3>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                100% secure payment gateways for a hassle-free shopping
                experience.
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-white border border-blue-100/70 hover:bg-blue-50/80 hover:border-blue-200 shadow-xs hover:shadow transition-all">
              <div className="text-5xl">↩️</div>

              <h3 className="font-bold text-xl text-gray-900 mt-4">
                Easy Returns
              </h3>

              <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                Hassle-free return and instant refund policy for all eligible
                products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-2xl font-black text-orange-500">
              Choudhary Mart
            </h2>

            <p className="text-gray-400 mt-4 text-sm leading-relaxed">
              Your one-stop destination for quality lifestyle products at prices
              you love.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4 text-white">Quick Links</h3>

            <div className="space-y-2.5 text-sm text-gray-400">
              <p>
                <Link
                  to="/"
                  className="hover:text-orange-400 transition-colors"
                >
                  Home
                </Link>
              </p>
              <p>
                <Link
                  to="/productpage"
                  className="hover:text-orange-400 transition-colors"
                >
                  Shop Products
                </Link>
              </p>
              <p>
                <Link
                  to="/categories"
                  className="hover:text-orange-400 transition-colors"
                >
                  Categories
                </Link>
              </p>
              <p>
                <Link
                  to="/cart"
                  className="hover:text-orange-400 transition-colors"
                >
                  Shopping Cart
                </Link>
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4 text-white">
              Customer Service
            </h3>

            <div className="space-y-2.5 text-sm text-gray-400">
              <p className="hover:text-orange-400 transition-colors cursor-pointer">
                Contact Us
              </p>
              <p className="hover:text-orange-400 transition-colors cursor-pointer">
                Shipping Policy
              </p>
              <p className="hover:text-orange-400 transition-colors cursor-pointer">
                Return &amp; Refund
              </p>
              <p className="hover:text-orange-400 transition-colors cursor-pointer">
                FAQs
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4 text-white">
              Stay Connected
            </h3>

            <div className="flex gap-3 text-2xl">
              <span className="cursor-pointer hover:scale-110 transition-transform">
                📘
              </span>
              <span className="cursor-pointer hover:scale-110 transition-transform">
                📸
              </span>
              <span className="cursor-pointer hover:scale-110 transition-transform">
                🐦
              </span>
              <span className="cursor-pointer hover:scale-110 transition-transform">
                ▶️
              </span>
            </div>

            <div className="mt-5">
              <p className="text-xs text-gray-400 mb-2">
                Subscribe for updates:
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="bg-gray-800 text-sm px-3 py-2 rounded-lg border border-gray-700 outline-none focus:border-orange-500 w-full"
                />
                <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 text-center py-6 text-xs text-gray-500">
          © 2026 Choudhary Mart. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Home;
