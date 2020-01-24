const db = require("../util/database");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const Restaurant = require("../models/restaurant");
const Review = require("../models/review");
const User = require("../models/User");
//const fileHelper = require("../util/file");

exports.getIndex = (req, res, next) => {
  res.render("index", { path: "/index", pageTitle: "Index" });
};

exports.getDashboard = async (req, res, next) => {
  const restaurants = await Restaurant.findAll();
  res.render("main/dashboard", {
    path: "/dashboard",
    pageTitle: "Dashboard",
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
  const reviews = await Review.findAll({
    include: [{ model: User }],
    where: { restaurantId: id }
  });
  res.render("main/detail", {
    path: "/detail",
    pageTitle: restaurant.name,
    rest: restaurant,
    reviews: reviews || []
  });
};

exports.deleteRestaurant = async (req, res, next) => {
  const id = req.body.id;
  try {
    const rest = await Restaurant.findOne({ where: { id: id } });
    //fileHelper.deleteFile(rest.image);
    await Restaurant.destroy({ where: { id: id } });
    res.redirect("/dashboard");
  } catch (err) {
    throw err;
  }
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
    /*if (newImage != "") {
      try {
        imageUrl = newImage.path;
        fileHelper.deleteFile(rest.image);
      } catch (err) {
        throw err;
      }
    } else {
      imageUrl = restaurant.image;
    }
    */
    if (newImage != undefined) {
      imageUrl = newImage.path;
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

exports.postReview = async (req, res, next) => {
  const restId = req.body.restId;
  const rating = req.body.rating;
  const text = req.body.text;
  try {
    const rest = await Restaurant.findOne({ where: { id: restId } });
    const result = await rest.createReview({
      text: text,
      rating: rating,
      userId: req.user.id
    });
    console.log(rest);
    console.log(result);
    res.redirect("/restaurant-details/" + restId);
  } catch (err) {
    throw err;
  }
};
