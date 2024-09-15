import axios from "axios";
import { ErrorToast } from "../components/common/toast";

// Function to create Axios instance
const ApiInstance = (contentType: string) => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`, // Use your environment variable
    timeout: 5000,
    headers: {
      "Content-Type": contentType,
    },
  });

  // Request interceptor to dynamically set the Authorization header before each request
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token") || "";
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle unauthorized and token-related errors
  instance.interceptors.response.use(
    (response) => response, // If the response is successful, return it
    (error) => {
      const { response } = error;

      // Handle 403 (Token Expired) and 500 (General Auth Error) statuses
      if (response && response.status === 403) {
        // Handle session expiration (from TokenExpiredError on the backend)
        setTimeout(() => {
          localStorage.removeItem("token");
          window.location.href = "/"; // Change to your login page
        }, 1000);
      } else if (response.status === 401) {
        // Handle unauthorized access (from JsonWebTokenError on the frontend)
        setTimeout(() => {
          localStorage.removeItem("token");
          window.location.href = "/"; // Change to your login page
        }, 1000); // 2-second delay for user experience
      } else {
        // Handle general authentication failures
      }

      // Reject the error so that it can be handled by the calling code
      return Promise.reject(error);
    }
  );

  return instance;
};

// Create instances for different content types
const main_url = ApiInstance("application/json");
const photo_url = ApiInstance("multipart/form-data");

export { main_url, photo_url };
