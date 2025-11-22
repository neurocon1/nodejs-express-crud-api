const db = require("../models");
const User = db.user;
const Role = db.role;
const Task = db.task;

async function verifyTaskOwner(req, res, next) {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found!" });

    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();
    const isAdmin = roles.some((role) => role.name === "admin");

    if (task.userId === req.userId || isAdmin) next();
    else return res.status(403).json({ message: "Not allowed!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  verifyTaskOwner,
};
