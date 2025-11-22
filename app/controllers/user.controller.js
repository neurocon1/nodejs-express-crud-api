const db = require("../models");
const User = db.user;

async function allAccess(req, res) {
  try {
    res.status(200).json({ message: "Public Content." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function userBoard(req, res) {
  try {
    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(401).json({ message: "Please login to continue" });
    }
    res.status(200).json({ message: "User Content." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function adminBoard(req, res) {
  try {
    res.status(200).json({ message: "Admin Content." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function moderatorBoard(req, res) {
  try {
    res.status(200).json({ message: "Moderator Content." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
};
