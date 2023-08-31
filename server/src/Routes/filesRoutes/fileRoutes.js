const { Router } = require("express");
const imageRouter = Router();
const {
  getAllImages,
  getImage,
  getUrlImage,
  downloadImage,
} = require("../../handlers/fileHandlers/GetHandlers");
const { uploadImage } = require("../../handlers/fileHandlers/UploadHandler");
const { deleteImage } = require("../../handlers/fileHandlers/DeleteHandler");

imageRouter.get("/", getAllImages);

imageRouter.get("/:fileName", getImage);

imageRouter.get("/url/:fileName", getUrlImage);

imageRouter.get("/download/:fileName", downloadImage);

imageRouter.delete("/:fileName", deleteImage);

imageRouter.post("/", uploadImage);

module.exports = { imageRouter };
