const { AWS_BUCKET_NAME } = require("../../../config");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const client = require("../configS3");

const deleteFile = async (filename) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filename,
    });
    await client.send(command);
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

module.exports = deleteFile;
