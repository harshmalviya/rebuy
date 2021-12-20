const express = require("express");

const router = express.Router();

const authController = require("../controller/authController");

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get(
  "/validateToken",
  authController.protect,
  authController.validateToken
);
router.get("/getMe", authController.protect, authController.getMe);

module.exports = router;
