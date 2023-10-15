const router = require("express").Router();
const authController = require("../controller/auth");

router.post("/login", authController.loginHandler);

module.exports = router;
