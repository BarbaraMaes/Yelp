const db = require("../util/database");
const Sequelize = require("sequelize");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Restaurant = require("../models/restaurant");

exports.getIndex = (req, res, next) => {
  res.render("index", { path: "/index", pageTitle: "Index" });
};

exports.getDashboard = async (req, res, next) => {
  const restaurants = await Restaurant.findAll();
  console.log(restaurants);
  res.render("main/dashboard", {
    path: "/dashboard",
    pageTitle: "Dashboard"
    //name: req.user.name
  });
};

exports.postRestaurant = async (req, res, next) => {
  const name = req.body.name;
  const adress = req.body.adress;
  try {
    const result = await req.user.createRestaurant({
      name: name,
      adress: adress
    });
    req.flash("success", "Restaurant created");
    res.redirect("/login");
  } catch (err) {
    throw err;
  }
};
