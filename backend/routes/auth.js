const router = require("express").Router();
const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");
const { multerUpload } = require("../lib/multer");

router.post("/login", authController.loginHandler);

router.post(
  "/updateprofile",
  multerUpload.single("profilePicture"),
  authMiddleware.tokenValidator,
  authController.updateProfilePicture
);

router.post("/logout");

module.exports = router;
