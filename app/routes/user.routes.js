const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const authJwt  = require("../middleware/authJwt.js");

router.get("/all", userController.allAccess);

router.get("/user", authJwt.verifyToken, userController.userBoard);

router.get(
  "/admin",
  authJwt.verifyToken,
  authJwt.isAdmin,
  userController.adminBoard
);

router.get(
  "/moderator",
  authJwt.verifyToken,
  authJwt.isModerator,
  userController.moderatorBoard
);


module.exports = router;
