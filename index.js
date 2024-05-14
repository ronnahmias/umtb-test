require("dotenv").config();
const express = require("express");
const { fetchUsers, saveUsersToFile } = require("./helpers/fetchUsers");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const loggingMiddleware = require("./middleware/loggingMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");
const jwtMiddleware = require("./middleware/jwtMiddleware");

const app = express();
app.use(express.json());

// logging middleware
app.use(loggingMiddleware);

// Fetch users data and save it to app-users.json
fetchUsers()
  .then((users) => saveUsersToFile(users))
  .then(() => console.log("Users data saved to app-users.json successfully."))
  .catch((error) => console.error("An error occurred:", error));

app.use("/auth", authRoutes);

// routes with jwtMiddleware
app.use(jwtMiddleware);
app.use("/posts", postRoutes);

// error logging middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Server is running on port ${PORT}`);
});
