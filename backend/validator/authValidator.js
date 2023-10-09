const { body, validationResult } = require("express-validator");

exports.registerValidator = [
  body("username")
    .isLength({ min: 5, max: 20 })
    .withMessage("Username needs to be in 5 to 20 characters long"),
  body("password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }),
  body("email").isEmail().withMessage("Email is not valid"),
  body("firstName").isLength({ min: 3, max: 20 }),
  body("lastName").isLength({ min: 3, max: 20 }),
  body("age").isInt({ min: 1, max: 100 }),
  body("phoneNumber").isMobilePhone(),
  body("city").isLength({ min: 5, max: 20 }),
];

exports.registerChecker = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result.array() });
    return;
  }
  next();
};
