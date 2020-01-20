const db = require("../util/database");
const Sequelize = require("sequelize");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", { path: "/login", pageTitle: "Login", errors: [] });
};

exports.postLogin = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true
  })(req, res, next);
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
        await User.sync();
        await User.create({
          name: name,
          email: email,
          password: hash
        });

        req.flash("success", "Registration Succesfull");
        res.redirect("/login");
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

exports.getLogout = (req, res, next) => {
  req.logout();
  req.flash("warning", "You are now Logged out");
  res.redirect("/login");
};
