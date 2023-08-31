const deleteFile = require("../../controllers/fileControllers/DeleteFileController");

const deleteImage = async (req, res) => {
  try {
    await deleteFile(req.params.fileName);
    res.json({ message: "File deleted" });
  } catch (error) {
    res.json(error);
  }
};

module.exports = { deleteImage };
