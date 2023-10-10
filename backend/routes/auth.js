const router = require("express").Router();
const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");
const authValidator = require("../validator/authValidator");
const { multerUpload } = require("../lib/multer");

router.post("/login", authController.loginHandler);
router.post(
  "/register_cashier",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  authValidator.registerChecker,
  authValidator.registerValidator,
  authController.createNewCashier
);

router.post(
  "/updateprofile",
  authMiddleware.tokenValidator,
  multerUpload.single("profilePicture"),
  authController.updateProfilePicture
);

router.post("/logout");

module.exports = router;
