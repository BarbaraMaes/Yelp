const express = require("express");
const router = express.Router();
const db = require("../util/database");
const Sequelize = require("sequelize");
const authController = require("../controllers/auth");

router.get("/", authController.getIndex);

router.get("/login", authController.getLogin);

router.get("/register", authController.getRegister);

router.post("/register", authController.postRegister);

module.exports = router;
