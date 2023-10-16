const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const productController = require("../controller/product");
const { multerUpload } = require("../lib/multer");

router.get("/", productController.handleGetProducts);
router.get("/:page", productController.handleGetProductsPage);
router.get("/single/:id", productController.handleGetSingleProduct);
router.post(
  "/",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  multerUpload.single("image"),
  productController.addNewProduct
);
router.put(
  "/",
  authMiddleware.tokenValidator,
  authMiddleware.adminValidator,
  multerUpload.single("image"),
  productController.editProduct
);

router.delete("/delete-product/:id", async (req, res) => {});

module.exports = router;
