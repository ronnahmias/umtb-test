const { Router } = require("express");
const { loginUser } = require("../controllers/authController");
const router = Router();

router.post("/login", loginUser);

module.exports = router;
