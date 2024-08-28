export const authenicate = async (req, res, next) => {
  try {
    // using Bearer token
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: "Invalid Token" });
  }
};
