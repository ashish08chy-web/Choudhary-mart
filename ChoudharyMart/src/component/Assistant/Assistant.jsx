import { useState } from "react";

function Assistant() {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    {
      icon: "📦",
      title: "My Orders",
    },
    {
      icon: "🚚",
      title: "Track Order",
    },
    {
      icon: "💳",
      title: "Check COD Availability",
    },
    {
      icon: "🔄",
      title: "Return / Refund",
    },
    {
      icon: "🚚",
      title: "Delivery Information",
    },
    {
      icon: "📞",
      title: "Contact Support",
    },
  ];

  return (
    <>
      {/* Assistant Box */}
      {isOpen && (
        <div
          className="
            fixed bottom-34 md:bottom-22 right-4 md:right-6 z-50
            w-[270px] max-w-[calc(100vw-32px)]
            overflow-hidden
            rounded-2xl
            border border-white/20
            bg-slate-900/95
            shadow-2xl
            backdrop-blur-xl
            animate-[fadeIn_.3s_ease-out]
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm">
                🤖
              </div>

              <div>
                <h2 className="text-sm font-semibold text-white">
                  Choudhary Assistant
                </h2>

                <p className="text-[10px] text-green-400">
                  ● Online
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="
                text-sm text-gray-400
                transition hover:rotate-90 hover:text-white
              "
            >
              ✕
            </button>
          </div>

          {/* Welcome */}
          <div className="px-4 py-3">
            <h3 className="text-sm font-semibold text-white">
              Hi! How can I help you? 👋
            </h3>

            <p className="mt-0.5 text-xs text-gray-400">
              Choose an option below.
            </p>
          </div>

          {/* Options */}
          <div className="space-y-1.5 px-4 pb-4">
            {options.map((option, index) => (
              <button
                key={index}
                className="
                  flex w-full items-center gap-3
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  px-3 py-2
                  text-left
                  transition duration-200
                  hover:-translate-y-0.5
                  hover:bg-white/10
                  hover:border-blue-400/40
                "
              >
                <span className="text-base">
                  {option.icon}
                </span>

                <span className="text-xs font-medium text-gray-200">
                  {option.title}
                </span>

                <span className="ml-auto text-xs text-gray-500">
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          fixed bottom-18 md:bottom-6 right-4 md:right-6 z-50
          flex h-11 w-11 md:h-12 md:w-12
          items-center justify-center
          rounded-full
          border border-white/20
          bg-blue-600
          text-lg
          text-white
          shadow-[0_8px_30px_rgba(37,99,235,0.5)]
          transition duration-300
          hover:scale-110
          hover:bg-blue-500
          active:scale-95
        "
      >
        {isOpen ? "✕" : "🤖"}
      </button>
    </>
  );
}

export default Assistant;