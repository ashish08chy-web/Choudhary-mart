import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later connect this with your backend
    alert("Password reset link sent to your email!");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500">
            Choudhary Mart
          </h1>

          <h2 className="text-2xl font-bold text-gray-900 mt-6">
            Forgot Password?
          </h2>

          <p className="text-gray-500 mt-2">
            Enter your email and we'll send you a password reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3
              outline-none focus:border-orange-500
              focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg
            font-semibold hover:bg-orange-600 transition"
          >
            Send Reset Link
          </button>

        </form>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            ← Back to Login
          </Link>
        </div>

        {/* Home */}
        <div className="text-center mt-4">
          <Link
            to="/"
            className="text-gray-500 text-sm hover:text-orange-500"
          >
            Back to Home
          </Link>
        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;