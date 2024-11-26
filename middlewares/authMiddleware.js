const jwtUtils = require("../utils/jwtUtils");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const payload = jwtUtils.verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
  if (!payload) return res.status(401).json({ message: "Invalid token" });

  req.user = payload;
  next();
};

module.exports = { authenticate };
