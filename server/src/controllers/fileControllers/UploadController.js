const { AWS_BUCKET_NAME } = require("../../../config");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const fs = require("fs");
const pkg = require("sharp");
const client = require("../configS3");

const sharp = pkg;

const desiredWidth = 800;
const desiredHeight = 600;
const type = "jpeg";

// const uploadFile = async (file) => {
//   try {
//     let nombre = `${file.name.split(".")[0]}.${type}`;

//     await sharp(file?.tempFilePath)
//       .resize(desiredWidth, desiredHeight)
//       .toFormat(type)
//       .toFile(`./src/uploads/newImage/${nombre}`);

//     const newStream = fs.createReadStream(`./src/uploads/newImage/${nombre}`);

//     const uploadParams = {
//       Bucket: AWS_BUCKET_NAME,
//       Key: nombre,
//       Body: newStream,
//     };

//     const command = new PutObjectCommand(uploadParams);
//     return await client.send(command);
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// };

// module.exports = { uploadFile };

/* Esto de arriba anda */

const uploadFile = async (fileOrUrl) => {
  try {
    let nombre;

    if (typeof fileOrUrl === "string" && fileOrUrl.startsWith("http")) {
      nombre = `${Date.now()}.${type}`;
      const response = await axios.get(fileOrUrl, {
        responseType: "arraybuffer",
      });
      fs.createReadStream(`./src/uploads/newImage/${nombre}`, response.data);

      await sharp(file?.tempFilePath)
        .resize(desiredWidth, desiredHeight)
        .toFormat(type)
        .toFile(`./src/uploads/newImage/${nombre}`);
    } else if (typeof fileOrUrl === "object" && fileOrUrl?.tempFilePath) {
      nombre = `${fileOrUrl.name.split(".")[0]}.${type}`;

      await sharp(fileOrUrl.tempFilePath)
        .resize(desiredWidth, desiredHeight)
        .toFormat(type)
        .toFile(`./src/uploads/newImage/${nombre}`);
    } else {
      throw new Error("Tipo de archivo no admitido.");
    }

    const newStream = fs.createReadStream(`./src/uploads/newImage/${nombre}`);

    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: nombre,
      Body: newStream,
    };

    const command = new PutObjectCommand(uploadParams);
    return await client.send(command);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = { uploadFile };
