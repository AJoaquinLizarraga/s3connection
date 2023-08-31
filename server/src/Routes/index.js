// import { Router } from "express";
const { Router } = require("express");
const { imageRouter } = require("./filesRoutes/fileRoutes.js");
const router = Router();

router.use("/files", imageRouter);

module.exports = router;
