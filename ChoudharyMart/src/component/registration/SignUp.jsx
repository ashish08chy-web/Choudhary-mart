import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../logo12.jpg";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // clear error on typing
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed. Please try again.");
        return;
      }

      // Save token & user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/login");
    } catch (err) {
      setError("Network error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] bg-gradient-to-br from-blue-50/60 via-[#f0f4f9] to-indigo-50/40 flex items-center justify-center px-4 py-12 selection:bg-orange-500 selection:text-white">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl shadow-blue-500/5 border border-blue-100/80 p-8 sm:p-10">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-3">
            <img
              src={logoImg}
              alt="Logo"
              className="w-12 h-12 object-cover rounded-full shadow-md ring-2 ring-orange-500/20 mx-auto"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/logo12.jpg";
              }}
            />
          </Link>

          <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
            Create an Account
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Join Choudhary Mart for exclusive deals
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-5 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">

          {/* Name */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Min 6 characters"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm transition"
            />
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              required
              className="accent-orange-500 rounded cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-gray-600 cursor-pointer">
              I agree to the <span className="text-orange-600 font-semibold">Terms &amp; Conditions</span>
            </label>
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

        </form>

        {/* Login */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-600 font-bold hover:underline"
          >
            Login
          </Link>
        </p>

        {/* Home */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-gray-400 text-xs font-semibold hover:text-gray-600 transition"
          >
            ← Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Signup;