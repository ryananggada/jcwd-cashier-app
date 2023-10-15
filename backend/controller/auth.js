const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.loginHandler = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    return res.status(400).json({
      ok: false,
      message: "Username or Password is incorrect",
    });
  }

  const isPasswordCorrect = await bcrypt.compareSync(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({
      ok: false,
      message: "Username or Password is incorrect",
    });
  }

  const payload = {
    id: user.id,
    role: user.role,
    username: user.username,
    name: user.name,
    email: user.email,
    profilePicture: user.profilePicture,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  return res.json({
    ok: true,
    data: {
      token,
      id: user.id,
      role: user.role,
      username: user.username,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
    },
  });
};
