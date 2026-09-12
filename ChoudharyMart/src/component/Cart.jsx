import { Link } from "react-router-dom";

function Cart({ cart = [], updateQty, removeFromCart }) {
  const grandTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#f0f4f9] flex flex-col items-center justify-center p-6 text-center selection:bg-orange-500 selection:text-white">
        <div className="w-24 h-24 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">
          🛒
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 max-w-sm mb-6 text-sm sm:text-base">
          Looks like you haven't added anything to your cart yet. Explore our top products!
        </p>
        <Link
          to="/"
          className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-orange-500/25 transition-all duration-200 cursor-pointer"
        >
          Start Shopping Now →
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f4f9] py-10 px-4 sm:px-6 lg:px-8 selection:bg-orange-500 selection:text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Shopping Cart</h1>
            <p className="text-gray-500 text-sm mt-1">
              You have <span className="font-bold text-orange-600">{cart.reduce((a, c) => a + c.quantity, 0)} items</span> in your cart
            </p>
          </div>

          <Link
            to="/"
            className="text-orange-600 hover:text-orange-700 font-semibold text-sm flex items-center gap-1 cursor-pointer"
          >
            ← Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xs border border-blue-100/70 p-6 space-y-5">
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border-b border-gray-100 pb-5 last:border-0 last:pb-0"
              >
                {/* Product Image */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden bg-blue-50/40 border border-blue-100/60">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-base sm:text-lg truncate">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                    ₹{product.price} each
                  </p>
                  <p className="font-extrabold text-orange-600 text-base sm:text-lg mt-1">
                    ₹{product.price * product.quantity}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                    <button
                      type="button"
                      onClick={() => updateQty(product.id, "dec")}
                      className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 active:bg-gray-300 transition cursor-pointer"
                    >
                      −
                    </button>
                    <span className="w-9 text-center font-bold text-gray-800 text-sm">
                      {product.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(product.id, "inc")}
                      className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 hover:bg-gray-200 active:bg-gray-300 transition cursor-pointer"
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-xl text-sm font-semibold transition cursor-pointer"
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-3xl shadow-xs border border-blue-100/70 p-6 h-fit space-y-6">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{grandTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
              <div className="border-t border-gray-100 pt-3 flex justify-between text-base font-extrabold text-gray-900">
                <span>Total Amount</span>
                <span className="text-2xl font-black text-orange-600">₹{grandTotal}</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full bg-orange-500 hover:bg-orange-600 active:scale-95 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-500/25 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>🔒</span>
              <span>Proceed to Checkout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;