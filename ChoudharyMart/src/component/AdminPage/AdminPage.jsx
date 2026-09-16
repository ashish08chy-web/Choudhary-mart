import { useState } from "react";

export default function Admin() {
  const [isLogin, setIsLogin] = useState(false);
  const [pass, setPass] = useState("");
  const [product, setProduct] = useState({ name: "", price: "", image: "" });

  const handleLogin = () => {
    if (pass === "choudhary123") {
      // ye tumhara password hai
      setIsLogin(true);
    } else {
      alert("Galat password!");
    }
  };

  const handleAddProduct = () => {
    let products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    alert("Product Add ho gaya!");
    setProduct({ name: "", price: "", image: "" });
  };

  if (!isLogin) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Choudhary Mart - Admin Panel</h2>
      <input
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <br />
      <br />
      <input
        placeholder="Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      <br />
      <br />
      <input
        placeholder="Image Link"
        value={product.image}
        onChange={(e) => setProduct({ ...product, image: e.target.value })}
      />
      <br />
      <br />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}
