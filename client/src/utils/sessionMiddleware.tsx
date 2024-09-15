import { Middleware, isRejectedWithValue, MiddlewareAPI } from "@reduxjs/toolkit";
import { setSessionExpired } from "../rtk/authThunk/authSlice";

// Define the middleware
export const authMiddleware: Middleware =
  ({ dispatch }: MiddlewareAPI) =>
  (next) =>
  (action) => {
    // Check if the action was rejected with a value
    if (isRejectedWithValue(action)) {
      const payload = action.payload;

      if (
        payload?.response?.status === 401 ||
        payload?.response?.status === 403
      ) {
        // Show an error toast indicating session expiration

        // Dispatch action to handle session expiration (set isSuccess to false)
        dispatch(setSessionExpired(true));

        // Redirect to the login page with a delay
        setTimeout(() => {
          window.location.href = "/";
        }, 2000); // Redirect after 2 seconds
      }
    }

    return next(action);
  };
