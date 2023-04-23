const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.path === "/api/account/login" || req.path === "/api/account/signup") {
    return next();
  }
  let token = req.header("authentication");

  if (!token) {
    return res
      .status(401)
      .json({ message: "authentication token missing in header" });
  }

  try {
    token = token.replace("Bearer ", "");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.user_id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
