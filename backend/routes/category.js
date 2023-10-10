const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlware/auth");
const categoryController = require("../controller/category");
const categoryValidator = require("../validator/categoryValidator");

router.get(
  "/",
  categoryController.getAllCategories,
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator
);
router.post(
  "/",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  categoryValidator.validateCategory,
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
