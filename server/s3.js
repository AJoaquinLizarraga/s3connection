// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import fs from "fs";
// import dotenv from "dotenv";

// dotenv.config();
// const {
//   AWS_REGION,
//   AWS_ACCESS_KEYID,
//   AWS_SECRET_ACCESS_KEYID,
//   AWS_BUCKET_NAME,
// } = process.env;

// const client = new S3Client({
//   region: AWS_REGION,
//   credentials: {
//     awsAccessKeyId: AWS_ACCESS_KEYID,
//     awsSecretAccessKeyId: AWS_SECRET_ACCESS_KEYID,
//   },
// });

// const uploadFile = async (file) => {
//   console.log(file?.tempFilePath);
//   const stream = fs.createReadStream(file?.tempFilePath);
//   const uploadParams = {
//     Bucket: "blog-images-bocancorp",
//     Key: "imagenPrueba",
//     body: stream,
//   };

//   const command = new PutObjectCommand(uploadParams);
//   const result = await client.send(command);
//   console.log(result);
// };

// export { uploadFile };

import AWS from "aws-sdk";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
const {
  AWS_REGION,
  AWS_ACCESS_KEYID,
  AWS_SECRET_ACCESS_KEYID,
  AWS_BUCKET_NAME,
} = process.env;

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEYID,
  secretAccessKey: AWS_SECRET_ACCESS_KEYID,
});

// const client = new S3Client({
//   region: AWS_REGION,
//   credentials: {
//     awsAccessKeyId: AWS_ACCESS_KEYID,
//     awsSecretAccessKeyId: AWS_SECRET_ACCESS_KEYID,
//   },
// });

const uploadFile = async (file) => {
  console.log(file?.tempFilePath);
  const stream = fs.readFileSync(file?.tempFilePath);
  const uploadParams = s3.upload(
    {
      Bucket: "blog-images-bocancorp",
      Key: file?.tempFilePath,
      Body: stream,
    },
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`File uploaded successfully. ${data.Location}`);
      }
    }
  );

  // const command = new PutObjectCommand(uploadParams);
  // const result = await client.send(command);
  // console.log(result);
};

export { uploadFile };
