const express = require("express");
const multer = require("multer");
const { postsController } = require("../controllers");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/uploads");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.originalname + "-" + uniqueSuffix);
    },
  });

const upload = multer({ storage: storage });


// const commentsRoutes = require("./comments.routes");


const postsRoutes = express.Router({mergeParams: true});

postsRoutes.post('/', postsController.addPosts);
postsRoutes.get('/', postsController.getAllPosts);
postsRoutes.get('/:post_id', postsController.getPostById);
postsRoutes.delete('/:post_id', postsController.deleteOnePost);
postsRoutes.put('/:post_id', postsController.updateOnePost);
// postsRoutes.use('/:post_id/comments', commentsRoutes);
postsRoutes.post('/:post_id/cover', upload.single('postImage'), postsController.uploadPostCover);

module.exports = postsRoutes;