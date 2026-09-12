import { Link } from "react-router-dom";

export function Toast({ notification, onClose }) {
  return (
    <div
      className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 flex gap-3 items-center pointer-events-auto transition-all duration-300 transform hover:scale-[1.02]"
      style={{
        animation: "slideIn 0.3s ease-out forwards",
      }}
    >
      <div className="relative shrink-0">
        <img
          src={notification.productImage}
          className="w-12 h-12 object-cover rounded-lg border border-gray-100"
          alt={notification.productName}
        />
        <div className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold shadow-sm">
          ✓
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <span className="text-emerald-600 font-semibold text-xs uppercase tracking-wider">Success</span>
        <p className="text-gray-800 text-sm font-medium truncate mt-0.5">
          {notification.productName}
        </p>
        <div className="mt-1">
          <Link
            to="/cart"
            className="text-orange-500 hover:text-orange-600 text-xs font-semibold underline"
          >
            View Cart
          </Link>
        </div>
      </div>

      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition p-1.5 rounded-lg shrink-0 text-sm"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}

export function ToastContainer({ notifications, removeNotification }) {
  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(120%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-[calc(100vw-40px)] sm:w-96 pointer-events-none">
        {notifications.map((n) => (
          <Toast
            key={n.id}
            notification={n}
            onClose={() => removeNotification(n.id)}
          />
        ))}
      </div>
    </>
  );
}
