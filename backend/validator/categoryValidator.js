const { body } = require("express-validator");

exports.validateCategory = async (req, res, next) => {
  body("name")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name should be in between 3 and 100 characters");
  body("description")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Category description should be in between 3 and 100 characters"
    );
};
