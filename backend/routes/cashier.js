const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const authValidator = require("../validator/authValidator");
const cashierController = require("../controller/cashier");

router.post(
  "/new_cashier",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  authValidator.registerChecker,
  authValidator.registerValidator,
  cashierController.createNewCashier
);

router.delete(
  "/delete_cashier/:username",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  cashierController.deleteCashier
);

router.patch(
  "/cashier_toggler/:username",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  cashierController.toggleCashierStatus
);

module.exports = router;
