const Sequelize = require("sequelize");
const db = require("../util/database");

const Review = db.define("review", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  text: {
    type: Sequelize.STRING
  },
  rating: {
    type: Sequelize.INTEGER
  }
});

module.exports = Review;
