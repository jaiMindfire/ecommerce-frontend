import axios from "axios";
// import Cookies from "js-cookie"; // For client-side cookie management

// Create Axios client with custom configuration
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Use Next.js environment variables
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to include token from cookies in headers
axiosClient.interceptors.request.use(
  (config) => {
    // Server-side cookie handling
    if (typeof window === "undefined") {
      // SSR logic to extract cookies
      const cookieHeader = config.headers?.cookie;
      if (cookieHeader) {
        config.headers.Authorization = `Bearer ${cookieHeader}`;
      }
    } else {
      const token = localStorage.getItem('token') // Assumes 'authToken' is stored in cookies
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
