import jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  try {
    // Check if the authorization header is present
    if (!req.headers.authorization) {
      return res.status(401).send({ message: "User should be logged in" });
    }

    // Extract the token from the authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the decoded user info to the request object
    req.user = decoded;

    // Proceed to the next middleware
    next();
  } catch (error) {
    // Handle specific errors related to token verification
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Session expired" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).send({ message: "Invalid Token" });
    } else {
      // Handle any other errors
      return res.status(500).send({ message: "Authentication failed" });
    }
  }
};
