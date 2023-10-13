const { User } = require("../models");
const bcrypt = require("bcrypt");

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

  res.json({
    ok: true,
    data: user.profilePicture,
    message: "Profile Picture Successfully Uploaded",
  });
};

exports.changeUsername = async (req, res) => {
  const userId = req.user.id;
  const { username } = req.body;

  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    res.status(404).json({ ok: false, message: "User not found" });
    return;
  }

  user.username = username;
  await user.save();

  res.json({
    ok: true,
    data: user.username,
    message: "Username Successfully Changed",
  });
};

exports.changePassword = async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;

  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    res.status(404).json({ ok: false, message: "User not found" });
    return;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  user.password = hashedPassword;
  await user.save();

  res.json({
    ok: true,
    message: "Password Successfully Changed",
  });
};

exports.changeName = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  const user = await User.findOne({ where: { id: userId } });
  if (!user) {
    res.status(404).json({ ok: false, message: "User not found" });
    return;
  }

  user.name = name;
  await user.save();

  res.json({
    ok: true,
    data: user.name,
    message: "Name Successfully Changed",
  });
};
