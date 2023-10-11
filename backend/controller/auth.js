const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

exports.loginHandler = async (req, res, next) => {
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

  const payload = { id: user.id, role: user.role, userName: user.name };
  const token = jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  return res.json({
    ok: true,
    data: {
      token,
      name: user.name,
      role: user.role,
      profilePicture: user.profilePicture,
    },
  });
};

exports.updateProfilePicture = async (req, res) => {
  const userId = req.user.id;
  const profilePicture = req.file.filename;

  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    res.status(404).json({ ok: false, message: "User not found" });
    return;
  }

  user.profilePicture = profilePicture;
  await user.save();

  res.json({ ok: true, data: user });
};
