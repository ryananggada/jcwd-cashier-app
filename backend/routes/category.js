const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const categoryController = require("../controller/category");
const categoryValidator = require("../validator/categoryValidator");

router.get(
  "/",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  categoryController.getAllCategories
);
router.post(
  "/",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  categoryValidator.validateCategory,
  categoryValidator.applyCategoryValidation,
  categoryController.addCategory
);
router.put(
  "/:id",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  categoryController.editCategory
);
router.delete(
  "/:id",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  categoryController.deleteCategory
);

module.exports = router;
