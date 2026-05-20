import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use((config) => {
  config.headers["X-Request-Id"] = crypto.randomUUID();

  const method = config.method?.toLowerCase();

  if (["post", "put", "patch", "delete"].includes(method ?? "")) {
    config.headers["Idempotency-Key"] = crypto.randomUUID();
  }

  return config;
});

export default AxiosInstance;