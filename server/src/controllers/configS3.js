const { S3Client } = require("@aws-sdk/client-s3");
const {
  AWS_REGION,
  AWS_ACCESS_KEYID,
  AWS_SECRET_ACCESS_KEYID,
} = require("../../config.js");

const client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEYID,
    secretAccessKey: AWS_SECRET_ACCESS_KEYID,
  },
});

module.exports = client;
