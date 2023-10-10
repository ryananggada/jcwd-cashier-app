const router = require("express").Router();
const productListController = require("../controller/product-list");
const { Product } = require("../models");

router.get("/", productListController.handleGetProducts);

router.post("/add-product", async (req, res) => {});
router.put("/edit-product/:id", async (req, res) => {});
router.delete("/delete-product/:id", async (req, res) => {});

module.exports = router;
