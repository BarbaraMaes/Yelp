const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const helmet = require("helmet");
//const compression = require("compression");
//const morgan = require("morgan");
//const fs = require("fs");

const authRouter = require("./routes/auth");
const indexRouter = require("./routes/index");

const Sequelize = require("sequelize");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");

//model imports
const User = require("./models/User");
const Restaurant = require("./models/restaurant");
const Review = require("./models/review");

//multer config
const uuidv4 = require("uuid/v4");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4());
  }
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); //save the file
  } else {
    cb(null, false); // don't save the file
  }
};

//passport conf
require("./util/passport")(passport);

const db = require("./util/database");

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("err: " + err));

const app = express();

/*const accessLogStream = fs.WriteStream(path.join(__dirname, "access.log"), {
  flags: "a"
});*/
app.use(cookieParser());
app.use(helmet());
//app.use(compression());
//app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static(path.join(__dirname, "public")));

//EJS
app.set("view engine", "ejs");
app.set("views", "views");

//express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

//passport
app.use(passport.initialize());
app.use(passport.session());

//flash Connect
app.use(flash());

//vars
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.warning = req.flash("warning");
  res.locals.isAuth = req.isAuthenticated();
  next();
});

//routes
app.use(authRouter);
app.use(indexRouter);

//Relations
Restaurant.hasMany(Review);
Restaurant.belongsTo(User);
User.hasMany(Review);
User.hasMany(Restaurant);
Review.belongsTo(User);
Review.belongsTo(Restaurant);

let PORT = process.env.PORT || 3000;
db.sync() //{ alter: true }
  .then(() => {
    app.listen(PORT, console.log(`Server started on port ${PORT}`));
  })
  .catch(err => {
    throw err;
  });
