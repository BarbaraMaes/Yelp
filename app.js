const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const authRouter = require("./routes/auth");
const indexRouter = require("./routes/index");

const Sequelize = require("sequelize");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");

//passport conf
require("./util/passport")(passport);

const db = require("./util/database");

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("err: " + err));

const app = express();
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
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
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  next();
});

//routes
app.use(authRouter);
app.use(indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
