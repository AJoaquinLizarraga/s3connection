import "./s3.js";
import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { uploadFile } from "./s3.js";

const app = express();

app.listen(3001, () => {
  console.log("Server listening at port 3001 ");
});
app.use(morgan("dev"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./uploads",
  })
);

app.get("/", (req, res) => {
  res.json({ msg: "hola" });
});

app.post("/files", async (req, res) => {
  console.log(req.files);
  await uploadFile(req.files.nuevaImagen);
  res.json({ msg: "hola" });
});
