import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    // Check if the authorization header is present
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "User should be logged in" });
    }

    // Extract the token from the authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Check if the token is empty or undefined
    if (!token) {
      return res.status(401).json({ message: "User should be logged in" });
    }

    // Verify the token and check for expiration
    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          // Token exists but is expired, meaning user was logged in but their session expired
          return res.status(403).json({
            message: "Session expired. Please log in again.",
          });
        } else if (err.name === "JsonWebTokenError") {
          // Token is invalid (e.g., tampered or malformed)
          return res.status(401).json({
            message: "Invalid token. User should be logged in.",
          });
        } else {
          // Handle other possible errors (e.g., signature validation errors)
          return res.status(500).json({
            message: "Authentication failed. Please try again.",
          });
        }
      }

      // If token is valid, attach the decoded user info to the request object
      req.user = decoded;

      // Proceed to the next middleware or route handler
      next();
    });
  } catch (error) {
    // Handle any other unexpected errors
    return res.status(500).json({ message: "Authentication failed" });
  }
};
