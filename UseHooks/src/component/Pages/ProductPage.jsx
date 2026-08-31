import { useState } from "react";

const product = {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 799,
    oldPrice: 1299,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
};

export default function ProductPage({addToCart}) {
    
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("M");

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Product Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 md:p-10 rounded-2xl shadow-sm">

                    {/* Product Image */}
                    <div>
                        <div className="bg-gray-100 rounded-2xl overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
                                alt="Premium T-Shirt"
                                className="w-full h-[450px] object-cover hover:scale-105 transition duration-500"
                            />
                        </div>

                        {/* Small Images */}
                        <div className="flex gap-4 mt-4">
                            <img
                                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
                                className="w-20 h-20 object-cover rounded-lg border-2 border-black cursor-pointer"
                                alt=""
                            />

                            <img
                                src="https://images.unsplash.com/photo-1503341504253-dff4815485f1"
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                                alt=""
                            />

                            <img
                                src="https://images.unsplash.com/photo-1583743814966-8936f37f4678"
                                className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                                alt=""
                            />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-center">

                        {/* Category */}
                        <p className="text-sm text-gray-500 mb-2">
                            Men's Fashion / T-Shirts
                        </p>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Premium Cotton T-Shirt
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mt-4">
                            <div className="text-yellow-500 text-lg">
                                ★★★★★
                            </div>

                            <span className="text-gray-500 text-sm">
                                4.8 (125 Reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-4 mt-6">
                            <span className="text-3xl font-bold text-gray-900">
                                ₹799
                            </span>

                            <span className="text-lg text-gray-400 line-through">
                                ₹1,299
                            </span>

                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                                38% OFF
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 mt-6 leading-relaxed">
                            Premium quality cotton t-shirt designed for comfort and
                            everyday style. Soft fabric, modern fit and perfect for
                            casual occasions.
                        </p>

                        {/* Size */}
                        <div className="mt-6">
                            <div className="flex justify-between mb-3">
                                <span className="font-semibold">Select Size</span>
                                <button className="text-sm text-blue-600">
                                    Size Guide
                                </button>
                            </div>

                            <div className="flex gap-3">
                                {["S", "M", "L", "XL", "XXL"].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => setSize(item)}
                                        className={`w-12 h-12 rounded-lg border font-medium transition
                      ${size === item
                                                ? "bg-black text-white border-black"
                                                : "border-gray-300 hover:border-black"
                                            }`}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mt-6">
                            <p className="font-semibold mb-3">Quantity</p>

                            <div className="flex items-center border border-gray-300 rounded-lg w-fit">
                                <button
                                    onClick={() =>
                                        setQuantity(Math.max(1, quantity - 1))
                                    }
                                    className="px-4 py-2 text-xl hover:bg-gray-100"
                                >
                                    −
                                </button>

                                <span className="px-5 font-semibold">
                                    {quantity}
                                </span>

                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 text-xl hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 mt-8">
                            <button 
                                onClick={() => addToCart && addToCart(product)}
                                className="flex-1 bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
                            >
                                Add to Cart
                            </button>

                            <button className="flex-1 bg-orange-500 text-white py-4 rounded-xl font-semibold hover:bg-orange-600 transition">
                                Buy Now
                            </button>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4 mt-8 border-t pt-6">
                            <div className="text-center">
                                <div className="text-2xl">🚚</div>
                                <p className="text-xs mt-2 text-gray-600">
                                    Free Delivery
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="text-2xl">↩️</div>
                                <p className="text-xs mt-2 text-gray-600">
                                    Easy Returns
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="text-2xl">🔒</div>
                                <p className="text-xs mt-2 text-gray-600">
                                    Secure Payment
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Product Description */}
                <div className="bg-white rounded-2xl mt-8 p-6 md:p-10">
                    <h2 className="text-2xl font-bold mb-4">
                        Product Details
                    </h2>

                    <p className="text-gray-600 leading-7">
                        This premium cotton t-shirt is made from high-quality
                        breathable fabric. It features a comfortable regular fit,
                        durable stitching and a modern design suitable for everyday
                        wear.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                        <div>
                            <p className="text-gray-500 text-sm">Material</p>
                            <p className="font-semibold">100% Cotton</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">Fit</p>
                            <p className="font-semibold">Regular Fit</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">Color</p>
                            <p className="font-semibold">Black</p>
                        </div>

                        <div>
                            <p className="text-gray-500 text-sm">Availability</p>
                            <p className="font-semibold text-green-600">
                                In Stock
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}