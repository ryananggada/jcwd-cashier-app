const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const productController = require("../controller/product");

router.post(
  "/",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  productController.addNewProduct
);
router.put(
  "/",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  productController.editProduct
);

module.exports = router;
