import "./s3.js";
import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";

const app = express();

app.listen(3001, () => {
  console.log("Server listening at port 3001 ");
});
app.use(morgan("dev"));
app.use(fileUpload());

app.get("/", (req, res) => {
  res.json({ msg: "hola" });
});

app.post("/files", () => {
  console.log(req.files);
  res.json({ msg: "hola" });
});
