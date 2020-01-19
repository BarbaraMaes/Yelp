const db = require("../util/database");
const Sequelize = require("sequelize");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.getIndex = (req, res, next) => {
  res.render("index", { path: "/index", pageTitle: "Index" });
};

exports.getDashboard = (req, res, next) => {
  res.render("main/dashboard", {
    path: "/dashboard",
    pageTitle: "Dashboard",
    name: req.user.name
  });
};
