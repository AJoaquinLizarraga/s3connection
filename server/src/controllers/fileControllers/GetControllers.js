const {
  ListObjectsV2Command,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const client = require("../configS3");
const fs = require("fs");

const { AWS_BUCKET_NAME } = require("../../../config");

const getFiles = async () => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: AWS_BUCKET_NAME,
    });
    return await client.send(command);
  } catch (error) {
    throw new Error(error);
  }
};

const getFile = async (filename) => {
  try {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filename,
    });
    return await client.send(command);
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const downloadFile = async (filename) => {
  try {
    console.log(filename);
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filename,
    });
    const result = await client.send(command);
    result.Body.pipe(fs.createWriteStream(`./src/images/${filename}`));
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

const getFileURL = async (filename) => {
  try {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filename,
    });
    return await getSignedUrl(client, command, { expiresIn: 120 });
  } catch (error) {
    throw new Error({ error: error.message });
  }
};

module.exports = { getFiles, getFile, downloadFile, getFileURL };
