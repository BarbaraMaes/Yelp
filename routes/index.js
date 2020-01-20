const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
const { isAuth, forwardAuth } = require("../middleware/isAuth");

router.get("/", forwardAuth, indexController.getIndex);

router.get("/dashboard", isAuth, indexController.getDashboard);

router.post("/add-restaurant", indexController.postRestaurant);

router.get("/restaurant-details/:id", indexController.getDetails);

router.post("/edit-restaurant", indexController.updateRestaurant);

router.post("/delete-restaurant", indexController.deleteRestaurant);

module.exports = router;
