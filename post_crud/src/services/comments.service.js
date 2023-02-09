const axios = require("axios");

const getCommentsByPostId = async ({ postId, userId }) => {
  try {
    // const baseUrl = 'http://0.0.0.0:8083/comments'
    
    const comments = await axios.get("http://0.0.0.0:8083/comments/");
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getCommentsByPostId,
};
