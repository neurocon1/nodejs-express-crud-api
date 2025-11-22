const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const User = db.user;

async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function signin(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found! Please signup!" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Invalid password! Please try again!" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      algorithm: "HS256",
      expiresIn: "24h",
    });

    res.status(200).json({ message: "User login successfully", user, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function signout(req, res) {
  try {
    res.status(200).json({ message: "You've been signed out!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  signup,
  signin,
  signout,
};
