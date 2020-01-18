const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const authRouter = require("./routes/auth");

const db = require("./util/database");

db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch(err => console.log("err: " + err));

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", "views");
app.use(authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
