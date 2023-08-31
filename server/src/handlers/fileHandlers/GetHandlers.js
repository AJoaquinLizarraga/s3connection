const {
  getFiles,
  getFile,
  getFileURL,
  downloadFile,
} = require("../../controllers/fileControllers/GetControllers");

const getAllImages = async (req, res) => {
  try {
    const files = await getFiles();
    res.json(files.Contents);
  } catch (error) {
    res.json(error);
  }
};

const getImage = async (req, res) => {
  try {
    const file = await getFile(req.params.fileName);
    /*Pregunta si este get file funciona para algo */
    const fileData = {
      ETag: file.ETag,
      contentType: file.ContentType,
    };
    // console.log(file);
    res.json(fileData);
  } catch (error) {
    res.json(error);
  }
};

const downloadImage = async (req, res) => {
  try {
    await downloadFile(req.params.fileName);
    res.json({ message: "File download" });
  } catch (error) {
    res.json(error);
  }
};

const getUrlImage = async (req, res) => {
  try {
    const fileUrl = await getFileURL(req.params.fileName);
    res.json({
      url: fileUrl,
    });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { getAllImages, downloadImage, getUrlImage, getImage };
