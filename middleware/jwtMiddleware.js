const jwt = require("jsonwebtoken");

const jwtMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // get the token after "Bearer"
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      // token expired
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ message: "Token expired" });
      }
      return res.status(401).json({ message: "Unauthorized" });
    }

    // check if the user is inside the app-users.json
    const users = require("../app-users.json");
    const user = users.find((user) => user.email === decoded.username);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  });
};

module.exports = jwtMiddleware;
