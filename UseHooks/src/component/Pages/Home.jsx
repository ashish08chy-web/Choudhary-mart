// Unused React import removed

const products = [
    {
        id: 1,
        name: "Premium Cotton T-Shirt",
        price: 799,
        oldPrice: 1299,
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    },
    {
        id: 2,
        name: "Casual Denim Jacket",
        price: 1499,
        oldPrice: 2199,
        image:
            "https://images.unsplash.com/photo-1551028719-00167b16eac5",
    },
    {
        id: 3,
        name: "Classic Sneakers",
        price: 1999,
        oldPrice: 2999,
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
        id: 4,
        name: "Smart Watch",
        price: 2499,
        oldPrice: 3999,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
];

const categories = [
    {
        name: "Men",
        image:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
    },
    {
        name: "Women",
        image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b",
    },
    {
        name: "Shoes",
        image:
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    },
    {
        name: "Accessories",
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
];

function Home({ addToCart }) {
    return (
        <div className="min-h-screen bg-gray-50">

            {/* Navbar */}


            {/* Hero Section */}
            <section className="bg-orange-50">
                <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">

                    <div>
                        <p className="text-orange-500 font-semibold mb-3">
                            Welcome to Choudhary Mart
                        </p>

                        <h2 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                            Shop Smart.
                            <br />
                            Live Better.
                        </h2>

                        <p className="text-gray-600 mt-5 max-w-lg">
                            Discover quality products at affordable prices.
                            Shop fashion, electronics, accessories and more.
                        </p>

                        <button className="mt-7 bg-orange-500 text-white px-7 py-3 rounded-lg font-semibold hover:bg-orange-600">
                            Shop Now
                        </button>
                    </div>

                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
                            alt="Shopping"
                            className="w-full h-[400px] object-cover rounded-2xl"
                        />
                    </div>

                </div>
            </section>

            {/* Categories */}
            <section className="max-w-7xl mx-auto px-4 py-14">

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold">
                        Shop by Category
                    </h2>

                    <button className="text-orange-500 font-semibold">
                        View All
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                    {categories.map((category) => (
                        <div
                            key={category.name}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer"
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-48 object-cover"
                            />

                            <h3 className="text-center font-semibold text-lg py-4">
                                {category.name}
                            </h3>
                        </div>
                    ))}

                </div>
            </section>

            {/* Products */}
            <section className="max-w-7xl mx-auto px-4 py-14">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <p className="text-orange-500 font-medium">
                            Our Collection
                        </p>

                        <h2 className="text-3xl font-bold mt-1">
                            Popular Products
                        </h2>
                    </div>

                    <button className="text-orange-500 font-semibold">
                        View All
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
                        >

                            {/* Image */}
                            <div className="relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-64 object-cover"
                                />

                                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
                                    Sale
                                </span>
                            </div>

                            {/* Details */}
                            <div className="p-4">

                                <div className="text-yellow-500 text-sm">
                                    ★★★★★
                                </div>

                                <h3 className="font-semibold text-lg mt-2">
                                    {product.name}
                                </h3>

                                <div className="flex gap-3 items-center mt-2">
                                    <span className="font-bold text-xl">
                                        ₹{product.price}
                                    </span>

                                    <span className="text-gray-400 line-through">
                                        ₹{product.oldPrice}
                                    </span>
                                </div>

                                <button 
                                    onClick={() => addToCart(product)}
                                    className="w-full mt-4 bg-gray-900 text-white py-2.5 rounded-lg hover:bg-orange-500 transition"
                                >
                                    Add to Cart
                                </button>

                            </div>
                        </div>
                    ))}

                </div>
            </section>

            {/* Offer Banner */}
            <section className="max-w-7xl mx-auto px-4 py-10">

                <div className="bg-gray-900 text-white rounded-2xl px-8 py-12 text-center">

                    <p className="text-orange-400 font-semibold">
                        Limited Time Offer
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold mt-2">
                        Get up to 50% OFF
                    </h2>

                    <p className="text-gray-300 mt-3">
                        Grab your favorite products before the offer ends.
                    </p>

                    <button className="mt-6 bg-orange-500 px-7 py-3 rounded-lg font-semibold hover:bg-orange-600">
                        Shop Deals
                    </button>

                </div>

            </section>

            {/* Why Choose Us */}
            <section className="bg-white py-14">

                <div className="max-w-7xl mx-auto px-4">

                    <h2 className="text-3xl font-bold text-center mb-10">
                        Why Choose Choudhary Mart?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        <div className="text-center">
                            <div className="text-4xl">🚚</div>

                            <h3 className="font-bold text-xl mt-3">
                                Fast Delivery
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Get your orders delivered quickly to your doorstep.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="text-4xl">💳</div>

                            <h3 className="font-bold text-xl mt-3">
                                Secure Payment
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Safe and secure payment options for every order.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="text-4xl">↩️</div>

                            <h3 className="font-bold text-xl mt-3">
                                Easy Returns
                            </h3>

                            <p className="text-gray-600 mt-2">
                                Easy return and refund process for eligible products.
                            </p>
                        </div>

                    </div>

                </div>

            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white">

                <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

                    <div>
                        <h2 className="text-2xl font-bold text-orange-500">
                            Choudhary Mart
                        </h2>

                        <p className="text-gray-400 mt-4">
                            Your simple destination for quality products
                            at affordable prices.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">
                            Quick Links
                        </h3>

                        <div className="space-y-2 text-gray-400">
                            <p>Home</p>
                            <p>Shop</p>
                            <p>Categories</p>
                            <p>About Us</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">
                            Customer Service
                        </h3>

                        <div className="space-y-2 text-gray-400">
                            <p>Contact Us</p>
                            <p>Shipping</p>
                            <p>Returns</p>
                            <p>FAQ</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-4">
                            Follow Us
                        </h3>

                        <div className="flex gap-4 text-xl">
                            <span>📘</span>
                            <span>📸</span>
                            <span>🐦</span>
                            <span>▶️</span>
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-700 text-center py-5 text-gray-400">
                    © 2026 Choudhary Mart. All rights reserved.
                </div>
                <div className="bg-yello-300 text-black-500 border">
                    Name = <input placeholder="Enter Name"></input>
                </div>

            </footer>

        </div>
    );
}

export default Home;