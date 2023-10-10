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
const productListController = require("../controller/product-list");

router.get("/categories", productListController.handleGetCategories)
router.get("/categories/:id", productListController.handleGetCategoryById)
router.post("/categories", productListController.handleAddCategory)
router.put("/categories/:id", productListController.handleEditCategory)
router.patch("/categories/:id", productListController.handleEditCategory)
router.delete("/categories/:id", productListController.handleDeleteCategory)

router.get("/products/:page", productListController.handleGetProducts)
router.post("/add-product", async (req, res) => {});
router.put("/edit-product/:id", async (req, res) => {});
router.delete("/delete-product/:id", async (req, res) => {});

module.exports = router;
