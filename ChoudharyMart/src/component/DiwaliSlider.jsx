import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    title: "Navratri sale is LIVE!!!",
    offer: "up to 70% Off",
    bg: "from-emerald-400 to-teal-600",
    img: "/NavrariSale2.jpg",
    badge: "BIG BACHAT DAYS",
  },
  {
    id: 2,
    title: "Korean store",
    offer: "Min. 60% Off",
    bg: "from-sky-400 to-blue-500",
    img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400",
    badge: "BIG BACHAT DAYS",
  },
  {
    id: 3,
    title: "SALE IS LIVE",
    offer: "50-80% Off",
    bg: "from-blue-400 to-cyan-400",
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
    badge: "BIG BACHAT DAYS",
  },
  {
    id: 4,
    title: "Navratri Special",
    offer: "Up to 50% OFF",
    bg: "from-orange-500 to-red-600",
    img: "/NavratriSale2.jpg",
    badge: "BIG BACHAT DAYS",
  },
];

export default function FlipkartSlider() {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#f1f2f4] p-3 overflow-hidden">
      {/* Track - Desktop pe 3 card, Mobile pe 1 */}
      <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory md:overflow-hidden md:justify-center">
        {slides.map((slide, index) => {
          // Sirf 3 card dikhao jo current ke aas paas hai
          const isVisible =
            index === current ||
            index === (current + 1) % slides.length ||
            index === (current + 2) % slides.length;

          if (!isVisible && window.innerWidth > 768) return null;

          return (
            <div
              key={slide.id}
              className={`min-w-[85%] md:min-w-[32%] h-[160px] md:h-[180px] rounded-xl snap-center flex items-center justify-between p-4 bg-gradient-to-r ${slide.bg} shadow-sm shrink-0 transition-all duration-500`}
            >
              {/* Left Content */}
              <div className="flex flex-col justify-center text-black">
                <span className="bg-yellow-300 text-[10px] font-bold px-2 py-1 rounded w-fit">
                  {slide.badge}
                </span>
                <h3 className="mt-2 text-[16px] md:text-[18px] font-medium leading-tight text-white">
                  {slide.title}
                </h3>
                <p className="text-[18px] md:text-[20px] font-bold text-white mt-1">
                  {slide.offer}
                </p>
              </div>

              {/* Right Image */}
              <div className="w-[120px] h-[120px] md:w-[140px] md:h-[130px] rounded-lg overflow-hidden bg-white">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-gray-800" : "w-2 bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
