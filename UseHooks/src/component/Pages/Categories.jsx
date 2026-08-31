import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Men's Fashion",
    products: "120+ Products",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
  },
  {
    id: 2,
    name: "Women's Fashion",
    products: "150+ Products",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b",
  },
  {
    id: 3,
    name: "Electronics",
    products: "200+ Products",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661",
  },
  {
    id: 4,
    name: "Shoes",
    products: "90+ Products",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
  },
  {
    id: 5,
    name: "Watches",
    products: "70+ Products",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: 6,
    name: "Beauty",
    products: "100+ Products",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
  },
  {
    id: 7,
    name: "Home & Living",
    products: "180+ Products",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
  },
  {
    id: 8,
    name: "Sports",
    products: "80+ Products",
    image:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211",
  },
];

function Categories() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5">

          <Link
            to="/"
            className="text-orange-500 font-semibold hover:text-orange-600"
          >
            ← Back to Home
          </Link>

        </div>
      </div>

      {/* Page Heading */}
      <section className="max-w-7xl mx-auto px-4 pt-12 pb-8">

        <div className="text-center">
          <p className="text-orange-500 font-semibold">
            Explore Our Store
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
            Shop by Category
          </h1>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Find everything you need in one place. Explore our
            different categories and discover products you love.
          </p>
        </div>

      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 pb-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {categories.map((category) => (

            <Link
              to={`/category/${category.id}`}
              key={category.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >

              {/* Image */}
              <div className="relative overflow-hidden">

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition" />

              </div>

              {/* Details */}
              <div className="p-5">

                <h2 className="text-xl font-bold text-gray-900">
                  {category.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  {category.products}
                </p>

                <div className="mt-4 text-orange-500 font-semibold">
                  Explore Category →
                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-16">

        <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-center text-white">

          <p className="text-orange-400 font-semibold">
            Special Offers
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Find Your Favorite Products
          </h2>

          <p className="text-gray-400 mt-3">
            Explore our categories and get amazing deals today.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-6 bg-orange-500 px-7 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
          >
            Start Shopping
          </Link>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 text-center py-6">
        <p>
          © 2026 Choudhary Mart. All rights reserved.
        </p>
      </footer>

    </div>
  );
}

export default Categories;