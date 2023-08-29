import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import fs from "fs";

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
    awsAccessKeyId: AWS_ACCESS_KEYID,
    awsSecretAccessKeyId: AWS_SECRET_ACCESS_KEYID,
  },
});

const uploadFile = async (file) => {
  const stream = fs.createReadStream(file);
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: "nombre del archivo.png",
    body: stream,
  };

  const command = new PutObjectCommand(uploadParams);
  const result = await client.send(command);
  console.log(result);
};

export { uploadFile };
