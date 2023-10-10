const { Category } = require("../models");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json({ ok: true, data: categories });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: String(error),
    });
  }
};

exports.addCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const category = await Category.create({
      name: name,
      description: description,
    });
    res.json({ ok: true, data: category });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: String(error),
    });
  }
};

exports.editCategory = async (req, res) => {
  const { name, description } = req.body;
  const productId = req.params.id;

  try {
    const category = await Category.findByOne({ where: { id: productId } });
    if (!category) {
      res.status(400).json({ ok: false, message: "Category not found" });
      return;
    }
    category.name = name;
    category.description = description;
    await category.save();

    return res.json({ ok: true, data: category });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: String(error),
    });
  }
};

exports.deleteCategory = async (req, res) => {
  const productId = req.params.id;

  try {
    const category = await Category.destroy({
      where: { id: productId },
    });
    if (!category) {
      res.status(400).json({ ok: false, message: "Category not found" });
      return;
    }
    return res.json({ ok: true, data: category });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: String(error),
    });
  }
};
