import { Link, useNavigate } from "react-router-dom";
import logoImg from "../logo12.jpg";

function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Password reset link sent to your email!");
    navigate("/login");
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
            Forgot Password?
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Enter your email and we'll send you a password reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="name@example.com"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 text-sm transition"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all duration-200 cursor-pointer"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-orange-600 font-bold text-sm hover:underline"
          >
            ← Back to Login
          </Link>
        </div>

        {/* Home */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-gray-400 text-xs font-semibold hover:text-gray-600 transition"
          >
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;