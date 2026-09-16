import { useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([
    {
      id: "#CM1001",
      customer: "Rahul Kumar",
      email: "rahul@gmail.com",
      amount: 1299,
      status: "Pending",
    },
    {
      id: "#CM1002",
      customer: "Amit Kumar",
      email: "amit@gmail.com",
      amount: 2499,
      status: "Shipped",
    },
    {
      id: "#CM1003",
      customer: "Rohit Singh",
      email: "rohit@gmail.com",
      amount: 899,
      status: "Delivered",
    },
  ]);

  const updateStatus = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order,
      ),
    );
  };

  const getStatusStyle = (status) => {
    if (status === "Pending") {
      return "bg-yellow-100 text-yellow-700";
    }

    if (status === "Shipped") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "Delivered") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Cancelled") {
      return "bg-red-100 text-red-700";
    }

    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b px-6 py-5">
        <h1 className="text-2xl font-bold">Orders</h1>

        <p className="text-gray-500 mt-1">Manage all customer orders</p>
      </div>

      {/* Orders */}
      <div className="p-6">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Order ID
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Customer
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Amount
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Status
                  </th>

                  <th className="text-left px-6 py-4 text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b last:border-none hover:bg-gray-50"
                  >
                    {/* Order ID */}
                    <td className="px-6 py-5 font-semibold">{order.id}</td>

                    {/* Customer */}
                    <td className="px-6 py-5">
                      <p className="font-medium">{order.customer}</p>

                      <p className="text-sm text-gray-500">{order.email}</p>
                    </td>

                    {/* Amount */}
                    <td className="px-6 py-5 font-semibold">₹{order.amount}</td>

                    {/* Status */}
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusStyle(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-5">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 outline-none"
                      >
                        <option value="Pending">Pending</option>

                        <option value="Shipped">Shipped</option>

                        <option value="Delivered">Delivered</option>

                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
