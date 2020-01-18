const express = require("express");
const router = express.Router();
const db = require("../util/database");
const Sequelize = require("sequelize");

router.get("/", (req, res, next) => {
  res.render("auth/login", { path: "/login" });
});

module.exports = router;
