const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
const { isAuth, forwardAuth } = require("../middleware/isAuth");

router.get("/", forwardAuth, indexController.getIndex);

router.get("/dashboard", isAuth, indexController.getDashboard);

router.post("/add-restaurant", isAuth, indexController.postRestaurant);

router.get("/restaurant-details/:id", isAuth, indexController.getDetails);

router.post("/edit-restaurant", isAuth, indexController.updateRestaurant);

router.post("/delete-restaurant", isAuth, indexController.deleteRestaurant);

router.post("/add-review", isAuth, indexController.postReview);

module.exports = router;
