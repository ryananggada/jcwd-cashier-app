const Product = require("../models/product");

exports.addNewProduct = async (req, res) => {
  const { name, price, image, category, description } = req.body;

  try {
    const newProduct = await Product.create({
      name: name,
      price: price,
      image: image,
      category: category,
      description: description,
      isActive: true,
    });

    return res.json({
      ok: true,
      message: "Product has been added to the listing",
      data: newProduct,
    });
  } catch (error) {
    return res.status(400).json({ ok: false, message: String(error) });
  }
};

exports.editProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, price, image, category, description, isActive } = req.body;

  try {
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      res.status(404).json({ ok: false, message: "Product not found" });
      return;
    }

    product.name = name;
    product.price = price;
    product.image = image;
    product.category = category;
    product.description = description;
    product.isActive = isActive;
    await product.save();

    return res.json({ ok: true, data: product });
  } catch (error) {
    return res.status(400).json({ ok: false, message: String(error) });
  }
};
