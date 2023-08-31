const {
  uploadFile,
} = require("../../controllers/fileControllers/UploadController");

const uploadImage = async (req, res) => {
  try {
    const result = await uploadFile(req.files.newImage);
    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { uploadImage };
