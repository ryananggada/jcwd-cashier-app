const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const productController = require("../controller/product");

router.post(
  "/add-new-product",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  productController.addNewProduct
);

module.exports = router;
