const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
const { isAuth, forwardAuth } = require("../middleware/isAuth");

router.get("/", forwardAuth, indexController.getIndex);

router.get("/dashboard", indexController.getDashboard);

router.post("/add-restaurant", indexController.postRestaurant);

module.exports = router;
