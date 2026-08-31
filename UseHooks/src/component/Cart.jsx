// Unused React import removed

function Cart({ cart, updateQty, removeFromCart }) {

  const grandTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if(cart.length === 0){
    return <h1 className="text-green-300 text-center mt-20 text-2xl">Empty Cart!</h1>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-lg shadow p-5">
            {cart.map((product) => (
              <div key={product.id} className="flex items-center gap-4 border-b pb-5 mb-5">
                <img src={product.image} className="w-20 h-20 object-cover" />
                <div className="flex-1">
                  <h2 className="font-bold">{product.name}</h2>
                  <p>₹{product.price} x {product.quantity}</p>
                  <p className="font-bold">Total: ₹{product.price * product.quantity}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => updateQty(product.id, "dec")} className="px-2 bg-gray-200">-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => updateQty(product.id, "inc")} className="px-2 bg-gray-200">+</button>
                </div>
                <button onClick={() => removeFromCart(product.id)} className="text-red-500 ml-4">Remove</button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-5 h-fit">
            <h2 className="text-xl font-bold">Total: ₹{grandTotal}</h2>
            <button className="w-full bg-orange-500 text-white mt-4 py-2 rounded">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;