const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const productController = require("../controller/product");

router.get(
  "/",
  productController.handleGetProducts
)
router.get(
  "/:page",
  productController.handleGetProductsPage
)
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

router.delete("/delete-product/:id", async (req, res) => {});

module.exports = router;
