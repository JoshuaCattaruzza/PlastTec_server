const util = require("util");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const dbConfig = require("../config/dbConfig.js");
var storage = new GridFsStorage({
    url: dbConfig.URL + dbConfig.DB,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg"];
      if (match.indexOf(file.mimetype) === -1) {
        const filename = `${Date.now()}-plasttec-${file.originalname}`;
        return filename;
      }
      return {
        bucketName: dbConfig.IMG_BUCKET,
        filename: `${Date.now()}-plasttec-${file.originalname}`
      };
    }
  });
  var uploadFiles = multer({ storage: storage }).single("file");
  var uploadFilesMiddleware = util.promisify(uploadFiles);
  module.exports = uploadFilesMiddleware;