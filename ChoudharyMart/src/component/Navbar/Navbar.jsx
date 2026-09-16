import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logoImg from "../logo12.jpg";
import CategoryNav from "../Pages/CategoryNav";
import NavbarSearch from "./NavbarSearch";

function Navbar({ cartCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();

  // ─── Current Logged-In User State ─────────────────────────────────────────
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const syncUser = () => {
      try {
        const savedUser = localStorage.getItem("user");
        setCurrentUser(savedUser ? JSON.parse(savedUser) : null);
      } catch {
        setCurrentUser(null);
      }
    };

    syncUser();

    window.addEventListener("authChange", syncUser);
    window.addEventListener("storage", syncUser);

    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("authChange", syncUser);
      window.removeEventListener("storage", syncUser);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    setIsUserMenuOpen(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  const initial = currentUser?.name
    ? currentUser.name.trim().charAt(0).toUpperCase()
    : currentUser?.email
      ? currentUser.email.trim().charAt(0).toUpperCase()
      : "U";

  // ─── Scroll-aware hide/show ───────────────────────────────────────────────
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (currentY < 60) {
        // Always show near top of page
        setVisible(true);
      } else if (delta > 6) {
        // Scrolling down → hide
        setVisible(false);
      } else if (delta < -6) {
        // Scrolling up → show
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <header
      className="sticky top-0 z-40 transition-transform duration-300 ease-in-out"
      style={{ transform: visible ? "translateY(0)" : "translateY(-110%)" }}
    >
      {/* Top Navbar */}
      <nav className="bg-white/95 backdrop-blur-md shadow-xs border-b border-blue-100/80">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3">
          {/* Main Navbar Row */}
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group cursor-pointer select-none flex-shrink-0"
            >
              <img
                src={logoImg}
                alt="Choudhary Mart Logo"
                className="w-10 h-10 sm:w-11 sm:h-11 object-cover rounded-full shadow-md ring-2 ring-orange-500/30 group-hover:scale-105 transition-transform duration-200"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/logo12.jpg";
                }}
              />
              <span className="text-lg sm:text-2xl font-extrabold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent tracking-tight whitespace-nowrap">
                Choudhary Mart
              </span>
            </Link>

            {/* Search Option with Category, Price & Sort Filters (Desktop) */}
            <div className="hidden md:flex flex-1 max-w-xl mx-2">
              <NavbarSearch />
            </div>

            {/* Right Actions: Links, Cart & Login/Profile */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Desktop Quick Nav Links */}
              <div className="hidden lg:flex gap-6 items-center font-medium text-sm text-gray-700">
                <Link
                  to="/"
                  className={`hover:text-orange-500 transition-colors ${
                    location.pathname === "/"
                      ? "text-orange-500 font-semibold"
                      : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/productpage"
                  className={`hover:text-orange-500 transition-colors ${
                    location.pathname === "/productpage"
                      ? "text-orange-500 font-semibold"
                      : ""
                  }`}
                >
                  Products
                </Link>
                <Link
                  to="/categories"
                  className={`hover:text-orange-500 transition-colors ${
                    location.pathname === "/categories"
                      ? "text-orange-500 font-semibold"
                      : ""
                  }`}
                >
                  Categories
                </Link>
              </div>

              {/* Cart Button */}
              <button
                onClick={() => navigate("/cart")}
                className="relative flex items-center gap-1.5 bg-orange-50 hover:bg-orange-100 text-orange-600 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-95 shadow-xs hover:shadow"
              >
                <span className="text-base sm:text-lg">🛒</span>
                <span className="hidden sm:inline">Cart</span>
                {cartCount > 0 && (
                  <span className="bg-orange-500 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full shadow">
                    {cartCount}
                  </span>
                )}
              </button>
              {/*Admin Panal*/}
              <Link
                to="/admin/login"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Admin
              </Link>

              {/* User Avatar with Capital Letter or Login Button */}
              {currentUser ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-orange-600 via-amber-500 to-orange-400 text-white font-black text-sm sm:text-base shadow-md shadow-orange-500/25 ring-2 ring-orange-400/40 hover:ring-orange-500 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer select-none"
                    title={currentUser.name || "User Profile"}
                    aria-label="User Account"
                  >
                    {initial}
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2.5 w-60 sm:w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-gray-400/15 border border-gray-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                      {/* User Info Header */}
                      <div className="flex items-center gap-3 p-2 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl mb-2 border border-orange-100/60">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black text-base flex items-center justify-center shadow-xs flex-shrink-0">
                          {initial}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-gray-900 text-sm truncate">
                            {currentUser.name || "User"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {currentUser.email || ""}
                          </p>
                        </div>
                      </div>

                      {/* Menu Links */}
                      <div className="space-y-1 text-sm font-medium text-gray-700">
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            navigate("/cart");
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition flex items-center gap-2.5 cursor-pointer"
                        >
                          <span>🛒</span>
                          <span>My Cart ({cartCount})</span>
                        </button>
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            navigate("/productpage");
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition flex items-center gap-2.5 cursor-pointer"
                        >
                          <span>🛍️</span>
                          <span>Explore Products</span>
                        </button>
                      </div>

                      <div className="my-2 border-t border-gray-100"></div>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 font-semibold text-sm transition flex items-center gap-2.5 cursor-pointer"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Login Button */
                <button
                  onClick={() => navigate("/login")}
                  className="bg-gray-900 hover:bg-gray-800 text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-95 shadow-xs hover:shadow-md"
                >
                  Login
                </button>
              )}
            </div>
          </div>

          {/* Mobile Search Row (visible on small screens below md) */}
          <div className="md:hidden mt-2 pt-1 border-t border-gray-100 flex items-center">
            <NavbarSearch />
          </div>
        </div>
      </nav>

      {/* Sub-Navbar Category Menu with Modern Animation */}
      <CategoryNav />
    </header>
  );
}

export default Navbar;
