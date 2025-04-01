import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // Get token from cookie
  let token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
  console.log(token)
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default verifyToken;
