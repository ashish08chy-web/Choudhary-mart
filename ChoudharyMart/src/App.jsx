import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./component/Navbar/Navbar";
import Home from "./component/Pages/Home";
import Cart from "./component/Cart";
import Login from "./component/registration/Login";
import SignUp from "./component/registration/SignUp";
import ForgotPassword from "./component/registration/ForgotPassword";
import ProductPage from "./component/Pages/ProductPage";
import Categories from "./component/Pages/Categories";
import { ToastContainer } from "./component/Navbar/Toast";
import Assistant from "./component/Assistant/Assistant";
import BottomNav from "./component/Navbar/BottomNav";

function App() {
  const [cart, setCart] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    const id = Date.now();
    setNotifications((prev) => [
      ...prev,
      { id, productName: product.name, productImage: product.image },
    ]);
    setTimeout(() => removeNotification(id), 3000);
  };

  const updateQty = (id, type) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          if (type === "inc") return { ...item, quantity: item.quantity + 1 };
          if (type === "dec" && item.quantity > 1)
            return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      }),
    );
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => item.id !== id));
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <BrowserRouter>
      {" "}
      {/* <-- Router ko sabse upar lao */}
      <div className="min-h-screen bg-[#f0f4f9] text-gray-900 flex flex-col pb-16 md:pb-0 selection:bg-orange-500 selection:text-white">
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route
            path="/productpage"
            element={<ProductPage addToCart={addToCart} />}
          />
          <Route
            path="/productpage/:id"
            element={<ProductPage addToCart={addToCart} />}
          />
          <Route
            path="/product/:id"
            element={<ProductPage addToCart={addToCart} />}
          />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                updateQty={updateQty}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <ToastContainer
          notifications={notifications}
          removeNotification={removeNotification}
        />
        <Assistant />
        <BottomNav cartCount={cartCount} />
      </div>
    </BrowserRouter>
  );
}

export default App;
