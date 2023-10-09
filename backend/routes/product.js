const router = require("express").Router();
const { Product } = require("../models");

router.get("/", async (req, res) => {});
router.post("/add-product", async (req, res) => {});
router.put("/edit-product/:id", async (req, res) => {});
router.delete("/delete-product/:id", async (req, res) => {});

module.exports = router;
