const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller.js");
const authJwt  = require("../middleware/authJwt.js");
const { verifyTaskOwner } = require("../middleware/verifyTaskOwner.js");

router.post("/", authJwt.verifyToken, taskController.createTasks);

router.get("/", authJwt.verifyToken, taskController.getTasks);

router.get("/user", authJwt.verifyToken, taskController.getTasksByUser);

router.get("/:id", authJwt.verifyToken, taskController.getTaskById);

router.put(
  "/:id",
  [authJwt.verifyToken, verifyTaskOwner],
  taskController.updateTask
);

router.delete(
  "/:id",
  [authJwt.verifyToken, verifyTaskOwner],
  taskController.deleteTask
);

module.exports = router;
