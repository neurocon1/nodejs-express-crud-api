const jwt = require("jsonwebtoken");
const db = require("../models");
const dotenv = require("dotenv");

dotenv.config();
const User = db.user;
const Role = db.role;

function verifyToken(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length).trim();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Unauthorized! Token is not valid." });
  }
}

async function isAdmin(req, res, next) {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();

  if (roles.some((role) => role.name === "admin")) {
    next();
  } else {
    res.status(403).json({ message: "Require Admin Role!" });
  }
}

async function isModerator(req, res, next) {
  const user = await User.findByPk(req.userId);
  const roles = await user.getRoles();

  if (roles.some((role) => role.name === "moderator")) {
    next();
  } else {
    res.status(403).json({ message: "Require Moderator Role!" });
  }
}

module.exports = {
  verifyToken,
  isAdmin,
  isModerator,
};
