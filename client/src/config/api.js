// API Configuration for Frontend
// Automatically switches between local and production environments

const API_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

console.log("🔗 Backend URL:", API_BASE_URL);

export default API_BASE_URL;
