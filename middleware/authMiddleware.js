const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer")) {
    try {
      const token = header.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: "Token invalid" });
    }
  } else {
    res.status(401).json({ message: "No token" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role === "admin") next();
  else res.status(403).json({ message: "Admin only" });
};

module.exports = { protect, adminOnly };