const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { forwardAuth } = require("../middleware/isAuth");

router.get("/login", forwardAuth, authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/register", forwardAuth, authController.getRegister);

router.post("/register", authController.postRegister);

router.get("/logout", authController.getLogout);

module.exports = router;
