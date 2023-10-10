const Product = require("../models/product");

exports.addNewProduct = async (req, res) => {
  const { name, price, stock, category } = req.body;

  const newProduct = await Product.create({
    name: name,
    price: price,
    stock: stock,
    category: category,
  });

  return res.json({
    ok: true,
    message: "Product has been added to the listing",
    data: newProduct,
  });
};
