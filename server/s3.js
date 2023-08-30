import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();
const {
  AWS_REGION,
  AWS_ACCESS_KEYID,
  AWS_SECRET_ACCESS_KEYID,
  AWS_BUCKET_NAME,
} = process.env;

const client = new S3Client({
  region: AWS_REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEYID,
    secretAccessKey: AWS_SECRET_ACCESS_KEYID,
  },
});

const uploadFile = async (file) => {
  try {
    const stream = fs.createReadStream(file?.tempFilePath);

    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: file.name,
      Body: stream,
    };
    const command = new PutObjectCommand(uploadParams);
    return await client.send(command);
  } catch (error) {
    throw error({ error: error.message });
  }
};

const getFiles = async () => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: AWS_BUCKET_NAME,
    });
    return await client.send(command);
  } catch (error) {
    throw error({ error: error.message });
  }
};

const getFile = async (filename) => {
  try {
    console.log(filename);
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filename,
    });
    return await client.send(command);
  } catch (error) {
    throw error({ error: error.message });
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
    result.Body.pipe(fs.createWriteStream(`./images/${filename}`));
  } catch (error) {
    throw error({ error: error.message });
  }
};
const getFileURL = async (filename) => {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  });
  return await getSignedUrl(client, command, { expiresIn: 120 });
};
const deleteFile = () => {};

export { uploadFile, getFiles, getFile, downloadFile, getFileURL, deleteFile };
