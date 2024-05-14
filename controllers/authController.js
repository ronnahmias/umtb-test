const { emailValid } = require("../helpers/validations");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    if (!req.body || !req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const { username, password } = req.body;

    if (!username || !password || !emailValid(username)) {
      return res.status(400).json({ message: "Invalid request" });
    }

    // check if the user is inside the app-users.json
    const users = require("../app-users.json");
    const user = users.find((user) => user.email === username);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginUser };
