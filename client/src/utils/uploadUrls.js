import API_BASE_URL from "../config/api";

const BACKEND_BASE_URL = API_BASE_URL.replace(/\/api$/, "");

export const resolveUploadedAssetUrl = (url = "") => {
  const normalizedUrl = String(url || "").trim();

  if (!normalizedUrl) return "";
  if (/^(https?:|data:|blob:|\/\/)/i.test(normalizedUrl)) {
    return normalizedUrl;
  }
  if (normalizedUrl.startsWith("/")) {
    return `${BACKEND_BASE_URL}${normalizedUrl}`;
  }

  return normalizedUrl;
};
