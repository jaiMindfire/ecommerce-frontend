import axios from 'axios';
import Cookies from 'js-cookie'; // For client-side cookie management
import log from "@utils/logger"

// Create Axios client with custom configuration
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Use Next.js environment variables
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor to include token from cookies in headers
axiosClient.interceptors.request.use(
  (config) => {
    // Server-side cookie handling
    if (typeof window === 'undefined') {
      // SSR logic to extract cookies
      const cookieHeader = config.headers?.cookie;
      if (cookieHeader) {
        config.headers.Authorization = `Bearer ${cookieHeader}`;
      }
    } else {
      const accessToken = Cookies.get('access_token'); // Read the access_token from cookies
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check for token expiration (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        await axiosClient.post('/api/auth/refresh');
        // Retry the original request after token refresh
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Redirect to login if refresh fails
        log.error('Token refresh failed', refreshError);
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
