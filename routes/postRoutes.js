const { Router } = require("express");
const router = Router();
const { getUserPosts, createPost } = require("../controllers/postController");

router.get("/", getUserPosts);
router.post("/", createPost);

module.exports = router;
