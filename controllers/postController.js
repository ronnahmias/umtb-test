const axios = require("axios");

const getUserPosts = async (req, res) => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    // filter the posts by the user id
    const userPosts = response.data.filter(
      (post) => post.userId === req.user.userCode
    );
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user posts" });
  }
};

const createPost = async (req, res) => {
  try {
    // check if there is in body title and body and is not empty
    if (!req.body || !req.body.title || !req.body.body) {
      return res.status(400).json({ message: "Title and body are required" });
    }

    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      { userId: req.user.userCode, ...req.body }
    );
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error creating post" });
  }
};

module.exports = { getUserPosts, createPost };
