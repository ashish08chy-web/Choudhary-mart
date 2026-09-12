import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import logoImg from "./logo12.jpg";
import CategoryNav from "./CategoryNav";
import NavbarSearch from "./NavbarSearch";

function Navbar({ cartCount = 0 }) {
    const navigate = useNavigate();
    const location = useLocation();

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
                        <Link to="/" className="flex items-center gap-2.5 group cursor-pointer select-none flex-shrink-0">
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

                        {/* Right Actions: Links, Cart & Login */}
                        <div className="flex items-center gap-2 sm:gap-4">
                            
                            {/* Desktop Quick Nav Links */}
                            <div className="hidden lg:flex gap-6 items-center font-medium text-sm text-gray-700">
                                <Link
                                    to="/"
                                    className={`hover:text-orange-500 transition-colors ${
                                        location.pathname === "/" ? "text-orange-500 font-semibold" : ""
                                    }`}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/productpage"
                                    className={`hover:text-orange-500 transition-colors ${
                                        location.pathname === "/productpage" ? "text-orange-500 font-semibold" : ""
                                    }`}
                                >
                                    Products
                                </Link>
                                <Link
                                    to="/categories"
                                    className={`hover:text-orange-500 transition-colors ${
                                        location.pathname === "/categories" ? "text-orange-500 font-semibold" : ""
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

                            {/* Login Button */}
                            <button
                                onClick={() => navigate("/login")}
                                className="bg-gray-900 hover:bg-gray-800 text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 cursor-pointer active:scale-95 shadow-xs hover:shadow-md"
                            >
                                Login
                            </button>
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