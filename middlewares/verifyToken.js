const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send("Access deniend , No Token");
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}

function verifyAdmin(req, res, next) {
  if (!req.user.isAdmin == true) {
    return res.status(403).send("Access denied, Not an Admin");
  }
  next();
}

module.exports = {
  verifyToken,
  verifyAdmin,
};
