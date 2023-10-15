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
  "/changeusername",
  authMiddleware.tokenValidator,
  userController.changeUsername
);

router.patch(
  "/change_password",
  authMiddleware.tokenValidator,
  userController.currentPasswordValidator,
  userController.changePassword
);

module.exports = router;
