const LocalStrategy = require("passport-local").Strategy;
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //get user
      User.findOne({ where: { email: email } })
        .then(user => {
          console.log(user);
          if (!user) {
            return done(null, false, {
              message: "This user is not registered, Please register first"
            });
          }
          //check password
          bcrypt.compare(password, user.password, (err, match) => {
            if (err) throw err;
            if (match) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect Password" });
            }
          });
        })
        .catch(err => {
          throw err;
        });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        throw err;
      });
  });
};
