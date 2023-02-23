const express = require("express");
const multer = require("multer");
const { postsController } = require("../controllers");

const storage = multer.diskStorage({
    destination: './public/uploads',
    
    filename: function (req, file, cb) {
        console.info(file.postImage, "--->");
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });


const postsRoutes = express.Router({mergeParams: true});

postsRoutes.post('/', postsController.addPosts);
postsRoutes.get('/', postsController.getAllPosts);
postsRoutes.get('/:post_id', postsController.getPostById);
postsRoutes.delete('/:post_id', postsController.deleteOnePost);
postsRoutes.put('/:post_id', postsController.updateOnePost);
// postsRoutes.use('/:post_id/comments', commentsRoutes);
postsRoutes.post('/:post_id/cover', upload.single('postImage'), postsController.uploadPostCover);

module.exports = postsRoutes;