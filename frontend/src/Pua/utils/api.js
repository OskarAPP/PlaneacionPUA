const RAW_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
export const API_BASE_URL = RAW_API_URL.endsWith("/") ? RAW_API_URL.slice(0, -1) : RAW_API_URL;
