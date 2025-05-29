import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const verified = jwt.verify(authHeader, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
}

// Hardcoded products
const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Phone", price: 800 },
  { id: 3, name: "Headphones", price: 150 },
];

// Protected route
router.get("/products", authenticateToken, (req, res) => {
  res.json({ products:"Hi Aashnuu, ma Samriddha heheheh nidaudeee guyeee cutu" });
});

export default router;
