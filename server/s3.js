import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import pkg from "sharp";

const sharp = pkg;

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
const desiredWidth = 800;
const desiredHeight = 600;
const type = "jpeg";

const uploadFile = async (file) => {
  try {
    const stream = fs.createReadStream(file?.tempFilePath);
    console.log(stream);

    let nombre = `${file.name.split(".")[0]}.${type}`;

    await sharp(file?.tempFilePath)
      .resize(desiredWidth, desiredHeight)
      .toFormat(type)
      .toFile(`./uploads/newImage/${nombre}`);

    const newStream = fs.createReadStream(`./uploads/newImage/${nombre}`);

    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: nombre,
      Body: newStream,
    };

    const command = new PutObjectCommand(uploadParams);
    return await client.send(command);
  } catch (error) {
    throw { error: error.message };
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
  try {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filename,
    });
    return await getSignedUrl(client, command, { expiresIn: 120 });
  } catch (error) {
    throw error({ error: error.message });
  }
};
const deleteFile = async (filename) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filename,
    });
    await client.send(command);
  } catch (error) {
    throw error({ error: error.message });
  }
};

export { uploadFile, getFiles, getFile, downloadFile, getFileURL, deleteFile };
