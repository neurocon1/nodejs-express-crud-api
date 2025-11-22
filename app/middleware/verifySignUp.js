const db = require("../models");
const User = db.user;
const Role = db.role;

async function checkDuplicateUsernameOrEmail(req, res, next) {
  try {
    const { username, email } = req.body;

    const userWithUsername = await User.findOne({ where: { username } });
    if (userWithUsername) {
      return res.status(400).json({ message: "Username is already taken!" });
    }

    const userWithEmail = await User.findOne({ where: { email } });
    if (userWithEmail) {
      return res.status(400).json({ message: "Email is already in use!" });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function checkRoleExisted(req, res, next) {
  try {
    if (req.body.role) {
      for (let i = 0; i < req.body.role.length; i++) {
        const role = await Role.findOne({ where: { name: req.body.role[i] } });
        if (!role) {
          return res
            .status(400)
            .json({ message: `Role ${req.body.role[i]} doesn't exist!` });
        }
      }
    }
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  checkDuplicateUsernameOrEmail,
  checkRoleExisted,
};
