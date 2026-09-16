import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Choudhary Mart Admin</h1>

        <Link to="/" className="bg-black text-white px-4 py-2 rounded-lg">
          View Store
        </Link>
      </nav>

      {/* Dashboard */}
      <main className="p-6">
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500">Total Orders</p>

            <h3 className="text-3xl font-bold mt-2">0</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500">Pending Orders</p>

            <h3 className="text-3xl font-bold mt-2">0</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500">Products</p>

            <h3 className="text-3xl font-bold mt-2">0</h3>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <p className="text-gray-500">Total Sales</p>

            <h3 className="text-3xl font-bold mt-2">₹0</h3>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-2xl p-6">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/admin/orders"
              className="bg-black text-white px-5 py-3 rounded-xl"
            >
              📦 View Orders
            </Link>

            <button className="border px-5 py-3 rounded-xl">
              🛍️ Add Product
            </button>

            <button className="border px-5 py-3 rounded-xl">
              📂 Categories
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
