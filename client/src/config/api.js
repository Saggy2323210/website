// API Configuration for Frontend
// Automatically switches between local and production environments

const devFallbackBase = import.meta.env.DEV ? "http://127.0.0.1:5000" : "";
const baseURL = import.meta.env.VITE_BACKEND_URL || devFallbackBase;
const API_BASE_URL = `${baseURL}/api`;

console.log("🔗 Backend URL:", API_BASE_URL);

export default API_BASE_URL;
