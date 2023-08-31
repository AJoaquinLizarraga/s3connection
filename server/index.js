// import express from "express";
const express = require("express");
const fileUpload = require("express-fileupload");
// import morgan from "morgan";
const morgan = require("morgan");
// import { router } from "./src/Routes/index";
const router = require("./src/Routes");

const app = express();
app.use(express.json());
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
    tempFileDir: "./src/uploads",
  })
);

app.use("/", router);

app.listen(3001, () => {
  console.log("Server listening at port 3001 ");
});
