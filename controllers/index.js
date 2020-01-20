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
  //console.log(restaurants);
  res.render("main/dashboard", {
    path: "/dashboard",
    pageTitle: "Dashboard",
    name: req.user.name,
    restaurants: restaurants || []
  });
};

exports.postRestaurant = async (req, res, next) => {
  const name = req.body.name;
  const adress = req.body.adress;
  const description = req.body.description;
  const image = req.file;
  let imageUrl;

  try {
    imageUrl = image.path;
  } catch (err) {
    console.log(err);
  }

  try {
    const result = await req.user.createRestaurant({
      name: name,
      adress: adress,
      description: description,
      image: imageUrl
    });
    req.flash("success", "Restaurant created");
    res.redirect("/dashboard");
  } catch (err) {
    throw err;
  }
};

exports.getDetails = async (req, res, next) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findOne({
    where: {
      id: id
    }
  });
  res.render("main/detail", {
    path: "/detail",
    pageTitle: restaurant.name,
    rest: restaurant
  });
};

exports.deleteRestaurant = async (req, res, next) => {
  const id = req.body.id;
  await Restaurant.destroy({ where: { id: id } });
  res.redirect("/dashboard");
};

exports.updateRestaurant = async (req, res, next) => {
  const id = req.body.id;
  const newName = req.body.name;
  const newAdress = req.body.adress;
  const newImage = req.file;
  const newDescription = req.body.description;
  let imageUrl;

  try {
    const restaurant = await Restaurant.findOne({
      where: {
        id: id
      }
    });
    if (newImage != "") {
      try {
        imageUrl = newImage.path;
      } catch (err) {
        throw err;
      }
    } else {
      imageUrl = restaurant.image;
    }
    await Restaurant.update(
      {
        name: newName,
        adress: newAdress,
        description: newDescription,
        image: imageUrl
      },
      { where: { id: id } }
    );
    res.redirect("/restaurant-details/" + id);
  } catch (err) {
    throw err;
  }
};
