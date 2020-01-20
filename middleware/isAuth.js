exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("warning", "You have to be logged in to view that page");
    res.redirect("/login");
  }
};

exports.forwardAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/dashboard");
  } else {
    return next();
  }
};
