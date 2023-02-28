const express = require("express");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3, UploadCommand } = require("@aws-sdk/client-s3");
const { AWS_BUCKET_NAME, AWS_REGION } = require("../config");
const s3 = new aws.S3();

const { postsController } = require("../controllers");
// const { S3 } = require("aws-sdk");

// const storage = multer.diskStorage({
//     destination: './public/uploads',

//     filename: function (req, file, cb) {
//         console.info(file.postImage, "--->");
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(null, file.originalname);
//     },
// });

// const BUCKET = process.env.BUCKET;

const upload = multer({
  storage: multerS3({
    bucket: AWS_BUCKET_NAME,
    s3: s3,
    acl: "public-read",
    Key: (req, file, cb) => {
      cb(null, file.originalname)
    }
  }),
});

// const uploadToS3 = async ({ body, key }) => {
//   try {
//     const params = {
//       Bucket: AWS_BUCKET,
//       Key: key,
//       Body: body,
//     };
//     const client = new S3Client({
//       region: AWS_REGION,
//     });
//     return client.send(new UploadCommand(params));
//   } catch (error) {
//     console.error(error);
//   }
//   return null;
// };

const postsRoutes = express.Router({ mergeParams: true });

postsRoutes.post("/", postsController.addPosts);
postsRoutes.get("/", postsController.getAllPosts);
postsRoutes.get("/:post_id", postsController.getPostById);
postsRoutes.delete("/:post_id", postsController.deleteOnePost);
postsRoutes.put("/:post_id", postsController.updateOnePost);
// postsRoutes.use('/:post_id/comments', commentsRoutes);
postsRoutes.post(
  "/:post_id/cover",
  upload.single("postImage"),
  postsController.uploadPostCover
);

module.exports = postsRoutes;
