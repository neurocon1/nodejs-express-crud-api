const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
const verifySignup = require("../middleware/verifySignUp.js")

router.post("/signup", [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRoleExisted], authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", authController.signout);

module.exports = router;
