const db = require("../util/database");
const Sequelize = require("sequelize");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getIndex = (req, res, next) => {
  res.render("index", { path: "/index", pageTitle: "Index" });
};

exports.getLogin = (req, res, next) => {
  res.render("auth/login", { path: "/login", pageTitle: "Login", errors: [] });
};

exports.getRegister = (req, res, next) => {
  res.render("auth/register", {
    path: "/register",
    pageTitle: "Register",
    errors: []
  });
};

exports.postRegister = async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;
  let errs = [];
  //required fields
  if (!name || !email || !password || !passwordConfirm) {
    errs.push({ msg: "You need to fill in all fields" });
  }
  //Passwords match
  if (password !== passwordConfirm) {
    errs.push({ msg: "Passwords don't match" });
  }
  if (errs.length > 0) {
    res.render("auth/register", {
      path: "/register",
      pageTitle: "Register",
      errors: errs,
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm
    });
  } else {
    try {
      const exists = await User.findOne({ where: { email: email } });
      if (!exists) {
        //hash password
        const hash = bcrypt.hashSync(password, 10);
        //create a user
        const user = await User.create({
          name: name,
          email: email,
          password: hash
        });
        console.log(user);
      }
      //if User exists
      else {
        errs.push({ msg: "User already exists, please Login" });
        res.render("auth/register", {
          path: "/register",
          pageTitle: "Register",
          errors: errs,
          name: name,
          email: email,
          password: password,
          passwordConfirm: passwordConfirm
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};
