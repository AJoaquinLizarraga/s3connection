import "./s3.js";
import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import {
  uploadFile,
  getFiles,
  getFile,
  downloadFile,
  getFileURL,
  deleteFile,
} from "./s3.js";

const app = express();

app.use(morgan("dev"));

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
//   next();
// });

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

app.get("/files", async (req, res) => {
  try {
    const files = await getFiles();
    res.json(files.Contents);
  } catch (error) {
    res.json(error);
  }
});

app.get("/files/:fileName", async (req, res) => {
  try {
    const file = await getFile(req.params.fileName);
    // const fileData = {
    //   ETag: file.ETag,
    //   contentType: file.ContentType,
    // };
    console.log(file);
    res.json({ file });
  } catch (error) {
    res.json(error);
  }
});

app.get("/files/download/:fileName", async (req, res) => {
  try {
    await downloadFile(req.params.fileName);
    res.json({ message: "File download" });
  } catch (error) {
    res.json(error);
  }
});

app.get("/files/url/:fileName", async (req, res) => {
  try {
    const fileUrl = await getFileURL(req.params.fileName);
    res.json({
      url: fileUrl,
    });
  } catch (error) {
    res.json(error);
  }
});

app.delete("/files/:fileName", async (req, res) => {
  try {
    await deleteFile(req.params.fileName);
    res.json({ message: "File deleted" });
  } catch (error) {
    res.json(error);
  }
});

app.post("/files", async (req, res) => {
  try {
    const result = await uploadFile(req.files.newImage);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

app.listen(3001, () => {
  console.log("Server listening at port 3001 ");
});
