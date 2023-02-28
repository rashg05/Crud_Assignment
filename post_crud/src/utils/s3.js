const { S3Client, UploadCommand } = require("@aws-sdk/client-s3");
const { AWS_BUCKET, AWS_REGION } = require('../config');

// const aws = require("aws-sdk");

const uploadToS3 = async ({ body, key }) => {
  try {
    const params = {
      Bucket: AWS_BUCKET,
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
