const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
const { isAuth } = require("../middleware/isAuth");

router.get("/", indexController.getIndex);

router.get("/dashboard", isAuth, indexController.getDashboard);

module.exports = router;
