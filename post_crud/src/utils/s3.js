const { S3Client, UploadCommand } = require("@aws-sdk/client-s3");
const { AWS_BUCKET_NAME, AWS_REGION } = require('../config');

const uploadToS3 = async ({ body, key }) => {
  try {
    const params = {
      Bucket: AWS_BUCKET_NAME,
      Key: key,
      Body: body,
    };
    const client = new S3Client({
      region: AWS_REGION,
    });
    return client.send(new UploadCommand(params));
  } catch (error) {
    console.error(error);
  }
  return null;
};

module.exports = {
  uploadToS3,
};
