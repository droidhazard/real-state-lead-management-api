import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  try {
    if (authHeader && authHeader.startsWith("Bearer")) {
      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SIGNING_SECRET);
        req.user = decoded;
        console.log(decoded);
        next();
      } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
      }
    } else {
      return res.status(401).json({ message: "Authorization required" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "error while authenticating", error: error.message });
  }
}

export { authenticateJWT };
