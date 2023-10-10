const router = require("express").Router();
const authController = require("../controller/auth");
const authMiddleware = require("../middleware/auth");
const authValidator = require("../validator/authValidator");

router.post("/login", authController.loginHandler);
router.post(
  "/register_cashier",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  authValidator.registerChecker,
  authValidator.registerValidator,
  authController.createNewCashier
);

router.post("/logout");

module.exports = router;
