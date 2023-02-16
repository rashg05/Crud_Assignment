const axios = require("axios");

const getCommentsByPostId = async ({ postId, userId }) => {
  try {
    // const baseUrl = 'http://0.0.0.0:8083/comments'

    const comments = await axios.get("http://0.0.0.0:8083/posts/:post_id/comments/");
    return comments;
  } catch (err) {
    console.error(err);
  }
};

// const postCommentsByPostId = async ({ postId, userId }) => {
//   try {
//     const comments = await axios.post("http://0.0.0.0:8083/comments/");
//     return comments;
//   } catch (err) {
//     console.error(err);
//   }
// };

module.exports = {
  getCommentsByPostId,
};
