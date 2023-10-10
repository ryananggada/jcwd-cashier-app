const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, __dirname + "/../public");
  },
  filename: (req, file, cb) => {
    cb(null, "IMG-" + Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

const fileFilter = (req, file, cb) => {
  const { mimetype } = file;

  switch (mimetype) {
    case "image/jpg":
    case "image/png":
    case "image/gif":
      cb(null, true);
      break;
    default:
      cb(new Error("File format is not accepted"));
      break;
  }
};

// 1 megabyte
exports.multerUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});
