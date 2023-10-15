const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const userController = require("../controller/user");
const { multerUpload } = require("../lib/multer");

router.post(
  "/updateprofile",
  multerUpload.single("profilePicture"),
  authMiddleware.tokenValidator,
  userController.updateProfilePicture
);

router.patch(
  "/updatesettings",
  authMiddleware.tokenValidator,
  userController.updateProfileSettings
);

module.exports = router;
