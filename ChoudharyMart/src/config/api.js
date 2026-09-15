// Central API Configuration
// Deployed environment me hosting platform (jaise Vercel/Netlify) par VITE_API_URL set karein.
// Example: VITE_API_URL=https://your-backend.onrender.com

const rawApiUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL = rawApiUrl
  ? rawApiUrl.replace(/\/+$/, "")
  : (import.meta.env.DEV ? "http://localhost:5000" : "");

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  },
  PRODUCTS: {
    LIST: (query = "") => `${API_BASE_URL}/api/products${query ? `?${query}` : ""}`,
    DETAIL: (id) => `${API_BASE_URL}/api/products/${id}`,
  },
  HEALTH: `${API_BASE_URL}/api/health`,
};
